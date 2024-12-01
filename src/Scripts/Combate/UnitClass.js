import CardClass from "../Comunes/CardClass.js";
import CardLogic from "../Comunes/CardLogic.js";
import AlteredStateClass from "./AlteredStateClass.js";
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
    this.isalife = true;
}
GetTexture(){
    return this.unittexture;
}
GetIsaHealer(){
    return this.isahealer;
}
Update(unit,alteredStateInstance){
    if(this.isahealer){
        this.Heal(unit);
    }
    else this.Attack(unit);

    if (alteredStateInstance){
        alteredStateInstance.applyAlteredStates(this);
    }
}
Attack(enemy){
if(this.actcooldown <= 0){
    enemy.GetDamage(this.card.attack,this.unitType);
    this.actcooldown = this.cooldown;
}
}
Cooldown(){

    this.actcooldown-=1;
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
    
var daño= (Math.round(atq/this.card.defense)*multi)+1;

this.acthealth -= daño;
console.log("me ICIERON DALO"+daño+"  "+ this.acthealth)
if(this.acthealth <=0){
    this.isalife = false;
    console.log("me muero ");
}
}

IsaHealer(){
    return this.isahealer;
}
}