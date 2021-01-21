let aiHajok = [];
init();


function init() {
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
    let fuggoleges = false;
    let rSzam = Math.round(Math.random());
    if (rSzam % 2 === 0)
        fuggoleges = true;
//        fuggoleges = true;
    let sor;
    let oszlop;
    if (fuggoleges) {
        sor = Math.floor(Math.random() * (palyaMeret - (hossza-1)));
        oszlop = Math.floor(Math.random() * palyaMeret);     
    }else {
        sor = Math.floor(Math.random() * palyaMeret);
        oszlop = Math.floor(Math.random() * (palyaMeret - (hossza-1)));
    }
    
        ujHajoDarab(sor, oszlop, hossza, fuggoleges, index);
        index++;
       //hármas hajó duplázása
        if(index === 3)
           hossza++;
       //kettes hajó duplázása
        else if(index === 5)
            hossza++;
         //egyes hajót már ne gyártsunk
    if(hossza > 2){
        
    hajoKalkulalas(--hossza, index);
    }

}



function ujHajoDarab(sor, oszlop, hossza, fuggoleges, index) {
    aiHajok[index] = [];
    if (fuggoleges){
        for (var i = 0; i < hossza; i++) {
        let bentiIndex = 0;
//        let ervenyes = true;
//        while(bentiIndex < hossza && ervenyes){
            if(ervenyesHajoHely(sor + i ,oszlop)){
                aiHajok[index][i] = [];
                aiHajok[index][i].push(sor + i);
                aiHajok[index][i].push(oszlop);
                aiDivek[sor+i][oszlop].style.background = "red";
            }
            else{
//               ervenyes = false;
hajoKalkulalas(hossza, index);
            }
//                hajoKalkulalas(hossza, index);
        }
        
    }
     else{
        for (var i = 0; i < hossza; i++) {
            if(ervenyesHajoHely(sor ,oszlop + i)){
                aiHajok[index][i] = [];
                aiHajok[index][i].push(sor);
                aiHajok[index][i].push(oszlop + i);
                aiDivek[sor][oszlop+i].style.background = "red";
            }
             else
                hajoKalkulalas(hossza, index);
        }
    }
}

function ervenyesHajoHely(sor, oszlop){
    let eredmeny = true;
    let kulsoIndex=0;
    let belsoIndex = 0;
    while(eredmeny && kulsoIndex < aiHajok.length){
        while(eredmeny && belsoIndex < aiHajok[kulsoIndex.length]){
            if(aiHajok[kulsoIndex][belsoIndex][0] === sor && aiHajok[kulsoIndex][belsoIndex][1] === oszlop){
                 eredmeny = false;
            }
            belsoIndex++;
        }
        kulsoIndex++;
    }
    
    return eredmeny;
}

function aiPalyaErzekeles(){
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
            ujDiv.addEventListener("click", function(){
                talalatErtekelo(sor, oszlop);
            });
    }
}

function talalatErtekelo(sor, oszlop){
    eredmeny = false;
    for (var i = 0; i < aiHajok.length; i++) {
        for (var e = 0; e < aiHajok[i].length; e++) {
           if(aiHajok[i][e][0] === sor && aiHajok[i][e][1] === oszlop){
               torloTeszt(i,e);
               eredmeny = true;
               aiDivek[sor][oszlop].className += " elTalalt";
               aiDivek[sor][oszlop].style.background = "red";
        aiDivek[sor][oszlop].innerHTML = "!";
           }
       }
    }
    if(!eredmeny && !aiDivek[sor][oszlop].classList.contains("elTalalt"))
        aiDivek[sor][oszlop].innerHTML = "X";
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
        for (var i = 0; i < dbSzam; i++) 
            aiHajok[melyikHajo].splice(0,1);
  
    }
    let vanmegHajo = false;
    for (var i = 0; i < aiHajok.length; i++) 
        if(aiHajok[i].length > 0)
            vanmegHajo = true;
    

    if (!vanmegHajo) {
        console.log("VÉÉÉÉÉÉÉÉÉÉÉÉÉÉÉGE!!!!!!!!!!!!");
    }
}
