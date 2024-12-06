//IMPORT GATOTIENDA
import ReadDialog from './../Socializar/Dialogos/ReadDialog.js';
import DialogSystem from '../Socializar/Dialogos/DialogSystem.js';
import Character from '../Socializar/Dialogos/Characters.js';
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
    oleada;
    socialbacksound;
    shopbacksound;
    allDialogues = {};

    init(data) {
        this.inventory = data.inventario;
        this.oleada = data.oleada;
        console.log(this.oleada);
        console.log(this.inventory);
    }



    preload() {
        //BACKGROUND IMAGEN
        this.load.image('BackgroundSocialTienda', 'src/Assets/Finales/fondo_socializartienda2.png')
        //BOTON IMAGEN
        this.load.image('BotonMoverseIzq', 'src/Assets/Finales/boton_socializar.png');
        this.load.image('BotonMoverseDch', 'src/Assets/Finales/boton_tienda.png');
        this.load.image('BotonGenerarCarta', 'src/Assets/Finales/Khayyat.png');

        //Imagenes personajes

        this.load.image('Shai', 'src/Assets/Finales/Shai.png');
        this.load.image('Shai2', 'src/Assets/Finales/Shai3.png');

        this.load.spritesheet('cardTexture', 'src/Assets/Finales/spritesheet_cartas.png', { frameWidth: 3763 / 6, frameHeight: 882 });
        this.load.image('batalla', 'src/Assets/Finales/boton_batalla.png')
        this.load.audio('SocialSound', 'src/Assets/sfx/musica/FINALES/Ethereal Ether Main.WAV')
        this.load.audio('TiendaSound', 'src/Assets/sfx/musica/TEMPORALES/Boutique - The Legend of Zelda Ocarina of Time 3D OST.WAV')

    }

    UpdateOfrendasText() {
        this.ofrendastx.text =
            ('Ofrendas: ' + this.inventory.numgift)
    }
    create() {

        this.socialbacksound = this.sound.add('SocialSound');
        this.shopbacksound = this.sound.add('TiendaSound');
        this.socialbacksound.play({ loop: true });

        //Etapa del día 
        var stage = 0;

        //Tomamos las medidas de la pantalla para la camara
        const { width, height } = this.cameras.main;
        //Aplicamos funciones de lo que importemos en una variable
        var inventory = new Inventory();

        //Creamos el background y le aplicamos la escala
        var back = this.add.image(this.sys.game.canvas.width, this.sys.game.canvas.height / 2, 'BackgroundSocialTienda');
        back.setOrigin(0.333, 0.5);
        this.cameras.main.ScrollY = this.cameras.main.ScrollY - 540;
        this.cameras.main.ScrollX = this.cameras.main.ScrollX - 2880;

        //Esto es para que la camara se mantenga solamente en el eje Y y se pueda editar en el eje X

        //this.cameras.main.setBounds(0,0,3840,1080);
        this.cameras.main.setBounds(0, 0, 5760, 1080);

        // Capa de fondo
        this.dialogBackground = this.add.graphics();
        this.dialogBackground.fillStyle(0xffffff, 0.4); // Blanco, 50% de transparencia
        this.dialogBackground.fillRect(0, 0, width, height);
        this.dialogBackground.setVisible(false); // Oculto al inicio

        //Creamos el boton y hacemos que sea interactivo
        var Khayyat = this.add.image((this.sys.game.canvas.width / 2) * 5, this.sys.game.canvas.height / 2 - 70, 'BotonGenerarCarta')
        Khayyat.setInteractive();

        //Hacemos un boton que se ajusta para ir a la izquierda usando el ancho de la pantalla
        var botonIzq = this.add.image(0, 0, 'BotonMoverseIzq');
        botonIzq.setScale(0.25);
        botonIzq.setInteractive();
        //WIDTH + MEDIDA DEL BOTON PARA EL LADO DERECHO
        //botonIzq.setPosition(width + botonIzq.width / 4, height - botonIzq.height / 0.75);
        botonIzq.setPosition(2 * width + botonIzq.width / 4, height / 2);

        //Hacemos un boton que se ajusta para ir a la derecha usando el ancho de la pantalla
        var botonDch = this.add.image(0, 0, 'BotonMoverseDch');
        botonDch.setInteractive();
        botonDch.setScale(0.25);
        //WIDTH - MEDIDA DEL BOTON PARA EL LAZO IZQUIERDO
        //botonDch.setPosition(width - botonDch.width / 4, height - botonDch.height/0.75 );
        botonDch.setPosition(width - botonDch.width / 4, height / 2);

        if(this.inventory.day == 1)
        {
                botonDch.setVisible(false);
        }

        var auxcard;
        //El desplazamiento es a 4/5 de la pantalla cuando nos posicionamos en el lado derecho
        //const desplazamiento = 5760 - 5760 / 5;
        const desplazamiento = 3840 + 1920 / 2;
        //const velocitypan = 1000;
        const velocitypan = 400;

        //Si pulsamos en el boton, se añade algo a tu inventario
        Khayyat.on('pointerdown', pointer => {

            console.log(this.inventory.numgift + "mi numero de gift");
            if (this.inventory.numgift > 0) {
                this.inventory.AddCard(this, 'cardTexture');
                this.inventory.numgift--;
                this.UpdateOfrendasText();
                console.log(this.inventory);
                auxcard = this.add.sprite((this.sys.game.canvas.width / 2) * 5, this.sys.game.canvas.height / 2 + 300,
                    this.inventory.listCardClass[this.inventory.numcards - 1].GetTexture(), this.inventory.listCardClass[this.inventory.numcards - 1].textureindex);
                auxcard.setScale(1 / 2, 1 / 2);
            }
        })



        //boton cambio de escena a la de combate
        this.battlebtn = this.add.image(this.sys.game.canvas.width - 50, 50, 'batalla')
        this.battlebtn.setScale(0.2, 0.2);
        this.battlebtn.setInteractive();
        this.battlebtn.setVisible(false);
        this.battlebtn.on('pointerup', pointer => {
            this.scene.start('EscenaCombate',{oleada: this.oleada, inventario: this.inventory});
            
        })

            botonIzq.on('pointerdown', pointer => {
                console.log('Boton izquierdo presionado');
                const nuevoScrollX = this.cameras.main.scrollY - desplazamiento;
                this.cameras.main.pan(
                    nuevoScrollX, this.cameras.main.scrollY, velocitypan
                );
                this.shopbacksound.stop();
                this.socialbacksound.play({ loop: true });
            });

            botonDch.on('pointerdown', pointer => {
                console.log('Boton derecho presionado');
                const nuevoScrollX = this.cameras.main.scrollY + desplazamiento;
                console.log(this.cameras.main.scrollY, desplazamiento);
                this.cameras.main.pan(
                    nuevoScrollX, this.cameras.main.scrollY, velocitypan
                );
                console.log(this.cameras.main.scrollX);
                this.socialbacksound.stop();
                this.shopbacksound.play({ loop: true });
            });

            //PARTE SOCIALIZAR

            var ListaPersonajes = [];

            // Personaje
            ListaPersonajes[0] = new Character(this, this.sys.game.canvas.width / 2 + 400, this.sys.game.canvas.height + 500, 'Shai', 1);
            ListaPersonajes[0].switchDisponible();
            ListaPersonajes[1] = new Character(this, this.sys.game.canvas.width / 2 - 400, this.sys.game.canvas.height + 500, 'Shai2', 2);
            ListaPersonajes[1].switchDisponible();

            //Personaje1.setInteractive({ pixelPerfect: true });
            //Personaje2.setInteractive({ pixelPerfect: true });

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
            ListaPersonajes.forEach(personaje => {
                personaje.sprite.on('pointerup', () => {

                    const eventoId = `evento${personaje.num}.${personaje.eventNum}`;

                    if (this.reader.dialogData.Eventos[eventoId]) {


                        stage++;
                        personaje.centerPosition();
                        personaje.switchDisponible();
                        personaje.noInteractive();
                        this.hideAllCharactersExcept(personaje);
                        this.dialogueSystem.showEventDialogues(eventoId, this.reader.dialogData.Eventos);

                        console.log(stage, " ", personaje.disponible)


                    } else {
                        console.log('Evento no encontrado: ' + eventoId);
                    }

                });
            });

            this.events.on('endDialogue', () => { //volver a mostrar personajes
                this.UpdateOfrendasText();
                if(this.inventory.day == 1 && stage==1)

                    {
                        botonDch.setVisible(true); //para el tutorial
                        const nuevoScrollX = this.cameras.main.scrollY + desplazamiento;
                        console.log(this.cameras.main.scrollY, desplazamiento);
                        this.cameras.main.pan(
                            nuevoScrollX, this.cameras.main.scrollY, velocitypan
                        );
                        console.log(this.cameras.main.scrollX);
                        this.socialbacksound.stop();
                        this.shopbacksound.play({ loop: true });
                    }
                    
                this.showAllCharacters();
                if (stage === 3) {
                    this.battlebtn.setVisible(true);
                }
                
            });

            this.hideAllCharactersExcept = (activeCharacter) => { //Ocultar todos los personajes menos el que habla
                ListaPersonajes.forEach((personaje) => {
                    if (personaje !== activeCharacter) {
                        personaje.sprite.setVisible(false);
                    }
                });
            };

            this.showAllCharacters = () => {
                ListaPersonajes.forEach((personaje) => {

                    personaje.volverDisponible(); //cooldown de personaje

                    if (personaje.disponible == true && stage < 3) {

                        console.log("Personaje Disponible");
                        personaje.originalPosition();
                        personaje.sprite.setVisible(true);
                    }
                    else {
                        personaje.sprite.setVisible(false);
                    }
                    console.log(stage);
                });
            };






            //OFRENDAS

            //texto para mostrar el número de ofrendas
            this.ofrendastx = this.add.text(20, 20, 'Ofrendas: ' + this.inventory.numgift,
                {
                    font: '30px Arial, sans-serif',
                    fill: '#fff',
                    stroke: '#000',
                    strokeThickness: 4,
                    backgroundColor: '#000000',
                    padding: { x: 30, y: 20 },
                    fontStyle: 'bold'
                });
            this.ofrendastx.setScrollFactor(0); // Hacer que el texto siga a la cámara
        
    }
}