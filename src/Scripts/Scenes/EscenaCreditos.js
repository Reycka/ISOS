/**
 * Escena de T�tulo.
 * @extends Phaser.Scene
 */

export default class EscenaCreditos extends Phaser.Scene {
    /**
    * Escena principal.
    * @extends Phaser.Scene
    */

    constructor() {
        super({ key: 'EscenaCreditos' });
    }

    preload() {

       

    }
    
    create() {
       this.na = this.add.image(this.sys.game.canvas.width /2, this.sys.game.canvas.height/ 2, 'IMPORTANTITISISISMOCLAVEINDISPENSABLE')
        this.t = this.add.text(188, this.sys.game.canvas.height/ 3, "GRACIAS POR JUGAR HASTA AQUI LLEGA EL JUEGO", { font: '60px Arial, sans-serif',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4,
            backgroundColor: '#000000',
            padding: { x: 30, y: 20 },
            fontStyle: 'bold' });					
    }

}