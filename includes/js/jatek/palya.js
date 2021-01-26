
var palyaMeret = 10;                                                            //hányszor hányas legyen a pálya
var mapDivek = [];                                                              //a pályát alkotó divek
var aiDivek = [];
var lerak = false;                                                              //éppen le akarok e rakni egy kockát
var hossz = 0;                                                                  //aktuálisan lerakandó hajó hossza
let jatekosKeretek = [];
let jatekosKeretIndex = 0;
var ervenyesLerakas;                                                            //lerakhatom e a hajot az adott helyre
var lerakottak = [];                                                            //lerakott hajok
var sikeresLerakas = false;                                                     //sikerült e lerakni
var hosszaban = true;                                                           
var mindLerakva = false;
var forgathat = true;                                                           // időzítőt adtam a forgatáshoz, hogy elkerüljem a hibákat
let hatraLevoHajok = 4;
let aiHajoi;                                                               //AI lerakott hajok;
var hajoFajtak = [["kettesHajo", 2, 2], ["harmasHajo", 2, 3], ["negyesHajo", 1, 4], ["otosHajo", 1, 5]];  //hajó neve -> hajó darabSzáma, hajó hossza
let jatekInditas=false;
let celpont = [];                                                               //array, 0-ik index = sor 1es index = oszlop
let jatekosHajok = [];        
let jatekosHajoIndex = 0;
let vege = false;
let aiHajok = [];

let keret = document.getElementById("jatekosPalyaKeret");
let tartalmazo = document.getElementById("jatekosPalyaTartalmazo");
let vizszintesKeret = document.getElementById("jatekosVizszintesKeret");
let fuggolegesKeret = document.getElementById("jatekosFuggolegesKeret");
let aiKeret = document.getElementById("aiPalyaKeret");
let aiTartalmazo = document.getElementById("aiPalyaTartalmazo");
let aiVizszintesKeret = document.getElementById("aiVizszintesKeret");
let aiFuggolegesKeret = document.getElementById("aiFuggolegesKeret");
let hajoTartalmazo = document.getElementById("hajoTartalmazo");
let resetelo = document.getElementById("reset");
let indul = document.getElementById("indul");
let gombok = document.getElementById("gombok");

init();

function init() {
    indul.disabled = "true";

//    cssBeallit("ai");
//    cssBeallit("elokeszit");
//    cssBeallit("jatekKezdes");
    
    
    makePalya("jatekos");
    makePalya("ai");
   
    
    makeHajok();
    cssBeallit(keret);
    cssBeallit(tartalmazo);
    cssBeallit(vizszintesKeret);
    cssBeallit(fuggolegesKeret);
    cssBeallit(hajoTartalmazo);
     
    felkeszules();
//    felkeszules("ai");
    
    resetelo.addEventListener("click", function(){
       reseteles();
    });
}

function reseteles(){
    hatraLevoHajok = 4;
     for (var i = 0; i < mapDivek.length; i++) {
            for (var x = 0; x < mapDivek.length; x++) {
                mapDivek[i][x].className="szabad";
                hajoFajtak = [["kettesHajo", 2, 2], ["harmasHajo", 2, 3], ["negyesHajo", 1, 4], ["otosHajo", 1, 5]];
            }
        }
        hajoDivTorlo();
        
    indul.disabled = "true";
       //makeHajok();
     
}

function felkeszules() {
//let ujDiv;
    for (var i = 0; i < mapDivek.length; i++) {
        for (var e = 0; e < mapDivek.length; e++) {
//            if (tulaj==="jatekos"){
               let ujDiv = mapDivek[i][e];
//            }

            let indexek = [i, e];
            let sor = indexek[0];
            let oszlop = indexek[1];
//            if(tulaj ==="jatekos"){
                ujDiv.addEventListener("wheel", function () {
                    forgat(sor, oszlop);
                });

                ujDiv.onmouseout = function () {
                    ervenyesHajo(sor, oszlop, "szabad");
                };

                ujDiv.onmouseover = function () {
                    ervenyesHajo(sor, oszlop, "hajo");
                };

                ujDiv.addEventListener("click", function () {
                    veglegesit(sor, oszlop);

                });
//            }
        }
    }
}

//function getLovesHelye(sor, oszlop){
//    let helyek = [sor, oszlop];
//    return helyek;
//}

function makePalya(tulaj) {                                                     //Pálya előkészítése játékra
   //koordináták kiírása a pálya köré
    switch (tulaj) {
        case"jatekos":
            makeKorbeKarakter("vizszintes", vizszintesKeret);
            makeKorbeKarakter("fuggoleges", fuggolegesKeret);
            divListabaRakas(mapDivek, tulaj + " szabad", tartalmazo);
            break;
        case "ai":
            makeKorbeKarakter("vizszintes", aiVizszintesKeret);
            makeKorbeKarakter("fuggoleges", aiFuggolegesKeret);
            divListabaRakas(aiDivek, tulaj + " szabad", aiTartalmazo);
            break;
    }
}

function divListabaRakas(melyikhez, nev, tartalmazo){
    for (var i = 0; i < palyaMeret; i++) {
        melyikhez[i] = [];
        for (var e = 0; e < palyaMeret; e++) 
            melyikhez[i][e] = makeDiv(nev, tartalmazo);
    }
}


function makeKorbeKarakter(className, anya, index = 0) {                        
    if (index < palyaMeret) {                                                   //addig hívja meg magát újra, amig elegendő karakter nem lesz
        let divem;
        switch (className) {
            case "vizszintes":
                divem = makeDiv("vizszintes", anya);
                divem.style.border = "none";
//                divem.innerHTML = (index + 10).toString(36);                    //a-tól indítva kiírja a koordinátákat
                divem.innerHTML = String.fromCharCode(index + 65);
                                 
                break;
            case "fuggoleges":
                divem = makeDiv("fuggoleges", anya);
                divem.style.border = "none";
                divem.innerHTML = index + 1;                                     //i-től indítva kiírja a koordinátákat
                break;
        }
        makeKorbeKarakter(className, anya, ++index);
}
}

function makeDiv(classNev, anya) {
    let divem = document.createElement("div");
    divem.className = classNev;
    anya.appendChild(divem);
    return divem;
}

function cssBeallit(melyiket) {
    switch (melyiket) {
        case keret:
            keret.style.margin = "auto";
            keret.style.marginTop = "10vh";
            keret.style.marginLeft = "0px";
            keret.style.gridTemplateColumns = "1fr " + palyaMeret + "fr";
            keret.style.gridTemplateRows = "1fr " + palyaMeret + "fr 5fr 1fr";
            keret.style.transform = "translateX(-50%)";
            keret.style.width = 2 * (1 + palyaMeret) + "vw";
            keret.style.height = 2 * (8 + palyaMeret) + "vw";
            break;
        case tartalmazo:
            tartalmazo.style.gridTemplateRows = "repeat(" + palyaMeret + ", 1fr)";
            tartalmazo.style.gridTemplateColumns = "repeat(" + palyaMeret + ", 1fr)";
            break;
        case vizszintesKeret:
            vizszintesKeret.style.gridTemplateColumns = "repeat(" + palyaMeret + ", 1fr";
            break;
        case fuggolegesKeret:
            fuggolegesKeret.style.gridTemplateRows = "repeat(" + palyaMeret + ", 1fr)";
            break;
        case hajoTartalmazo:
            hajoTartalmazo.style.height = "auto";
            hajoTartalmazo.style.width = "auto";
            hajoTartalmazo.style.gridTemplateRows = "repeat(" + 5 + "," + "1fr)";
            hajoTartalmazo.style.gridTemplateColumns = "repeat(" + 4 + "," + "1fr)";
            hajoTartalmazo.style.justifyContent = "space-around";
            break;
            
        case "ai":
            aiKeret.style.marginTop = "20vh";
            aiKeret.style.gridTemplateColumns = "1fr " + palyaMeret + "fr";
            aiTartalmazo.style.gridTemplateRows = "repeat(" + palyaMeret + ", 1fr)";
            aiTartalmazo.style.gridTemplateColumns = "repeat(" + palyaMeret + ", 1fr)";
            aiFuggolegesKeret.style.gridTemplateRows = "repeat(" + palyaMeret + ", 1fr)";
            aiVizszintesKeret.style.gridTemplateColumns = "repeat(" + palyaMeret + ", 1fr";
            break;

        case "eltuntet":
            
            keret.style.transitionDuration = "0.5s";
            keret.style.opacity = "0%";
            break;
         
         
        case "elokeszit":
            
            aiKeret.style.transitionDuration = "0s";
            keret.style.transitionDuration = "0s";
            keret.style.margin = "20vh auto auto auto";
            
            aiKeret.style.gridTemplateRows ="1fr " +palyaMeret + "fr";
            keret.style.gridTemplateRows ="1fr " +palyaMeret + "fr";
                  gombok.style.height = "0%"; 
            keret.style.height = "40vh";
            aiKeret.style.height = "40vh";
            keret.style.width = "40vh";
            aiKeret.style.width = "40vh";
            resetelo.style.height = "0%";
                    indul.style.height = "0%";
                    indul.style.opacity = "0%";
            resetelo.style.opacity = "0%";

               gombok.style.display = "none";
            hajoTartalmazo.style.display = "none";
            keret.style.left = "auto";
            
            break;

        case "jatekKezdes":
            keret.style.transitionDuration = "2s";
            keret.style.transform = "translateX(0%)";
            aiKeret.style.zIndex = "0";
            keret.style.opacity = "100%";
            aiKeret.style.transitionDuration = "2s";
            keret.style.height = "40vh";
            aiKeret.style.height = "40vh";
            aiKeret.style.opacity = "100%";
            aiKeret.style.margin = "20vh auto auto auto";
            aiKeret.style.transform = "translateX(0%)";
            aiKeret.style.transform = "translateX(-50%)";
            
            break;
        default:
            return null;
            break;
    }

}

function hajoDivTorlo(kellUj = true){
   let hajokhoz=document.getElementsByClassName("hajokhoz");
   let hajoDb = hajokhoz.length;
   let index = 0;
   while(index < hajoDb){
//       hajokhoz[0].style.height = "0px";
        hajokhoz[0].remove();
        index++;  
   }
   if(kellUj){
   makeHajok();
   }
}

// a pálya alatt lévő hajók kirajzolása, amikre kattintva a pályára kirakhatóak lesznek a hajók.
function makeHajok(kulsoIndex = 0, belsoIndex = 0) {
    while (belsoIndex < hajoFajtak[kulsoIndex][2]) {                            //külső index a tömb első, a belsoIndex a tömb második dimenziója 
        let hajoReszNev = hajoFajtak[kulsoIndex][0] + belsoIndex;               
        let hajoReszDiv = makeDiv(hajoFajtak[kulsoIndex][0] + " hajokhoz", hajoTartalmazo);     //a hajokat tartalmazo
        hajoReszDiv.id = hajoReszNev;
        let hajoResz = document.getElementById(hajoReszNev);                                    
        hajoResz.style.gridRow = belsoIndex + 1 + "/" + parseInt(belsoIndex + 2);               //pozicionalas
        hajoResz.addEventListener("click", function () {
            lepakol(belsoIndex);
        });
        belsoIndex++;
    }
    if (kulsoIndex < hajoFajtak.length - 1) {                                   //újrahívj magát ahányszor szükséges
        kulsoIndex++;
        makeHajok(kulsoIndex);
    }
}

function lepakol(hossza){
    hossz = hossza;
    if (lerak)
        lerak = false;
    else
        lerak = true;

    switch (hossz) {
        case 2:
            if (hajoFajtak[0][1] < 1)
                this.lerak = false;
            break;

        case 3:
            if (hajoFajtak[1][1] < 1)
                this.lerak = false;
            break;

        case 4:
            if (hajoFajtak[2][1] < 1)
                this.lerak = false;
            break;

        case 5:
            if (hajoFajtak[3][1] < 1)
                this.lerak = false;
            break;
    }
    return hossz;
}

function veglegesit(sor, oszlop) {
    
    let hajoReszek;
    if (ervenyesLerakas) {
        if (lerak) {
            jatekosHajok[jatekosHajoIndex] = [];
            if (hosszaban) {
                for (var i = 0; i < hossz; i++){
                    classValto(sor + i, oszlop, "hajo foglalt");
                    jatekosHajok[jatekosHajoIndex][i] = [];
                    jatekosHajok[jatekosHajoIndex][i].push(sor + i);
                    jatekosHajok[jatekosHajoIndex][i].push(oszlop);
                }
                keretSzamolo(sor, oszlop);
                keretKirajzolo(jatekosHajoIndex);
            } else {
                for (var i = 0; i < hossz; i++){
                    classValto(sor, oszlop + i, "hajo foglalt");
                    jatekosHajok[jatekosHajoIndex][i] = [];
                    jatekosHajok[jatekosHajoIndex][i].push(sor);
                    jatekosHajok[jatekosHajoIndex][i].push(oszlop + i);
                }
                keretSzamolo(sor, oszlop);
                keretKirajzolo(jatekosHajoIndex);
            }
            switch (hossz) {
                case 2:
                    hajoFajtak[0][1]--;
                    if (hajoFajtak[0][1] < 1) {
                        hajoReszek = document.getElementsByClassName("kettesHajo");
                        nincsTobbIlyen(hajoReszek);
                    }
                    break;
                case 3:
                    hajoFajtak[1][1]--;
                    if (hajoFajtak[1][1] < 1) {
                        hajoReszek = document.getElementsByClassName("harmasHajo");
                        nincsTobbIlyen(hajoReszek);
                    }
                    break;
                case 4:
                    hajoFajtak[2][1]--;
                    if (hajoFajtak[2][1] < 1) {
                        hajoReszek = document.getElementsByClassName("negyesHajo");
                        nincsTobbIlyen(hajoReszek);
                    }
                    break;
                case 5:
                    hajoFajtak[3][1]--;
                    if (hajoFajtak[3][1] < 1) {
                        hajoReszek = document.getElementsByClassName("otosHajo");
                        nincsTobbIlyen(hajoReszek);
                    }
                    break;
            }
            jatekosHajoIndex++;
        }
        this.lerak = false;
        
    }
}

function nincsTobbIlyen(hajoReszek) {
    for (var i = 0; i < hajoReszek.length; i++) {
        hajoReszek[i].style.opacity = 0.3;
        hajoReszek[i].style.cursor = "no-drop";
    }
    if (--hatraLevoHajok === 0) indul.disabled = false;
}

function classValto(sor, oszlop, ujNev) {
    mapDivek[sor][oszlop].className = ujNev;
}

function classNevEllenorzo(sor, oszlop, classNev) {
    let eredmeny;
    if (mapDivek[sor][oszlop].className.includes(classNev))
        eredmeny = true;
    else
        eredmeny = false;

    return eredmeny;
}

function forgat(sor, oszlop) {
    if (forgathat) {
        ervenyesHajo(sor, oszlop, "szabad");
        forgathat = false;

        if (!this.hosszaban)
            this.hosszaban = true;
        else
            this.hosszaban = false;

        ervenyesHajo(sor, oszlop, "hajo");
        setTimeout(function () {
            forgathat = true;
        }, 1000);
    }
}

function ervenyesHajo(sor, oszlop, celClass, index = 0) {
    ervenyesLerakas = true;
    if (lerak) {
        while (ervenyesLerakas && index < hossz) {
            if (hosszaban)
                hajoKipakol(sor + index, oszlop, celClass, index);
            else
                hajoKipakol(sor, oszlop + index, celClass, index);
            index++;
        }
}
}

function hajoKipakol(sor, oszlop, celClass, index) {
    if (sor < mapDivek.length && oszlop < mapDivek.length)
        if (!classNevEllenorzo(sor, oszlop, "foglalt"))
            classValto(sor, oszlop, celClass);
        else
            hibasLerakas(sor, oszlop, index, celClass);
    else
        hibasLerakas(sor, oszlop, index, celClass);
}

function hibasLerakas(sor, oszlop, db, celClass) {
    ervenyesLerakas = false;
    if (celClass !== "szabad")
        celClass = "hibas";
    if (hosszaban)
        for (var i = 1; i <= db; i++)
            classValto(sor - i, oszlop, celClass);
    else
        for (var i = 1; i <= db; i++)
            classValto(sor, oszlop - i, celClass);
}

function ervenyesKeret(sor, oszlop) {
    let eredmeny;
    if (sor >= 0 && sor < mapDivek.length && oszlop >= 0 && oszlop < mapDivek.length)
        eredmeny = true;
    else
        eredmeny = false;
    return eredmeny;
}

function keretSzamolo(kezdoSor, kezdoOszlop, tulajdonos) {
    jatekosKeretek[jatekosHajoIndex]= [];
    jatekosKeretIndex = 0;
    switch (hosszaban) {
        case true:
            for (var i = -1; i <= 1; i++) {
               
                if (ervenyesKeret(kezdoSor - 1, kezdoOszlop + i)){
//                    classValto(sor - 1, oszlop + i, "keret foglalt");
                    
                    jatekosKeretek[jatekosHajoIndex][jatekosKeretIndex] = [];
                    jatekosKeretek[jatekosHajoIndex][jatekosKeretIndex].push(kezdoSor-1 , kezdoOszlop+i);
                    jatekosKeretIndex++;
                }
                if (ervenyesKeret(kezdoSor + hossz, kezdoOszlop + i)){
//                    classValto(sor + hossz, oszlop + i, "keret foglalt");
                    
                    jatekosKeretek[jatekosHajoIndex][jatekosKeretIndex] = [];
                    jatekosKeretek[jatekosHajoIndex][jatekosKeretIndex].push(kezdoSor + hossz , kezdoOszlop + i);
                    jatekosKeretIndex++;    
                    
                }
                for (var x = kezdoSor; x < kezdoSor + hossz; x++){
                    if (ervenyesKeret(x, kezdoOszlop + i) && i !== 0){
                          
                          jatekosKeretek[jatekosHajoIndex][jatekosKeretIndex] = [];
                          jatekosKeretek[jatekosHajoIndex][jatekosKeretIndex].push(x , kezdoOszlop + i);
                          jatekosKeretIndex++;
//                        classValto(x, oszlop + i, "keret foglalt");
                     }
                 }     
                 
            }
            console.log("jatekos keretek:");
            console.log(jatekosKeretek);
            break;

        case false:
            for (var i = -1; i <= 1; i++) {
//                if (sor + i >= 0 && sor + i < mapDivek.length) {
                    if (ervenyesKeret(kezdoSor + i, kezdoOszlop - 1)){
//                        classValto(sor + i, oszlop - 1, "keret foglalt");
                            
                            jatekosKeretek[jatekosHajoIndex][jatekosKeretIndex] = [];
                            jatekosKeretek[jatekosHajoIndex][jatekosKeretIndex].push(kezdoSor + i, kezdoOszlop - 1);
                            jatekosKeretIndex++;
                            
                            
  //                        classValto(x, oszlop + i, "keret foglalt");
                       
                    }
                    if (ervenyesKeret(kezdoSor + i, kezdoOszlop + hossz)){
//                        classValto(sor + i, oszlop + hossz, "keret foglalt");
                        
                        jatekosKeretek[jatekosHajoIndex][jatekosKeretIndex] = [];
                        jatekosKeretek[jatekosHajoIndex][jatekosKeretIndex].push(kezdoSor + i, kezdoOszlop + hossz);
                        jatekosKeretIndex++;
                        
                    }
                    for (var x = kezdoOszlop; x < kezdoOszlop + hossz; x++) {
                        if (i !== 0 && ervenyesKeret(kezdoSor + i, x)){
//                            classValto(sor + i, x, "keret foglalt");
                         
                            jatekosKeretek[jatekosHajoIndex][jatekosKeretIndex] = [];
                            jatekosKeretek[jatekosHajoIndex][jatekosKeretIndex].push(kezdoSor + i, x);
                            jatekosKeretIndex++;
                        }
    
                    }
//                }
            }
            break;
    }
}


//
//function kivalaszto(sor, oszlop) {
//   eredmeny = [];
//    eredmeny[0] = sor;
//    eredmeny[1] = oszlop;
//    return eredmeny;
//    }
//function getPalyaMeret(){
//    return palyaMeret;
//}

function jatekIndul() {
     jatekInditas=true;
     for (let i = 0; i < mapDivek.length; i++)
        for (let x = 0; x < mapDivek.length; x++)
            if (mapDivek[i][x].className.includes("keret"))
                mapDivek[i][x].className = "szabad";
    cssBeallit("ai");
    setTimeout(function() {
         cssBeallit("eltuntet");
    }, 500);
    setTimeout(function () {
          cssBeallit("elokeszit");
       ;0
    }, 1500);
     
    setTimeout(function () {
    cssBeallit("jatekKezdes");
    }, 1550);

} 

// amennyiben egy lövés találatot ért el, meghívja ezt a függévnyt ami kitörli az adott hajó részt, illetve kijelzi, és megvizsgálja van e még másik része az adott hajónak.
function hajoTorlo(kiet, melyikHajo, hanyadikResze) {
    let kilottHajo = true;
    let vanmegHajo = false;
    let dbSzam;
    switch(kiet){
        case "jatekos":
            for (var i = 0; i < 2; i++) {
                 jatekosHajok[melyikHajo][hanyadikResze].splice(0, 1);
            }             
            for (var i = 0; i < jatekosHajok[melyikHajo].length; i++) {
                  if (jatekosHajok[melyikHajo][i].length > 0) 
                        kilottHajo = false;
            }
            if (kilottHajo) {
                
                dbSzam = jatekosHajok[melyikHajo].length;
                for (var i = 0; i < dbSzam; i++)
                    jatekosHajok[melyikHajo].splice(0, 1);
            }
                for (var i = 0; i < jatekosHajok.length; i++)
                    if (jatekosHajok[i].length > 0)
                        vanmegHajo = true;       
   

            break;
            
        case "ai":
            for (var i = 0; i < 2; i++) {
                aiHajok[melyikHajo][hanyadikResze].splice(0, 1);
            }        
            for (var i = 0; i < aiHajok[melyikHajo].length; i++) {
                 if (aiHajok[melyikHajo][i].length > 0) 
                     kilottHajo = false;
            }
            if (kilottHajo) {
                dbSzam = aiHajok[melyikHajo].length;
                for (var i = 0; i < dbSzam; i++)
                    aiHajok[melyikHajo].splice(0, 1);
            }

            for (var i = 0; i < aiHajok.length; i++)
                if (aiHajok[i].length > 0)
                    vanmegHajo = true;
    
            
            break;
            
    }
    
    if (!vanmegHajo) {
        vege = true;
    console.log("VÉÉÉÉÉÉÉÉÉÉÉÉÉÉÉGE!!!!!!!!!!!!");
    }
    return kilottHajo;
}


// kiértékeli a találatot, visszatérési értéke attól függ, van e még része az esetleg eltalált hajónak
//--------------- ÁT KELL ÍRNI WHILE CIKLUSSÁ, MI EZ A PAZARLÁS KÉREM?-----------
function talalatErtekelo(kie, sor, oszlop) {
//    let sullyedt = false;    
    
    eredmeny = [];
    switch(kie){
        case "jatekos":
        mapDivek[sor][oszlop].className += " lottekra";
        for (var i = 0; i < jatekosHajok.length; i++) {
            for (var e = 0; e < jatekosHajok[i].length; e++) {
                if (jatekosHajok[i][e][0] === sor && jatekosHajok[i][e][1] === oszlop) {
                    console.log("Hajotorlo i: " + i + "hajotorlo e: " + e);
                    eredmeny["sullyedt"] = hajoTorlo("jatekos", i, e);                               //igaz ha elsulyedt a hajo
                    eredmeny["talalt"] = true;
                    mapDivek[sor][oszlop].className += " elTalalt";
                    mapDivek[sor][oszlop].style.background = "red";
                    mapDivek[sor][oszlop].innerHTML = "!";
                    eredmeny["melyikHajo"] = i;
                }
        }
        if (!eredmeny["talalt"] && !mapDivek[sor][oszlop].classList.contains("elTalalt"))
            mapDivek[sor][oszlop].innerHTML = "X";
        }
        break;
        case "ai":
            aiDivek[sor][oszlop].className += " lottekra";
            for (var i = 0; i < aiHajok.length; i++) {
                for (var e = 0; e < aiHajok[i].length; e++) {
                    if (aiHajok[i][e][0] === sor && aiHajok[i][e][1] === oszlop) {
                        eredmeny["sullyedt"] = hajoTorlo("ai", i, e);                            //igaz ha elsulyedt a hajo
                        eredmeny["talalt"] = true;
                        eredmeny["melyikHajo"] = i;
                        aiDivek[sor][oszlop].className += " elTalalt";
                        aiDivek[sor][oszlop].style.background = "red";
                        aiDivek[sor][oszlop].innerHTML = "!";
                    }
                }
                if (!eredmeny["talalt"] && !aiDivek[sor][oszlop].classList.contains("elTalalt"))
                     aiDivek[sor][oszlop].innerHTML = "X";
                
        }
        break;
    }
    return eredmeny;
}

function keretKirajzolo(jatekosHajoIndex){
    for (var i = 0; i < jatekosKeretek[jatekosHajoIndex].length; i++) {
        classValto(jatekosKeretek[jatekosHajoIndex][i][0], jatekosKeretek[jatekosHajoIndex][i][1], "keret foglalt");
//console.log(jatekosKeretek[jatekosHajoIndex][i]);
        
    }
}