import CardLogic from "./CardLogic.js";
import CardClass from "./CardClass.js";
import AffinityRegister from "./AffinityRegister.js";
export default class Inventory{
    day = 1;
    numgift;
    numcards;
    listCardlogic = [];
    listCardClass=[]
    affreg;
    constructor(){
        this.numgift = 0;
        this.numcards = 0;
        this.day = 1;
        this.affreg = new AffinityRegister();
        
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

            
         
            var cardLogic = new CardLogic(this.affreg.GetRandomLetter()); 
            this.listCardlogic.push(cardLogic);
          
            this.listCardClass.push(new CardClass(scene, 1, 1,cardTexture, cardLogic));
            console.log(this.listCardClass); 
            this.numcards++;
    }
    increaseDay(){
        this.day++;
    }
    GetGitf(){
        return this.numgift
    }
    GetNumCards(){
        return this.numcards;
    }
}