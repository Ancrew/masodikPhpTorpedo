class VilagitoHal{
    constructor(){
        this.x = 20;
        this.ujY;
        this.ujX;
        this.xPozicioban = false;
        this.yPozicioban = false;
        this.ujXPosKereso();
        this.ujYPosKereso();
        this.yString = "0px";
        this.xString = "0px";
        this.hal = document.createElement("img");
        this.y = this.getPos("y");
        this.hal.id = "vilagitoHal";
        this.hal.src="img/vilagito.jpg";
        document.getElementById("tartalmazo").appendChild(this.hal);
//        this.hal.style.left = "0px";
        this.hal.style.top = "0px";
        
    }
    kovet(x,y){
//            this.hal.style.left = Math.floor(x) + "px";
//            
//            
////            if(this.getPos("y") < y){
////                this.y = y-this.getPos("y");
////                this.hal.style.top = this.y+"px";
////            }
////            if(this.getPos("y") > y){
//            if (y <= this.getPos("y")+this.ujY){
//                this.y += 10;
//                if(this.y > y+this.ujY){
//                    this.ujPosKereso();
//                }
//            }
//            else if(y >= this.getPos("y")-this.ujY){
//                this.y -= 10;
//                if(this.y < y-this.ujY){
//                    this.ujPosKereso();
//                }
//            }
                this.helyezkedes(x, y);
                this.yString = (this.y * -1) + "px";
                this.xString = this.x + "px";
//                console.log("ystring: " + this.yString);
                this.hal.style.top = this.yString;
                this.hal.style.left = this.xString;
//            }
//            }
//            this.hal.style.top = (parseInt(this.getPos("y"))) + "px";
//            console.log(this.y);
            
//            console.log("y: " + y);
            
        }
        
        helyezkedes(x, y){
            console.log("y: " + y);
            console.log("thisY: " + this.y);
            console.log("this.gety: " + parseInt(this.getPos("y") + this.ujY));
            console.log("X: " + x);
            console.log("thisX: " + this.x);
            console.log("this.x: " + parseInt(this.getPos("x") + this.ujX));
            
            if(y >= parseInt(this.getPos("y") + this.ujY)){
               this.yPozicioban=false;
                this.y -= 10;
                if(this.y <= parseInt(this.getPos("y") + this.ujY)){
//                   this.yPozicioban=true;
                    this.ujYPosKereso();
                }
            }
            else if(y <= parseInt(this.getPos("y") + this.ujY)){
                this.y += 10;
                this.yPozicioban=false;
                if(this.y >= parseInt(this.getPos("y") + this.ujY)){
//                   this.yPozicioban=true;
                     this.ujYPosKereso();
                }
            }
            if (x <= parseInt(this.getPos("x") + this.ujX)){
                this.x -= 5;
                 this.xPozicioban=false;
                if(this.x <= parseInt(this.getPos("x") + this.ujX)){
                   this.xPozicioban=true;
                   this.ujXPosKereso();
                }
            }
            else if(x >= parseInt(this.getPos("x") + this.ujX)){
                this.x +=5;
                 this.xPozicioban=false;
                if(this.x >= parseInt(this.getPos("x") + this.ujX)){
                   this.xPozicioban=true;
                   this.ujXPosKereso();
                }
                
                
            }
//            console.log("pozicioban: " + this.pozicioban);
//            if(this.xPozicioban || this.yPozicioban){
//                    this.ujPosKereso();
//                }
        }
        
        
        ujXPosKereso(){
            this.ujX=Math.random() * 800 - 400;
        }
        ujYPosKereso(){
            this.ujY=Math.random() * 800 - 400;
        }

        getPos(ezt){
                let eredmeny;
                let bodyPos = document.body.getBoundingClientRect();
                let posok = this.hal.getBoundingClientRect();
//                console.log(posok);
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


}