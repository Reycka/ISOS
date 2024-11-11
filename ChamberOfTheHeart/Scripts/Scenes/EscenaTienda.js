//IMPORT GATOTIENDA
import Inventory from './../Comunes/Inventory.js'
import DialogueSystem from '../Socializar/Dialogos/DialogSystem.js';
import CardClass from '../Comunes/CardClass.js';

export default class EscenaTienda extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/

	constructor() {
		super({ key: 'EscenaTienda' });
	}
	inventory;
	init(data){
		this.inventory = data;
		console.log(this.inventory);
	}


	preload() {
		//BACKGROUND IMAGEN
		this.load.image('Background', 'ChamberOfTheHeart/Assets/Temporales/background.png')
		//BOTON IMAGEN
		this.load.image('BotonPrueba', 'ChamberOfTheHeart/Assets/Temporales/PlaceHolderCat.png');
		this.load.spritesheet('cardTexture', 'ChamberOfTheHeart/Assets/Temporales/cardtexture.png',{frameWidth: 627, frameHeight: 882}); 
		this.load.image('Papiro', 'ChamberOfTheHeart/Assets/Temporales/papiro.jpg')
		this.load.image('cambioescena','ChamberOfTheHeart/Assets/Temporales/wasap.jpeg')
	}

	create() {
		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'Background');
		back.setScale(this.cameras.main.width / this.textures.get('Background').getSourceImage().width,
			this.cameras.main.height / this.textures.get('Background').getSourceImage().height);
		//Creamos el boton y hacemos que sea interactivo
		var sprite = this.add.image(this.sys.game.canvas.width / 3, this.sys.game.canvas.height / 2, 'BotonPrueba')
		sprite.setInteractive();
		//PApiro donde se muestran las cartas
		var papiro = this.add.image((this.sys.game.canvas.width*2) / 3, this.sys.game.canvas.height*2.5 / 5, 'Papiro')
		papiro.setScale(1.2,1.2)

		var auxcard;
		//Aplicamos funciones de lo que importemos en una variable
		
		
		//Si pulsamos en el boton, se añade algo a tu inventario
		sprite.on('pointerdown', pointer => {
			this.inventory.AddGift(1);
			this.inventory.AddCard(this,'cardTexture');
			console.log(this.inventory.GetGitf());
			auxcard =this.add.sprite((this.sys.game.canvas.width*2) / 3, this.sys.game.canvas.height*2.5 / 5,
			 this.inventory.listCardClass[this.inventory.numcards-1].GetTexture(),this.inventory.listCardClass[this.inventory.numcards-1].textureindex);
			auxcard.setScale(1/2,1/2);
		})

		//Boton de cambio de escena
		var switchScene = this.add.image(0,this.sys.game.canvas.height / 2,'cambioescena');
		switchScene.setInteractive();
		switchScene.on('pointerup', pointer => {
			this.scene.start('EscenaSocializar',this.inventory);
		})

	}

}