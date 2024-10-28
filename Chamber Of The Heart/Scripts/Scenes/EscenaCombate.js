import Inventory from './../Comunes/Inventory.js'
import CardLogic from './../Comunes/CardLogic.js'
import CardClass from './../Comunes/CardClass.js'
import Matriz from './../Combate/Matriz.js'
import EnemyMatriz from './../Combate/EnemyMatriz.js'
import SlotClass from '../Combate/SlotClass.js'
export default class EscenaCombate extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/

	constructor() {
		super({ key: 'EscenaCombate' });
	}

	preload() {
		//BACKGROUND IMAGEN
		this.load.image('Background', 'Assets/Temporales/FondoCombate.jpeg');
		//FONDO MATRIZ
		this.load.image('MatrixGround', 'Assets/Temporales/marco-papiro.jpg');
		//GUERRERO PRUEBA
		this.load.image('Soldier', 'Assets/Temporales/Tropa.jpg');
		//ARQUERO PRUEBA
		this.load.image('Archier', 'Assets/Temporales/Tropa.jpg');
		//MAGO PRUEBA
		this.load.image('Mage', 'Assets/Temporales/Tropa.jpg');
		//HEALER PRUEBA
		this.load.image('Healer', 'Assets/Temporales/Tropa.jpg');
	}
	 mat
	create() {
		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'Background');
		back.setScale(this.cameras.main.width / this.textures.get('Background').getSourceImage().width,
			this.cameras.main.height / this.textures.get('Background').getSourceImage().height);
		//Aplicamos funciones de lo que importemos en una variable
		//var inventory = new Inventory();

		//Si pulsamos en el boton, se a�ade algo a tu inventario
		/*sprite.on('pointerdown', pointer => {
			inventory.AddGift(1);
			inventory.AddCard();
			console.log(inventory.GetGitf());

		})*/
		this.mat = new Matriz(2,2,this, 'MatrixGround');
		console.log(this.mat);	
	//	var prueba = mat.GetSlot(0,0);
		
		
	}
	update(){
		var auximg =this.add.image(1,1,this.mat.mat[0][0].getTexture());
	}

}
