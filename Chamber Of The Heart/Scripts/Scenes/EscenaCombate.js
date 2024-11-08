import Inventory from './../Comunes/Inventory.js'
import CardLogic from './../Comunes/CardLogic.js'
import CardClass from './../Comunes/CardClass.js'
import Matriz from './../Combate/Matriz.js'
import EnemyMatriz from './../Combate/EnemyMatriz.js'
import SlotClass from '../Combate/SlotClass.js'
import BattleManager from '../Combate/BattleManager.js'
export default class EscenaCombate extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/
	mat;
	Enemymat;
	matimg;
	inventory;
	inventoryindex = 0;
	battleManager;
	constructor() {
		super({ key: 'EscenaCombate' });
	}
	init(data){
		this.inventory = data;
		console.log(this.inventory);
	}

	preload() {
		//BACKGROUND IMAGEN
		this.load.image('Background1', 'Assets/Temporales/FondoCombate.jpeg');
		//FONDO MATRIZ
		this.load.image('MatrixGround', 'Assets/Temporales/marco-papiro.jpg');
		//INFANTERÍA PRUEBA
		this.load.image('LA', 'Assets/Temporales/Arquero.jpeg');
		//ARQUERO LARGO PRUEBA
		this.load.image('G', 'Assets/Temporales/Tropa.jpg');
		//MAGO PRUEBA
		this.load.image('M', 'Assets/Temporales/Mago.jpeg');
		//HEALER PRUEBA
		this.load.image('H', 'Assets/Temporales/Healer.jpeg');
		//CARRO PRUEBA
		this.load.image('C', 'Assets/Temporales/Carro.png');
		//ARCO CORTO PRUEBA
		this.load.image('SA', 'Assets/Temporales/ArcoCorto.png');
		//BOSS
		this.load.image('B', 'Assets/Temporales/Serpiente.png');
		
		//flecha inventario
		this.load.image('flecha', 'Assets/Temporales/flecha.png');
	}
	create() {
		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'Background1');
		back.setScale(this.cameras.main.width / this.textures.get('Background1').getSourceImage().width,
			this.cameras.main.height / this.textures.get('Background1').getSourceImage().height);
			//SETEAMOS AMBAS MATRICES
			this.mat = new Matriz(6,2,this, null);
			for(let i = 0; i < this.mat.row; i++){
				for(let j = 0; j < this.mat.col; j++){
					var algo = this.add.image(j * 110  + 500 , i * 125 + 150,'MatrixGround'); //Colocamos el fondo
					algo.setScale(0.25,0.25);
				}
			}
			for(let i = 0; i < this.mat.row; i++){
				for(let j = 0; j < this.mat.col; j++){
					var algo = this.add.image(j * 110  + 1000 , i * 125 + 150,'MatrixGround'); //Colocamos el fondo
					algo.setScale(0.25,0.25);
				}
			}
		this.battleManager = new BattleManager(this.mat,'./../Combate/OleadaDePrueba.txt');
		//Aplicamos funciones de lo que importemos en una variable
		//var inventory = new Inventory();
		//Si pulsamos en el boton, se a�ade algo a tu inventario
		/*sprite.on('pointerdown', pointer => {
			inventory.AddGift(1);
			inventory.AddCard();
			console.log(inventory.GetGitf());

		})*/
		/*
		instancia del inventario y las cartas
		*/
		var upperBoton = this.add.image(this.sys.game.canvas.width / 10, this.sys.game.canvas.height / 14, 'flecha')
		upperBoton.setScale(0.5,0.5);
		upperBoton.setInteractive();
		upperBoton.on('pointerup', pointer => {
			if(this.inventoryindex!=0){ 
				this.inventoryindex--; 
				card1 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*2.5 / 10,
				this.inventory.listCardClass[this.inventoryindex].GetTexture(),this.inventory.listCardClass[this.inventoryindex].textureindex);
				card1.setScale(1/4,1/4);
				card2 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*5 / 10,
				this.inventory.listCardClass[this.inventoryindex+1].GetTexture(),this.inventory.listCardClass[this.inventoryindex+1].textureindex);
				card2.setScale(1/4,1/4);
				card3 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*7.5 / 10,
				this.inventory.listCardClass[this.inventoryindex+2].GetTexture(),this.inventory.listCardClass[this.inventoryindex+2].textureindex);
				card3.setScale(1/4,1/4);
			}
		})
		var downBoton = this.add.image(this.sys.game.canvas.width / 10, this.sys.game.canvas.height*13 / 14, 'flecha')
		downBoton.setScale(0.5,0.5);
		downBoton.setInteractive();
		downBoton.on('pointerup', pointer => {
			if(this.inventoryindex<this.inventory.GetNumCards()-3){ 
				this.inventoryindex++; 
				card1 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*2.5 / 10,
				this.inventory.listCardClass[this.inventoryindex].GetTexture(),this.inventory.listCardClass[this.inventoryindex].textureindex);
				card1.setScale(1/4,1/4);
				card2 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*5 / 10,
				this.inventory.listCardClass[this.inventoryindex+1].GetTexture(),this.inventory.listCardClass[this.inventoryindex+1].textureindex);
				card2.setScale(1/4,1/4);
				card3 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*7.5 / 10,
				this.inventory.listCardClass[this.inventoryindex+2].GetTexture(),this.inventory.listCardClass[this.inventoryindex+2].textureindex);
				card3.setScale(1/4,1/4);
			}

		})
		downBoton.setFlipY(true);
		var card1 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*2.5 / 10,
		this.inventory.listCardClass[this.inventoryindex].GetTexture(),this.inventory.listCardClass[this.inventoryindex].textureindex);
		card1.setScale(1/4,1/4);

		card1.setInteractive();
		card1.on('pointerup', pointer =>{
			this.battleManager.SetCard(this.inventory.listCardClass[this.inventoryindex],this.inventory.listCardClass[this.inventoryindex].stads.unit_type)
		})
		var card2 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*5 / 10,
		this.inventory.listCardClass[this.inventoryindex+1].GetTexture(),this.inventory.listCardClass[this.inventoryindex+1].textureindex);
		card2.setScale(1/4,1/4);
		card2.setInteractive();
		card2.on('pointerup', pointer =>{
			this.battleManager.SetCard(this.inventory.listCardClass[this.inventoryindex + 1],this.inventory.listCardClass[this.inventoryindex+1].stads.unit_type)
		})
		
		var card3 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*7.5 / 10,
		this.inventory.listCardClass[this.inventoryindex+2].GetTexture(),this.inventory.listCardClass[this.inventoryindex+2].textureindex);
		card3.setScale(1/4,1/4);
		card3.setInteractive();
		card3.on('pointerup', pointer =>{
			this.battleManager.SetCard(this.inventory.listCardClass[this.inventoryindex + 2],this.inventory.listCardClass[this.inventoryindex+2].stads.unit_type)
		})
		


	}
	update(){		
		//AQUI DENTRO LLAMAMOS AL BATTLE MANAGER SI SOLO SI: Hay una carta seleccionada y se elige una SlotClass
		//Método que si pulso en la casilla pilla la información de la SlotClass y setea una carta al pulsar y si ya hay una carta la pulsa con click derecho y entonces la libera
	}
	SetTexture(a){
		var texture;
		switch(a.GetUnit()){
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
			//Boss
			case 'B':
				texture = 'Boss'
				break;
        }
		var algo = this.add.image(a.GetCol()* 110  + 500,a.GetRow() * 125 + 150,texture); //Colocamos el fondo
		algo.setScale(0.3,0.3);
		////this.mat.GetCol() * 110  +
		//this.mat.GetRow()* 125 +
	}

}
