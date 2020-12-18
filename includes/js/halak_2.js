

//    let Hal = require('includes/js/hal.js'); 
//    let halUsztatom = document.getElementById('halusztato');
    let halH = 9;
    let halW = 24;
    let halacskak = document.getElementsByClassName('halacska');
    halacskak[0].style.left =  20 + 'px';
            halacskak[0].style.top = 30 +  'px';
    console.log("halátadás: " + halacskak[0].style.top);
    let halaim = [];
    let fps = Math.floor(1000/40);    
    let x = 0;
    let y = 0;
    halElhelyez();
    setTimeout(animalasok, fps); 
 
   document.body.addEventListener("mousemove", e => {
                     x = e.clientX;
                     y = e.clientY + window.pageYOffset;                        //Az egér y pozíciójához hozzáadom a legörgetett távolsághot mert a halakat is a body top-jától számított értékkel kapjuk meg, így a görgetés nem zavar be.
                    });
     
     
   function halElhelyez(){  
        for (var i = 0; i < halacskak.length; i++) {
            
             halaim.push(new hal(halacskak[i]));
            itemAtHelyez(halacskak[i], "halusztato")
        
        }
   }
  

  //Hal áthelyezése a megfelelő div elembe
     function itemAtHelyez(melyiket, hova){
        let ide = document.getElementById(hova);
        ide.appendChild(melyiket);
     }

//  function getUjX(){
//              Math.random() * 200+100 - window.innerWidth;
//            }
 

   
 
    function animalasok(){
        for (var i = 0; i < halaim.length; i++) {
        halaim[i].anim(x, y);
    }
        setTimeout(animalasok, fps);   
    }
    

//     let ujY = 0;
    
              
                                  //az első animáció kezdésének várakoztatása    
     
     //Egér helyének meghatározása
             
                    
             
     
    

     
     
  
             
           
                            
        
           
            
            
          
            
           
            
          

         
            
            






          