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
  whicholeada = 0;
  oleadaData;
  enemies = [];
  card;
  stads;
  //Constructor
  constructor(_oleada,_scene,_textura){ //Pasamos la path del archivo a leer
    this.oleada = _oleada;  //Asignamos el valor
    this.scene = _scene;
    this.texture = _textura;
    if(this.oleada == undefined || this.oleada == null) console.log("MONDONGO") //Comprobación de que lee bien el archivo
    //Lo abrimos y seteamos las características de la oleada
    else{
      this.whicholeada++;
        this.scene.load.json('oleada',this.oleada);
        this.scene.load.once('complete', () => {
            this.oleadaData = this.scene.cache.json.get('oleada'); // Obtener datos cargados
            this.row = this.oleadaData.Oleadas[this.whicholeada].Filas;
            this.col = this.oleadaData.Oleadas[this.whicholeada].Columnas;
            let enemies = this.row * this.col;
            for(let i = 0; i < enemies; i++){
              this.enemies[i] = this.oleadaData.Oleadas[this.whicholeada].Enemigos[i]
            }
        });
        this.scene.load.start(); 
      }
    }
    SummonEnemy(){
          this.Enemymat = new Matriz(this.row,this.col,this.scene,'MatrixGround2',true); //Creamos la matriz
          var totalenem = 0;
          for(let i = 0; i < this.row; ++i){
              for(let j = 0; j < this.col; ++j){
                  this.stads = new EnemyStads(this.enemies[totalenem]);
                  this.texture = this.stads.unit_type; 
                  this.card = new CardClass(this.scene,i,j,this.texture,this.stads);
                  this.Enemymat.mat[i][j].SetUnit(this.card.SummonUnit(this.texture));
                  totalenem++;
                  }
          }
    }
  }