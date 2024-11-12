class Character {
    constructor(scene, x, y, sprites, expressions, id) {
       
        this.scene = scene;
        this.x = x;
        this.y = y;
        

        //Número del personaje
        num = id;

        // Sprite del personaje
        this.sprite = scene.add.sprite(x, y, sprites);

        // Lista de sprites (Lo he llamado expresiones pero también incluirá el sprite de fondo)
        this.expressions = expressions;

        //Sprite Inicial
        this.currentExpression = expressions.default; 
        this.changeExpression(this.currentExpression);

        //Variables para diálogos
        eventNum =0;
        disponible = false;
    }

    // Cambiar Sprite (Expresiones y cambio entre Sprite_fondo y Sprite_diálogo)
    changeExpression(expression) {
        this.sprite.setTexture(this.expressions[expression]);
        this.currentExpression = expression;
    }

   

 
}
export default Character;