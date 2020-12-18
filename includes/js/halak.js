
     let szogek = [];                                                           //Minden halnak egyedi érték az éppen aktuális forgási szögéhez.
     let halSebessegX = [];                                                           //Minden halnak egyedi érték az éppen aktuális sebességéhez.
     let halSebessegY = [];                                                           //Minden halnak egyedi érték az éppen aktuális sebességéhez.
     let maxSebesseg = 8;
     let minSebesseg = 4;
     let forgasSebesseg = Math.random() * 20 + 1;
     let halUsztatom = document.getElementById('halusztato');
//     let ujY = 0;
     halElhelyez();
     

     function halElhelyez(){
//        let bimage = "linear-gradient(red, blue)";
//        document.body.style.backgroundImage = bimage;
        let halaim = document.getElementsByClassName('halacska');
        
       //Halak kezdőértékének meghatározása.
        for (let i = 0; i < halaim.length; i++){
            let ujX = 0 - (Math.random() * 70);
            itemAtHelyez(halaim[i], 'halusztato');
           
            halaim[i].style.left =  ujX + 'px';
            halaim[i].style.top = getUjY() +  'px';
            
            halSebessegX[i]=maxSebesseg;
            halSebessegY[i]=getUjY();
            szogek[i] = 0;
            
            
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
     
        var x;
           var y;
           var halH = 9;
           var halW = 24;
           var hatotav = 80;                                                   //az egértől számított érték, ahol ah alak reakcióba lépnek a cursorral
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
            return mehet;
          }
            
           //Halak mozgatása
            function anim(){
                if(x != null ){                                                 //Egér poziciót vizsgál, ezért nem indulhat el amíg nincs meghatározva(először megmozdítva) az egér.
                    for(var i=0; i < halaim.length; i++){
                        let ez = halaim[i];                      
                        let ujX=halXMozgas(ez, i);
                        halaim[i].style.left = ujX+"px";
                        if(getPos(ez, "x") > window.innerWidth){                //ha kiúúszik a hal a képernyőről újra pozícionálja
                            let kezdoX = 0 - i * 100;                           //kompenzálja a display:block hatását, ami az elemeket 0px left értéknél is beljebb tolja a képen.
                            halaim[i].style.left = kezdoX+"px";
                            halSebessegY[i] =  getUjY();
                        }           
                        forgasMero(ez, i);
                        let szogString="rotate("+szogek[i]+"deg)";              //Összerakja a forgatáshoz szükséges karaktersorozatot.
                        ez.style.transform = szogString;         
                        ez.style.top = halSebessegY[i];
                    }
                }
                setTimeout(anim, (fps));                                        //Animáció újratöltés időzítés lejárta után.
            }
            
          //Halak újra elhelyezéséhez szolgál mielőtt megjellennének a képernyőn.  
            function getUjY(){
               return ujY = Math.random() * 200 + 20;
            }

           //Megkap egy stílus értéket aminek az utolsó 2 karakterét(általában px vagy pt-t) levágja és visszaadja a számot előtte, int-ként.
            function tisztitott(tisztitando){
                let tisztitott = parseInt(tisztitando.substr(0,(tisztitando.length-2)));
                return tisztitott;
            }
            
            function halXMozgas(melyik, i){
                    var regiX = melyik.style.left;                 
                    let xInt = tisztitott(regiX);
                    if(mehet(melyik) && halSebessegX[i] > minSebesseg){
                        halSebessegX[i] -= 0.15;
                    }
                    else if(halSebessegX[i] < maxSebesseg){
                        halSebessegX[i] += 0.15;
                    }
                    let ujX = (xInt+halSebessegX[i]);
                    return ujX;
            }

            
            function halYMozgas(i, erre){
            let mozgasYSebesseg = 3;
                if (erre === "-"){
                    halSebessegY[i] += szogek[i]/2 - mozgasYSebesseg;
                }
                else if(erre === "+"){
                    halSebessegY[i] += szogek[i]/2 + mozgasYSebesseg;
                }
                
            }


            function forgasMero(melyik, i){
            let yPos = getPos(melyik, "y");
                            if(mehet(melyik)){
                    if(y  > yPos){
                             szogAllito(i,"-");
                    }
                    else if(y  < yPos ){
                             szogAllito(i,"+");
                    }
                }
                else{
                    if(szogek[i] > 5){
                        szogAllito(i,"-");
                    }
                    else if(szogek[i] < -5){
                    szogAllito(i,"+");
                    }
                }
            }


           //megállapítja, hogy a kért irányba a hal fordulhat-e még. AMennyiben igen, úgy be is állítja az adott hal új forgási szögét.
            function szogAllito(i, erre){
                let maxForgas = 45;
                let minForgas = maxForgas* -1;
                if(erre === "+"){
                 halYMozgas(i,"+");
                    if(szogek[i] < maxForgas){
                           szogek[i] += forgasSebesseg;
                    }
                }    
                else if (erre === "-"){
                 halYMozgas(i,"-");
                    if(szogek[i] > minForgas){
                                    szogek[i] -= forgasSebesseg;
                    }
                }   
            }


           //Visszaadja a kért elem valamely pozícióját (x vagy y távolság a body szélétől vagy tetejétől számítva pixelben).
            function getPos(ennek, ezt){
                let eredmeny;
                let bodyPos = document.body.getBoundingClientRect();
                let posok = ennek.getBoundingClientRect();
                if(ezt === "x"){
                     eredmeny = posok.left - bodyPos.left;
                 }

                else if(ezt === "y"){
                    eredmeny =  posok.top - bodyPos.top;
                }
                
                return eredmeny;
            }