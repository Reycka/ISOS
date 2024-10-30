import Characters from './../Socializar/Dialogos/Characters.js'
import DialogSystem from '../Socializar/Dialogos/DialogSystem.js'

export default class EscenaSocializar extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/

	constructor() {
		super({ key: 'EscenaSocializar' });
	}

	init(EscenaPrincipal){
		EscenaPrincipal.inventory;
	}

	preload() {
		//BACKGROUND IMAGEN
		this.load.image('BackgroundSocializar', 'Assets/Temporales/backgroundsocializar.jpg')
		//BOTON IMAGEN
		this.load.image('BotonPrueba2', 'Assets/Temporales/PlaceHolderCat.png');
		//Dialogo IMAGEN
		this.load.image('BotonPrueba3', 'Assets/Temporales/PlaceHolderCat.png');

	}

	create() {
		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'BackgroundSocializar');
		back.setScale(this.cameras.main.width / this.textures.get('BackgroundSocializar').getSourceImage().width,
			this.cameras.main.height / this.textures.get('BackgroundSocializar').getSourceImage().height);
		//Creamos el boton y hacemos que sea interactivo
		var sprite = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'BotonPrueba2')
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
			this.scene.start('EscenaPrincipal');
		})

		sprite2.on('pointerup', pointer => {
            // Cargar diálogos en el sistema
        this.dialogueSystem.loadDialogues(dialogues);
        })
		  // Manejar el click para el siguiente diálogo
		  this.input.on('pointerdown', () => this.dialogueSystem.onPointerDown(), this);
	}

}
