export default class Inventory{
    numgift;
    numcards;
    constructor(){
        this.numgift = 0;
        this.numcards = 0;
        
    }
    AddGift(n) {
        ofrendas = ofrendas + n;
    }
    RemoveGift(n){ 
        if(this.CheckGift(n))this.gift = this.numgift - n;
    }
    CheckGift(n){
        return this.numgift>= n;
    }
    AddCard(){
        this.numcards++;
    }
}