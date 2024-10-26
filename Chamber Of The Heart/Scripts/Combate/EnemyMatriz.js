
import Matriz from "./Matriz.js";
export default class EnemyMatriz extends Phaser.GameObjects.Sprite {
  row;
  col;
  Enemymat;
  oleada
  constructor(_oleada){ //Como se leen archivos txt en js??
    oleada = _oleada; 
    if(oleada == undefined || oleada == null) console.log("MONDONGO")
    fetch(this.oleada)
  .then(res => res.text())
  .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => console.log(line)); //DEBUG
  });
  this.row = line[0,0];
  this.col = line[1,0];
  this.Enemymat = new Matriz(row,col);
  for(let i = 0; i < this.row; ++i){
    for(let j = 0; j < this.col; ++j){
        this.Enemymat[i][j].SetUnit(line[i,j]);
    }
  }  
  this.Enemymat.render();
  }
}