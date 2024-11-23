
class Character {
    constructor(scene, x, y, sprites, id) {
       
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.originalx = x;
        this.originalY = y;
        
        console.log(sprites);

        //Número del personaje
        this.num = id;
        this.eventNum = 1;

        // Sprite del personaje
        this.sprite = scene.add.sprite(x, y, sprites);
        this.sprite.setInteractive({ pixelPerfect: true });


        // Lista de sprites (Lo he llamado expresiones pero también incluirá el sprite de fondo)
        //this.expressions = expressions;

        //Sprite Inicial
        //this.currentExpression = expressions.default; 
        //this.changeExpression(this.currentExpression);

        //Variables para diálogos
        
        this.disponible = false;

        
    }


    // Cambiar Sprite (Expresiones y cambio entre Sprite_fondo y Sprite_diálogo)
    /*changeExpression(expression) {
        this.sprite.setTexture(this.expressions[expression]);
        this.currentExpression = expression;
    }*/

    noInteractive()
    {
        this.sprite.disableInteractive();
    }

    centerPosition()
    {
        this.x = this.sys.game.canvas.width/2-50;
        this.y = this.sys.game.canvas.height;
    }

   

 
}
export default Character;