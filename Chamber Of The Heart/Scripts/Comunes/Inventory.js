export default class Inventory{
    numgift;
    numcards;
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
        this.numcards++;
    }
    GetGitf(){
        return this.numgift
    }
}