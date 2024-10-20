export default class CardLogic{
    health;
    attack;
    speed;
    defense;
    unit_type;

    constructor(_health,_attack,_speed,_defense,_unit_type){
        this.health = _health;
        this.attack = _attack;
        this.speed = _speed;
        this.defense = _defense;
        this.unit_type = _unit_type;
    }
}