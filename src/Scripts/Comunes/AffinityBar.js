export default class AffinityBar extends Phaser.GameObjects.Rectangle{
    constructor(scene, x, y, width, heigth, color){
        super(scene, x, y, width, heigth, color) // esto crea un rectángulo rojo de 50x8 px 
        scene.add.existing(this) // y lo añadimos a la escena
    }

    create(){
        this.setPosition(x,y);
        this.setSize(this.width,this.height);
        this.fillColor(this.color);
    }

    preUpdate(t, dt){ //Se puede usar para hacer animaciones a la barra de vida
        
    }

    
}