import Matriz from "./Matriz.js";
export default class EnemyMatriz{
  //Parámetros
  row;
  col;
  id;
  Enemymat;
  oleada;
  //Constructor
  constructor(_oleada,_id){ //Pasamos la path del archivo a leer
    this.oleada = _oleada;  //Asignamos el valor
    this.id = _id;
    if(oleada == undefined || oleada == null) console.log("MONDONGO") //Comprobación de que lee bien el archivo
    //Lo abrimos
    fetch(this.oleada) 
  .then(res => res.text())
  .then(content => {
    let lines = content.split(/\n/); //Separamos por espacios en blanco
    lines.forEach(line => console.log(line)); //DEBUG
  });
  this.row = line[0,0]; //Asignamos el tamaño de la fila
  this.col = line[1,0]; //Asignamos el tamaño de la columna
  this.Enemymat = new Matriz(this.row); //Creamos la matriz
  //Asignamos las tropas en función de lo leído en archivo
  for(let i = 0; i < this.row; ++i){
    this.Enemymat[i] = new Array(this.col); //La hacemos matriz
    for(let j = 0; j < this.col; ++j){
        this.Enemymat[i][j].SetUnit(line[i,j]);
    }
  }
  this.Enemymat.render(this.id); //Pintamos el fondo de la matriz  
  }
}