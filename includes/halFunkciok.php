<?php
$halacskam = file_get_contents('svg/halam.svg');
$raj = 25;                                                                      //maxhalak Száma


for ($i = 0; $i < $raj; $i++){                                                  //halak létrehozása
    echo $halacskam;
}

// Halak pozícionálása
function halInit(){
    
 echo "<script>
     let szogek = [];                                                           //Minden halnak egyedi érték az éppen aktuális forgási szögéhez.
     halElhelyez();
     

     function halElhelyez(){
        let halusztato = document.getElementById('halusztato');
        let halaim = document.getElementsByClassName('halacska');
        
       //Halak kezdőértékének meghatározása.
        for (let i = 0; i < halaim.length; i++){
            let ujX = 0 - (Math.random() * 400);
            let ujY = 0 - Math.random() * 20;
            halaim[i].style.left =  ujX + 'px';
            halaim[i].style.top = ujY +  'px';
            itemAtHelyez(halaim[i], 'halusztato');
            szogek[i]=0;
            
          //Teszteléshez használt pozicio lekérések a kattintott hal értékeivel.
            halaim[i].addEventListener('click', function () {
                console.log('hal x: ' + parseInt(getPos(halaim[i], 'x')));
                console.log('hal y: ' + getPos(halaim[i], 'y'));
                console.log('eger X: '+ x);
                console.log('eger Y: ' + y);
                console.log('hal width: ' + halaim[i].style.width);
            });
        }
     }
     
    //Hal áthelyezése a megfelelő div elembe
     function itemAtHelyez(melyiket, hova){
        
        let ide = document.getElementById(hova);
        ide.appendChild(melyiket);
     }
              </script>
       ";
}
//Halak animációi és mozgatásuk
function halMozgatas(){
    echo '<script type="text/JavaScript"> 
           var x;
           var y;
           var halH = 9;
           var halW = 24;
           var hatotav = 150;                                                   //az egértől számított érték, ahol ah alak reakcióba lépnek a cursorral
           let halaim = document.getElementsByClassName("halacska");
          
            let halSebesseg = 7;
            var fps = Math.floor(1000/40);                                      //milyen sőrőn fusson le az animáció
            var idozito = setTimeout(anim, 100);                                //az első animáció kezdésének várakoztatása
           
            //Egér helyének meghatározása
             document.body.addEventListener("mousemove", e => {
                     x = e.clientX;
                     y = e.clientY + window.pageYOffset;                        //Az egér y pozíciójához hozzáadom a legörgetett távolsághot mert a halakat is a body top-jától számított értékkel kapjuk meg, így a görgetés nem zavar be.
                    });
            
          function mehet(melyik){
            let xOk = false;
            let yOk=false;
            let mehet=false;
            if(x+hatotav < parseInt(getPos(melyik, "x")+halW) || x-hatotav > parseInt(getPos(melyik, "x")+halW)){
                xOk=true;
            }
            if(y+hatotav < parseInt(getPos(melyik, "y")+halH) || y-hatotav > parseInt(getPos(melyik,"y")+halH)){
                yOk=true;
            }
            if(xOk === false && yOk === false){
                mehet=true;
            }
           //console.log("xOk: " + xOk + " yOk: " + yOk + " mehet: " + mehet);
            return mehet;
          }
            
           //Halak mozgatása
            function anim(){
                if(x != null ){                                                 //Egér poziciót vizsgál, ezért nem indulhat el amíg nincs meghatározva(először megmozdítva) az egér.
                    for(var i=0; i < halaim.length; i++){
                        let ez = halaim[i];
                        
                        if(!mehet(halaim[i])){                                  //Ha nincsenek az egér hatótávjában a halak.
                            if(szogek[i] > 0){
                                szogek[i]--;
                            }
                            let ujX=halXMozgas(halaim[i]);
                            halaim[i].style.left = ujX+"px";
                            if(getPos(ez, "x") > window.innerWidth){            //ha kiúúszik a hal a képernyőről újra pozícionálja
                                let kezdoX = 0 - i * 100;
                                halaim[i].style.left = kezdoX+"px";
                            }
                        }
                        else{
                        
                        szogek[i]++;
                        
                        }
                        let szogString="rotate("+szogek[i]+"deg)";              //Összerakja a forgatáshoz szükséges karaktersorozatot.
                        ez.style.transform = szogString;
                    }
                }
                setTimeout(anim, (fps));                                        //Animáció újratöltés időzítés lejárta után.
            }
            
           //Megkap egy stílus értéket aminek az utolsó 2 karakterét(általában px vagy pt-t) levágja és visszaadja a számot előtte, int-ként.
            function tisztitott(tisztitando){
                let tisztitott = parseInt(tisztitando.substr(0,(tisztitando.length-2)));
                
                return tisztitott;
            }
            
            function halXMozgas(melyik){
                    var regiX = melyik.style.left;                 
                    let xInt = tisztitott(regiX);
                    let ujX = (xInt+halSebesseg);
                    
                    return ujX;
            }

           //Visszaadja a kért elem valamely pozícióját (x vagy y távolság a body szélétől vagy tetejétől számítva pixelben).
            function getPos(ennek, ezt){
                let eredmeny;
                let bodyPos = document.body.getBoundingClientRect();
                let posok = ennek.getBoundingClientRect();
                if(ezt == "x"){
                     eredmeny = posok.left - bodyPos.left;
                 }

                else if(ezt == "y"){
                    eredmeny =  posok.top - bodyPos.top;
                }
                
                return eredmeny;
            }
            
         </script>';
}