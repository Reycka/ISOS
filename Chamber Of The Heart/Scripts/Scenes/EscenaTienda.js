//IMPORT GATOTIENDA

export default class Title extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/

	constructor() {
		super({ key: 'EscenaTienda' });
	}

	preload() {
		//BACKGROUND IMAGEN
		this.load.image('Background', 'Assets/Temporales/background.png')
		//BOTON IMAGEN
		this.load.image('BotonPrueba', 'Assets/Temporales/PlaceHolderCat.png');

	}

	create() {
		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'Background');
		back.setScale(this.cameras.main.width / this.textures.get('Background').getSourceImage().width,
			this.cameras.main.height / this.textures.get('Background').getSourceImage().height);
		//Creamos el boton y hacemos que sea interactivo
		var sprite = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'BotonPrueba')
		sprite.setInteractive();

		//Aplicamos funciones de lo que importemos en una variable
		var inventory = new Inventory();

		//Si pulsamos en el boton, se añade algo a tu inventario
		sprite.on('pointerdown', pointer => {
			inventory.AddGift(1);
			inventory.AddCard();
			console.log(inventory.GetGitf());

		})
	}

}