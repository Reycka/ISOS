//import Unit from UnitClass cuando tengamos la clase Unit hecha
export default class SlotClass extends Phaser.sprites{
///PROPIEDADES
 unit
 //Tamaño de la matriz
 row = 0;
 col = 0;
 //Matrices a usar, una representa la matriz como tal para ser rellenada con tropas mientra que la otra se encarga de controlar si está ocupada la casilla o no
 mat;
 matBool;
 //Asigna el tamaño a la matriz y setea todo a False en un principio

//CONSTRUCTOR
//REVISAR EL COMO PASO LA TROPA
    constructor(_fil, _col, _unit){
        console.log("Me construyo" + "\n");
        this.row = _fil;
        this.col = _col;
        this.unit = _unit;
        this.mat = new Array[this.row,this.col];
        this.matBool = this.mat;
        for(let i = 0; i < this.row; i++){
            for(let j = 0; j < this.col; j++){
                this.mat[i,j] = this.unit;
                if(mat[i,j] == null || mat[i,j] == undefined){
                    this.matBool[i,j] = false;
                }
                else this.matBool[i,j] = true;
            }
        }
    }
//MÉTODOS
    render(){
        for(let i = 0; i < this.row; i++){
            for(let j = 0; j < this.col; i++){
                console.log("Me pinto" + "\n");
                deph.number(0);
                //Colocamos la Capa en la posición del fondo
                //Comando para colocar la imagen
                if(this.GetState(i,j)){
                    console.log("Estoy ocupada" + "\n"); //Debug
                    deph.number(1);
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
            console.log("Seteo" + "\n"); //Debug
            mat[posX,posY] = unit; //Cuando se tenga la clase Unit ver como se hace
            this.matBool[posX,posY] = true;
        }
    }
    //Devuelve si hay una tropa o no en dicha posición
    GetState(posX,posY){
        console.log(this.matBool[posX,posY] + "\n");
        return this.matBool[posX,posY];
    }   
    //Método que se llamará cada vez que una tropa muera o se desplace, setea a false el si hay tropa y vacía la posición en la matriz
    SetFree(posX,posY){
            this.matBool[psoX,posY] = false;
    }
    
    //Asigna la tropa pasada a la nueva posición y setea a true en la matriz de booleanos
    SetFull(posX,posY){
        if(!this.GetState(posX,posY)){
            //Llamada al método que cambia la posición de la tropa
            this.mat[posX,posY] = null; //EN LUGAR DE NULL ASIGNAR LA TROPA PASADA
            this.matBool[posX,posY] = true;
        }
    }

};