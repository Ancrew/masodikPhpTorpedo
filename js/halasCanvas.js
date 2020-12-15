

let halasC = document.getElementById("halasCanvas");
canvasMagassag=window.innerHeight/2;
halasC.width=window.innerWidth;
halasC.height=canvasMagassag;
let frame=0;
let elsoReteg = document.getElementById("elsoReteg");
let raj = 25;
let sebesseg = 2;
let randomYPoz = Math.random() * canvasMagassag;
let tartalom= halasC.getContext("2d");
fejlec=document.getElementsByTagName("head");
//let hal= document.createElement("img");
//hal.src = "svg/hal.svg";
//hal.id="halkep";
//let halW = hal.width*0.3;
//let halH = hal.height*0.3;ss
//halasC.appendChild(hal);
//elsoReteg.appendChild(hal);
console.log("magassága canvas: " + halasC.height);
// let kepCss = document.createElement("style");
// kepCss.innerHTML = '.halkep{ border: 10px solid red;}';
//  document.getElementsByTagName("head")[0].appendChild(kepCss);      
//        document.body.appendChild(kepCss);

let hal = class Hal{
    
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.vy = 0;
        this.szog=0.1;
        this.halaim = [];
        this.kep = document.createElement("img");
       
        this.kep.src = "svg/halam.svg";
//        this.kep.background = "none";
        this.className = "halkep";
        this.width = this.kep.width * 0.6;
//        this.height = this.kep.height * 0.2;
        this.height = this.kep.height * 0.6;
        this.sajatCanvas = document.createElement("CANVAS");
        
        this.sajatCanvas.width = this.kep.width;
        this.sajatCanvas.height = this.kep.height;
        this.sajatTartalom = this.sajatCanvas.getContext("2d");
        this.sajatTartalom.drawImage(this.kep,0,0,this.width,this.height);
//        this.alapHeight=window.innerHeight/5;
//        this.alapWidth=window.innerWidth;;
       
        
    }
    getx(){                                                                     //teszteléshez használtam
        return this.x;
    }
    draw(){
        if (frame % 10 === 0) {
            if(this.szog < 0.5){
                this.aktSzog += this.szog;
            }
            if(this.szog > 0.5){
                this.aktSzog -= this.szog;
            }
        
//        this.halaim = document.getElementsByClassName("halkep");
//            for (var i = 0; i < this.halaim.size; i++) {
//                this.style="border: 1px solid black;";
//            }
        console.log(this.szog);
        
        }
       
//        this.style= "transform: rotate(20deg)";


//        this.sajatTartalom.clearRect(this.x-1, this.y-1, this.width+2, this.height+2);            //teszt önmegsemmisítés
        tartalom.clearRect(this.x-2, this.y-2, this.width+4, this.height+4);            //teszt önmegsemmisítés
        this.sajatTartalom.clearRect(0, 0, this.width, this.height);            //teszt önmegsemmisítés
        this.sajatTartalom.rotate(this.aktSzog);
       this.sajatTartalom.drawImage(this.kep,0,0,this.width,this.height);
        
        tartalom.drawImage(this.sajatCanvas,this.x,this.y,this.sajatCanvas.width,this.sajatCanvas.height);
        this.x += sebesseg;
        
        
//        console.log(this);
        
    }
    
}
function getRandom(){
    return Math.random() * canvasMagassag-50;
}
function animate(){
    if (frame % 10 === 0 && halak.length < raj){
        halak.push(new hal(-100,getRandom()));
    }
    frame++;
//    console.log("frame" + frame);
//    console.log("halak száma: " + halak.length);
    if(frame > 100){
        frame = 1;
    }
//   tartalom.clearRect(0, 0, tartalom.width, tartalom.height);
    for (var i = 0; i < halak.length; i++) {
//         console.log(i + "edik hal: " + halak[i].getx());
          halak[i].draw();
//            tartalom.clearRect(0, 0, tartalom.width, tartalom.height);
    }
  requestAnimationFrame(animate);
}

let halak = [];

animate();

 
 
 console.log("A halasC" +  halasC);
console.log("A canvas  szélessége: " +  halasC.width);
console.log("A canvas  style magassága: " +  halasC.height);
//context.font = "bold 60pt Raleway";
//		context.fillStyle = "#000";
////		context.fillText ("HTML5 Canvas", 40, 80);
//		context.strokeStyle = "#000";
//		context.lineWidth = 3;
//		context.fillStyle = "#ccc";
//		context.textAlign = "center";
//		context.fillText ("HTML5 Canvas", 320, 160);
//		context.strokeText ("HTML5 Canvas", 320, 160);
//window.addEventsListener("load",showText,false);



//var wrh = halasC.width / halasC.height;
//            var newWidth = hal.width/wrh;
//            var newHeight = newWidth / wrh;
////     
//// 
//            context.drawImage(hal,0,0,newWidth,newHeight);