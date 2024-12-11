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
	oleada1;
	constructor() {
		super({ key: 'EscenaPrincipal' });
	}

	preload() {

		this.load.image('Background','src/Assets/Finales/fondo_socializar.png')
		this.load.image('Titulo','src/Assets/Temporales/TITULO CHAMBER OF THE HEART.png');
		this.load.image('BotonComenzar','src/Assets/Temporales/boton_comenzar.png');
		this.load.image('BotonSalir','src/Assets/Temporales/boton_salir.png');
		this.load.audio('fondito','src/Assets/sfx/musica/FINALES/Ethereal Heartbeat Main.WAV');
		this.oleada1 = 1;
	}
	
	create() {
		var audio = this.sound.add('fondito')
		audio.play({loop:true});
		var inventory = new Inventory();
		inventory.AddGift(6);
		this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'Background');
		//var title = this.add.text(380,200,"CHAMBER OF THE HEART").setScale(6,6);
		var title = this.add.image(this.sys.game.canvas.width / 2,200,"Titulo");
		var start = this.add.image(this.sys.game.canvas.width / 2,600,"BotonComenzar");
		var exit = this.add.image(this.sys.game.canvas.width / 2,900,"BotonSalir");
		start.setScale(0.5,0.5);
		exit.setScale(0.5,0.5);
		start.setInteractive(); 
		exit.setInteractive();
		start.on('pointerup', pointer => {
			audio.stop();
			console.log(this.oleada1);
			this.scene.start('EscenaSocialTienda',{oleada: this.oleada1, inventario: inventory});
		})
		exit.on('pointerup', pointer => {
			location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
		})
	}

}