//let aiHajok = [];
let aiKeretek = [];
let aiKeretIndex = 0;
let aiLovesHelyek = [];
let aiLovesIndexek = 0;
let vanBefejezetlenHajoTalalat = false;
let lehetsegesIranyok = [true, true, true, true];
//lehetsegesIranyok["fenn"] = true;
//lehetsegesIranyok["jobb"]= true;
//lehetsegesIranyok["lenn"] = true;
//lehetsegesIranyok["bal"] = true;
let szukitettLehetosegek = false;
let kovetkezoIrany = 5;
let kovetkezoSor = Math.floor(Math.random() * palyaMeret);
let kovetkezoOszlop = Math.floor(Math.random() * palyaMeret);
let elsoTalaltHajoDivPoz = [];

init();


function init() {
    let tesztSet = new Set();
    tesztSet.add(2, 3);
    tesztSet.add(2, 5);
    tesztSet.add(2, 6);
    tesztSet.add(2, 6);

    console.log(tesztSet);
}

function ai() {
    if (jatekInditas) {
        aiPalyaErzekeles();
        hajoKalkulalas();
        console.log(aiHajok);

    }
}

//function iranyokVisszaAllitasa(){
//    let lehetsegesIranyok = [];
//lehetsegesIranyok[fenn] = true;
//lehetsegesIranyok["jobb"]= true;
//lehetsegesIranyok["lenn"] = true;
//lehetsegesIranyok["bal"] = true;
//}
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
//            aiDivek[ujSor][ujOszlop].style.background = "gray";
            bentiIndex++;
        } else
            ervenyes = false;

    }
    if (bentiIndex === hossza) {
        aiErvenytelenHelyek(sor, oszlop, hossza, fuggoleges);
//        console.log("sikeres");
        return true;
    } else {
        while (bentiIndex > 0) {
            bentiIndex--; //ha az előző sikeres volt a benti index automatikusan lépett, ezért a törlésnél az index csökkentésével kezdünk
//            console.log("sikertelen " + bentiIndex);
            hajoTorlo("ai", index, bentiIndex);
            if (hosszaban)
                aiDivek[sor + bentiIndex][oszlop].style.background = "green";
            else
                aiDivek[sor][oszlop + bentiIndex].style.background = "green";
        }
        return false;
    }
}

function ervenyesHajoHely(sor, oszlop) {
    let eredmeny = true;
    let kulsoIndex = 0;
    while (eredmeny && kulsoIndex < aiKeretek.length) {
        if (aiKeretek[kulsoIndex][0] === sor && aiKeretek[kulsoIndex][1] === oszlop) {
            eredmeny = false;
//                console.log("sikertelen pozicio");
        }
        kulsoIndex++;
    }
    return eredmeny;
}

function aiPalyaErzekeles() {
//    let indexem = 0;
//    indexem++;
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
                    talalatErtekelo("ai", sor, oszlop);
                    setTimeout(visszaLoves, 400);
                }
            }
            });
        }
    }

}

//azt se tudom mit írjak már ide.
function aiErvenytelenHelyek(sor, oszlop, hossza, fuggoleges) {
    switch (fuggoleges) {
        case true:
            for (var i = -1; i <= 1; i++) {
                aiKeretek[aiKeretIndex] = [];
                if (ervenyesKeret(sor - 1, oszlop + i)) {
                    aiKeretek[aiKeretIndex].push(sor - 1);
                    aiKeretek[aiKeretIndex].push(oszlop + i);
                    aiKeretIndex++;
                    aiKeretek[aiKeretIndex] = [];
                }
                if (ervenyesKeret(sor + hossza, oszlop + i)) {
                    aiKeretek[aiKeretIndex].push(sor + hossza);
                    aiKeretek[aiKeretIndex].push(oszlop + i);
                    aiKeretIndex++;
                    aiKeretek[aiKeretIndex] = [];
                }
                for (var x = sor; x < sor + hossza; x++) {
                    if (ervenyesKeret(x, oszlop + i)) {
                        aiKeretek[aiKeretIndex].push(x);
                        aiKeretek[aiKeretIndex].push(oszlop + i);
                        aiKeretIndex++;
                        aiKeretek[aiKeretIndex] = [];
                    }
                }
            }
            break;
        case false:
            for (var i = -1; i <= 1; i++) {
                aiKeretek[aiKeretIndex] = [];
//                if (sor + i >= 0 && sor + i < mapDivek.length) {
                if (ervenyesKeret(sor + i, oszlop - 1)) {
                    aiKeretek[aiKeretIndex].push(sor + i);
                    aiKeretek[aiKeretIndex].push(oszlop - 1);
                    aiKeretIndex++;
                    aiKeretek[aiKeretIndex] = [];
                }
                if (ervenyesKeret(sor + i, oszlop + hossza)) {
                    aiKeretek[aiKeretIndex].push(sor + i);
                    aiKeretek[aiKeretIndex].push(oszlop + hossza);
                    aiKeretIndex++;
                    aiKeretek[aiKeretIndex] = [];
                }
                for (var x = oszlop; x < oszlop + hossza; x++) {
                    if (ervenyesKeret(sor + i, x)) {
                        aiKeretek[aiKeretIndex].push(sor + i);
                        aiKeretek[aiKeretIndex].push(x);
                        aiKeretIndex++;
                        aiKeretek[aiKeretIndex] = [];
                    }
                }
            }
//                }

            break;
    }
}

//function keretTesztelo(){
//    for (var i = 0; i < aiKeretek.length-1; i++) {
//            aiDivek[aiKeretek[i][0]][aiKeretek[i][1]].style.background = "yellow";
//        }
//    
//}

 


// ha nincs értéke véletlenszerűen választ
function visszaLoves() {
    console.log("---------------------------------");
    aiLovesHelyek[aiLovesIndexek] = [];
    let talalatEredmeny;
    //ha még nincs kitűzött célpont, vaktában lő
    if(!vanBefejezetlenHajoTalalat){
        ujRandomCelpont();
    }
    //ervenyes a cvelpont?
    let ervenyesLoves =  ervenyesLovesCelpont();
   

    // ha van épp eltalált hajó, csak tulfutottunk, vagy mellélőttünk akkor is tovább kell engedni
    if (ervenyesLoves || vanBefejezetlenHajoTalalat) {
        console.log("itt is jár ám a kód");
        aiLovesHelyek[aiLovesIndexek].push(kovetkezoSor);
        aiLovesHelyek[aiLovesIndexek].push(kovetkezoOszlop);
        //ha érvénytelen a lövés, lehet hogy túlindexelés következne be a találat ellenőrzhésekor, ezért nem engedjük lefutni
        if(ervenyesLoves){
            talalatEredmeny = talalatErtekelo("jatekos", kovetkezoSor, kovetkezoOszlop);                 //itt történik a konkrét lövés
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
            console.log("kovetkezo irany: " + kovetkezoIrany);
            kovetkezoCelpont(kovetkezoIrany);                              //a választott irányt ellenőrzi, és ez alapján uj célpontot határoz meg a következő lövésre
        }
        else if(talalatEredmeny["talalt"] && vanBefejezetlenHajoTalalat && !talalatEredmeny["sullyedt"]){
            kovetkezoCelpontBeallito("-", false);
            kovetkezoCelpontBeallito("+", false);
             console.log("kovetkezo irany: " + kovetkezoIrany);
            kovetkezoCelpont(kovetkezoIrany);
        }
        
        // itt lövünk újat ha talált hajó közben félrefut a lövés, emiatt negedjük át érvénytelen lövés estén is a függvényt
        else if(vanBefejezetlenHajoTalalat && !talalatEredmeny["talalt"] || vanBefejezetlenHajoTalalat && !ervenyesLoves){
             console.log("kovetkezo irany: " + kovetkezoIrany);
             kovetkezoSor = elsoTalaltHajoDivPoz["sor"];
             kovetkezoOszlop = elsoTalaltHajoDivPoz["oszlop"];
             kovetkezoCelpont(--kovetkezoIrany);
        }
        else if(talalatEredmeny["sullyedt"]){
            console.log("sullyedt!!!!!!!!");
            lehetsegesIranyok = [true, true, true, true];
            szukitettLehetosegek = false;
            vanBefejezetlenHajoTalalat = false;
            keretreNemLovunk(talalatEredmeny["melyikHajo"]);
            ujRandomCelpont();
        }
        else if(ervenyesLoves && !talalatEredmeny["talalt"] &&!vanBefejezetlenHajoTalalat){
            ujRandomCelpont();
        }
        
    aiLovesIndexek++;
    }
    else{
//        ujRandomCelpont();
//        console.log("nem sikerült lőni");
//        
//        aiLovesIndexek++;
        visszaLoves();
    
    }
}

function kovetkezoCelpont(ertek, sor = kovetkezoSor, oszlop = kovetkezoOszlop){
    if(ertek < 0){                                                                  //az irány értékét a legnagyobb lehetséges irányra állítja
        console.log("érték 0 alá ment, az uj érték:");
        kovetkezoIrany = 3;              //az eredeti értéket is az adott értékre állítja nem csak a funkción belül
        ertek=3;
        console.log(ertek);
    }
    if(ertek > 3){                                                                  //az irány értékét a legnagyobb lehetséges irányra állítja
        console.log("érték 0 alá ment, az uj érték:");
        kovetkezoIrany = 0;              //az eredeti értéket is az adott értékre állítja nem csak a funkción belül
        ertek=0;
        console.log(ertek);
    }
        console.log("lehetsegesIranyok: ");
        console.log(lehetsegesIranyok);
    if (!szukitettLehetosegek){                                                    //ha első talált van, megnézi minden irányba van e lehetséges lövéspont
                if (sor === 0 || !ervenyesLovesCelpont(kovetkezoSor - 1, kovetkezoOszlop)){                  //top
                    lehetsegesIranyok[0]=false;
                    
                }
                if (oszlop === aiDivek.length || !ervenyesLovesCelpont(kovetkezoSor, kovetkezoOszlop + 1)){      //right
                    lehetsegesIranyok[1] = false;
                }
                if (sor === aiDivek.length || !ervenyesLovesCelpont(kovetkezoSor + 1, kovetkezoOszlop)) {      //bot
                    lehetsegesIranyok[2] = false;
                }

                if (oszlop === 0 || !ervenyesLovesCelpont(kovetkezoSor, kovetkezoOszlop - 1)) {                    //left
                    lehetsegesIranyok[3] = false;
                }
                console.log("szükites utám: ");
                console.log(lehetsegesIranyok);
                szukitettLehetosegek = true;
            }
            console.log("ertek: " + ertek);
            switch (ertek) {
                case 0:
                    if(lehetsegesIranyok[0]){
                        kovetkezoSor -= 1; 
                    }
                    else{
                        
//                        kovetkezoCelpontLepteto("-");
                        kovetkezoCelpont(--kovetkezoIrany);
                    }
//                       visszaLoves(sor - 1, oszlop, ertek); 
//                            visszaLoves(sor -1, oszlop);
//                    lehetsegesIranyok.splice(kovetkezoHely, 1);
//                    console.log("maradék hossz: " + lehetsegesIranyok.length);
//                    console.log(lehetsegesIranyok);
                    break;

                case 1:
                    if(lehetsegesIranyok[1]){         
                        kovetkezoOszlop += 1; 
                        
                    }
                    else
                        
//                        kovetkezoCelpontLepteto("-");
                        kovetkezoCelpont(--kovetkezoIrany);
                    
                    
//                       visszaLoves(sor, oszlop + 1, ertek);
//                                      visszaLoves(sor, oszlop +1);
//                    lehetsegesIranyok.splice(kovetkezoHely, 1);
//                    console.log("maradék hossz: " + lehetsegesIranyok.length);
//                    console.log(lehetsegesIranyok);
                    break;

                case 2:
                    if(lehetsegesIranyok[2]){
                          
                       
                        kovetkezoSor += 1; 
                    }
                    else
                        
//                        kovetkezoCelpontLepteto("-");
                        kovetkezoCelpont(--kovetkezoIrany);
//                       visszaLoves(sor + 1, oszlop, ertek);
//                            visszaLoves(sor + 1, oszlop);
//                    lehetsegesIranyok.splice(kovetkezoHely, 1);
//                    console.log("maradék hossz: " + lehetsegesIranyok.length);
//                    console.log(lehetsegesIranyok);
                    break;



                case 3:
                    if(lehetsegesIranyok[3]){
                        
                        kovetkezoOszlop -= 1; 
                    }
                    else
//                        kovetkezoCelpontLepteto("-");
                       kovetkezoCelpont(--kovetkezoIrany);
                    
//                       visszaLoves(sor, oszlop - 1, ertek);
//                            visszaLoves(sor, oszlop - 1);
//                    lehetsegesIranyok.splice(kovetkezoHely, 1);
//                    console.log("maradék hossz: " + lehetsegesIranyok.length);
//                    console.log(lehetsegesIranyok);
                    break;
            }
            
}

function ujRandomCelpont(){
    kovetkezoSor = Math.floor(Math.random() * palyaMeret);
    kovetkezoOszlop = Math.floor(Math.random() * palyaMeret);
}

function ervenyesLovesCelpont(celSor = kovetkezoSor, celOszlop = kovetkezoOszlop){
    eredmeny = true;
    console.log("vcelSor: " + celSor);
    console.log("vcelOszlop: " + celOszlop);
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

// növelt és csökkentet értékeket adott értékre állít, hasznos amikor egy-egy iráyn tki akarunk zárni a lehetségesek közül mert a másik skálán volt már találat
function kovetkezoCelpontBeallito(irany, ertek){
    console.log("*-*-*-*-*-*-*-*-*-*-*-*-*");
    console.log("nézzük: ");
    console.log("következő irány: " + kovetkezoIrany);
    for (var i = 0; i < lehetsegesIranyok.length; i++) {
        console.log(lehetsegesIranyok[i]);
    }
    if(irany === "-"){
        if(kovetkezoIrany - 1 < 0){
            console.log("koviirany: " + kovetkezoIrany-1);
            lehetsegesIranyok[3] = ertek;
            console.log("lehetsges irányok 3: " + lehetsegesIranyok[3]);
        }
        else{
         console.log("lehetséges irály else ágban kovetkezoirany -1: " + parseInt(kovetkezoIrany -1));   
            lehetsegesIranyok[kovetkezoIrany-1] = ertek;
            console.log("és konkrétan: " + lehetsegesIranyok[kovetkezoIrany-1]);
        }
    }
    else{
        if(kovetkezoIrany + 1 > 3){
            
            console.log("lehetsges irányok 0: " + lehetsegesIranyok[0]);
            lehetsegesIranyok[0] = ertek;
            console.log("allitas után: " + lehetsegesIranyok[0]);
        }
        else{
            console.log("lehetsges irányok kovetkezo + 1: " + parseInt(kovetkezoIrany + 1));
            lehetsegesIranyok[kovetkezoIrany + 1] = ertek;
            console.log("allitas utan: " + lehetsegesIranyok[kovetkezoIrany + 1]);
        }
    }

    console.log("nézzük újra: ");
    for (var i = 0; i < lehetsegesIranyok.length; i++) {
        console.log(lehetsegesIranyok[i]);
    }
}

function keretreNemLovunk(melyikHajo){
     console.log(aiLovesHelyek);
    
    console.log("jatekoskeret melyikhajo");
    console.log(jatekosKeretek[melyikHajo]);
   let jatekosKeretei = jatekosKeretek[melyikHajo];
    
    
    
    for (var i = 0; i < jatekosKeretei.length; i++) {
        
         let lottSor = jatekosKeretei[i][0];
         console.log("lottosor");
    console.log(lottSor);
         let lottOszlop = jatekosKeretei[i][1];
    console.log("lottOszlop");
    console.log(lottOszlop);
        if(ervenyesLovesCelpont(lottSor, lottOszlop)){
            aiLovesIndexek++;
            aiLovesHelyek[aiLovesIndexek]=[];
            aiLovesHelyek[aiLovesIndexek].push(lottSor, lottOszlop);
        }
        
    }
    console.log(aiLovesHelyek);
}