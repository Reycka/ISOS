//Tiene que al pillar una carta del inventario se quede como carta seleccionada y que si se clica en una SlotClass instancie la unidad hay
//Si hay una unidad en la casilla NO HACE NADA (por el momento)
//La carta al clickar llama la battleManager y se hace desde la propia escena
import Matriz from "./Matriz.js"
import EnemyMatriz from "./EnemyMatriz.js"
import CardClass from "./../Comunes/CardClass.js";
//import Inventory from "../Comunes/Inventory.js"
export default class BattleManager{
   //PROPIEDADES
   mat; //matriz que le vamos a pasar
   card; //Representa la carta seleccionada del inventario
   texture;
   enemymatriz; //Matriz de enemigos que se crea aquí

   //CONSTRUCTORA
   constructor(_mat,_oleada){
    this.mat = _mat;
    this.card = null;
    this.texture = null;
    this.enemymatriz = new EnemyMatriz(_oleada);
   }
   //MÉTODOS
   ///Método encargado asignar la carta seleccionada del inventario al battleManager
   SetCard(_card,id){
    this.card = _card;
    this.texture = id;
    console.log(this.card);
    console.log(this.texture);
   }
   //Método encargado de summonear la tropa en la casilla
   Summon(posX,posY){
        if(this.card != null && !this.mat.mat[posX][posY].GetState()){
            this.mat.mat[posX][posY].SetUnit(this.card.SummonUnit(this.texture));
        }
   }
   
};