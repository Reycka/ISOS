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
		this.load.image('Background','Assets/Temporales/background.png')
		this.load.image('BotonPrueba', 'Assets/Temporales/PlaceHolderCat.png');
		
	}
	
	create() {
		var back= this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'Background');
		back.setScale(this.cameras.main.width / this.textures.get('Background').getSourceImage().width,
        this.cameras.main.height / this.textures.get('Background').getSourceImage().height);
		var sprite = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'BotonPrueba')
		sprite.setInteractive(); 
		
		//levantando el click izquierdo
		sprite.on('pointerup', pointer => {
			this.scene.start('EscenaSocializar');
		})
	}

}