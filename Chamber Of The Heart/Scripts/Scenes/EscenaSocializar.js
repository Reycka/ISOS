import Characters from './../Socializar/Dialogos/Characters.js'
import Dialogs from './../Socializar/Dialogos/DialogsSystem.js'

export default class EscenaSocializar extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/

	constructor() {
		super({ key: 'EscenaSocializar' });
	}

	init(EscenaPrincipal){
		EscenaPrincipal.inventory;
	}

	preload() {
		//BACKGROUND IMAGEN
		this.load.image('BackgroundSocializar', 'Assets/Temporales/backgroundsocializar.jpg')
		//BOTON IMAGEN
		this.load.image('BotonPrueba2', 'Assets/Temporales/PlaceHolderCat.png');

	}

	create() {
		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'BackgroundSocializar');
		back.setScale(this.cameras.main.width / this.textures.get('BackgroundSocializar').getSourceImage().width,
			this.cameras.main.height / this.textures.get('BackgroundSocializar').getSourceImage().height);
		//Creamos el boton y hacemos que sea interactivo
		var sprite = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'BotonPrueba2')
		sprite.setInteractive();

		sprite.on('pointerup', pointer => {
			this.scene.start('EscenaPrincipal');
		})
	}

}
