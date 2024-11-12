import ReadDialog from './../Socializar/Dialogos/ReadDialog.js';
import DialogSystem from '../Socializar/Dialogos/DialogSystem.js';
import Inventory from '../Comunes/Inventory.js';

export default class EscenaSocializar extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaSocializar' });
    }

    inventory;

    allDialogues = {};  

    init(data) {
        this.inventory = data;
        console.log(this.inventory);
    }

	preload() {
		//BACKGROUND IMAGEN
		this.load.image('BackgroundSocializar', 'src/Assets/Temporales/backgroundsocializar.jpg')

		//BOTON IMAGEN
		this.load.image('BotonPrueba2', 'src/Assets/Temporales/PlaceHolderCat.png');
		//Dialogo IMAGEN
		this.load.image('BotonPrueba3', 'src/Assets/Temporales/PlaceHolderCat.png');
		this.load.image('batalla','src/Assets/Temporales/batalla.jpg');

	}
    preload() {
        // Cargar imágenes de fondo y botones
        this.load.image('BackgroundSocializar', 'src/Assets/Temporales/backgroundsocializar.jpg');
        this.load.image('BotonPrueba2', 'src/Assets/Temporales/PlaceHolderCat.png');
        this.load.image('BotonPrueba3', 'src/Assets/Temporales/PlaceHolderCat.png');
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
    }
    create() {
        // Crear el fondo y aplicarle la escala
        var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'BackgroundSocializar');
        back.setScale(this.cameras.main.width / this.textures.get('BackgroundSocializar').getSourceImage().width,
            this.cameras.main.height / this.textures.get('BackgroundSocializar').getSourceImage().height);

        // Botón1
        var sprite = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'BotonPrueba2');
        sprite.setInteractive();

        // Botón2
        var sprite2 = this.add.image(0, 0, 'BotonPrueba3');
        sprite2.setInteractive();

        this.cameras.main.setBackgroundColor('#2d2d2d');

        // Inicializar el sistema de diálogos
        this.dialogueSystem = new DialogSystem(this);
        this.reader = new ReadDialog(this);  // Instanciar ReadDialog

        // Cargar el archivo JSON con los diálogos
        this.reader.loadJSON('./../../Texto/dialogs.json').then(() => {
            
			//console.log(this.reader.dialogData);
            
			
        });

        // Click
        this.input.on('pointerdown', () => this.dialogueSystem.onPointerDown(), this);

        // Cambio de escena
        sprite.on('pointerup', pointer => {
            this.scene.start('EscenaTienda', this.inventory);
        });

        // Mostrar dialogos
        sprite2.on('pointerup', pointer => {
            const eventoId = 'evento1.1';  
			
            if (this.reader.dialogData.Eventos[eventoId]) {
                this.dialogueSystem.showEventDialogues(eventoId, this.reader.dialogData.Eventos);  
            } else {
                console.log('Evento no encontrado: ' + eventoId);
            }
        });
    }

    }
