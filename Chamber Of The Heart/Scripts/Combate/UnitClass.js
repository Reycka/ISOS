import CardClass from "../Comunes/CardClass.js";
import CardLogic from "../Comunes/CardLogic.js";
export default class UnitClass{
card;
isahealer;
cooldown;
actcooldown;
pos;
altered_state;
unittexture;
acthealth;
unitType;
constructor(cardclass, _unittexture){
    this.unittexture = _unittexture;
    this.card = cardclass.CardClass.stads;
    this.isaplayer =this.card.CardLogic.iscard;
    this.acthealth =  this.card.CardLogic.health;
    this.cooldown = this.card.CardLogic.speed;
    this.unitType = this.card.CardLogic.unit_type;
    this.actcooldown = this.cooldown; 
}
Attack(enemy){
if(this.actcooldown < 0){
    enemy.UnitClass.GetDamage(this.card.attack,this.unitType);
}
else this.actcooldown--;
}

GetDamage(atq,type){
    var multi
    //seteamos el multi de daño
    if((type == "LA"||type=="SA") &&(this.unitType=="G"||this.unitType=="C" )){

    }
    else if((type == "M") &&(this.unitType=="LA"||this.unitType=="A" )){

    }
    else if((type == "C"||type=="G") &&(this.unitType=="M"||this.unitType=="H" )){   

    }
    else multi = 1;
daño= ((atq/this.card.defense)*multi)+1;
this.acthealth -= daño;
}

}