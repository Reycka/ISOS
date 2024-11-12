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
   auxd;
   auxv;
   target = false;
   //CONSTRUCTORA
   constructor(_mat,_oleada,_scene){
    this.mat = _mat;
    this.card = null;
    this.texture = null;
    this.scene = _scene;
    this.enemymatriz = new EnemyMatriz(_oleada,this.scene,this.texture);
    this.victory = false;
    this.defeat = false
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
            this.card = null;
            this.texture = null;
        }
        
   }

       
  
    Battle()
    {
       
        if(this.victory== false &&this.defeat== false)
        {
        //comprobamos las unidades que pueden atacar de la matriz aliada
        //boooleanos para comprobar si quedan tropas
        this.auxv = true;
        this.auxd = true;
        for(var i = 0; i < this.mat.row; i++){
			for(var j = 0; j < this.mat.col; j++){
               
                if(this.mat.mat[i][j].GetState())
                {  
                    
                    this.target = false;
                    if(this.mat.mat[i][j].GetUnit().IsaHealer()){
                        if((i-1)!=-1){
                            if(this.mat.mat[i][j].GetState()){
                                this.mat.mat[i][j].GetUnit().Update(this.mat.mat[i-1][j].GetUnit())
                                this.target = true;
                            }
                        }
                        if((i+1)<this.mat.row){
                            if(this.mat.mat[i+1][j].GetState()) {
                                this.mat.mat[i][j].GetUnit().Update(this.mat.mat[i+1][j].GetUnit())
                                this.target = true;
                            }
                        }if((j-1)!=-1){
                            if(this.mat.mat[i][j-1].GetState()){ 
                                this.mat.mat[i][j].GetUnit().Update(this.mat.mat[i][j-1].GetUnit())
                                this.target = true;
                            }
                        }
                        if((j+1)<this.mat.col){
                            if(this.mat.mat[i][j+1].GetState()){
                                this.mat.mat[i][j].GetUnit().Update(this.mat.mat[i][j+1].GetUnit())
                                this.target = true;
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
                            if(this.enemymatriz.Enemymat.mat[i][j-1].GetState()){ 
                                this.mat.mat[i][j].GetUnit().Update(this.enemymatriz.Enemymat.mat[i][j-1].GetUnit())
                                if(this.enemymatriz.Enemymat.mat[i][j-1].GetUnit().isalife == false){
                                    this.enemymatriz.Enemymat.mat[i][j-1].SetFree();
                                }
                                this.target = true;
                            }
                        }
                        else if(this.enemymatriz.Enemymat.mat[i][j].GetState()){
                            this.mat.mat[i][j].GetUnit().Update(this.enemymatriz.Enemymat.mat[i][j].GetUnit())
                            if(this.enemymatriz.Enemymat.mat[i][j].GetUnit().isalife == false){
                                this.enemymatriz.Enemymat.mat[i][j].SetFree();
                            }
                            this.target = true;
                        }
                        else if((j+1)<this.enemymatriz.Enemymat.col)
                            {
                            if(this.enemymatriz.Enemymat.mat[i][j+1].GetState()){
                                this.mat.mat[i][j].GetUnit().Update(this.enemymatriz.Enemymat.mat[i][j+1].GetUnit())
                                this.target = true;
                                if(this.enemymatriz.Enemymat.mat[i][j+1].GetUnit().isalife == false){
                                    this.enemymatriz.Enemymat.mat[i][j+1].SetFree();
                                }
                            }
                        }
                        else{
                            //movemos a la tropa
                        }
                       

                        }
                
                        this.mat.mat[i][j].GetUnit().Cooldown();
                        this.auxd = false;
                }
                
            }
        }
        //bucle matriz enemigos
        for(var i = 0; i < this.enemymatriz.Enemymat.row; i++){
			for(var j = 0; j < this.enemymatriz.Enemymat.col; j++){
               
                if(this.enemymatriz.Enemymat.mat[i][j].GetState())
                {
                    this.target = false;
                    if(this.enemymatriz.Enemymat.mat[i][j].GetUnit().IsaHealer()){
                        if((i-1)!=-1){
                            if(this.enemymatriz.Enemymat.mat[i][j].GetState()){
                                this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.enemymatriz.Enemymat.mat[i-1][j].GetUnit())
                                this.target = true;
                            }
                        }
                        if((i+1)<this.enemymatriz.Enemymat.row){
                            if(this.enemymatriz.Enemymat.mat[i+1][j].GetState()) {
                                this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.enemymatriz.Enemymat.mat[i+1][j].GetUnit())
                                this.target = true;
                            }
                        }if((j-1)!=-1){
                            if(this.enemymatriz.Enemymat.mat[i][j-1].GetState()){ 
                                this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.enemymatriz.Enemymat.mat[i][j-1].GetUnit())
                                this.target = true;
                            }
                        }
                        if((j+1)<this.enemymatriz.Enemymat.col){
                            if(this.enemymatriz.Enemymat.mat[i][j+1].GetState()){
                                this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.enemymatriz.Enemymat.mat[i][j+1].GetUnit())
                                this.target = true;
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
                                this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.mat.mat[i][j-1].GetUnit())
                                console.log("esta la unidad viva"+this.mat.mat[i][j-1].GetUnit().isalife)
                                if(this.mat.mat[i][j-1].GetUnit().isalife==false){
                                    this.mat.mat[i][j-1].SetFree();
                                    console.log("casilla liberada"+i+j-1);
                                }
                                this.target = true;
                            }
                        }
                        else if(this.mat.mat[i][j].GetState()){
                            this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.mat.mat[i][j].GetUnit())
                            console.log("esta la unidad viva"+this.mat.mat[i][j].GetUnit().isalife)
                            if(this.mat.mat[i][j].GetUnit().isalife==false){
                                this.mat.mat[i][j].SetFree();
                                console.log("casilla liberada"+i+j);
                            }
                            this.target = true;
                        }
                        else if((j+1)<this.mat.col)
                            {
                            if(this.mat.mat[i][j+1].GetState()){
                                this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.mat.mat[i][j+1].GetUnit())
                                console.log("esta la unidad viva"+this.mat.mat[i][j+1].GetUnit().isalife)
                                if(this.mat.mat[i][j+1].GetUnit().isalife==false){
                                    this.mat.mat[i][j+1].SetFree();
                                    console.log("casilla liberada"+i+j+1);
                                }
                                this.target = true;
                            }
                        }
                        else{
                            //movemos a la tropa
                        }
                        this.enemymatriz.Enemymat.mat[i][j].GetUnit().Cooldown();

                        }
                
                       
                        this.auxv = false;
                }
                
            }
        }
        if(this.auxv==true &&this.auxd ==false){
            console.log("has Ganado");
            this.victory = true;
            return false;
        } 
        else if(this.auxv==false &&this.auxd==true) 
        {   console.log("has perdido");
            this.defeat = true;
            return false;
        }
        else {
            console.log("salimos de la matris");
            return true;}
    
       }
    }
    
    
   
};