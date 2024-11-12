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
<<<<<<< HEAD:ChamberOfTheHeart/Scripts/Scenes/EscenaPrincipal.js
		this.load.image('Background','src/Assets/Finales/fondo_socializar.png')

=======
		this.load.image('Background','src/Assets/Temporales/background.png')
>>>>>>> parent of 458b55b (Revert "Merge branch 'main' of https://github.com/Reycka/ISOS"):src/Scripts/Scenes/EscenaPrincipal.js
		this.load.image('BotonPrueba', 'src/Assets/Temporales/PlaceHolderCat.png');
		
	}
	
	create() {
		var back= this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'Background');
		
		//back.setScale(this.cameras.main.width / this.textures.get('Background').getSourceImage().width,
        //this.cameras.main.height / this.textures.get('Background').getSourceImage().height);
		var sprite = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height*3 / 4, 'BotonPrueba')
		sprite.setInteractive(); 
		var inventory = new Inventory();
		inventory.AddGift(6);
		//levantando el click izquierdo
		sprite.on('pointerup', pointer => {
			this.scene.start('EscenaSocialTienda',inventory);
		})
	}

}