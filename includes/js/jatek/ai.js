let aiHajok = [];
init();


function init() {
    let tesztSet = new Set();
    tesztSet.add(2,3);
    tesztSet.add(2,5);
    tesztSet.add(2,6);
    tesztSet.add(2,6);
    tesztSet.add(4,6);
    tesztSet.add(6);
    tesztSet.add(7);
    tesztSet.add(8);
    tesztSet.add(9);
    tesztSet.add(2);
    tesztSet.add(4);
    tesztSet.add(6);
    tesztSet.add(10);
    console.log(tesztSet);
}

function ai() {
    if (jatekInditas) {
        hajoKalkulalas();
        aiPalyaErzekeles();
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
//        fuggoleges = true;
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
    }


//        index++;
    //hármas hajó duplázása
    if (index === 3)
        hossza++;
    //kettes hajó duplázása
    else if (index === 5)
        hossza++;
//        console.log("kövi index = " + index);
//       console.log("kövi hossz = " + hossza);
    //egyes hajót már ne gyártsunk
    if (index < 6) {

        hajoKalkulalas(hossza, index);
}

}



function ujHajoDarab(sor, oszlop, hossza, fuggoleges, index) {
    aiHajok[index] = [];
    let bentiIndex = 0;
        let ervenyes = true;
    if (fuggoleges) {
//        for (var i = 0; i < hossza; i++) {
        
        while (bentiIndex < hossza && ervenyes) {
            if (ervenyesHajoHely(sor + bentiIndex, oszlop)) {
                aiHajok[index][bentiIndex] = [];
                aiHajok[index][bentiIndex].push(sor + bentiIndex);
                aiHajok[index][bentiIndex].push(oszlop);
                aiDivek[sor + bentiIndex][oszlop].style.background = "red";
                bentiIndex++;
            } else {
                ervenyes = false;
            }

        }

    } else {
        while (bentiIndex < hossza && ervenyes) {
//            for (var i = 0; i < hossza; i++) {
            if (ervenyesHajoHely(sor, oszlop + bentiIndex)) {
                aiHajok[index][bentiIndex] = [];
                aiHajok[index][bentiIndex].push(sor);
                aiHajok[index][bentiIndex].push(oszlop + bentiIndex);
                aiDivek[sor][oszlop + bentiIndex].style.background = "red";
                bentiIndex++;
            } else
                ervenyes = false;

        }
    }

    if (bentiIndex === hossza) {
        console.log("sikeres");
        
        return true;
    } else {
        while (bentiIndex > 0) {
            bentiIndex--;                                                  //ha az előző sikeres volt a benti index automatikusan lépett, ezért a törlésnél az index csökkentésével kezdünk
            console.log("sikertelen " + bentiIndex);
            hajoTorlo(index, bentiIndex);
            if (hosszaban)
                aiDivek[sor + bentiIndex][oszlop].style.background = "green";
            else
                aiDivek[sor][oszlop + bentiIndex].style.background = "green";
        }
//               hajoKalkulalas(hossza, index);
        return false;
    }
}

function ervenyesHajoHely(sor, oszlop) {
//    console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
//    console.log("aiHajok hossz: " + aiHajok.length);
    let eredmeny = true;
    let kulsoIndex = 0;
    let belsoIndex = 0;
    while (eredmeny && kulsoIndex < aiHajok.length) {
        belsoIndex = 0;
        while (eredmeny && belsoIndex < aiHajok[kulsoIndex].length) {
//            console.log("keresek belsoindex: " + belsoIndex);
//            console.log("kulsoindex: " + kulsoIndex);
            if (aiHajok[kulsoIndex][belsoIndex][0] === sor && aiHajok[kulsoIndex][belsoIndex][1] === oszlop) {
                eredmeny = false;
                console.log("sikertelen pozicio");
            }
            belsoIndex++;
        }
//        console.log("itt kéne kulso indexetz növelni!");
        kulsoIndex++;
//        console.log("külsö index növelés után: " + kulsoIndex);
    }
//    if (eredmeny === true) console.log("Sikeres keresés");
//    console.log("eredmeny: " + eredmeny);
    return eredmeny;
}

function aiPalyaErzekeles() {
    let indexem = 0;
    indexem++;
}
let indexek = [];
for (var i = 0; i < aiDivek.length; i++) {
    for (var e = 0; e < aiDivek[i].length; e++) {
        let ujDiv = aiDivek[i][e];
        let indexek = [i, e];
        let sor = indexek[0];
        let oszlop = indexek[1];
        ujDiv.addEventListener("click", function () {
            talalatErtekelo(sor, oszlop);
        });
    }
}

function talalatErtekelo(sor, oszlop) {
    eredmeny = false;
    for (var i = 0; i < aiHajok.length; i++) {
        for (var e = 0; e < aiHajok[i].length; e++) {
            if (aiHajok[i][e][0] === sor && aiHajok[i][e][1] === oszlop) {
                hajoTorlo(i, e);
                eredmeny = true;
                aiDivek[sor][oszlop].className += " elTalalt";
                aiDivek[sor][oszlop].style.background = "red";
                aiDivek[sor][oszlop].innerHTML = "!";
            }
        }
    }
    if (!eredmeny && !aiDivek[sor][oszlop].classList.contains("elTalalt"))
        aiDivek[sor][oszlop].innerHTML = "X";
}

function hajoTorlo(melyikHajo, hanyadikResze) {
    for (var i = 0; i < 2; i++) {
        aiHajok[melyikHajo][hanyadikResze].splice(0, 1);
    }
    let kilotthajo = true;
    for (var i = 0; i < aiHajok[melyikHajo].length; i++) {
        if (aiHajok[melyikHajo][i].length > 0) {
            kilotthajo = false;
        }
    }
    console.log(kilotthajo);
    if (kilotthajo) {
        dbSzam = aiHajok[melyikHajo].length;
        for (var i = 0; i < dbSzam; i++)
            aiHajok[melyikHajo].splice(0, 1);

    }
    let vanmegHajo = false;
    for (var i = 0; i < aiHajok.length; i++)
        if (aiHajok[i].length > 0)
            vanmegHajo = true;


    if (!vanmegHajo) {
        console.log("VÉÉÉÉÉÉÉÉÉÉÉÉÉÉÉGE!!!!!!!!!!!!");
    }
}
