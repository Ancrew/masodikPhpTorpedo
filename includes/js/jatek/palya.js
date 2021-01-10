
var kockaMeret = 20;
var palyaMeret = 13;
var keretMeret = 1;
var gridGap = 1;
/*var hajoFajtak = 4;                                                             //kettes, harmas, negyes, otos
var harmasHajoDb = 2;
var negyesHajoDb = 2;
var otosHajoDb = 2;*/
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
var hajoFajtak = [["kettesHajo", 2, 2], ["harmasHajo", 2, 3], ["negyesHajo", 1, 4], ["otosHajo", 1, 5]];  //hajó neve -> hajó darabSzáma, hajó hossza
console.log(hajoFajtak);

let keret = document.getElementById("palyaKeret");
let tartalmazo = document.getElementById("palyaTartalmazo");
let vizszintesKeret = document.getElementById("vizszintesKeret");
let fuggolegesKeret = document.getElementById("fuggolegesKeret");
let hajoTartalmazo = document.getElementById("hajoTartalmazo");

init();

function init(){
        makePalya();
        makeHajok();
        //hajoSzamolo();
}

//function hajoSzamolo(){
  //  maradt += kettesHajoDb;
    //maradt += harmasHajoDb;//
    //maradt += negyesHajoDb;
    //maradt += otosHajoDb;
//}

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
    //makeHajok();
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
            hajoTartalmazo.style.gridTemplateRows = "repeat(" + 5 + "," + kockaMeret + "px)";
            hajoTartalmazo.style.gridTemplateColumns = "repeat(" + 4 + "," + kockaMeret + "px)";
            hajoTartalmazo.style.justifyContent = "space-around";
            hajoTartalmazo.style.marginTop = 10 * gridGap + "px";
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
