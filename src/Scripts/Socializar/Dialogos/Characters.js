
class Character {
    constructor(scene, x, y, sprites, id,) {
       
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.originalx = x;
        this.originalY = y;

        //Número del personaje
        this.num = id;
        
        //Todos los sprites

        this.spriteList = sprites;

        //Variables para diálogos
        
        this.disponible = false;
        this.cooldown = 0; //solo va de 0 a 1 por ahora

        this.baseSprite = this.spriteList[0];

        this.sprite = this.scene.add.sprite(x, y, this.baseSprite);
        this.sprite.setScale(0.5,0.5);
        this.sprite.visible = false;

    }


    // Cambiar Sprite (Expresiones y cambio entre Sprite_fondo y Sprite_diálogo)
    changeSprite(num)
    {
        this.sprite.setTexture(this.spriteList[num]);
    }


    switchDisponible() {

        this.disponible = !this.disponible
        console.log("Char:", this.num, "Disponible:", this.disponible, "Cooldown", this.cooldown);

        if(this.disponible){

            this.sprite.visible = true;
            this.sprite.setInteractive({ pixelPerfect: true });
    
        }

    }

    volverDisponible() {

        if(this.disponible == false && this.cooldown > 0) {
            
            this.cooldown = 0;
            this.switchDisponible();
  
        }
        else if(this.disponible == false) {
            this.cooldown++;
        }

        console.log("disponible:", this.disponible, "turno:", this.cooldown)

    }


    

    noInteractive()
    {
        this.sprite.disableInteractive();
    }

    centerPosition()
    {
        this.sprite.x = this.scene.sys.game.canvas.width/2-50;
        this.sprite.y = this.scene.sys.game.canvas.height-300;

        this.sprite.setTexture(this.spriteList[1]);
        this.sprite.setScale(0.6,0.6);

        

        console.log(this.x,this.y);
    }

    originalPosition()
    {
        this.sprite.x = this.originalx;
        this.sprite.y = this.originalY;
        this.sprite.setTexture(this.baseSprite);
        this.sprite.setScale(0.5,0.5);

    }

   

 
}
export default Character;