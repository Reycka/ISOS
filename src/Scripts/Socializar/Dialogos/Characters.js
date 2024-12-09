
class Character {
    constructor(scene, x, y, sprites, id,) {
       
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.originalx = x;
        this.originalY = y;
        
        console.log(sprites);

        //Número del personaje
        this.num = id;
        this.eventNum = 1;

        //Variables para diálogos
        
        this.disponible = false;
        this.cooldown = 0; //solo va de 0 a 1 por ahora

        this.sprite = this.scene.add.sprite(x, y, sprites);
        this.sprite.visible = false;


        // Sprite del personaje
        



        // Lista de sprites (Lo he llamado expresiones pero también incluirá el sprite de fondo)
        //this.expressions = expressions;

        //Sprite Inicial
        //this.currentExpression = expressions.default; 
        //this.changeExpression(this.currentExpression);

        

        
    }


    // Cambiar Sprite (Expresiones y cambio entre Sprite_fondo y Sprite_diálogo)
    /*changeExpression(expression) {
        this.sprite.setTexture(this.expressions[expression]);
        this.currentExpression = expression;
    }*/

    switchDisponible() {

        this.disponible = !this.disponible
        console.log("DisponibleCambio")

        if(this.disponible){

            
            this.sprite.visible = true;
            this.sprite.setInteractive({ pixelPerfect: true });
    
        }

    }

    volverDisponible() {

        if(this.disponible == false && this.cooldown > 0) {

            this.switchDisponible();
            this.cooldown = 0;
            
            

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
        this.sprite.y = this.scene.sys.game.canvas.height+500;

        

        console.log(this.x,this.y);
    }

    originalPosition()
    {
        this.sprite.x = this.originalx;
        this.sprite.y = this.originalY;
    }

   

 
}
export default Character;