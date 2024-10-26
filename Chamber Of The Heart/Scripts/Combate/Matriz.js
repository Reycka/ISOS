import SlotClass from "./SlotClass.js"
export default class Matriz {
    mat; //Matriz de enteros que representa la posición donde se colocará la tropa
    row; //Filas de la matriz
    col; //Columnas de la matriz
    constructor(_fil, _col) {
        // Construye las dos matrices, la que almacena las tropas y la que indica si hay tropa o no
        // En este caso siempre las inicializa vacías, es decir, a False
        this.row = _fil;
        this.col = _col;
        this.mat = new Array(this.row);
        for (let i = 0; i < this.row; i++) {
            this.mat[i] = new Array(this.col);
            for (let j = 0; j < this.col; j++) {
                this.mat[i][j] = new SlotClass();
            }
        }
    }
    render(){
        for(let i = 0; i < this.row; i++){
            for(let j = 0; j < this.col; i++){
                console.log("Me pinto" + "\n");
                deph.number(0); //Colocamos al fondo todo
                this.add.image('backgroundMat',"IP"); //Colocamos el fondo
                if(mat[i][j].GetState()){ //Comprobamos si la matriz está ocupada
                    console.log("Estoy ocupada" + "\n"); //Debug
                    mat[i][j].render(); //Si lo está renderizamos la tropa
                }
            }
        }
    }
}