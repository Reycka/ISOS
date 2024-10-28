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
	mat;
	matimg;
	constructor() {
		super({ key: 'EscenaCombate' });
	}

	preload() {
		//BACKGROUND IMAGEN
		this.load.image('Background', 'Assets/Temporales/FondoCombate.jpeg');
		//FONDO MATRIZ
		this.load.image('MatrixGround', 'Assets/Temporales/marco-papiro.jpg');
		//GUERRERO PRUEBA
		this.load.image('Archier', 'Assets/Temporales/Arquero.jpeg');
		//ARQUERO PRUEBA
		this.load.image('Soldier', 'Assets/Temporales/Tropa.jpg');
		//MAGO PRUEBA
		this.load.image('Mage', 'Assets/Temporales/Mago.jpeg');
		//HEALER PRUEBA
		this.load.image('Healer', 'Assets/Temporales/Healer.jpeg');
	}
	create() {
		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'Background');
		back.setScale(this.cameras.main.width / this.textures.get('Background').getSourceImage().width,
			this.cameras.main.height / this.textures.get('Background').getSourceImage().height);
			this.mat = new Matriz(2,2,this, null);
			for(let i = 0; i < this.mat.row; i++){
				for(let j = 0; j < this.mat.col; j++){
					var algo = this.add.image(i * 520,j * 540,'MatrixGround'); //Colocamos el fondo
					algo.setScale(0.25,0.25);
				}
			}
		//Aplicamos funciones de lo que importemos en una variable
		//var inventory = new Inventory();
		//Si pulsamos en el boton, se a�ade algo a tu inventario
		/*sprite.on('pointerdown', pointer => {
			inventory.AddGift(1);
			inventory.AddCard();
			console.log(inventory.GetGitf());

		})*/
		
		
	}
	update(){		
		//var auximg =this.add.image(1,1,this.mat.mat[0][0].getTexture());
		/*for(let i = 0; i < this.mat.row; i++){
			for(let j = 0; j < this.mat.col; j++){
				this.add.image(i * 52,j * 24,'MatrixGround'); //Colocamos el fondo
			}
		}*/
	}

}
