import SlotClass from "./SlotClass.js"
export default class Matriz{
    mat; //Matriz de enteros que representa la posición donde se colocará la tropa
    row; //Filas de la matriz
    col; //Columnas de la matriz
    constructor(_fil, _col,scene, _slottexture,isenemy,posfil) {
        // Construye las dos matrices, la que almacena las tropas y la que indica si hay tropa o no
        // En este caso siempre las inicializa vacías, es decir, a False
        this.row = _fil;
        this.col = _col;
        this.mat = new Array(this.row);
        
        if(isenemy==false){
            var par = 0;
        for (let i = 0; i < this.row; i++) {
            this.mat[i] = new Array(this.col);
           
            for (let j = 0; j < this.col; j++) {
                //j * 180  + 550 , i * 160 + 150
                this.mat[i][j] = new SlotClass(scene,i,j,_slottexture);
                this.mat[i][j].setPosition(j * 360  + 450 +(par*180), 7*(i * 180 + posfil)/8);
            }
            if(par == 0){
                par = 1;
            }
            else par = 0;
            
        }
        }else {
            var par = 0;
            for (let i = 0; i < this.row; i++) {
                this.mat[i] = new Array(this.col);
           
                for (let j = 0; j < this.col; j++) {
                    //j * 180  + 550 , i * 160 + 150
                    this.mat[i][j] = new SlotClass(scene,i,j,_slottexture);
                    this.mat[i][j].setPosition(j * 360  +1250+(par*180), 7*(i * 180+ posfil)/8);
                }
                if(par == 0){
                    par = 1;
                }
                else par = 0;
            }
    }
    }
    GetSlot(posX,posY){
        return this.mat[posX][posY];
    }
}