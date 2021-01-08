
var kockaMeret = 12;
var palyaMeret = 13;
var keretMeret = 1;
var gridGap = 1;
var hajoFajtak = 4;                                                             //kettes, harmas, negyes, otos
var kettesHajoDb = 2;
var harmasHajoDb = 2;
var negyesHajoDb = 2;
var otosHajoDb = 2;
var keretBetuMeret = 2;                                                                 //lehet felesleges
var mapDivek = [];
var lerak = false;
var hossz = 0;
var lerakottak = [];
var sikeresLerakas = false;
var hosszaban = true;
var mindLerakva = false;
var maradt = 0;
var indexPoziciohoz = 0;
var forgatas = false;

let keret = document.getElementById("palyaKeret");
let tartalmazo = document.getElementById("palyaTartalmazo");  
let vizszintesKeret = document.getElementById("vizszintesKeret");  
let fuggolegesKeret = document.getElementById("fuggolegesKeret");
let hajoTartalmazo = document.getElementById("hajoTartalmazo");

init();

function init(){
        makePalya();
        makeHajok();
        hajoSzamolo();
}

function hajoSzamolo(){
    maradt += kettesHajoDb;
    maradt += harmasHajoDb;
    maradt += negyesHajoDb;
    maradt += otosHajoDb;
}

function makePalya(){

     cssBeallit(keret);
     cssBeallit(tartalmazo);
     cssBeallit(vizszintesKeret);
     cssBeallit(fuggolegesKeret);
     cssBeallit(hajoTartalmazo);
    
    for (var i = 0; i < palyaMeret; i++) {
        mapDivek[i] = [];
        
        for (var x = 0; x < palyaMeret; x++) {
            let nev = "p" + i + "." + x;
            mapDivek[i][x] = makeDiv("szabad", tartalmazo);
            let ujDiv = mapDivek[i][x];
            ujDiv.id=nev;

            ujDiv.addEventListener("wheel", function () {
                forgat(nev);
                szinezo(nev, "green");
            });
            
            ujDiv.onmouseout = function () {
                    szinezo(nev, "green");
                   ellenorzo(ujDiv);
            };
            
            ujDiv.onmouseover = function () {
                    szinezo(nev, "green");
            };
            
            ujDiv.addEventListener("click", function () {
                    tisztit(nev);            
            });
        }
        
     
     
    }    
    makeKorbeKarakter("vizszintes", vizszintesKeret);
    makeKorbeKarakter("fuggoleges", fuggolegesKeret);    
    makeHajok();
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
            keret.style.gridTemplateColumns = "1fr " + palyaMeret + "fr";
            keret.style.gridTemplateRows = "1fr " + (palyaMeret) + "fr 1fr";
            keret.style.width= (palyaMeret * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret) *  gridGap) + kockaMeret + gridGap + "px";
            keret.style.height= (palyaMeret * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret) *  gridGap) + kockaMeret + gridGap + (5 * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret-1) *  gridGap) + "px";
            break;
        case tartalmazo:    
            tartalmazo.style.gridTemplateColumns = "repeat(" + palyaMeret + ", 1fr)";
            tartalmazo.style.gridTemplateRows = "repeat(" + palyaMeret + ", 1fr)";
            tartalmazo.style.height = (palyaMeret * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret-1) *  gridGap) + "px";
            tartalmazo.style.width = (palyaMeret * kockaMeret) + ((2 * palyaMeret) * keretMeret) + ((palyaMeret-1) *  gridGap) + "px";
//            tartalmazo.style.border = keretMeret + "px solid black";
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
            hajoTartalmazo.style.gridTemplateRows = "repeat(" + 5 + ", auto)";
            hajoTartalmazo.style.gridTemplateColumns = "repeat(" + 4 + ", auto)";
            break;
    }
    
}
        
function makeHajok(hanyszor = 2, index = 0, hajoNev="kettesHajo"){
    //kell egy tömb a hajónevekke,, azok index alapján hívni újra afüggvényt
    while (index < hanyszor){
        makeDiv(hajoNev, hajoTartalmazo);
        index++;
    }
    if(hanyszor > hajoFajtak){
        hanyszor++;
        makeHajok(hanyszor);
    }
}
