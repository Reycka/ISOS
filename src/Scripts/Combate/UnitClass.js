import CardClass from "../Comunes/CardClass.js";
import CardLogic from "../Comunes/CardLogic.js";
import DialogSystem from "../Socializar/Dialogos/DialogSystem.js";
import AlteredStateClass from "./AlteredStateClass.js";
import BattleManager from "./BattleManager.js";
export default class UnitClass{
card;
//isahealer = false;
isalife;
cooldown;
actcooldown;
pos;
altered_state;
unittexture;
acthealth;
unitType;
isready;
scene
instakillChance = 0;

constructor(_scene,cardclass, _unittexture){
    this.scene = _scene;
    this.unittexture = _unittexture;
    this.card = cardclass.stads;
    this.isaplayer =this.card.iscard;
    
    this.acthealth =  this.card.health;  
    this.cooldown = this.card.speed;
    this.unitType = this.card.unit_type;
    this.actcooldown = this.cooldown; 
    this.isalife = true;
    this.isready = true;
    if(this.unitType == "H")this.isahealer = true;
    else this.isahealer =false;


}
GetTexture(){
    return this.unittexture;
}
GetIsaHealer(){
    return this.isahealer;
}

//UPDATE DE UNA TROPA GENERICA QUE TIENE TODOS LOS ESTADOS (EJEMPLO NO NECESARIO)
//Update(unit,alteredStateInstance){
//    if(this.isahealer){
//        this.Heal(unit);
//    }
//    //else this.Attack(unit);
//    else{
//        if (!this.isAttackedMissed()){
//            this.Attack(unit);
//        }
//    }
//
//    this.handleBurn(); //Aplicamos la función de quemar si existe una probabilidad de ello
//    this.handlePeriodicHeal(); //Aplicamos la funcion de curar periodicamente si hay un porcentaje incluido en ello
//    this.tryRevive(); //Aplicamos la funcion de revivir si existe una probabilidad de ello
//
//    if (alteredStateInstance){
//        alteredStateInstance.applyAlteredStates(this); //Aplicamos los estados alterados a esta unidad si existen
//    }
//}

//UPDATE DE TODAS LAS TROPAS
Update(unit){
    if (this.card.iscard){
        this.applyAllyEffects(unit);
    } else {
        this.applyEnemyEffects(unit);
    }
}
//ACCIONES DE TROPAS ALIADAS
applyAllyEffects(unit){
    if (this.isahealer){
        this.Heal(unit);
    } else {
        this.Attack(unit);
    }
}
applyEnemyEffects(unit){
    console.log(this.isAttackedMissed());
    if (this.isahealer){
        if (!this.isAttackedMissed()){
            this.Heal(unit);
        }
        else console.log("Fallo de curación enemigo");
    } else {
        if (!this.isAttackedMissed()){
            this.Attack(unit);
        } 
        else console.log("Fallo de ataque enemigo");
    }


}

Attack(enemy){
    if( this.isready == true){
        let pega = this.scene.sound.add('Pego');
        pega.play();
        this.actcooldown = this.cooldown;
        this.isready = false;
        
            if (this.card.iscard){ //ATAQUE DE ALIADO (CON SUS VENTAJAS)
                if (!this.isInstakillTriggered()) {
                    console.log("DAÑO DEL ALIADO POTENCIADO: " + this.getAttackPower());
                    console.log("TOMA BONK");
                    enemy.GetDamage(this.getAttackPower(),this.unitType); //Hacemos el daño normal o el potenciado siendo aliado
                }
                else {
                    this.Instakill(enemy); //Si tenemos el instakill activado haremos instakill
                }

            } else { //ATAQUE DE ENEMIGO
                enemy.GetDamage(this.card.attack,this.unitType);
                console.log("TOMA BONK SUAVE");
            }
                
    }
}

Cooldown(){
    if (!this.card.iscard) this.handleBurn();
    else this.handlePeriodicHeal();
    this.actcooldown-=1;
    if(this.actcooldown <= 0) this.isready = true;
}
Heal(ally){
    
    if(this.actcooldown <= 0){
        ally.ReciveHeal(this.card.attack);
        this.actcooldown = this.cooldown;
        this.isready = false;
    }
}
ReciveHeal(n){
    console.log("mecurfo"+n);
    this.acthealth +=n;
    if(this.acthealth> this.card.health)
        {
        this.acthealth = this.card.health;
    }
    console.log("cura vida actual = "+ this.acthealth+"/"+ this.card.health)
}

GetDamage(atq,type){
    var multi
    let mepegan = this.scene.sound.add('MePegan');
    mepegan.play();
    //seteamos el multi de daño
    if((type == "LA"||type=="SA") &&(this.unitType=="G"||this.unitType=="C" )){
        multi = 1,3;
    }
    else if((type == "M") &&(this.unitType=="LA"||this.unitType=="A" )){
        multi = 1,3;
    }
    else if((type == "C"||type=="G") &&(this.unitType=="M"||this.unitType=="H" )){   
        multi = 1,3;
    }
    else multi = 1;
    
    var daño;

    if (type == "QUEMADURA" || type == "INSTAKILL") daño = (Math.round(atq)*multi)+1;
    else daño = (Math.round(atq/this.card.defense)*multi)+1;

console.log("daño vida actual = "+ this.acthealth+"/"+ this.card.health)
this.acthealth -= daño;
//console.log("me ICIERON DALO"+daño+"  "+ this.acthealth)
if(this.acthealth <=0){
    if (this.tryRevive()) 
    {
        this.acthealth = this.card.health;
        console.log("TROPA ALIADA REVIVIDA");
    }
    else{
        this.isalife = false;
        //console.log("PROCEDO A LA MORISION POR MAL RNG");
    } 
}
}

IsaHealer(){
    return this.isahealer;
}


//ESTADOS ALTERADOS


//RA
//QUEMADURA
applyBurn(damage,turns){ //Añadimos quemadura si es que la hay a partir de AlteredStateClass
    this.burn = {damage: damage, turns:turns};
}
handleBurn(){ //Hacemos el handleBurn si la hemos añadido en AlteredStateClass
    if (this.burn && this.burn.turns > 0 && !this.card.iscard){
        this.GetDamage(this.burn.damage, "QUEMADURA"); //Aplicamos el daño extra de 1
        this.burn.turns--; //Gastamos un turno de daño extra
    } else{
        this.burn = null;
    }
}

//HORUS
//CEGUERA
addBlindChance(chance){ // ENTRE 0.0 y 1.0
    this.blindChance = chance || 0; //Si el parametro pasado es distinto de null, undefined, NaN, false o 0: aplica el valor chance pasado, sino se deja en 0
}
isAttackedMissed(){
    return Math.random() < (this.blindChance || 0);
    //Math.random devuelve un int entre 0 y 1, lo comparamos con la probabilidad de fallar que tambien es entre 0 y 1
}

//OSIRIS
//PROBABILIDAD DE REVIVIR
addReviveChance(chance){ // ENTRE 0.0 y 1.0
    this.reviveChance = chance || 0;
}
tryRevive(){
    if (Math.random() < (this.reviveChance || 0)){ //Si la unidad esta muerta y la probabilidad de revivir coincide revivimos
        return true;
    } else {
        return false;
    }
}

//ISIS
//CURACION PERIODICA
applyPeriodicHeal(percent){ // ENTRE 0.0 y 1.0
    this.periodicHeal = percent || 0;
}
handlePeriodicHeal(){
    if (this.periodicHeal > 0){ //Si hay curacion periodica aplicamos el porcentaje de curación a la vida maxima de la carta
        console.log("ME CURO PROGRESIVAMENTE");
        this.ReciveHeal(this.card.health * this.periodicHeal);
    }
}

//SETH
//AUMENTO DE DAÑO
boostAttack(percent){ //ENTRE 0.0 y 1.0
    this.attackBoost = percent || 0;
}
getAttackPower(){
    console.log("ATAQUE NORMAL: " + this.card.attack);
    console.log("ATAQUE POTENCIADO: " + this.card.attack * (1 + (this.attackBoost || 0)));
    return Math.floor(this.card.attack * (1 + (this.attackBoost || 0))); //Siempre devolvemos un valor, si no hay aumento de ataque no lo sumamos al daño inicial, en caso contrario sí.
}

//ANUBIS
//PROBABILIDAD DE INSTAKILL
addInstakillChance(chance) { //ENTRE 0.0 y 1.0
    this.instakillChance = chance || 0;
}
isInstakillTriggered() { //Retornamos true si Math.random es menor que la probabilidad pasada, predeterminado instaKillChance = 0.
    return Math.random() < this.instakillChance;
}
Instakill(enemy){
    enemy.GetDamage(999,"INSTAKILL"); //Aplicamos el daño igual a la vida maxima de la tropa enemiga
}

GetUnit(){
    return this;
}
}