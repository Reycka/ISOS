import SlotClass from "SlotClass.js"
export default class BattleManager extends Phaser.GameObject.Sprite{
   
};
export class Matriz{
    mat; //Matriz de enteros que representa la posición donde se colocará la tropa
    matBool; //Matriz que indca si la casilla está ocupada o no
    row; //Filas de la matriz
    col; //Columnas de la matriz
    constructor(_fil, _col){
        //Construye la dos matrices, la que almacena las tropas y la que indica si hay tropa o no
        //En este caso siempre las inicializa vacías, es decir, a False
        this.fil = _fil;
        this.col = _col;
        this.mat = new Array[this.row,this.col];
        for(let i = 0; i < this.row; i++){
            for(let j = 0; j < this.col; j++){
                mat[i][j] = new SlotClass();
            }
        }
    }
    render(){
        for(let i = 0; i < this.row; i++){
            for(let j = 0; j < this.col; i++){
                console.log("Me pinto" + "\n");
                deph.number(0); //Colocamos al fondo todo
                this.add.image('backgroundMat',"IP"); //Colocamos el fondo
                if(mat[i,j].GetState()){ //Comprobamos si la matriz está ocupada
                    console.log("Estoy ocupada" + "\n"); //Debug
                    mat[i,j].render(); //Si lo está renderizamos la tropa
                }
            }
        }
    }
}