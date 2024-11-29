import Inventory from './../Comunes/Inventory.js'
/**
 * Escena de T�tulo.
 * @extends Phaser.Scene
 */

export default class EscenaPrincipal extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/

	constructor() {
		super({ key: 'EscenaPrincipal' });
	}

	preload() {

		this.load.image('Background','src/Assets/Finales/fondo_socializar.png')
		this.load.audio('fondito','src/Assets/sfx/musica/FINALES/Ethereal Heartbeat Main.WAV')
	}
	
	create() {
		var audio = this.sound.add('fondito')
		audio.play({loop:true});
		var inventory = new Inventory();
		inventory.AddGift(6);
		this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'Background');
		var start = this.add.text(800,500,"EMPEZAR");
		start.setScale(5,5);
		var exit = this.add.text(850,600,"SALIR");
		exit.setScale(5,5);
		start.setInteractive(); 
		exit.setInteractive();
		start.on('pointerup', pointer => {
			audio.stop();
			this.scene.start('EscenaSocialTienda',inventory);
		})
		exit.on('pointerup', pointer => {
			location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
		})
	}

}