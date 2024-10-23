export default class CardLogic{
    health;
    attack;
    speed;
    defense;
    //0 guerrero, 1 arquero, 2 magos, 3 healer
    unit_type;
    iscard;

    constructor(_health,_attack,_speed,_defense,_unit_type,_iscard){
        this.health = _health;
        this.attack = _attack;
        this.speed = _speed;
        this.defense = _defense;
        this.unit_type = _unit_type;
        this.iscard = _iscard;    
    }
}