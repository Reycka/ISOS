//Tiene que al pillar una carta del inventario se quede como carta seleccionada y que si se clica en una SlotClass instancie la unidad hay
//Si hay una unidad en la casilla NO HACE NADA (por el momento)
//La carta al clickar llama la battleManager y se hace desde la propia escena
import Matriz from "./Matriz.js"
import EnemyMatriz from "./EnemyMatriz.js"
import SlotClass from "./SlotClass.js";
import CardClass from "./../Comunes/CardClass.js";
//import Inventory from "../Comunes/Inventory.js"
export default class BattleManager{
   //PROPIEDADES
   mat; //matriz que le vamos a pasar
   card; //Representa la carta seleccionada del inventario
   texture;
   enemymatriz; //Matriz de enemigos que se crea aquí
    victory = false;
    defeat = false;
   scene;
   //CONSTRUCTORA
   constructor(_mat,_oleada,_scene){
    this.mat = _mat;
    this.card = null;
    this.texture = null;
    this.scene = _scene;
    this.enemymatriz = new EnemyMatriz(_oleada,this.scene,this.texture);
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
   StartBattle(){
    while(!this.victory||!this.defeat){
        //comprobamos las unidades que pueden atacar de la matriz aliada
        //boooleanos para comprobar si quedan tropas
        auxv = true;
        auxd = true;
        for(let i = 0; i < this.mat.mat.row; i++){
			for(let j = 0; j < this.mat.mat.col; j++){

                if(this.mat.mat[i][j].GetState())
                {
                    target = false;
                    if(this.mat.mat[i][j].GetUnit().IsaHealer()){
                        if((i-1)!=-1){
                            if(this.mat.mat[i][j].GetState()){
                                this.mat.mat[i][j].GetUnit().update(this.mat.mat[i-1][j].GetUnit())
                                target = true;
                            }
                        }
                        if((i+1)<this.mat.mat.row){
                            if(this.mat.mat[i+1][j].GetState()) {
                                this.mat.mat[i][j].GetUnit().update(this.mat.mat[i+1][j].GetUnit())
                                target = true;
                            }
                        }if((j-1)!=-1){
                            if(this.mat.mat[i][j-1].GetState()){ 
                                this.mat.mat[i][j].GetUnit().update(this.mat.mat[i][j-1].GetUnit())
                                target = true;
                            }
                        }
                        if((j+1)<this.mat.col){
                            if(this.mat.mat[i][j+1].GetState()){
                                this.mat.mat[i][j].GetUnit().update(this.mat.mat[i][j+1].GetUnit())
                                target = true;
                            }
                        }
                        if(!target){
                            //movemos la unidad
                        }
                        
                    }
                    else
                        {
                        //unidades que no curan
                        if((j-1)!=-1){
                            if(this.enemymatriz.Enemymat[i][j-1].GetState()){ 
                                this.mat.mat[i][j].GetUnit().update(this.enemymatriz.Enemymat[i][j-1].GetUnit())
                                target = true;
                            }
                        }
                        else if(this.enemymatriz.Enemymat[i][j].GetState()){
                            this.mat.mat[i][j].GetUnit().update(this.enemymatriz.Enemymat[i][j].GetUnit())
                            target = true;
                        }
                        else if((j+1)<this.enemymatriz.Enemymat.col)
                            {
                            if(this.enemymatriz.Enemymat[i][j+1].GetState()){
                                this.mat.mat[i][j].GetUnit().update(this.enemymatriz.Enemymat[i][j+1].GetUnit())
                                target = true;
                            }
                        }
                        else{
                            //movemos a la tropa
                        }
                       

                        }
                
                        this.mat.mat[i][j].GetUnit().Cooldown();
                        auxd = false;
                }
                
            }
        }
        //bucle matriz enemigos
        for(let i = 0; i < this.enemymatriz.Enemymat.row; i++){
			for(let j = 0; j < this.enemymatriz.Enemymat.col; j++){

                if(this.enemymatriz.Enemymat[i][j].GetState())
                {
                    target = false;
                    if(this.enemymatriz.Enemymat[i][j].GetUnit().IsaHealer()){
                        if((i-1)!=-1){
                            if(this.enemymatriz.Enemymat[i][j].GetState()){
                                this.enemymatriz.Enemymat[i][j].GetUnit().update(this.enemymatriz.Enemymat[i-1][j].GetUnit())
                                target = true;
                            }
                        }
                        if((i+1)<this.enemymatriz.Enemymat.row){
                            if(this.enemymatriz.Enemymat[i+1][j].GetState()) {
                                this.enemymatriz.Enemymat[i][j].GetUnit().update(this.enemymatriz.Enemymat[i+1][j].GetUnit())
                                target = true;
                            }
                        }if((j-1)!=-1){
                            if(this.enemymatriz.Enemymat[i][j-1].GetState()){ 
                                this.enemymatriz.Enemymat[i][j].GetUnit().update(this.enemymatriz.Enemymat[i][j-1].GetUnit())
                                target = true;
                            }
                        }
                        if((j+1)<this.mat.col){
                            if(this.enemymatriz.Enemymat[i][j+1].GetState()){
                                this.enemymatriz.Enemymat[i][j].GetUnit().update(this.enemymatriz.Enemymat[i][j+1].GetUnit())
                                target = true;
                            }
                        }
                        if(!target){
                            //movemos la unidad
                        }
                        
                    }
                    else
                        {
                        //unidades que no curan
                        if((j-1)!=-1){
                            if(this.mat.mat[i][j-1].GetState()){ 
                                this.enemymatriz.Enemymat[i][j].GetUnit().update(this.mat.mat[i][j-1].GetUnit())
                                target = true;
                            }
                        }
                        else if(this.mat.mat[i][j].GetState()){
                            this.enemymatriz.Enemymat[i][j].GetUnit().update(this.mat.mat[i][j].GetUnit())
                            target = true;
                        }
                        else if((j+1)<this.mat.mat.col)
                            {
                            if(this.mat.mat[i][j+1].GetState()){
                                this.enemymatriz.Enemymat[i][j].GetUnit().update(this.mat.mat[i][j+1].GetUnit())
                                target = true;
                            }
                        }
                        else{
                            //movemos a la tropa
                        }
                       

                        }
                
                        this.enemymatriz.Enemymat[i][j].GetUnit().Cooldown();
                        auxv = false;
                }
                
            }
        }

    }

   }
   
};