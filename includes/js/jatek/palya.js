
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
let jatekosHajoi;
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
     makeKorbeKarakter("vizszintes", vizszintesKeret);
     makeKorbeKarakter("fuggoleges", fuggolegesKeret);

    for (var i = 0; i < palyaMeret; i++) {
        mapDivek[i] = [];

        for (var x = 0; x < palyaMeret; x++) {
            let nev = "p" + i + "." + x;
            mapDivek[i][x] = makeDiv("szabad", tartalmazo);
            let ujDiv = mapDivek[i][x];
            ujDiv.id=nev;
            let indexek = kivalaszto(nev);
            ujDiv.addEventListener("wheel", function () {
                forgat(indexek[0], indexek[1]);
              //  szinezo(nev, "green");
            //  ervenyesHajo(nev);
            });

            ujDiv.onmouseout = function () {
                  //  szinezo(nev, "green");
                //   ervenyesHajo(i, x);
                //   ellenorzo(ujDiv);
                ervenyesHajo(indexek[0],indexek[1], "szabad");
            };

            ujDiv.onmouseover = function () {
                  //  szinezo(nev, "green");
                   ervenyesHajo(indexek[0],indexek[1], "hajo");
            };

            ujDiv.addEventListener("click", function () {
                    tisztit(nev);
            });
        }

}
}

function forgat(sor, oszlop) {
    if (!this.hosszaban) {
        this.hosszaban = true;

    } else {
          this.hosszaban = false;
    }
    this.forgatas=false;
    ervenyesHajo(sor, oszlop, "szabad");
    ervenyesHajo(sor, oszlop, "hajo");
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

function ujHosszSzamolo(index) {
    ujHossz = hossz;
    switch (hosszaban) {
        case true:
            while (index + ujHossz >= mapDivek.length) {
                ujHossz--;
            }
            break;
        case false:

            while (index + ujHossz >= mapDivek.length) {
                ujHossz--;
            }
            break;
    }
    return ujHossz;
}


function lepakol(hosszas) {
  console.log("hossza" + hosszas);
    this.hossz = hosszas;
    console.log("lapkolban hossz: " + this.hossz);
    if (lerak)
        this.lerak = false;
    else {
        this.lerak = true;
    }
    switch (hossz) {
        case 2:
            if (hajoFajtak[0][1] < 1) {
                this.lerak = false;
//                document.getElementById("kettesHajo").style.background = "red";
            }
            break;

        case 3:

            if (hajoFajtak[1][1] < 1) {
                this.lerak = false;
//                document.getElementById("harmasHajo").style.background = "red";
            }
            break;
        case 4:
            if (hajoFajtak[2][1] < 1) {


                this.lerak = false;
//                document.getElementById("negyesHajo").style.background = "red";
            }
            break;
        case 5:
            if (hajoFajtak[3][1] < 1) {
                this.lerak = false;
//                document.getElementById("ötösHajo").style.background = "red";
            }
            break;
    }
    return hossz;
}


function tisztit(nev) {
    if (sikeresLerakas) {
        if (lerak) {
            let indexek = kivalaszto(nev);
            let sor = indexek[0];
            let oszlop = indexek[1];
            if (hosszaban) {
                for (var i = 0; i < hossz; i++) {
                    classValto(sor+i, oszlop, "foglalt");
                }
            } else {
                for (var i = 0; i < hossz; i++) {
                    classValto(sor, oszlop+i, "foglalt");
                }
            }
            switch (hossz) {
                case 2:
                    hajoFajtak[0][1]--;
                    if (hajoFajtak[0][1] < 1)
//                        document.getElementById("kettesHajo").style.background = "red";
                    break;
                case 3:
                    hajoFajtak[1][1]--;
                    if (hajoFajtak[1][1] < 1)
//                        document.getElementById("harmasHajo").style.background = "red";
                    break;
                case 4:
                    hajoFajtak[2][1]--;
                    if (hajoFajtak[2][1] < 1)
//                        document.getElementById("negyesHajo").style.background = "red";
                    break;
                case 5:
                    hajoFajtak[3][1]--;
                    if (hajoFajtak[3][1] < 1)
//                        document.getElementById("otosHajo").style.background = "red";
                    break;
            }
        }
        this.lerak = false;
        szinezo(nev, "gray", true);
        jatekIndito();
    }
}

function classValto(sor, oszlop, ujNev){
    mapDivek[sor][oszlop].className = ujNev;
}

function classNevEllenorzo(sor, oszlop, classNev){
    let eredmeny;
    if(mapDivek[sor][oszlop].className === classNev){
        eredmeny = true;
    }
    else{
        eredmeny = false;
    }
    return eredmeny;
}

function ervenyesHajo(sor, oszlop, celClass, index = 0){

  if(lerak){
    var ervenyes = new Promise((resolve, reject) => {
      console.log("sor: " + sor);
      console.log("oszlop :" + oszlop);
      console.log(index);
      if (sor <= mapDivek.length && oszlop <= mapDivek.length){
        if(!classNevEllenorzo(sor, oszlop, "foglalt")){
          resolve(index);
        }
        else{

        reject(index);
        }
      }
      else{
        reject(index);
      }
    });

    ervenyes.then(() => {
      console.log("then i: " + index);
  if(index < hossz){
     classValto(sor, oszlop, celClass);
    if(hosszaban){
      console.log("ittindex: " + index);
        ervenyesHajo(++sor, oszlop, celClass, ++index);
      }
    else{
        ervenyesHajo(sor, ++oszlop, celClass, ++index);
    }
    }
  }).catch(() => {
      console.log("hibas" + index);
      hibasLerakas(sor, oszlop, index, celClass);
    });
  }
}

function hibasLerakas(sor, oszlop, db, celClass){
  if(celClass !=="szabad")
    celClass = "hibas";
  if(hosszaban)
    for (var i = 0; i < db; i++)
      classValto(sor+i, oszlop, celClass);
  else
    for (var i = 0; i < db; i++)
      classValto(sor, oszlop + i, celClass);
}

function keretSzamolo(sor, oszlop) {
    let keretIndexek = [];
    let mehet = false;
    let ujIndex = 0;
    switch (hosszaban) {
        case true:
        {
            for (var i = oszlop - 1; i <= oszlop + hossz; i++) {
                keretIndexek[i] = [];
                for (var e = -1; e <= 1; e++) {
                    mehet = false;
                    let ujId = parseInt(oszlop + e);
                    if (ujId >= 0 && ujId < palyaMeret && i >= 0 && i < palyaMeret) {
                        mehet = true;
                    }
                    if (mehet && (i < oszlop || i >= oszlop + hossz)) {
                        keretIndexek[i].push(ujId);
                    }
                    if (e !== 0 && i >= oszlop && i < oszlop + hossz && mehet) {
                        keretIndexek[i].push(ujId);
                    }
                }
                ujIndex++;
            }
            break;
        }
        case false:
            {
                for (var i = -1; i <= 1; i++) {
                    if (sor + i < mapDivek.length) {
                        keretIndexek[sor + i] = [];
                        for (var e = oszlop - 1; e <= oszlop + hossz; e++) {
                            mehet = false;
                            let ujId = parseInt(e);
                            if (ujId >= 0 && ujId < palyaMeret && sor + i >= 0) {
                                mehet = true;
                            }
                            if (mehet && (e < oszlop || e > oszlop + hossz - 1)) {
//                                keretIndexek[sor + i].push(ujId);
                            }
                            if (i !== 0 && e >= oszlop && e < oszlop + hossz && mehet) {
                                keretIndexek[sor + i].push(ujId);
                            }
                        }
                        ujIndex++;
                    }
                }
            }
            break;

    }
     console.log(keretIndexek);
    return keretIndexek;
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
            } else {
                oszlop++;
            }
        }
        if (!megvan) {
            sor++;
        }
    }
    return eredmeny;
}
