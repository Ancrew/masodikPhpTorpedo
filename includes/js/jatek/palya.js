
var kockaMeret = 23;
var palyaMeret = 12;
var kettesHajoDb = 2;
var harmasHajoDb = 2;
var negyesHajoDb = 2;
var kettesHajoDb = 2;
var harmasHajoDb = 2;
var negyesHajoDb = 2;
var otosHajoDb = 2;
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
    let keret = document.getElementById("keret");
    let tartalmazo = document.getElementById("palyaTartalmazo");
    let hajok = document.getElementById("hajok");
    tartalmazo.style.gridTemplateColumns = "repeat(" + palyaMeret + ", 1fr)";
    tartalmazo.style.gridTemplateRows = "repeat(" + palyaMeret + ", 1fr)";

for (var i = 0; i < palyaMeret; i++) {
       
//         indexPoziciohoz++;
        mapDivek[i] = [];
        for (var x = 0; x < palyaMeret; x++) {
           
            let nev = "p" + i + "." + x;
            let divem = makeDiv(nev, "tartalmazo");
            tartalmazo.appendChild(divem);
            let ujDiv = document.getElementById(nev);
            mapDivek[i].push(ujDiv);
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
    
        
        
        
    function makeDiv(nev = "", anya, szin = "blue", pozRow = - 1, pozColumn = - 1, meret = kockaMeret, hajo = false, merete = 0) {
        let divem = document.createElement("div");
        divem.id = nev;
        
        let ujDiv = document.getElementById(nev);
        ujDiv.style.height = meret + "px";
        ujDiv.style.width = meret + "px";
        ujDiv.style.border = "1px solid black";
        if (nev.includes("vizszintesIndex", 0)){
            divem.className="vizszintesIndex";
            divem.style.left=indexPoziciohoz*(kockaMeret+2)+"px";
            divem.style.border="none";
            divem.innerHTML=indexPoziciohoz+1;
        }
        if (nev.includes("fuggolegesIndex", 0)){
            divem.className="fuggolegesIndex";
            divem.style.top=55+indexPoziciohoz*(kockaMeret+2)+"px";
            divem.style.border="none";
            divem.innerHTML=(indexPoziciohoz+10).toString(36);
    //        li.innerHTML = "letter " + (i+10).toString(36) + " ";
        }
        if (anya === "tartalmazo") {
            ujDiv.className = "szabad";
    //        if(nev.includes("0", 1)){
    //             let indexhez = document.createElement("p");
    //            indexhez.innerHTML = szamlalo;
    //            indexhez.className = "szamlalohoz";
    //            indexhezkell = document.getElementById("szamlalohoz");
    //             divem.className="indexek";
    //             insertAfter(divem, indexhezkell);
    ////            divem.innerHTML =(szamlalo+10).toString(36);
    //            if(szamlalo>=palyaSzelesseg){
    //                
    ////                divem.innerHTML=szamlalo-palyaSzelesseg;
    //               
    //            }
    //            szamlalo++;
    //            let ertek = document.createElement("p");
    //            ertek.innerHTML = "e";
    //        }
        }
        if (pozRow >= 0 && hajo) {
            ujDiv.style.display = "grid";
            ujDiv.style.gridRow = ++pozColumn + "\/" + ++pozColumn;
            ujDiv.style.padding = "2px";
            ujDiv.style.cursor = "pointer";
            ujDiv.style.margin = "auto";
            ujDiv.style.background = "green";
            ujDiv.addEventListener("click", function () {
                lepakol(hossza);
            });
        }
        if (pozRow >= 0 && !hajo) {
            ujDiv.style.gridColumn = ++pozRow + "\/" + ++pozRow;
            ujDiv.style.gridTemplateRows = "repeat(5, 1fr)";
            ujDiv.style.width = meret / 3 + "px";
            ujDiv.style.height = 80 + "px";
            ujDiv.style.border = "none";
    }
}
        
}
