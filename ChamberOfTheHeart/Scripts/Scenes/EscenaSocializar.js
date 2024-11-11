import Characters from './../Socializar/Dialogos/Characters.js'
import DialogSystem from '../Socializar/Dialogos/DialogSystem.js'

import Inventory from '../Comunes/Inventory.js';

export default class EscenaSocializar extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/

	constructor() {
		super({ key: 'EscenaSocializar' });
	}
	inventory;
	init(data){
		this.inventory = data;
		console.log(this.inventory);
	}

	preload() {
		//BACKGROUND IMAGEN
		this.load.image('BackgroundSocializar', 'ChamberOfTheHeart/Assets/Temporales/backgroundsocializar.jpg')
		//BOTON IMAGEN
		this.load.image('BotonPrueba2', 'ChamberOfTheHeart/Assets/Temporales/PlaceHolderCat.png');
		//Dialogo IMAGEN
		this.load.image('BotonPrueba3', 'ChamberOfTheHeart/Assets/Temporales/PlaceHolderCat.png');
		this.load.image('batalla','ChamberOfTheHeart/Assets/Temporales/batalla.jpg');

	}

	create() {
		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'BackgroundSocializar');
		back.setScale(this.cameras.main.width / this.textures.get('BackgroundSocializar').getSourceImage().width,
			this.cameras.main.height / this.textures.get('BackgroundSocializar').getSourceImage().height);
		//Creamos el boton para ir a latienda
		var sprite = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'BotonPrueba2')
		//creamos el boton para ir a la escena de combate
		var battlebtn = this.add.image(this.sys.game.canvas.width-48 , this.sys.game.canvas.height-48, 'batalla')
		battlebtn.setInteractive();
		battlebtn.on('pointerup', pointer => {
			this.scene.start('EscenaCombate',this.inventory);
		})

		sprite.setInteractive();
		//botón para la conversación (lo que luego será el personaje )
		var sprite2 = this.add.image(0,0, 'BotonPrueba3')
		sprite2.setInteractive();
		
		this.cameras.main.setBackgroundColor('#2d2d2d');

        // Inicializar el sistema de diálogos
        this.dialogueSystem = new DialogSystem(this);

        
		const dialogues = [
			{ name: "Personaje 1", text: "¡Hola! " },
			{ name: "Personaje 2", text: "Adiós" },
			{ name: "Personaje 1", text: "Me quiero matar" },
			{ name: "Personaje 2", text: "x2" },
		];
    


		sprite.on('pointerup', pointer => {
			this.scene.start('EscenaTienda',this.inventory);
		})

		sprite2.on('pointerup', pointer => {
            // Cargar diálogos en el sistema
        this.dialogueSystem.loadDialogues(dialogues);
        })
		  // Manejar el click para el siguiente diálogo
		  this.input.on('pointerdown', () => this.dialogueSystem.onPointerDown(), this);
	}

}
