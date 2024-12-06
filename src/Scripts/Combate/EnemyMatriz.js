import Matriz from "./Matriz.js";
import EnemyStads from "./EnemyStads.js";
import CardClass from "../Comunes/CardClass.js";
export default class EnemyMatriz {
  //Parámetros
  row;
  col;
  scene;
  texture;
  Enemymat;
  oleada;
  whicholeada;
  oleadaData;
  enemies = [];
  card;
  stads;
  enemycount;
  texts
  isABoss;
  //Constructor
  constructor(_oleada, _scene, _textura,_whichOleada) { //Pasamos la path del archivo a leer
    this.oleada = _oleada;  //Asignamos el valor
    this.scene = _scene;
    this.texture = _textura;
    this.whicholeada = _whichOleada;
    this.enemycount = 0;
    this.isABoss = false;
  }
  EsribeEnemigo(enemigo,totalenemigos){
    let rep = false;
    let index = 0;
    while(!rep && index < totalenemigos - 1){
      if(this.enemies[index] == enemigo) rep = true;
      index++;
    }
    if(!rep) {
      switch (enemigo){
        case 'G':
          enemigo = "GUERRERO"
          break;
        case 'SA':
          enemigo = "ARCO CORTO"
          break;
        case 'LA':
            enemigo = "ARCO LARGO"
          break;
        case 'M':
            enemigo = "MAGO"
          break;
        case 'C':
            enemigo = "CARRO"
          break;
        case 'H':
            enemigo = "CURANDERO"
          break;
        case 'B':
            enemigo = "?????"
            break;
      }
      this.texts[this.enemycount] = this.scene.add.text(1600,(300 + this.enemycount * 100),enemigo).setScale(2,2);
      this.enemycount++;
    }
  }
    SetOleada(){
      if(this.oleada == undefined || this.oleada == null) console.log("MONDONGO") //Comprobación de que lee bien el archivo
      //Lo abrimos y seteamos las características de la oleada
      else{
          this.scene.load.json('oleada',this.oleada);
          this.scene.load.once('complete', () => {
              this.oleadaData = this.scene.cache.json.get('oleada'); // Obtener datos cargados
              this.row = this.oleadaData.Oleadas[this.whicholeada].Filas;
              this.col = this.oleadaData.Oleadas[this.whicholeada].Columnas;
              let enemies = this.row * this.col;
              let indexactual = 0;
              this.texts  = [];
              for(let i = 0; i < enemies; i++){
                this.enemies[i] = this.oleadaData.Oleadas[this.whicholeada].Enemigos[i];
                indexactual++;
                this.EsribeEnemigo(this.enemies[i],indexactual);
                if(this.enemies[i] == "B"){
                  this.isABoss = true;
                }
              }
          });
          this.scene.load.start(); 

        }
    }
    EliminaLista(){
      for(let i = 0; i < this.enemycount;i++){
        this.texts[i].setVisible(false);
      }
    }
    SummonEnemy(){
      let filpos;
      if(this.whicholeada == 1) filpos = 480;
      else if(this.whicholeada == 2) filpos = 320;
      else filpos = 160;
          this.Enemymat = new Matriz(this.row,this.col,this.scene,'MatrixGround2',true,filpos); //Creamos la matriz
          var totalenem = 0;
          if(this.isABoss){
            let boss = null;
            for(let i = 0; i < this.row; ++i){
              for(let j = 0; j < this.col; ++j){
                  if(this.enemies[totalenem] == "B" && boss == null){
                    this.stads = new EnemyStads(this.enemies[totalenem]);
                    this.texture = this.stads.unit_type; 
                    this.card = new CardClass(this.scene,i,j,this.texture,this.stads);
                    this.Enemymat.mat[i][j].SetUnit(this.card.SummonUnit(this.texture));
                    totalenem++;
                    boss = this.Enemymat.mat[i][j].GetUnit();
                  }
                  else if(this.enemies[totalenem] == "B"){
                    this.Enemymat.mat[i][j].SetUnit(boss);
                    totalenem++;
                  }
                  else{
                    this.stads = new EnemyStads(this.enemies[totalenem]);
                    this.texture = this.stads.unit_type; 
                    this.card = new CardClass(this.scene,i,j,this.texture,this.stads);
                    this.Enemymat.mat[i][j].SetUnit(this.card.SummonUnit(this.texture));
                    totalenem++;
                  }
              }
          }
          }
          else{
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
  }
