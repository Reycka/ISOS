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
constructor(cardclass, _unittexture){
    this.unittexture = _unittexture;
    this.card = cardclass.stads;
    this.isaplayer =this.card.iscard;
    this.isahealer = this.card.isHealer;
    this.acthealth =  this.card.health;  
    this.cooldown = this.card.speed;
    this.unitType = this.card.unit_type;
    this.actcooldown = this.cooldown; 
}
GetTexture(){
    return this.unittexture;
}
GetIsaHealer(){
    return this.isahealer;
}
Update(unit){
        console.log("entroen mi update" + this.cooldown)
    if(this.isahealer){
        this.Heal(unit);
    }
    else this.Attack(unit);
}
Attack(enemy){
if(this.actcooldown <= 0){
    enemy.GetDamage(this.card.attack,this.unitType);
    this.actcooldown = this.cooldown;
}
}
Cooldown(){

    this.cooldown--;
}
Heal(ally){
    
    if(this.actcooldown <= 0){
        ally.ReciveHeal(this.card.CardLogic.attack);
        this.actcooldown = this.cooldown;
    }
}
ReciveHeal(n){
    this.acthealth +=n;
    if(this.acthealth> this.card.CardLogic.health)
        {
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
    
var daño= ((atq/this.card.defense)*multi)+1;
   
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