
/**
 * Escena de T�tulo.
 * @extends Phaser.Scene
 */

export default class EscenaVictoria extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/
	constructor() {
		super({ key: 'EscenaVictoria' });
	}
	preload(){
		//this.load.image();
	}
	create() {
			location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
	}
}