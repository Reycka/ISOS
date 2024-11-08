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
        // Cargar imágenes de fondo y botones
        this.load.image('BackgroundSocializar', 'Assets/Temporales/backgroundsocializar.jpg');
        this.load.image('BotonPrueba2', 'Assets/Temporales/PlaceHolderCat.png');
        this.load.image('BotonPrueba3', 'Assets/Temporales/PlaceHolderCat.png');
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
            
			console.log(this.reader.dialogData);
            
			
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
            if (this.reader.dialogData[eventoId]) {
                this.dialogueSystem.showEventDialogues(eventoId, this.reader.dialogData);  
            } else {
                console.log('Evento no encontrado: ' + eventoId);
            }
        });
    }
}
