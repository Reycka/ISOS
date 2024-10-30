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
		//INFANTERÍA PRUEBA
		this.load.image('LongArchier', 'Assets/Temporales/Arquero.jpeg');
		//ARQUERO LARGO PRUEBA
		this.load.image('Infantery', 'Assets/Temporales/Tropa.jpg');
		//MAGO PRUEBA
		this.load.image('Mage', 'Assets/Temporales/Mago.jpeg');
		//HEALER PRUEBA
		this.load.image('Healer', 'Assets/Temporales/Healer.jpeg');
		//CARRO PRUEBA
		this.load.image('Carriege', 'Assets/Temporales/Carro.png');
		//ARCO CORTO PRUEBA
		this.load.image('ShortArchier', 'Assets/Temporales/ArcoCorto.png');
	}
	create() {
		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'Background');
		back.setScale(this.cameras.main.width / this.textures.get('Background').getSourceImage().width,
			this.cameras.main.height / this.textures.get('Background').getSourceImage().height);
			this.mat = new Matriz(6,2,this, null);
			for(let i = 0; i < this.mat.row; i++){
				for(let j = 0; j < this.mat.col; j++){
					var algo = this.add.image(j * 110  + 500 , i * 125 + 150,'MatrixGround'); //Colocamos el fondo
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
		//Método que si pulso en la casilla pilla la información de la SlotClass y setea una carta al pulsar y si ya hay una carta la pulsa y entonces la libera
		this.mat.mat[0][0].SetUnit('LA');
		this.SetTexture();
	}
	SetTexture(){
		var texture;
		switch(this.mat.mat[0][0].getUnit()){
			//MAGO
            case 'M':
                texture = 'Mage'
                break;
			//CARRO
            case 'C':
                texture = 'Carriege'
                break;
			//ARCO CORTO
            case 'SA':
                texture = 'ShortArchier'
                break;
			//HEALER
            case 'H':
                texture = 'Healer'
                break;
			//ARCO LARGO
            case 'LA':
                texture = 'LongArchier'
                break;
			//INFANTERÍA
            case 'G':
                texture = 'Infantery'
                break;
        }
		var algo = this.add.image(500,150,texture); //Colocamos el fondo
		algo.setScale(0.3,0.3);
		////this.mat.GetCol() * 110  +
		//this.mat.GetRow()* 125 +
	}

}
