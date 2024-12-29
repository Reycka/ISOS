import Inventory from './../Comunes/Inventory.js'
/**
 * Escena de T�tulo.
 * @extends Phaser.Scene
 */

export default class EscenaInventario extends Phaser.Scene {
    /**
    * Escena principal.
    * @extends Phaser.Scene
    */
    oleada1;
    constructor() {
        super({ key: 'EscenaInventario' });
    }

    preload() {

        
    }
    
    create() {
        var importante = this.add.image(this.sys.game.canvas.width / 2,300,'IMPORTANTITISISISMOCLAVEINDISPENSABLE');
        console.log(importante.texture)
        var audio = this.sound.add('fondito')
        audio.play({loop:true});
       
        this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'Background');
        
    }

}