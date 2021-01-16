
var kockaMeret = 20;
var palyaMeret = 13;
var keretMeret = 1;
var gridGap = 1;
var keretBetuMeret = 2;                                                                 //lehet felesleges
var mapDivek = [];
var lerak = false;
var hossz = 0;
var ervenyesLerakas;
var lerakottak = [];
var sikeresLerakas = false;
var hosszaban = true;
var mindLerakva = false;
var maradt = 0;
var indexPoziciohoz = 0;
var forgathat = true;
var forgatas = false;
let jatekosHajoi;
var hajoFajtak = [["kettesHajo", 2, 2], ["harmasHajo", 2, 3], ["negyesHajo", 1, 4], ["otosHajo", 1, 5]];  //hajó neve -> hajó darabSzáma, hajó hossza
let keret = document.getElementById("palyaKeret");
let tartalmazo = document.getElementById("palyaTartalmazo");
let vizszintesKeret = document.getElementById("vizszintesKeret");
let fuggolegesKeret = document.getElementById("fuggolegesKeret");
let hajoTartalmazo = document.getElementById("hajoTartalmazo");
let hatraLevoHajok = 4;

init();

function init(){
        makePalya("jatekos");
        makeHajok();
}

function makePalya(tulaj){
     cssBeallit(keret);
     cssBeallit(tartalmazo);
     cssBeallit(vizszintesKeret);
     cssBeallit(fuggolegesKeret);
     cssBeallit(hajoTartalmazo);
     makeKorbeKarakter("vizszintes", vizszintesKeret);
     makeKorbeKarakter("fuggoleges", fuggolegesKeret);

    for (var i = 0; i < palyaMeret; i++) {
        mapDivek[i] = [];

        for (var x = 0; x < palyaMeret; x++) {
            let nev =tulaj + "p" + i + "." + x;
            mapDivek[i][x] = makeDiv(tulaj + " szabad", tartalmazo);
            let ujDiv = mapDivek[i][x];
            ujDiv.id=nev;
            let indexek = kivalaszto(nev);
            ujDiv.addEventListener("wheel", function () {
                forgat(indexek[0], indexek[1]);
            });

            ujDiv.onmouseout = function () {
                ervenyesHajo(indexek[0],indexek[1], "szabad");
            };

            ujDiv.onmouseover = function () {
                  //  szinezo(nev, "green");
                   ervenyesHajo(indexek[0],indexek[1], "hajo");
            };

            ujDiv.addEventListener("click", function () {
                    veglegesit(indexek[0],indexek[1]);
            });
        }

}
}



function makeKorbeKarakter(className,  anya, index = 0){
        if(index < palyaMeret){
            let divem;
            switch(className){
                case "vizszintes":
                    divem = makeDiv("vizszintes", vizszintesKeret);
                    divem.style.border="none";
                    divem.style.width = kockaMeret + (2 * keretMeret) + "px";
                    divem.style.height = kockaMeret + (2 * keretMeret) + "px";
                    divem.innerHTML=index+1;
                    break;
                case "fuggoleges":
                    divem = makeDiv("fuggoleges", fuggolegesKeret);
                    divem.style.width = kockaMeret + (2 * keretMeret) + "px";
                    divem.style.height = kockaMeret + (2 * keretMeret) + "px";
                    divem.style.border="none";
                    divem.innerHTML=(index+10).toString(36);
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

function cssBeallit(melyiket){
    switch(melyiket){
        case keret:
            keret.style.margin = "auto";
            keret.style.marginTop = "20vh";
            keret.style.gridTemplateColumns = "1fr " + palyaMeret + "fr";
            keret.style.gridTemplateRows = "1fr " + (palyaMeret) + "fr 1fr";
//            keret.style.width= (palyaMeret * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret) *  gridGap) + kockaMeret + gridGap + "px";
//            keret.style.height= (palyaMeret * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret) *  gridGap) + kockaMeret + gridGap + (5 * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret-1) *  gridGap) + "px";
            keret.style.width= (palyaMeret * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret) *  gridGap) + kockaMeret + gridGap + "px";
            keret.style.height= (palyaMeret * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret) *  gridGap) + kockaMeret + gridGap + (5 * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret-1) *  gridGap) + "px";
            break;
        case tartalmazo:
            tartalmazo.style.gridTemplateColumns = "repeat(" + palyaMeret + ", 1fr)";
            tartalmazo.style.gridTemplateRows = "repeat(" + palyaMeret + ", 1fr)";
            tartalmazo.style.height = (palyaMeret * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret-1) *  gridGap) + "px";
            tartalmazo.style.width = (palyaMeret * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret-1) *  gridGap) + "px";
            break;
        case vizszintesKeret:
            vizszintesKeret.style.gridTemplateColumns = "repeat(" + palyaMeret + ", 1fr)";
            vizszintesKeret.style.gridGap = gridGap + "px";
            vizszintesKeret.style.width = (palyaMeret * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret-1) *  gridGap) + "px";
            vizszintesKeret.style.height = kockaMeret + (2 * gridGap) + "px";
            break;
        case fuggolegesKeret:
            fuggolegesKeret.style.height = (palyaMeret * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret-1) *  gridGap) + "px";
            fuggolegesKeret.style.width = kockaMeret + (2 * gridGap) + "px";
            fuggolegesKeret.style.gridGap = gridGap + "px";
            fuggolegesKeret.style.gridTemplateRows = "repeat(" + palyaMeret + ", 1fr)";
            break;
        case hajoTartalmazo:
            hajoTartalmazo.style.height = (5 * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret-1) *  gridGap) + "px";
            hajoTartalmazo.style.width = (palyaMeret * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret-1) *  gridGap) + "px";
            hajoTartalmazo.style.gridGap = gridGap + "px";
            hajoTartalmazo.style.gridTemplateRows = "repeat(" + 5 + "," + kockaMeret + "px)";
            hajoTartalmazo.style.gridTemplateColumns = "repeat(" + 4 + "," + kockaMeret + "px)";
            hajoTartalmazo.style.justifyContent = "space-around";
            hajoTartalmazo.style.marginTop = 10 * gridGap + "px";
            break;
            
        case "keretet":
            keret.style.marginLeft = "60%";
           // keret.style.marginRight = "40%";
            keret.style.marginTop = "0vh";
          
            
            break;
        default:
            return null;
            break;
    }

}

function makeHajok(kulsoIndex = 0, belsoIndex = 0){
    //kell egy tömb a hajónevekke,, azok index alapján hívni újra afüggvényt
          while (belsoIndex < hajoFajtak[kulsoIndex][2]){
            let hajoReszNev = hajoFajtak[kulsoIndex][0] + belsoIndex;
            let hajoReszDiv = makeDiv(hajoFajtak[kulsoIndex][0], hajoTartalmazo);
            hajoReszDiv.id = hajoReszNev;
            let hajoResz = document.getElementById(hajoReszNev);
            hajoResz.style.gridRow = belsoIndex+1 + "/" + parseInt(belsoIndex+2);
            hajoResz.style.height = kockaMeret + "px";
            hajoResz.style.width = kockaMeret + "px";
            hajoTartalmazo.style.gridGap = 0 + "px";
            hajoResz.style.cursor = "pointer";
            hajoResz.addEventListener("click", function () {
            lepakol(belsoIndex);
        });
            if (belsoIndex%2===0){
              hajoResz.style.backgroundImage = "url('svg/hajoreszek0.svg')";
            }
            else {
              hajoResz.style.backgroundImage = "url('svg/hajoreszek1.svg')";
            }
            belsoIndex++;
          }
    if(kulsoIndex < hajoFajtak.length-1){
        kulsoIndex++;
        makeHajok(kulsoIndex);
    }
}

function lepakol(hossza) {
    console.log(hossza);
    hossz = hossza;
    if (lerak) lerak = false;    
    else lerak = true;
    
    switch (hossz) {
        case 2:
            console.log("hajoDb" + hajoFajtak[0][1]);
            if (hajoFajtak[0][1] < 1) this.lerak = false;
            break;

        case 3:
            console.log("hajoDb" + hajoFajtak[1][1]);
            if (hajoFajtak[1][1] < 1) this.lerak = false;
            break;
            
        case 4:
            console.log("hajoDb" + hajoFajtak[2][1]);
            if (hajoFajtak[2][1] < 1) this.lerak = false;
            break;
            
        case 5:
            console.log("hajoDb" + hajoFajtak[3][1]);
            if (hajoFajtak[3][1] < 1) this.lerak = false;
            break;
    }
    return hossz;
}

function veglegesit(sor, oszlop){
    let hajoReszek;
    if (ervenyesLerakas) {
        if (lerak) {
            if (hosszaban) {
                for (var i = 0; i < hossz; i++) classValto(sor+i, oszlop, "hajo foglalt");
                keretSzamolo(sor, oszlop);
            } else {
                for (var i = 0; i < hossz; i++) classValto(sor, oszlop+i, "hajo foglalt");
                keretSzamolo(sor, oszlop);
            }
            switch (hossz) {
                case 2:
                    hajoFajtak[0][1] --;
                    if (hajoFajtak[0][1] < 1){
                       hajoReszek = document.getElementsByClassName("kettesHajo");
                       nincsTobbIlyen(hajoReszek);
                    }
                    break;
                case 3:
                    hajoFajtak[1][1]--;
                    if (hajoFajtak[1][1] < 1){
                        hajoReszek = document.getElementsByClassName("harmasHajo");
                        nincsTobbIlyen(hajoReszek);
                    }
                    break;
                case 4:
                    hajoFajtak[2][1]--;
                    if (hajoFajtak[2][1] < 1){
                        hajoReszek = document.getElementsByClassName("negyesHajo");
                        nincsTobbIlyen(hajoReszek);
                    }
                    break;
                case 5:
                    hajoFajtak[3][1]--;
                    if (hajoFajtak[3][1] < 1){
                        hajoReszek = document.getElementsByClassName("otosHajo");
                        nincsTobbIlyen(hajoReszek);  
                    }
                    break;
            }
        }
        this.lerak = false;
    }
}

function nincsTobbIlyen(hajoReszek){
    for (var i = 0; i < hajoReszek.length; i++){
        hajoReszek[i].style.opacity = 0.3;
        hajoReszek[i].style.cursor = "no-drop";
    }
    if(--hatraLevoHajok === 3){
        jatekIndul();
    }
}

function classValto(sor, oszlop, ujNev){
    mapDivek[sor][oszlop].className = ujNev;
}

function classNevEllenorzo(sor, oszlop, classNev){
    let eredmeny;
    if(mapDivek[sor][oszlop].className.includes(classNev)) eredmeny = true;
    else eredmeny = false;

    return eredmeny;
}

function forgat(sor, oszlop) {
   if(forgathat){ 
      ervenyesHajo(sor, oszlop, "szabad");
      forgathat = false;
      
      if (!this.hosszaban) this.hosszaban = true;          
      else  this.hosszaban = false;
      
     ervenyesHajo(sor, oszlop, "hajo");
     setTimeout(function(){
               forgathat = true;
               }, 1000);
   }
}

function ervenyesHajo(sor, oszlop, celClass, index = 0){
    ervenyesLerakas = true;
    if(lerak && !forgatas){
        while(ervenyesLerakas && index < hossz){ 
             if(hosszaban) hajoKipakol(sor+index, oszlop, celClass, index);       
             else hajoKipakol(sor, oszlop+index, celClass, index);
        index++;
        }
    }
}

function hajoKipakol(sor, oszlop, celClass, index){
    if (sor < mapDivek.length && oszlop < mapDivek.length)
        if(!classNevEllenorzo(sor, oszlop, "foglalt")) classValto(sor, oszlop, celClass);  
        else hibasLerakas(sor, oszlop, index, celClass);
    else hibasLerakas(sor, oszlop, index, celClass);
}

function hibasLerakas(sor, oszlop, db, celClass){
  ervenyesLerakas = false;
  if(celClass !=="szabad") celClass = "hibas";    
  if(hosszaban)
    for (var i = 1; i <= db; i++) classValto(sor - i, oszlop, celClass);   
  else
    for (var i = 1; i <= db; i++) classValto(sor, oszlop - i, celClass);
}

function ervenyesKeret(sor, oszlop){
    let eredmeny;
    if(sor >= 0 && sor < mapDivek.length && oszlop >= 0 && oszlop < mapDivek.length) eredmeny = true;
    else eredmeny = false;
    return eredmeny;
}

function keretSzamolo(sor, oszlop) {
    switch (hosszaban) {
        case true:         
            for(var i = -1; i <= 1; i++){
                  if (ervenyesKeret(sor -1, oszlop+i)) classValto(sor-1, oszlop+i, "keret foglalt");
                  if(ervenyesKeret(sor+hossz, oszlop + i)) classValto(sor + hossz, oszlop+i, "keret foglalt");
                        for (var x = sor; x < sor + hossz; x++) 
                           if(ervenyesKeret(x, oszlop + i) && i!== 0) classValto(x, oszlop+i, "keret foglalt");
            }
            break;
        
        case false:
            for(var i = -1; i <= 1; i++){
                if(sor + i >= 0 && sor + i < mapDivek.length){ 
                  if (ervenyesKeret(sor + i, oszlop - 1))  classValto(sor + i, oszlop - 1, "keret foglalt");
                  if (ervenyesKeret(sor + i, oszlop + hossz))  classValto(sor + i, oszlop + hossz, "keret foglalt");
                        for (var x = oszlop; x < oszlop + hossz; x++) {
                            if (i !== 0) classValto(sor+i, x, "keret foglalt");
                        }
                }
            }
        break;
    }
}

function kivalaszto(nev) {
    let megvan = false;
    let oszlop = 0;
    let sor = 0;
    let eredmeny = [];
    while (sor < mapDivek.length && !megvan) {
        oszlop = 0;
        while (oszlop < mapDivek[sor].length && !megvan) {
            if (mapDivek[sor][oszlop] === document.getElementById(nev)) {
                megvan = true;
                eredmeny[0] = sor;
                eredmeny[1] = oszlop;
            } else  oszlop++;
        }
        if (!megvan) sor++;
    }
    return eredmeny;
}

function jatekIndul(){
    let keretek;
    for (var i = 0; i < mapDivek.length; i++) {
        for (var x = 0; x < mapDivek.length; x++) {
            if(mapDivek[i][x].className.includes("keret"))
            mapDivek[i][x].className = "jatekos szabad";
           
        }
    }
    cssBeallit("keretet");
    hajoTartalmazo.style.display = "none";
   // makePalya("gep");
}