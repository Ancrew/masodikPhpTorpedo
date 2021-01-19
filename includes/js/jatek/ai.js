let aiHajok = [];
let hatralevoHajok = 6;
//let hajoFajtak=[2,2,3,3,4,5,];
let aiPalya = document.getElementsByClassName("ai");
//console.log("ai: " + aiPalya.length);

init();
function init() {
//    for (var i = 0; i < 100; i++) {
    hajoKalkulalas();
    ai();
//    }
//    console.log(palyaMeret);
}
function hajoKalkulalas(hossza = hossz, index = 0) {
    let fuggoleges = false;
//    let rSzam = Math.round(Math.random());
//    if (rSzam === 0) 
    fuggoleges = true;
    let sor;
    let oszlop;


    if (fuggoleges) {
        sor = Math.floor(Math.random() * (palyaMeret - (hossz - 1)));
        oszlop = Math.floor(Math.random() * (palyaMeret - (hossz - 1)));
        
//        for (var i = 0; i < hossz; i++) {
            //ujHajoDarab(sor, oszlop, index);
//        }
    }else {

        sor = Math.floor(Math.random() * (palyaMeret - (hossz - 1)));
        oszlop = Math.floor(Math.random() * (palyaMeret));

//        console.log("ertekek: sor: " + sor + " oszlop: " + oszlop);
//        for (var i = 0; i < hossz; i++) {
            //ujHajoDarab(sor, oszlop, index);
//        }
      
}
    ujHajoDarab(sor,oszlop, fuggoleges, index);
     index++;
if(hossz > 1)
 hajoKalkulalas(--hossz);
//console.log(palyaMeret);
}
function ujHajoDarab(sor, oszlop, fuggoleges, index) {
    aiHajok[index] = [];
    if (fuggoleges){
        for (var i = 0; i < hossz; i++) {
//            aiHajok[index][i] = [];
            aiHajok[index].push(sor);
            aiHajok[index].push(oszlop);
            console.log(aiHajok[index][i]);
            console.log(aiHajok[index]);
            console.log(aiHajok[index][i]);
        }
//        aiDivek[0][0][0].push(sor);
        console.log(aiHajok[0][0]);
    
    }
//    if (!aiHajok.includes(sor, oszlop)) {
//       
//        aiHajok[index][belsoIndex].push(sor);
//        aiHajok[index][belsoIndex].push(oszlop);
//        aiDivek[sor][oszlop].style.background = "red";
//        console.log(aiHajok);
//    }
     console.log(aiHajok);
}

function ai() {
    if (jatekInditas) {
        let aiPalya = document.getElementsByClassName("ai");

            hajoKalkulalas();
        

    }
}
//function palyaMeret(palyaMeret){
//    this.palyaMeret = palyaMeret;
//}