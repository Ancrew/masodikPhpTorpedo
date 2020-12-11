

let halasC = document.getElementById("halasCanvas");
canvasMagassag=window.innerHeight/2;
halasC.width=window.innerWidth;
halasC.height=canvasMagassag;
let frame=0;
let elsoReteg = document.getElementById("elsoReteg");
let raj = 25;
let sebesseg = 0.5;
let randomYPoz = Math.random() * canvasMagassag;
let tartalom= halasC.getContext("2d");
//let hal= document.createElement("img");
//hal.src = "svg/hal.svg";
//hal.id="halkep";
//let halW = hal.width*0.3;
//let halH = hal.height*0.3;
//halasC.appendChild(hal);
//elsoReteg.appendChild(hal);
console.log("magassága canvas: " + halasC.height);


let hal = class Hal{
    
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.vy = 0;
        
        this.kep = document.createElement("img");
         this.kep.src = "svg/hal.svg";
        this.kep.class = "halkep";
        
        this.width = this.kep.width * 0.2;
        this.height = this.kep.height * 0.2;
       
//        this.alapHeight=window.innerHeight/5;
//        this.alapWidth=window.innerWidth;;
       
        
    }
    getx(){
        return this.x;
    }
    draw(){
        
        this.x += sebesseg;
        tartalom.drawImage(this.kep,this.x,this.y,this.width,this.height);
        
    }
    
}
function getRandom(){
    return Math.random() * canvasMagassag;
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
   tartalom.clearRect(0, 0, tartalom.width, tartalom.height);
    for (var i = 0; i < halak.length; i++) {
//         console.log(i + "edik hal: " + halak[i].getx());
          halak[i].draw();
            tartalom.clearRect(0, 0, tartalom.width, tartalom.height);
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