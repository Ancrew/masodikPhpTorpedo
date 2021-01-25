//let aiHajok = [];
let aiKeretek = [];
let aiKeretIndex = 0;
let aiLovesHelyek = [];
let aiLovesIndexek = 0;
let vanBefejezetlenLoves = false;
let lehetsegesIranyok = [true, true, true, true];
//lehetsegesIranyok["fenn"] = true;
//lehetsegesIranyok["jobb"]= true;
//lehetsegesIranyok["lenn"] = true;
//lehetsegesIranyok["bal"] = true;
let szukitettLehetosegek = false;
let kovetkezoHely = 5;
let kovetkezoSor = Math.floor(Math.random() * palyaMeret);
let kovetkezoOszlop = Math.floor(Math.random() * palyaMeret);
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
//    console.log("-------------");
//    console.log("index: " + index);
//    console.log("hossz: " + hossza);
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
            aiDivek[ujSor][ujOszlop].style.background = "gray";
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
                if (!aiDivek[sor][oszlop].classList.contains("lottekra")) {
                    talalatErtekelo("ai", sor, oszlop);
                    visszaLoves(kovetkezoSor, kovetkezoOszlop, kovetkezoHely);
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
function visszaLoves(kovetkezoHely = 5) {
console.log("index alapján iws megy: " + lehetsegesIranyok[0]);
//    lehetsegekIranyok["fuggoleges"] = true;
//    lehetsegekIranyok["vizszintes"] = true;
//    
//alaphelyzetbe állítja ha épp nincs keresendő elem
    if (!vanBefejezetlenLoves) {
        lehetsegesIranyok = [true, true, true, true];
        szukitettLehetosegek = false;
    }


    let ervenyesLoves = true;
    aiLovesHelyek[aiLovesIndexek] = [];
//    sor = Math.floor(Math.random() * palyaMeret);
//    oszlop = Math.floor(Math.random() * palyaMeret);
//    if (aiLovesHelyek.length > 1)
        for (var i = 0; i < aiLovesHelyek.length - 1; i++)
            if (aiLovesHelyek[i][0] === kovetkezoSor && aiLovesHelyek[i][1] === kovetkezoOszlop)
                ervenyesLoves = false;

    if (ervenyesLoves) {
        aiLovesHelyek[aiLovesIndexek].push(kovetkezoSor);
        aiLovesHelyek[aiLovesIndexek].push(kovetkezoOszlop);
        let talalatEredmeny = talalatErtekelo("jatekos", kovetkezoSor, kovetkezoOszlop);
        if (talalatEredmeny["talalt"] && !talalatEredmeny["sullyedt"]) {
            vanBefejezetlenLoves = true;
            if(kovetkezoHely > 4){
                kovetkezoHely = Math.floor(Math.random() * lehetsegesIranyok.length);
            }
            kovetkezoCelpont(kovetkezoSor, kovetkezoOszlop, kovetkezoHely);
        }
        else if(vanBefejezetlenLoves && !talalatEredmeny["talalt"]){
            kovetkezoCelpont(kovetkezoSor, kovetkezoOszlop, --kovetkezoHely);
        }
        if (talalatEredmeny["sullyedt"]) {
            console.log("sullyedt");
            vanBefejezetlenLoves = false;
        }

        aiLovesIndexek++;
    } else{
        ujRandomCelpont();
        visszaLoves();
        }
//
//    if(mapDivek[sor][oszlop].classList.contains("hajo")){
//        mapDivek[sor][oszlop].innerHTML = "!";
//    }    
//    else{
//        mapDivek[sor][oszlop].innerHTML = "x";
//    }
}

function kovetkezoCelpont(sor, oszlop, ertek){
    if(ertek < 0){
        ertek = 4;
        kovetkezoHely = 4;
    }
    if (!szukitettLehetosegek){
                if (oszlop === 0) {
                    lehetsegesIranyok[0]=false;
                }
                if (sor === aiDivek.length) {
                    lehetsegesIranyok[1] = false;
                }
                if (oszlop === aiDivek.length) {
                    lehetsegesIranyok[2] = false;
                }

                if (sor === 0) {
                    lehetsegesIranyok[3] = false;
                }

                szukitettLehetosegek = true;
            }
            console.log("ertek: " + ertek);
            switch (ertek) {
                case 0:
                    if(lehetsegesIranyok[0]){
                        kovetkezoSor -= 1; 
                    }
                    else{
                        kovetkezoHely = 5;
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
                        kovetkezoHely = 5;
                    
                    
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
                        kovetkezoHely = 5;
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
                        kovetkezoHely = 5;
                    
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