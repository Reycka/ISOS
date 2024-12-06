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



    constructor() {
        var rnd = Math.floor(Math.random() * 6);
        //console.log(rnd)
        this.textureindex = rnd;
        var l = Math.floor(Math.random() * 18);

        //arco Corto
        if (rnd == 0) {
            
            this.health = 10;
            this.attack = 5;
            this.speed = 5;
            this.defense = 5;
            this.unit_type = "SA";
            this.letter = l;
            this.iscard = true;
            this.isahealer = false;
            this.textureindex = rnd;
        }
        //arco largo
        else if (rnd == 1) {
            
            this.health = 10;
            this.attack = 15;
            this.speed = 10;
            this.defense = 5;
            this.unit_type = "LA";
            this.letter = l;
            this.iscard = true;
            this.isahealer = false;
            this.textureindex = rnd;
        }
        //soldado Carro
        else if (rnd == 2) {
           
            this.health = 25;
            this.attack = 5;
            this.speed = 5;
            this.defense = 5;
            this.unit_type = "C";
            this.letter = l;
            this.iscard = true;
            this.isahealer = false;
            this.textureindex = rnd;
        }
        //infanteria
        else if (rnd == 3) {
            
            this.health = 1;
            this.attack = 1;
            this.speed = 15;
            this.defense = 2;
            this.unit_type = "G";
            this.letter = l;
            this.iscard = true;
            this.isahealer = false;
            this.textureindex = rnd;
        }
        //Magos de ataque
        else if (rnd == 4) {
            
            this.health = 1;
            this.attack = 1;
            this.speed = 11;
            this.defense = 3;
            this.unit_type = "M";
            this.letter = l;
            this.iscard = true;
            this.isahealer = false;
            this.textureindex = rnd;
        }
        //curandero
        else if (rnd == 5) {
           
            this.health = 10;
            this.attack = 7;
            this.speed = 5;
            this.defense = 5;
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
