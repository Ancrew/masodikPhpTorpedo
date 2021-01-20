let aiHajok = [];
let hatralevoHajok = 6;
//let hajoFajtak=[2,2,3,3,4,5,];
let aiPalya = document.getElementsByClassName("ai");
//console.log("ai: " + aiPalya.length);

init();
function init() {
//    for (var i = 0; i < 100; i++) {
//    hajoKalkulalas();
//    ai();
//    
//    }
//    console.log(palyaMeret);
}
function hajoKalkulalas(hossza = 5, index = 0) {
    let fuggoleges = false;
    let rSzam = Math.round(Math.random());
//    if (rSzam === 0) 
    fuggoleges = true;
    let sor;
    let oszlop;
//    for (var i = 0; i < hossza; i++) {
        
    
    if (fuggoleges) {
        
            
        
        sor = Math.floor(Math.random() * (palyaMeret - hossza));
        oszlop = Math.floor(Math.random() * palyaMeret);
        
//        console.log("ertekek: sor: " + sor + " oszlop: " + oszlop);
    
//        for (var i = 0; i < hossz; i++) {
            //ujHajoDarab(sor, oszlop, index);
        
    }else {

        sor = Math.floor(Math.random() * palyaMeret);
        oszlop = Math.floor(Math.random() * (palyaMeret - hossza));

//        console.log("ertekek: sor: " + sor + " oszlop: " + oszlop);
//        for (var i = 0; i < hossz; i++) {
            //ujHajoDarab(sor, oszlop, index);
//        }
      
    }
        ujHajoDarab(sor, oszlop, hossza, fuggoleges, index);
         index++;
    // }
    if(hossza > 1)
         hajoKalkulalas(--hossza, index);
     else{
         torloTeszt(0,0);
         torloTeszt(0,1);
         torloTeszt(0,2);
         torloTeszt(0,3);
         torloTeszt(0,4);
         torloTeszt(1,0);
         torloTeszt(1,1);
         torloTeszt(1,2);
         torloTeszt(1,3);
         torloTeszt(2,0);
         torloTeszt(2,1);
         torloTeszt(2,2);
         torloTeszt(3,0);
         torloTeszt(3,1);
         torloTeszt(4,0);
     }
//console.log(palyaMeret);
}
function torloTeszt(melyikHajo, hanyadikResze){
    for (var i = 0; i < 2; i++) {
        aiHajok[melyikHajo][hanyadikResze].splice(0,1);
    }
    let kilotthajo = true;
    for (var i = 0; i < aiHajok[melyikHajo].length; i++) {
        if (aiHajok[melyikHajo][i].length > 0) {
           kilotthajo = false;
        }
    }
    console.log(kilotthajo);
    if(kilotthajo){
        dbSzam=aiHajok[melyikHajo].length;
        for (var i = 0; i < dbSzam; i++) {
                    aiHajok[melyikHajo].splice(0,1);
        }

    }
    let vanmegHajo = false;
    for (var i = 0; i < aiHajok.length; i++) {
        if(aiHajok[i].length > 0)
            vanmegHajo = true;
    }
    
    
    if (!vanmegHajo) {
        alert("Vége a játéknak");
    }
//    for (var i = 0; i < 1; i++) {                                               //5db a hajo, 0-s index az 5 db-ol álló hajóra mutat
//           let torlendoSzam = aiHajok[i].length; 
//        for (var e = 0; e < torlendoSzam; e++) {                           //5db az 5ös hajó 5 koordinátája 0-as index az 5ös hajó első hajódarabjánakj a koordinátáira mutat
//           
////            for (var x = 0; x < torlendoSzam; x++) {                            //5ös hajó első koordijátáji, a 0-as index a sor az 1es az oszlop
//                console.log("törlés előtt az 5ös hajó  megmaradt hossza: " + aiHajok[0].length);         //hány darabból áll még a hajó
//                aiHajok[0][e].splice(0,1);                                //    első nullás -> 5ös hajóból törlök műsodik nullás -> az első darabját törlöm 
////            }
//          
//            
////            for (var z = 0; z < aiHajok[i][e].length; z++) {
////                aiHajok.splice(aiHajok[0][0][z],1);
////            }
//        }
//    }
    
    console.log("végleges törlés után:");
    console.log(aiHajok);
}

function ujHajoDarab(sor, oszlop, hossza, fuggoleges, index) {
    aiHajok[index] = [];
    
//        console.log("ertekek: sor: " + sor + " oszlop: " + oszlop);
//    console.log("tájolás: " + fuggoleges);
//     console.log("aiHajok belenyulás előtt");
//     console.log(aiHajok);
    if (fuggoleges){
        for (var i = 0; i < hossza; i++) {
            aiHajok[index][i] = [];
            aiHajok[index][i].push(sor + i);
            aiHajok[index][i].push(oszlop);
//            console.log("aiHajok index i: " + aiHajok[index][i]);
//            console.log("aiHajok index: " + aiHajok[index]);
//            console.log("hajok " + aiHajok);
//        console.log("sor: " + parseInt(sor+i) + "oszlop: " + oszlop);
        aiDivek[sor+i][oszlop].style.background = "red";
//            console.log(aiHajok);
        }
//        aiDivek[0][0][0].push(sor);
//        console.log(aiHajok[0][0]);
    
    }
     else{
        for (var i = 0; i < hossza; i++) {
            aiHajok[index][i] = [];
            aiHajok[index][i].push(sor);
            aiHajok[index][i].push(oszlop + i);
//            console.log("aiHajok index i: " + aiHajok[index][i]);
//            console.log("aiHajok index: " + aiHajok[index]);
//            console.log("hajok " + aiHajok);
//        console.log("sor: " + parseInt(sor+i) + "oszlop: " + oszlop);
        aiDivek[sor][oszlop + i].style.background = "red";
//            console.log(aiHajok);
        }
//        aiDivek[0][0][0].push(sor);
//        console.log(aiHajok[0][0]);
    
    }
//    if (!aiHajok.includes(sor, oszlop)) {
//       
//        aiHajok[index][belsoIndex].push(sor);
//        aiHajok[index][belsoIndex].push(oszlop);
//        aiDivek[sor][oszlop].style.background = "red";
//        console.log(aiHajok);
//    }
     console.log("index: " + index);
     console.log("aiHajok hossz: " + aiHajok.length);
     console.log("aiHajok[0] hossz: " + aiHajok[0].length);
     console.log("aiHajok[0][0] hossz: " + aiHajok[0][1].length);
     console.log(aiHajok);
}
function aiPalyaErzekeles(){
    let ujDiv = document.getElementsByClassName("ai");
//    let ujDiv = document.getElementsByClassName("ai");
    console.log(ujDiv.length);
    console.log(ujDiv);
    console.log(mapDivek[0][0]);
    console.log(ujDiv[22]);
    for (var i = 0; i < aiDivek.length; i++) {
        for (var e = 0; e < aiDivek[i].length; e++) {
            ujDiv[i][e].addEventListener("click", function () {
                    lovesKoordinatak(i, e);
                });
        }
    }
}

    function lovesKoordinatak(sor, oszlop){
//    celpont[0]=sor;
//    celpont[1]= oszlop;
    console.log(sor);
    console.log(oszlop);
}


function ai() {
    if (jatekInditas) {
        let aiPalya = document.getElementsByClassName("ai");

            hajoKalkulalas();
        aiPalyaErzekeles();

    
//    felkeszules("jatekos");
    }
}
//function palyaMeret(palyaMeret){
//    this.palyaMeret = palyaMeret;
//}