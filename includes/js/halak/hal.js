     
     
     class Hal{
         constructor(melyik){
         this.halam = melyik;
         this.halam.style.left =  20 + 'px';
         this.halam.style.height = 30 +  'px';
         this.mehet = false;                                                    //benne van e az egér hatúsugarában
         this.halH = 9;
         this.halW = 24;                                    
         this.aktMeret = 1;                                                     //hol tart a zsugorodásban
         this.celMeret = 1;                                                     //mekkorára kellene zsugorodnia
         this.minMeret = 0.65;
         this.forgasok = 0;                                                     //aktuális forgás (%)
         this.elertMeret= true;                                                 //változik e éppen
         this.z = 0;                                                            //Z-index, aki hátrébb van kerüüljön alacsonyabb számú rétegbe is.
         this.x = this.getUjX();
         this.y = this.getUjY();
         this.halam.style.left = x  + 'px';
         this.halam.style.top = y +  'px';
         this.maxSebesseg = Math.random() * 8 + 6;
         this.minSebesseg = Math.random() * 7 + 5;
         this.forgasSebesseg = Math.random() * 20 + 1;
         this.tavolodasSebesseg = 0.15;
         this.halSebessegX = this.maxSebesseg;
         this.halSebessegY = this.getUjY();
         this.szog = 0;
         this.hatotav = Math.random() * 150 + 90;                                //az egértől számított érték, ahol ah alak reakcióba lépnek a cursorral

     }
         
          hatoTavban(x, y){
//              console.log("x: " + x  + "xPos: " + parseInt(this.getPos('x')+this.halW)+ " y: " + y + "yPos: " +  parseInt(this.getPos('y')+this.halH));
            let xOk = false;
            let yOk=false;
            if(x+this.hatotav < parseInt(this.getPos("x")+this.halW) || x-this.hatotav > parseInt(this.getPos("x")+this.halW)){
                xOk=true;
//                console.log("x: " + xOk);
            }
            if(y+this.hatotav < parseInt(this.getPos("y")+this.halH) || y-this.hatotav > parseInt(this.getPos("y")+this.halH)){
                yOk=true;
//                console.log("y: " + yOk);
            }
            if(xOk === false && yOk === false && this.aktMeret > this.minMeret){
                this.mehet=true;
            }
            else{
                this.mehet=false;
            }
          }
         
          //Visszaadja a kért elem valamely pozícióját (x vagy y távolság a body szélétől vagy tetejétől számítva pixelben).
             getPos(ezt){
                let eredmeny;
                let bodyPos = document.body.getBoundingClientRect();
                let posok = this.halam.getBoundingClientRect();
                switch(ezt){
                    
                    case("x"):
                        eredmeny = posok.left - bodyPos.left;
                        break;

                    case("y"):
                        eredmeny =  posok.top - bodyPos.top;
                        break;
                
                    default: eredmeny=0;
                        break;
                }
                return eredmeny;
            }
            
             getUjY(){
                return Math.random() * 200 + 20;
                
            }
            
            getUjX(){
              return Math.random() * 10 - window.innerWidth;
            }
            
            //Halak mozgatása
             anim(x, y){
                    this.hatoTavban(x, y);
                    let ujX=this.halXMozgas();
                    this.halam.style.left = ujX+"px";
                        if(this.getPos("x") > window.innerWidth){                //ha kiúúszik a hal a képernyőről újra pozícionálja
                            let kezdoX = this.getUjX();          
//                            this.el=false;
                            this.halam.style.left = kezdoX+"px";
                            this.halSebessegY =  this.getUjY();
                            this.aktMeret = 1;
                            this.celMeret = 1;
                            this.maxSebesseg = Math.random() * 8 + 6;
                            this.halSebesseg = this.maxSebesseg;
                                
                        }           
                        this.forgasMero(y);
                        let szogString="rotate("+this.szog+"deg)";              //Összerakja a forgatáshoz szükséges karaktersorozatot.
                        this.halam.style.transform = szogString;         
                        this.halam.style.top = this.halSebessegY;
                        this.meretezo();
                        let scaleString = " scale(" + this.aktMeret + ")";
                        this.halam.style.transform += scaleString;
                        let rotateXString = " rotateX(" + this.forgasok + "deg)";
                        let rotateYString = " rotateY(" + this.forgasok + "deg)";
                        let rotateZString = " rotateZ(" + this.forgasok + "deg)";
                        this.halam.style.transform += rotateXString;
                        this.halam.style.transform += rotateYString;
                        this.halam.style.transform += rotateZString;
                        this.halam.style.zIndex += this.z;
                        
//                    
            }
            
            
            //Ellenőrzi a hal régi x pozicícióját, és megadja hozzá viszonyítva az újat.
             halXMozgas(){
                       let regiX = this.halam.style.left;                 
                       let xInt = this.tisztitott(regiX);
                       if(this.mehet && this.halSebessegX > this.minSebesseg){
                           this.halSebessegX -= this.tavolodasSebesseg;
                       }
                       else if(this.halSebessegX < this.minSebesseg){
                           this.halSebessegX += this.tavolodasSebesseg;
                       }
                       let ujX = (xInt+this.halSebessegX);
                       return ujX;
               }
               
            halYMozgas(erre){
                let mozgasYSebesseg = Math.random() * 3 + 1;
                switch(erre){
                    case("-"):
                        this.halSebessegY += this.szog/2 - mozgasYSebesseg;
                        break;

                    case("+"):
                        this.halSebessegY += this.szog/2 + mozgasYSebesseg;
                        break;
                    default:
                        break;
                }
            }
         
         //Halak újra elhelyezéséhez szolgál mielőtt megjellennének a képernyőn.  
             
         
              //Megkap egy stílus értéket aminek az utolsó 2 karakterét(általában px vagy pt-t) levágja és visszaadja a számot előtte, int-ként.
             tisztitott(tisztitando){
                let tisztitott = parseInt(tisztitando.substr(0,(tisztitando.length-2)));
                return tisztitott;
            }
            
            forgasMero(y){
               let yPos = this.getPos("y");
               if(this.mehet){
                    if(y  > yPos){
                             this.szogAllito("-");
                            
                    }
                    else if(y  < yPos ){
                             this.szogAllito("+");
                    }
                }
                else{
                    if(this.szog > 5){
                        this.szogAllito("-");
                    }
                    else if(this.szog < -5){
                        this.szogAllito("+");
                    }
                }
            }
            
            
           //megállapítja, hogy a kért irányba a hal fordulhat-e még. AMennyiben igen, úgy be is állítja az adott hal új forgási szögét.
             szogAllito(erre){
                 let maxForgas = Math.random() * 45 +30;
                 let minForgas = (Math.random() * 45 + 30) * -1;
                 switch(erre){
                     case("+"):
                         this.halYMozgas("+");
                             if(this.szog < maxForgas){
                                this.szog += this.forgasSebesseg;
                             }
                         break;
                    
                     case("-"):
                         this.halYMozgas("-");
                         if(this.szog > minForgas){
                            this.szog -= this.forgasSebesseg;
                         }
                         break;
                     default:
                        break;
                 }
             }
             
             getUjCelMeret(){
                 if (this.celMeret >= this.minMeret){
                 this.celMeret = this.aktMeret -  Math.random() * (0.05) + 0.02; 
                 return this.celMeret;
             }
             }
           
             meretezo(){
                if(this.mehet){ 
                 if(this.aktMeret > this.celMeret){
                    let tavolodasSebesseg = Math.random() * 0.15; 
                    this.maxSebesseg -= 0.2;
                    this.halSebessegX -= 0.16;
                    if(this.forgasok > -32){
                         this.forgasok -=10;
                         this.z--;
                    }
                     this.aktMeret -= tavolodasSebesseg;
                 }
                 else{
                    this.celMeret = this.getUjCelMeret();
                 }
             }
             else {
                 if (this.forgasok < 0){
                     this.forgasok += 10;
                 }
             }
         }
     };
