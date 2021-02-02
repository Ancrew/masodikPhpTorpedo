
let aiKeretek = [];
let aiKeretIndex = 0;
let aiLovesHelyek = [];
let aiLovesIndexek = 0;
let vanBefejezetlenHajoTalalat = false;
let lehetsegesIranyok = [true, true, true, true];
let szukitettLehetosegek = false;
let kovetkezoIrany = 5;
let kovetkezoSor = Math.floor(Math.random() * palyaMeret);
let kovetkezoOszlop = Math.floor(Math.random() * palyaMeret);
let elsoTalaltHajoDivPoz = [];

init();


function init() {
}

function ai() {
//    if (jatekInditas) {
        jatekIndul();
        aiPalyaErzekeles();
        hajoKalkulalas();
//        hajoKirajzolo();
//        keretTesztelo();
//    }
}

function hajoKalkulalas(hossza = 5, index = 0) {
    let fuggoleges = false;
    let rSzam = Math.round(Math.random());
    if (rSzam % 2 === 0)
        fuggoleges = true;
    let sor;
    let oszlop;
    if (fuggoleges) {
        sor = Math.floor(Math.random() * (palyaMeret - (hossza - 1)));
        oszlop = Math.floor(Math.random() * palyaMeret);
    } else {
        sor = Math.floor(Math.random() * palyaMeret);
        oszlop = Math.floor(Math.random() * (palyaMeret - (hossza - 1)));
    }

    if (ujHajoDarab(sor, oszlop, hossza, fuggoleges, index)) {                 //true ha sikeres a lerakás false ha sikertelen
        index++;
        hossza--;

        //hármas hajó duplázása
        if (index === 3)
            hossza++;
        //kettes hajó duplázása
        else if (index === 5)
            hossza++;
    }
    //egyes hajót már ne gyártsunk
    if (index < 6) {
        hajoKalkulalas(hossza, index);
}

}

function ujHajoDarab(sor, oszlop, hossza, fuggoleges, index) {
    aiHajok[index] = [];
    let bentiIndex = 0;
    let ujSor = sor;
    let ujOszlop = oszlop;
    let ervenyes = true;

    while (bentiIndex < hossza && ervenyes) {
        if (fuggoleges)
            ujSor = sor + bentiIndex;
        else
            ujOszlop = oszlop + bentiIndex;
        if (ervenyesHajoHely(ujSor, ujOszlop)) {
            aiHajok[index][bentiIndex] = [];
            aiHajok[index][bentiIndex].push(ujSor);
            aiHajok[index][bentiIndex].push(ujOszlop);
            bentiIndex++;
        } else
            ervenyes = false;

    }
    if (bentiIndex === hossza) {
          aiKeretek.push(keretSzamolo(sor, oszlop, fuggoleges, hossza));
          aiKeretIndex++;
        return true;
    } else {
        while (bentiIndex > 0) {
            bentiIndex--;                                                       //ha az előző sikeres volt a benti index automatikusan lépett, ezért a törlésnél az index csökkentésével kezdünk
            hajoTorlo(aiHajok, index, bentiIndex);
        }
        return false;
    }
}

function ervenyesHajoHely(sor, oszlop) {
    let eredmeny = true;
    let kulsoIndex = 0;
    let belsoIndex = 0;
    while (eredmeny && kulsoIndex < aiKeretek.length) {
        belsoIndex = 0;
        while (eredmeny && belsoIndex < aiKeretek[kulsoIndex].length){
        if (aiKeretek[kulsoIndex][belsoIndex][0] === sor && aiKeretek[kulsoIndex][belsoIndex][1] === oszlop)
            eredmeny = false;
        belsoIndex++;
        }
        kulsoIndex++;
    }
    return eredmeny;
}

function aiPalyaErzekeles() {
    let indexek = [];
    for (var i = 0; i < aiDivek.length; i++) {
        for (var e = 0; e < aiDivek[i].length; e++) {
            let ujDiv = aiDivek[i][e];
            let indexek = [i, e];
            let sor = indexek[0];
            let oszlop = indexek[1];
            ujDiv.addEventListener("click", function () {
                if(!vege){
                if (!aiDivek[sor][oszlop].classList.contains("lottekra")) {
                    talalatErtekelo(aiDivek, aiHajok, sor, oszlop);
                    setTimeout(visszaLoves, 400);
                }
            }
            });
        }
    }

}

//azt se tudom mit írjak már ide.
function aiErvenytelenHelyek() {
      for (var i = 0; i < aiKeretek[aiKeretIndex].length; i++) 
            aiKeretek.push([aiKeretIndex][i]);
}



// ha nincs értéke véletlenszerűen választ
function visszaLoves() {
    aiLovesHelyek[aiLovesIndexek] = [];
    let talalatEredmeny;
    //ha még nincs kitűzött célpont, vaktában lő
    if(!vanBefejezetlenHajoTalalat)
        ujRandomCelpont();
    
    //ervenyes a cvelpont?
    let ervenyesLoves =  ervenyesLovesCelpont();
    
    // ha van épp eltalált hajó, csak tulfutottunk, vagy mellélőttünk akkor is tovább kell engedni
    if (ervenyesLoves || vanBefejezetlenHajoTalalat) {
        aiLovesHelyek[aiLovesIndexek].push(kovetkezoSor);
        aiLovesHelyek[aiLovesIndexek].push(kovetkezoOszlop);
        //ha érvénytelen a lövés, lehet hogy túlindexelés következne be a találat ellenőrzhésekor, ezért nem engedjük lefutni
        if(ervenyesLoves){
            talalatEredmeny = talalatErtekelo(mapDivek, jatekosHajok, kovetkezoSor, kovetkezoOszlop);                 //itt történik a konkrét lövés
        }
        //ervenytelen lövés esetén vizsgálat nélkül false-ra állítjuk a sikert
        else{
            talalatEredmeny = [];
            talalatEredmeny["talalt"] = false;
            talalatEredmeny["sullyedt"] = false;
        }
        if(talalatEredmeny["talalt"] && (!vanBefejezetlenHajoTalalat)){                                  //hajót talált a lövés, és még nem volt bemért hajó
            vanBefejezetlenHajoTalalat = true;
            elsoTalaltHajoDivPoz["sor"] = kovetkezoSor;
            elsoTalaltHajoDivPoz["oszlop"] = kovetkezoOszlop;
            kovetkezoIrany = Math.floor(Math.random() * lehetsegesIranyok.length-1);                        //kiválaszt 1 random irányt a lehetséges variációk közül
            kovetkezoCelpont(kovetkezoIrany);                                                               //a választott irányt ellenőrzi, és ez alapján uj célpontot határoz meg a következő lövésre
        }
        else if(talalatEredmeny["talalt"] && vanBefejezetlenHajoTalalat && !talalatEredmeny["sullyedt"]){
            kovetkezoCelpontBeallito("-", false);
            kovetkezoCelpontBeallito("+", false);
            kovetkezoCelpont(kovetkezoIrany);
            if(!ervenyesLovesCelpont(kovetkezoSor, kovetkezoOszlop))
                lovesMasikVegeFele(elsoTalaltHajoDivPoz);
        }
        
        // itt lövünk újat ha talált hajó közben félrefut a lövés, emiatt negedjük át érvénytelen lövés estén is a függvényt
        else if(vanBefejezetlenHajoTalalat && !talalatEredmeny["talalt"] || vanBefejezetlenHajoTalalat && !ervenyesLoves){
            lovesMasikVegeFele(elsoTalaltHajoDivPoz);
        }
        else if(talalatEredmeny["sullyedt"]){
            console.log("sullyedt!!!!!!!!");
            lehetsegesIranyok = [true, true, true, true];
            szukitettLehetosegek = false;
            vanBefejezetlenHajoTalalat = false;
            keretreNemLovunk(talalatEredmeny["melyikHajo"]);
            ujRandomCelpont();
        }
        else if(ervenyesLoves && !talalatEredmeny["talalt"] &&!vanBefejezetlenHajoTalalat)
            ujRandomCelpont();
        
    aiLovesIndexek++;
    }
    else
        visszaLoves();
}

function kovetkezoCelpont(ertek, sor = kovetkezoSor, oszlop = kovetkezoOszlop){
    if(ertek < 0){                                                                  //az irány értékét a legnagyobb lehetséges irányra állítja
        kovetkezoIrany = 3;              //az eredeti értéket is az adott értékre állítja nem csak a funkción belül
        ertek=3;
    }
    if(ertek > 3){                                                                  //az irány értékét a legnagyobb lehetséges irányra állítja
        kovetkezoIrany = 0;                                                         //az eredeti értéket is az adott értékre állítja nem csak a funkción belül
        ertek=0;
    }
    if (!szukitettLehetosegek){                                                    //ha első talált van, megnézi minden irányba van e lehetséges lövéspont
                if (sor === 0 || !ervenyesLovesCelpont(kovetkezoSor - 1, kovetkezoOszlop))                 //top
                    lehetsegesIranyok[0]=false;
                if (oszlop === aiDivek.length || !ervenyesLovesCelpont(kovetkezoSor, kovetkezoOszlop + 1))      //right
                    lehetsegesIranyok[1] = false;
                
                if (sor === aiDivek.length || !ervenyesLovesCelpont(kovetkezoSor + 1, kovetkezoOszlop))      //bot
                    lehetsegesIranyok[2] = false;
   
                if (oszlop === 0 || !ervenyesLovesCelpont(kovetkezoSor, kovetkezoOszlop - 1))                     //left
                    lehetsegesIranyok[3] = false;
                
                szukitettLehetosegek = true;
            }
            switch (ertek) {
                case 0:
                    if(lehetsegesIranyok[0])
                        kovetkezoSor -= 1; 
                    else
                        kovetkezoCelpont(--kovetkezoIrany);
                    break;

                case 1:
                    if(lehetsegesIranyok[1])        
                        kovetkezoOszlop += 1; 
                    else
                        kovetkezoCelpont(--kovetkezoIrany);
                    break;

                case 2:
                    if(lehetsegesIranyok[2]){
                        kovetkezoSor += 1; 
                    }
                    else
                        kovetkezoCelpont(--kovetkezoIrany);
                    break;



                case 3:
                    if(lehetsegesIranyok[3])
                        kovetkezoOszlop -= 1; 
                    else
                       kovetkezoCelpont(--kovetkezoIrany);
                    break;
            }
            
}

function ujRandomCelpont(){
    kovetkezoSor = Math.floor(Math.random() * palyaMeret);
    kovetkezoOszlop = Math.floor(Math.random() * palyaMeret);
}


function ervenyesLovesCelpont(celSor = kovetkezoSor, celOszlop = kovetkezoOszlop){
    eredmeny = true;
    if (celOszlop > aiDivek.length-1 || celOszlop < 0 || celSor > aiDivek.length-1 || celSor < 0){
        eredmeny = false;
    }
   if(!eredmeny === false){ 
    for (var i = 0; i < aiLovesHelyek.length - 1; i++)
                     //ha már lőttün oda vagy kisebb vagy nagyobb mint a pálya akkor false
                     if(aiLovesHelyek[i][0] === celSor && aiLovesHelyek[i][1] === celOszlop)
                         return false;
    }
                
     return eredmeny;
}

// növelt és csökkentet értékeket adott értékre állít, hasznos amikor egy-egy irányt ki akarunk zárni a lehetségesek közül mert a másik síkon volt már találat (0-top, 1-right, 2-bot, 3-left
function kovetkezoCelpontBeallito(irany, ertek){
    if(irany === "-"){
        if(kovetkezoIrany - 1 < 0)
            lehetsegesIranyok[3] = ertek;
        else
            lehetsegesIranyok[kovetkezoIrany-1] = ertek;  
    }
    else{
        if(kovetkezoIrany + 1 > 3)
            lehetsegesIranyok[0] = ertek;
        else
            lehetsegesIranyok[kovetkezoIrany + 1] = ertek;
    }
}

function keretreNemLovunk(melyikHajo){
    let jatekosKeretei = jatekosKeretek[melyikHajo];
    for (var i = 0; i < jatekosKeretei.length; i++) {
         let lottSor = jatekosKeretei[i][0];
         let lottOszlop = jatekosKeretei[i][1];
         if(ervenyesLovesCelpont(lottSor, lottOszlop)){
            aiLovesIndexek++;
            aiLovesHelyek[aiLovesIndexek]=[];
            aiLovesHelyek[aiLovesIndexek].push(lottSor, lottOszlop);
        }
    }
}

function hajoKirajzolo(){
    for (var i = 0; i < aiHajok.length; i++) {
        for (var e = 0; e < aiHajok[i].length; e++) {
            let sor = aiHajok[i][e][0];
            let oszlop = aiHajok[i][e][1];
            aiDivek[sor][oszlop].style.background = "purple";
        }
    }
}

function lovesMasikVegeFele(elsoTalaltHajoDivPoz){
             kovetkezoSor = elsoTalaltHajoDivPoz["sor"];
             kovetkezoOszlop = elsoTalaltHajoDivPoz["oszlop"];
             kovetkezoCelpont(--kovetkezoIrany);
}

function keretTesztelo(){
    for (var i = 0; i < aiKeretek.length; i++) 
            for (var e = 0; e < aiKeretek[i].length; e++) 
                    aiDivek[aiKeretek[i][e][0]][aiKeretek[i][e][1]].style.background = "yellow";    
}