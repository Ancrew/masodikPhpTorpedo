//let aiHajok = [];
let aiKeretek = [];
let aiKeretIndex = 0;
let aiLovesHelyek = [];
let aiLovesIndexek = 0;
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

function hajoKalkulalas(hossza = 5, index = 0) {
    console.log("-------------");
    console.log("index: " + index);
    console.log("hossz: " + hossza);
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



function ujHajoDarab(sor, oszlop, hossza, fuggoleges, index){
    aiHajok[index] = [];
    let bentiIndex = 0;
    let ujSor = sor;
    let ujOszlop = oszlop;
    let ervenyes = true;
    
    while (bentiIndex < hossza && ervenyes) {
        if (fuggoleges) ujSor = sor + bentiIndex;
        else ujOszlop =oszlop + bentiIndex;
        if (ervenyesHajoHely(ujSor, ujOszlop)) {
            aiHajok[index][bentiIndex] = [];
            aiHajok[index][bentiIndex].push(ujSor);
            aiHajok[index][bentiIndex].push(ujOszlop);
            aiDivek[ujSor][ujOszlop].style.background = "gray";
            bentiIndex++;
        } else ervenyes = false;
        
    }
    if (bentiIndex === hossza) {
        aiErvenytelenHelyek(sor, oszlop, hossza, fuggoleges);
        console.log("sikeres");
        return true;
    }else {
        while (bentiIndex > 0) {
            bentiIndex--; //ha az előző sikeres volt a benti index automatikusan lépett, ezért a törlésnél az index csökkentésével kezdünk
            console.log("sikertelen " + bentiIndex);
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
                console.log("sikertelen pozicio");
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
        for (var e = 0; e < aiDivek[i].length; e++){
            let ujDiv = aiDivek[i][e];
            let indexek = [i, e];
            let sor = indexek[0];
            let oszlop = indexek[1];
            ujDiv.addEventListener("click", function () {
                talalatErtekelo("ai", sor, oszlop);
                visszaLoves();
            });
        }
    }

}

//function talalatErtekelo(kie, sor, oszlop) {
//    eredmeny = false;
//    switch(kie){
//        case "jatekos":
//        for (var i = 0; i < jatekosHajok.length; i++) {
//            for (var e = 0; e < jatekosHajok[i].length; e++) {
//                if (jatekosHajok[i][e][0] === sor && jatekosHajok[i][e][1] === oszlop) {
//                    hajoTorlo("jatekos", i, e);
//                    eredmeny = true;
//                    mapDivek[sor][oszlop].className += " elTalalt";
//                    mapDivek[sor][oszlop].style.background = "red";
//                    mapDivek[sor][oszlop].innerHTML = "!";
//                }
//        }
//        if (!eredmeny && !mapDivek[sor][oszlop].classList.contains("elTalalt"))
//            mapDivek[sor][oszlop].innerHTML = "X";
//        }
//        break;
//        case "ai":for (var i = 0; i < aiHajok.length; i++) {
//            for (var e = 0; e < aiHajok[i].length; e++) {
//                if (aiHajok[i][e][0] === sor && aiHajok[i][e][1] === oszlop) {
//                    hajoTorlo("ai", i, e);
//                    eredmeny = true;
//                    aiDivek[sor][oszlop].className += " elTalalt";
//                    aiDivek[sor][oszlop].style.background = "red";
//                    aiDivek[sor][oszlop].innerHTML = "!";
//                }
//            }
//            if (!eredmeny && !aiDivek[sor][oszlop].classList.contains("elTalalt"))
//                 aiDivek[sor][oszlop].innerHTML = "X";
//            break;
//        }
//    }
//    
//}
    
    

//function hajoTorlo(melyikHajo, hanyadikResze) {
//    for (var i = 0; i < 2; i++) {
//        aiHajok[melyikHajo][hanyadikResze].splice(0, 1);
//    }
//    let kilotthajo = true;
//    for (var i = 0; i < aiHajok[melyikHajo].length; i++) {
//        if (aiHajok[melyikHajo][i].length > 0) {
//            kilotthajo = false;
//        }
//    }
//    console.log("kilott hajo? " + kilotthajo);
//    if (kilotthajo) {
//        dbSzam = aiHajok[melyikHajo].length;
//        for (var i = 0; i < dbSzam; i++)
//            aiHajok[melyikHajo].splice(0, 1);
//    }
//    let vanmegHajo = false;
//    for (var i = 0; i < aiHajok.length; i++)
//        if (aiHajok[i].length > 0)
//            vanmegHajo = true;
//    if (!vanmegHajo) {
//        console.log("VÉÉÉÉÉÉÉÉÉÉÉÉÉÉÉGE!!!!!!!!!!!!");
//    }
//}

//azt se tudom mit írjak már ide.
function aiErvenytelenHelyek(sor, oszlop, hossza, fuggoleges){
    switch (fuggoleges){
        case true:
            for (var i = -1; i <= 1; i++) {
                aiKeretek[aiKeretIndex]=[];
                if (ervenyesKeret(sor - 1, oszlop + i)){
                     aiKeretek[aiKeretIndex].push(sor - 1);
                     aiKeretek[aiKeretIndex].push(oszlop + i);
                     aiKeretIndex++;
                      aiKeretek[aiKeretIndex]=[];
                }
                if (ervenyesKeret(sor + hossza, oszlop + i)){
                     aiKeretek[aiKeretIndex].push(sor + hossza);
                     aiKeretek[aiKeretIndex].push(oszlop + i);
                     aiKeretIndex++;
                      aiKeretek[aiKeretIndex]=[];
                }
                for (var x = sor; x < sor + hossza; x++){
                    if (ervenyesKeret(x, oszlop + i)){
                        aiKeretek[aiKeretIndex].push(x);
                        aiKeretek[aiKeretIndex].push(oszlop + i);
                        aiKeretIndex++;
                        aiKeretek[aiKeretIndex]=[];
                }
            }
            }
            break;
        case false:
            for (var i = -1; i <= 1; i++){
                aiKeretek[aiKeretIndex]=[];
//                if (sor + i >= 0 && sor + i < mapDivek.length) {
                    if (ervenyesKeret(sor + i, oszlop - 1)){
                        aiKeretek[aiKeretIndex].push(sor + i);
                        aiKeretek[aiKeretIndex].push(oszlop - 1);
                        aiKeretIndex++;
                         aiKeretek[aiKeretIndex]=[];
                    }
                    if (ervenyesKeret(sor + i, oszlop + hossza)){
                        aiKeretek[aiKeretIndex].push(sor + i);
                        aiKeretek[aiKeretIndex].push(oszlop + hossza);
                        aiKeretIndex++;
                         aiKeretek[aiKeretIndex]=[];
                    }
                    for (var x = oszlop; x < oszlop + hossza; x++) {
                        if (ervenyesKeret(sor + i, x)){
                            aiKeretek[aiKeretIndex].push(sor + i);
                            aiKeretek[aiKeretIndex].push(x);
                            aiKeretIndex++;
                             aiKeretek[aiKeretIndex]=[];
                         }
                        }
                    }
//                }
            
            break;
    }
}

function keretTesztelo(){
    for (var i = 0; i < aiKeretek.length-1; i++) {
            aiDivek[aiKeretek[i][0]][aiKeretek[i][1]].style.background = "yellow";
        }
    
}

function visszaLoves(){
    let ervenyesLoves = true;
    aiLovesHelyek[aiLovesIndexek] = [];
    sor = Math.floor(Math.random() * palyaMeret);
    oszlop = Math.floor(Math.random() * palyaMeret);
    if(aiLovesHelyek.length > 1){
        for (var i = 0; i < aiLovesHelyek.length-1; i++) {
            if(aiLovesHelyek[i][0] === sor && aiLovesHelyek[i][1] === oszlop){
               ervenyesLoves = false;
            }
        }
    }
    if (ervenyesLoves) {
        aiLovesHelyek[aiLovesIndexek].push(sor);
        aiLovesHelyek[aiLovesIndexek].push(oszlop);
        talalatErtekelo("jatekos", sor, oszlop);
        aiLovesIndexek++;
    }
    else{
        visszaLoves();
    }

    if(mapDivek[sor][oszlop].classList.contains("hajo")){
        mapDivek[sor][oszlop].innerHTML = "!";
    }    
    else{
        mapDivek[sor][oszlop].innerHTML = "x";
    }
}