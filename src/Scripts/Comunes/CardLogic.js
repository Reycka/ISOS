import AffinityRegister from "./AffinityRegister.js";
export default class CardLogic {
    health;
    attack;
    speed;
    defense;
    //G guerrero, A arquero, M magos, H healer
    unit_type;
    //letra entre 0 y 18 
    letter;
    iscard;
    textureindex;
    isahealer;

    Set(_health, _attack, _speed, _defense, _unit_type, _letter, _iscard) {
        this.health = _health;
        this.attack = _attack;
        this.speed = _speed;
        this.defense = _defense;
        this.unit_type = _unit_type;
        this.letter = _letter;
        this.iscard = _iscard;
    }



    constructor(l) {
        //l es la letra de la carta generada en el AffinityRegister
        var rnd = Math.floor(Math.random() * 6);

        this.textureindex = rnd;
        //generador de cartas


        //arco Corto
        if (rnd == 0) {
            
            this.health = 100;
            this.attack = 10;
            this.speed = 2;
            this.defense = 1;
            this.unit_type = "SA";
            this.letter = l;
            this.iscard = true;
            this.isahealer = false;
            this.textureindex = rnd;
        }
        //arco largo
        else if (rnd == 1) {
            
            this.health = 100;
            this.attack = 25;
            this.speed = 5;
            this.defense = 1;
            this.unit_type = "LA";
            this.letter = l;
            this.iscard = true;
            this.isahealer = false;
            this.textureindex = rnd;
        }
        //soldado Carro
        else if (rnd == 2) {
           
            this.health = 200;
            this.attack = 20;
            this.speed = 6;
            this.defense = 1;
            this.unit_type = "C";
            this.letter = l;
            this.iscard = true;
            this.isahealer = false;
            this.textureindex = rnd;
        }
        //infanteria
        else if (rnd == 3) {
            
            this.health = 150;
            this.attack = 15;
            this.speed = 4;
            this.defense = 1;
            this.unit_type = "G";
            this.letter = l;
            this.iscard = true;
            this.isahealer = false;
            this.textureindex = rnd;
        }
        //Magos de ataque
        else if (rnd == 4) {
            
            this.health = 100;
            this.attack = 15;
            this.speed = 4;
            this.defense = 3;
            this.unit_type = "M";
            this.letter = l;
            this.iscard = true;
            this.isahealer = false;
            this.textureindex = rnd;
        }
        //curandero
        else if (rnd == 5) {
           
            this.health = 150;
            this.attack = 8;
            this.speed = 4;
            this.defense = 1;
            this.unit_type = "H";
            this.letter = l;
            this.iscard = true;
            this.isahealer = true;
            this.textureindex = rnd;
        }


    }
    GetTextureIndex(){
        return this.textureindex;
    }
}
