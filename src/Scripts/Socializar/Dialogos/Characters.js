class Character {
    constructor(scene, x, y, name, sprites, expressions, num) {
       
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.name = name;

        //Número del personaje
        num = num;

        // Sprite del personaje
        this.sprite = scene.add.sprite(x, y, sprites);

        // Lista de sprites (Lo he llamado expresiones pero también incluirá el sprite de fondo)
        this.expressions = expressions;

        //Sprite Inicial
        this.currentExpression = expressions.default; 
        this.changeExpression(this.currentExpression);

        //Variables para diálogos
        eventNum =0;
        dialogNum = 0;
    }

    // Cambiar Sprite (Expresiones y cambio entre Sprite_fondo y Sprite_diálogo)
    changeExpression(expression) {
        this.sprite.setTexture(this.expressions[expression]);
        this.currentExpression = expression;
    }

    // Mover personaje
    moveTo(x, y, duration = 1000) {
        this.scene.tweens.add({
            targets: this.sprite,
            x: x,
            y: y,
            ease: 'Power2',
            duration: duration,
        });
    }

 
}
export default Character;