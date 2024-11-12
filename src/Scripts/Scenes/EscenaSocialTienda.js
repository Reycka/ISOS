//IMPORT GATOTIENDA
import ReadDialog from './../Socializar/Dialogos/ReadDialog.js';
import DialogSystem from '../Socializar/Dialogos/DialogSystem.js';
import Inventory from './../Comunes/Inventory.js'
import CardClass from '../Comunes/CardClass.js';



export default class EscenaSocialTienda extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/

	constructor() {
		super({ key: 'EscenaSocialTienda' });

	}

    inventory;

    allDialogues = {};

    init(data) {
        this.inventory = data;
        console.log(this.inventory);
    }



	preload() {
		//BACKGROUND IMAGEN
		this.load.image('BackgroundSocialTienda', 'src/Assets/Temporales/backgroundsocialtienda.png')
		//BOTON IMAGEN
		this.load.image('BotonMoverseIzq', 'src/Assets/Temporales/flechaizquierda.png');
		this.load.image('BotonMoverseDch', 'src/Assets/Temporales/flechaizquierda.png');
        this.load.image('BotonGenerarCarta', 'src/Assets/Finales/Khayyat.png');
		this.load.spritesheet('cardTexture', 'src/Assets/Finales/spritesheet_cartas.png',{frameWidth: 3763/6, frameHeight: 882}); 
        this.load.image('Shai', 'src/Assets/Finales/Shai.png');
        this.load.image('batalla','src/Assets/Finales/boton_batalla.png')

	}

    UpdateOfrendasText(){
        this.ofrendastx.text =
        ('Ofrendas: '+this.inventory.numgift)
    }
	create() {
        //Tomamos las medidas de la pantalla para la camara
        const { width, height } = this.cameras.main;
        //Aplicamos funciones de lo que importemos en una variable
		var inventory = new Inventory();

		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width, this.sys.game.canvas.height / 2, 'BackgroundSocialTienda');
		
        //Esto es para que la camara se mantenga solamente en el eje Y y se pueda editar en el eje X
        this.cameras.main.setBounds(0,0,3840,1080);

        // Capa de fondo
        this.dialogBackground = this.add.graphics();
        this.dialogBackground.fillStyle(0xffffff, 0.4); // Blanco, 50% de transparencia
        this.dialogBackground.fillRect(0, 0, width, height);
        this.dialogBackground.setVisible(false); // Oculto al inicio

        //Creamos el boton y hacemos que sea interactivo
		var Khayyat = this.add.image((this.sys.game.canvas.width / 2)*3, this.sys.game.canvas.height / 2 - 70, 'BotonGenerarCarta')
		Khayyat.setInteractive();

        //Hacemos un boton que se ajusta para ir a la izquierda usando el ancho de la pantalla
        var botonIzq = this.add.image(0, 0, 'BotonMoverseIzq');
        botonIzq.setScale(0.25);
        botonIzq.setInteractive();
        //WIDTH + MEDIDA DEL BOTON PARA EL LADO DERECHO
        botonIzq.setPosition(width + botonIzq.width / 4, height - botonIzq.height / 0.75);

        
        //Hacemos un boton que se ajusta para ir a la derecha usando el ancho de la pantalla
        var botonDch = this.add.image(0, 0, 'BotonMoverseDch');
        botonDch.setInteractive();
        botonDch.setScale(0.25);
        //WIDTH - MEDIDA DEL BOTON PARA EL LAZO IZQUIERDO
        botonDch.setPosition(width - botonDch.width / 4, height - botonDch.height/0.75 );
        botonDch.rotation = Math.PI;

		var auxcard;
        //El desplazamiento es a 4/5 de la pantalla cuando nos posicionamos en el lado derecho
        const desplazamiento = 3840 - 3840 / 5;
		
		//Si pulsamos en el boton, se añade algo a tu inventario
		Khayyat.on('pointerdown', pointer => {
			
            console.log(this.inventory.numgift+"mi numero de gift");
            if(this.inventory.numgift>0){
			this.inventory.AddCard(this,'cardTexture');
            this.inventory.numgift--;
            this.UpdateOfrendasText();
			console.log(this.inventory);
            auxcard =this.add.sprite((this.sys.game.canvas.width / 2)*3, this.sys.game.canvas.height / 2 +300,
            this.inventory.listCardClass[this.inventory.numcards-1].GetTexture(),this.inventory.listCardClass[this.inventory.numcards-1].textureindex);
           auxcard.setScale(1/2,1/2);     
        }
       
            
		});

        botonIzq.on('pointerdown', pointer =>{
            console.log('Boton izquierdo presionado');
            const nuevoScrollX = this.cameras.main.scrollY - desplazamiento;
            this.cameras.main.pan(
                nuevoScrollX, this.cameras.main.scrollY, 1000
            );
        });

        botonDch.on('pointerdown', pointer =>{
            console.log('Boton derecho presionado');
            const nuevoScrollX = this.cameras.main.scrollY + desplazamiento; 
            console.log(this.cameras.main.scrollY, desplazamiento);
            this.cameras.main.pan(
                nuevoScrollX, this.cameras.main.scrollY, 1000
            );
            console.log(this.cameras.main.scrollX);
        });

        //PARTE SOCIALIZAR

        // Personaje
        var PersonajeP = this.add.image(this.sys.game.canvas.width/2-50, this.sys.game.canvas.height + 500, 'Shai');
        PersonajeP.setInteractive({ pixelPerfect: true });
       
        // Inicializar el sistema de diálogos
        this.dialogueSystem = new DialogSystem(this, this.inventory);
        this.reader = new ReadDialog(this);  // Instanciar ReadDialog

        // Cargar el archivo JSON con los diálogos
        this.reader.loadJSON('src/Scripts/Texto/dialogs.json').then(() => {
            
			//console.log(this.reader.dialogData);
            
			
        });

        // Click
        this.input.on('pointerup', () => this.dialogueSystem.onPointerDown(), this);


        // Eventos para mostrar/ocultar capa de fondo
        this.events.on('showDialogueBackground', () => {
            this.dialogBackground.setVisible(true);
        });
        this.events.on('hideDialogueBackground', () => {
            this.dialogBackground.setVisible(false);
        });


        // Mostrar dialogos
        PersonajeP.on('pointerup', pointer => {
            const eventoId = 'prueba';  
			
            if (this.reader.dialogData.Eventos[eventoId]) {
                PersonajeP.disableInteractive();
                this.dialogueSystem.showEventDialogues(eventoId, this.reader.dialogData.Eventos);  
            } else {
                console.log('Evento no encontrado: ' + eventoId);
            }
        });

        this.events.on('endDialogue', () => {
            PersonajeP.setInteractive(); 
            this.UpdateOfrendasText();
        });
        //texto para mostrar el número de ofrendas
        this.ofrendastx = this.add.text(20, 20, 'Ofrendas: '+this.inventory.numgift, { font: '30px Arial, sans-serif',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4,
            backgroundColor: '#000000',
            padding: { x: 30, y: 20 },
            fontStyle: 'bold' });
        this.ofrendastx.setScrollFactor(0); // Hacer que el texto siga a la cámara
        //boton cambio de escena a la de combate
        var battlebtn = this.add.image(this.sys.game.canvas.width-50 ,50, 'batalla')
        battlebtn.setScale(0.2,0.2);
		battlebtn.setInteractive();
		battlebtn.on('pointerup', pointer => {
			this.scene.start('EscenaCombate',this.inventory);
		})

    }




	

}