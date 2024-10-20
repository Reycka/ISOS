import CardLogic from "./CardLogic.js";
export default class Inventory{
    numgift;
    numcards;
    listCardlogic = [];
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
    AddCard(){
        this.listCardlogic.push(new CardLogic(1,1,1,1,1))
        console.log(this.listCardlogic);
        this.numcards++;
    }
    GetGitf(){
        return this.numgift
    }
}