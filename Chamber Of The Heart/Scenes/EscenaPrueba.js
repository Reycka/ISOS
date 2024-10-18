import Inventory from '../Scripts/Comunes/Inventory'
/**
 * Escena de Título.
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

		var sprite = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'start')
		sprite.setInteractive(); 
		sprite.inventory = new Inventory();

		sprite.on('pointerdown', pointer => {
			sprite.inventory.AddGift(1);
		})
	}
}