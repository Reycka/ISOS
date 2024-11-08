import CardClass from "../Comunes/CardClass.js";
import CardLogic from "../Comunes/CardLogic.js";
export default class UnitClass{
card;
isahealer;
isalife;
cooldown;
actcooldown;
pos;
altered_state;
unittexture;
acthealth;
unitType;
matriz;
constructor(cardclass, _unittexture,matriz){
    this.unittexture = _unittexture;
    this.card = cardclass.CardClass.stads;
    this.isaplayer =this.card.CardLogic.iscard;
    this.acthealth =  this.card.CardLogic.health;
    this.cooldown = this.card.CardLogic.speed;
    this.unitType = this.card.CardLogic.unit_type;
    this.actcooldown = this.cooldown; 
}
GetTexture(){
    return this.unittexture;
}
Attack(enemy){
if(this.actcooldown < 0){
    enemy.UnitClass.GetDamage(this.card.attack,this.unitType);
    this.actcooldown = this.cooldown;
}
else this.actcooldown--;
}
Heal(ally){
    ally.UnitClass.ReciveHeal(this.card.CardLogic.attack);
}
ReciveHeal(n){
    this.acthealth +=n;
    if(this.acthealth> this.card.CardLogic.health){
        this.acthealth = this.card.CardLogic.health;
    }
}

GetDamage(atq,type){
    var multi
    //seteamos el multi de daño
    if((type == "LA"||type=="SA") &&(this.unitType=="G"||this.unitType=="C" )){
        multi = 2;
    }
    else if((type == "M") &&(this.unitType=="LA"||this.unitType=="A" )){
        multi = 2;
    }
    else if((type == "C"||type=="G") &&(this.unitType=="M"||this.unitType=="H" )){   
        multi = 2;
    }
    else multi = 1;
daño= ((atq/this.card.defense)*multi)+1;

this.acthealth -= daño;

if(this.acthealth <0){
    //morite puto
    this.Death();
}
}
Death(){
    this.isalife = false;
    // mdificamos el valor en la matriz para informar de que la casilla esta libre ahora
}
IsaHealer(){
    return this.isahealer;
}
}