import Matriz from "./Matriz.js";
export default class EnemyMatriz{
  //Parámetros
  row;
  col;
  scene;
  texture;
  Enemymat;
  oleada;
  //Constructor
  constructor(_oleada,_scene,_textura){ //Pasamos la path del archivo a leer
    this.oleada = _oleada;  //Asignamos el valor
    this.scene = _scene;
    this.texture = _textura;
    if(this.oleada == undefined || this.oleada == null) console.log("MONDONGO") //Comprobación de que lee bien el archivo
    //Lo abrimos hay que revisar como leer archivos de txt en js
    else{
          const reader = new FileReader();
          reader.readAsText(this.oleada);
          this.row = reader.result; //Asignamos el tamaño de la fila
          this.col = reader.result; //Asignamos el tamaño de la columna
          console.log(this.row);
          console.log(this.col);
          this.Enemymat = new Matriz(this.row,this.col,this.scene,this.texture); //Creamos la matriz
          //Asignamos las tropas en función de lo leído en archivo
          for(let i = 0; i < this.row; ++i){
              for(let j = 0; j < this.col; ++j){
                  this.Enemymat.mat[i][j].SetUnit(file[i+2,j]);
                  }
          }
      }
    }
  }