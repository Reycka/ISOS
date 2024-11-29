import Matriz from "./Matriz.js";
import EnemyStads from "./EnemyStads.js";
import CardClass from "../Comunes/CardClass.js";
export default class EnemyMatriz{
  //Parámetros
  row;
  col;
  scene;
  texture;
  Enemymat;
  oleada;
  card;
  stads;
  //Constructor
  constructor(_oleada,_scene,_textura){ //Pasamos la path del archivo a leer
    this.oleada = _oleada;  //Asignamos el valor
    this.scene = _scene;
    this.texture = _textura;
    if(this.oleada == undefined || this.oleada == null) console.log("MONDONGO") //Comprobación de que lee bien el archivo
    //Lo abrimos hay que revisar como leer archivos de txt en js
    else{
          /*const reader = new FileReader();
          reader.readAsText(this.oleada);
          this.row = reader.result; //Asignamos el tamaño de la fila
          this.col = reader.result; //Asignamos el tamaño de la columna
          console.log(this.row);
          console.log(this.col);*/
          //Asignamos las tropas en función de lo leído en archivo
          
      }
    }
    SummonEnemy(){
      this.row = 6;
          this.col = 2;
          this.Enemymat = new Matriz(this.row,this.col,this.scene,'MatrixGround2',true); //Creamos la matriz
          for(let i = 0; i < this.row; ++i){
              for(let j = 0; j < this.col; ++j){
                  this.stads = new EnemyStads("SA");
                  //console.log(this.stads);
                  this.texture = this.stads.unit_type; 
                  //console.log(this.texture);
                  this.card = new CardClass(this.scene,i,j,this.texture,this.stads);
                  //console.log(this.card);
                 // console.log(this.Enemymat);
                  this.Enemymat.mat[i][j].SetUnit(this.card.SummonUnit(this.texture));
                  }
          }
    }
  }