//import Unit from UnitClass cuando tengamos la clase Unit hecha
class SlotClass extends Phaser.sprites{
///PROPIEDADES
 // Aun no hay clase UnitClass UnitClass unit; //Representa a la tropa
 //Tamaño de la matriz
 tamX = 0;
 tamY = 0;
 //Matrices a usar, una representa la matriz como tal para ser rellenada con tropas mientra que la otra se encarga de controlar si está ocupada la casilla o no
 mat;
 matBool;
 //Asigna el tamaño a la matriz y setea todo a False en un principio
    constructor(_tamX, _tamY, _unit){
        console.log("Me construyo")
        this.tamX = _tamX;
        this.tamY = _tamY;
        //this.unit = _unit;
        this.mat = new Array[this.tamX,this.tamY];
        this.matBool = this.mat;
        for(let i = 0; i < this.tamX; i++){
            for(let j = 0; j < this.tamY; j++){
                this.matBool[i,j] = false;
            }
        }
    }
    render(){
        for(let i = 0; i < this.tamX; i++){
            for(let j = 0; j < this.tamY; i++){
                console.log("Me pinto")
                //Colocamos la Capa en la posición del fondo
                //Comando para colocar la imagen
                if(this.GetState(i,j)){
                    console.log("Estoy ocupada") //Debug
                    //Colocanos la Capa en posición tropa
                    //Comando para colocar la imagen
                }
            }
        }
    }
    //coloca la unidad en la casilla y pone el booleano ocupada en true.
    //Unit Representa la Unidad a colocar
    //posX y posY representan la casilla en la que se quiere colocar
    SetUnit(unit,posX,posY){
        if(!this.GetState(posX,posY)){
            console.log("Seteo") //Debug
            mat[posX][posY] = unit; //Cuando se tenga la clase Unit ver como se hace
            this.matBool[posX][posY] = true;
        }
    }
    //Devuelve si hay una tropa o no en dicha posición
    GetState(posX,posY){
        console.log(this.matBool[posX][posY])
        return this.matBool[posX][posY];
    }   
    SetFree(){

    }
    
    SetFull(){

    }

};