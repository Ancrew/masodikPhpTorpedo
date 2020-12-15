<?php
$halacskam = file_get_contents('svg/halam.svg');
echo $halacskam;
$raj = 25;


for ($i = 0; $i < $raj; $i++){
    echo $halacskam;
}


function halInit(){
    
 echo "<script>
     console.log('itt');
     halElhelyez();
     function halElhelyez(){
     
        

        let halusztato = document.getElementById('halusztato');
        let halaim = document.getElementsByClassName('halacska');
        for (let i = 0; i < halaim.length; i++){
        
//            let keret=document.createElement('div');
//            let nev = 'hal'+i;
//            keret.id=nev;
//            console.log(keret.id);
//            keret.appendChild(halaim[i]);
//            console.log('keret: ' + keret); 
//            itemAtHelyez(halaim[i], 'nev');

            let ujX = 0 - (Math.random() * 400);
            console.log(ujX);
            let ujY = 0 - Math.random() * 20;
//            console.log(ujY);
            halaim[i].style.left =  ujX + 'px';
            halaim[i].style.top = ujY +  'px';
            
//            itemAtHelyez(keret, 'halusztato');

            itemAtHelyez(halaim[i], 'halusztato');
        }
        
     }
     
     function itemAtHelyez(melyiket, hova){
        
        let ide = document.getElementById(hova);
        ide.appendChild(melyiket);
         console.log('siker');
     }
              </script>
       ";
}

function halMozgatas(){
    echo '<script type="text/JavaScript">
           var x;
           var y;
           let szogek = [];
           var hatotav = 150;
           let halaim = document.getElementsByClassName("halacska");
          
            let halSebesseg = 10;
            var fps = Math.floor(1000/40);
            var idozito = setTimeout(anim, 100);  
            for(var i=0; i<halaim.length; i++){
                let ez = halaim[i];
                szogek[i]=0;
                document.body.addEventListener("mousemove", e => {
                     x = e.clientX;
                     y = e.clientY + window.pageYOffset;
//                     console.log("eger: " + y);
//                     tavolsagX[0] = x-20;
//                     tavolsagX[1] = x+20;
//                     tavolsagY[0] = y-20;
//                     tavolsagY[1] = y+20;
//                     console.log("hal: " + getPos(ez, x));
//                     console.log("eger: " + x);
                    return x;
                    });
                halaim[i].addEventListener("click", function () {
                    console.log("hal x: " + parseInt(getPos(ez, "x")));
                    console.log("hal y: " + getPos(ez, "y"));
                    console.log("eger X: "+ x);
                    console.log("eger Y: " + y);
                    console.log("hal width: " + ez.style.width);
                    
                });
            }
            
          function mehet(melyik){
           var halH = 9;
           var halW = 24;
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

            function anim(){
                if(x != null ){
    //              console.log(x);
                    for(var i=0; i < halaim.length; i++){
                        let ez = halaim[i];
                        
                        if(!mehet(halaim[i])){
                          if(szogek[i] > 0){
                          szogek[i]--;
                          }
    //                    let halKezdo = tisztitott(halaim[i].style.left);
    //                    if ( halKezdo < 0){
    //                        halaim[i].style.display = "none";
    //                    }
    //                    else if(halaim[i].style.display != "blobk"){
    //                        halaim[i].style.display = "inline-block";
    //                    }
    //                    console.log(getPos(halaim[i], "x"));
                          let ujX=halXMozgas(halaim[i]);
                          halaim[i].style.left = ujX+"px";
                          if(ujX > window.innerWidth){
                             let kezdoX = 0 - i * 100;
    //                       halaim[i].style.left = "-100px";
                             halaim[i].style.left = kezdoX+"px";
                          }
                        }
                        else{
                        
                        szogek[i]++;
                        
//                              let ezt = document.getElementById("hal"+i);
//                              ezt.className = "forgoHal";
//                            console.log(ez.elementNodeReference.className);
//                            console.log(ez);
                        }
                          let szog="rotate("+szogek[i]+"deg)";
                           ez.style.transform = szog;
                    }
                  
                }
                
                setTimeout(anim, (fps));
            }
            
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

            function getPos(ennek, ezt){
            let eredmeny;
                let bodyPos = document.body.getBoundingClientRect();
//                let bodyPos = document.getElementById("harmadikReteg").getBoundingClientRect();
                let posok = ennek.getBoundingClientRect();
                if(ezt == "x"){
                     eredmeny = posok.left - bodyPos.left;
                 }

                 else if(ezt == "y"){
                    eredmeny =  posok.top - bodyPos.top;
//                    console.log("eredmeny: " + eredmeny);
                }
                return eredmeny;
            }
            
          
         </script>';
}