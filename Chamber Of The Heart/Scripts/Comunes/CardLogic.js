export default class CardLogic {
    health;
    attack;
    speed;
    defense;
    //G guerrero, A arquero, M magos, H healer
    unit_type;
    //letra entre 0 y 5 
    letter;
    iscard;

    Set(_health, _attack, _speed, _defense, _unit_type, _letter, _iscard) {
        this.health = _health;
        this.attack = _attack;
        this.speed = _speed;
        this.defense = _defense;
        this.unit_type = _unit_type;
        this.letter = _letter;
        this.iscard = _iscard;
    }



    constructor() {
        var rnd = Math.floor(Math.random() * 6);
        console.log(rnd)
        var l = Math.floor(Math.random() * 5);

        //arco Corto
        if (rnd == 0) {
            
            this.health = 10;
            this.attack = 5;
            this.speed = 20;
            this.defense = 5;
            this.unit_type = "A";
            this.letter = l;
            this.iscard = true;
        }
        //arco largo
        else if (rnd == 1) {
            
            this.health = 10;
            this.attack = 15;
            this.speed = 10;
            this.defense = 5;
            this.unit_type = "A";
            this.letter = l;
            this.iscard = true;
        }
        //soldado Carro
        else if (rnd == 2) {
           
            this.health = 25;
            this.attack = 5;
            this.speed = 5;
            this.defense = 5;
            this.unit_type = "G";
            this.letter = l;
            this.iscard = true;
        }
        //infanteria
        else if (rnd == 3) {
            
            this.health = 8;
            this.attack = 12;
            this.speed = 15;
            this.defense = 5;
            this.unit_type = "G";
            this.letter = l;
            this.iscard = true;
        }
        //Magos de ataque
        else if (rnd == 4) {
            
            this.health = 9;
            this.attack = 15;
            this.speed = 11;
            this.defense = 5;
            this.unit_type = "M";
            this.letter = l;
            this.iscard = true;
        }
        //curandero
        else if (rnd == 5) {
           
            this.health = 10;
            this.attack = 10;
            this.speed = 5;
            this.defense = 5;
            this.unit_type = "M";
            this.letter = l;
            this.iscard = true;
        }

    }
}
