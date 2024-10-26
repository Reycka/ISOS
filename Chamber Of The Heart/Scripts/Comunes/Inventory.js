import CardLogic from "./CardLogic.js";
import CardClass from "./CardClass.js";
export default class Inventory{
    numgift;
    numcards;
    listCardlogic = [];
    listCardClass=[]
    constructor(){
        this.numgift = 0;
        this.numcards = 0;
     
        
    }
    AddGift(n) {
        this.numgift = this.numgift + n;
    }
    RemoveGift(n){ 
        if(this.CheckGift(n))this.numgift = this.numgift - n;
    }
    CheckGift(n){
        return this.numgift>= n;
    }
    
    AddCard(scene, cardTexture) { 
            var cardLogic = new CardLogic(); 
            this.listCardlogic.push(cardLogic);
          
            this.listCardClass.push(new CardClass(scene, 1, 1,cardTexture, cardLogic));
            console.log(this.listCardClass); 
            this.numcards++;
    }
    GetGitf(){
        return this.numgift
    }
}