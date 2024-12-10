export default class EnemyStads {
    health;
    attack;
    speed;
    defense;
    unit_type;
    textureindex;
    letter;
    iscard;
    Set(_health, _attack, _speed, _defense, _unit_type) {
        this.health = _health;
        this.attack = _attack;
        this.speed = _speed;
        this.defense = _defense;
        this.unit_type = _unit_type;
        this.letter = null;
        this.iscard = false;
    }



    constructor(unittype) {
        //arco Corto
        if (unittype == "SA") {  
            this.health = 100;
            this.attack = 10;
            this.speed = 2;
            this.defense = 1;
            this.unit_type = "SA";
            this.letter = null;
            this.iscard = false;
            this.textureindex = 0;
        }
        //arco largo
        else if (unittype == "LA") {
            
            this.health = 100;
            this.attack = 25;
            this.speed = 6;
            this.defense = 1;
            this.unit_type = "LA";
            this.letter = null;
            this.iscard = false;
            this.textureindex = 1;
        }
        //soldado Carro
        else if (unittype == "C") {
           
            this.health = 100;
            this.attack = 20;
            this.speed = 5;
            this.defense = 1;
            this.unit_type = "C";
            this.letter = null;
            this.iscard = false;
            this.textureindex = 2;
        }
        //infanteria
        else if (unittype == "G") {
            
            this.health = 150;
            this.attack = 15;
            this.speed = 4;
            this.defense = 1;
            this.unit_type = "G";
            this.letter = null;
            this.iscard = false;
            this.textureindex = 3;
        }
        //Magos de ataque
        else if (unittype == "M") {
            
            this.health = 100;
            this.attack = 15;
            this.speed = 4;
            this.defense = 1;
            this.unit_type = "M";
            this.letter = null;
            this.iscard = false;
            this.textureindex = 4;
        }
        //curandero
        else if (unittype == "H") {
           
            this.health = 150;
            this.attack = 8;
            this.speed = 4;
            this.defense = 1;
            this.unit_type = "H";
            this.letter = null;
            this.iscard = false;
            this.textureindex = 5;
        }
        //Boss
        else if (unittype == "B") {
           
            this.health = 1;
            this.attack = 15;
            this.speed = 7;
            this.defense = 25;
            this.unit_type = "B";
            this.letter = null;
            this.iscard = false;
            this.textureindex = 6;
        }

    }
    GetTextureIndex(){
        return this.textureindex;
    }
}
