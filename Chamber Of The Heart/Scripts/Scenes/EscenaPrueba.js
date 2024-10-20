import Inventory from './../Comunes/Inventory.js'
/**
 * Escena de T�tulo.
 * @extends Phaser.Scene
 */

export default class Title extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/

	constructor() {
		super({ key: 'EscenaPrueba' });
	}

	preload() {
		this.load.image('BotonPrueba', 'Assets/Temporales/PlaceHolderCat.png');
	}

	create() {

		var sprite = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'BotonPrueba')
		sprite.setInteractive(); 
		var inventory = new Inventory();

		sprite.on('pointerdown', pointer => {
			inventory.AddGift(1);
			inventory.AddCard();
			console.log(inventory.GetGitf());
		})
	}
}