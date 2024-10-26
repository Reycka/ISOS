//IMPORT GATOTIENDA
import Inventory from './../Comunes/Inventory.js'
import DialogueSystem from '../Socializar/Dialogos/DialogsSystem.js';
import CardClass from '../Comunes/CardClass.js';

export default class EscenaTienda extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/

	constructor() {
		super({ key: 'EscenaTienda' });
	}

	preload() {
		//BACKGROUND IMAGEN
		this.load.image('Background', 'Assets/Temporales/background.png')
		//BOTON IMAGEN
		this.load.image('BotonPrueba', 'Assets/Temporales/PlaceHolderCat.png');
		this.load.spritesheet('cardTexture', 'Assets/Temporales/cardtexture.png',{frameWidth: 627, frameHeight: 882}); 
		this.load.image('Papiro', 'Assets/Temporales/papiro.jpg')

	}

	create() {
		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'Background');
		back.setScale(this.cameras.main.width / this.textures.get('Background').getSourceImage().width,
			this.cameras.main.height / this.textures.get('Background').getSourceImage().height);
		//Creamos el boton y hacemos que sea interactivo
		var sprite = this.add.image(this.sys.game.canvas.width / 3, this.sys.game.canvas.height / 2, 'BotonPrueba')
		sprite.setInteractive();

		var papiro = this.add.image((this.sys.game.canvas.width*2) / 3, this.sys.game.canvas.height*2.5 / 5, 'Papiro')
		papiro.setScale(1.2,1.2)

		var auxcard;
		//Aplicamos funciones de lo que importemos en una variable
		var inventory = new Inventory();
		
		//Si pulsamos en el boton, se añade algo a tu inventario
		sprite.on('pointerdown', pointer => {
			inventory.AddGift(1);
			inventory.AddCard(this,'cardTexture');
			console.log(inventory.GetGitf());
			auxcard =this.add.sprite((this.sys.game.canvas.width*2) / 3, this.sys.game.canvas.height*2.5 / 5,
			 inventory.listCardClass[inventory.numcards-1].GetTexture(),inventory.listCardClass[inventory.numcards-1].textureindex);
			auxcard.setScale(1/2,1/2);
		})
	}

}