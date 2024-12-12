//IMPORT GATOTIENDA
import ReadDialog from './../Socializar/Dialogos/ReadDialog.js';
import DialogSystem from '../Socializar/Dialogos/DialogSystem.js';
import Character from '../Socializar/Dialogos/Characters.js';
import Inventory from './../Comunes/Inventory.js'
import CardClass from '../Comunes/CardClass.js';
import AffinityBar from '../Comunes/AffinityBar.js';
import AffinityRegister from '../Comunes/AffinityRegister.js';



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
        let value;
        this.affinitys = [{value}];
        this.UpdateAffinityValues();        
        console.log(this.affinityValues);
    }



    preload() {
        //fondo
        this.load.image('BackgroundSocialTienda', 'src/Assets/Finales/fondo_socializartienda2.png')
        //imagen botones
        this.load.image('BotonMoverseIzq', 'src/Assets/Finales/boton_socializar.png');
        this.load.image('BotonMoverseDch', 'src/Assets/Finales/boton_tienda.png');
        this.load.image('BotonGenerarCarta', 'src/Assets/Finales/Khayyat.png');
        this.load.image('fondoSinergias', 'src/Assets/Temporales/Fondo.png')
        this.load.spritesheet('lettersTextures','src/Assets/Finales/JeroglificosSpritesheet.png',{ frameWidth: 61, frameHeight: 61 })
     
        //Imagenes personajes

        this.load.image('Shai', 'src/Assets/Finales/Shai.png');
        this.load.image('Shai2', 'src/Assets/Finales/Shai3.png');

        //Eshe y Tarik

        this.load.image('EsheTarikChibi', 'src/Assets/Finales/EsheTarikChibi.png');
        this.load.image('EsheTarik', 'src/Assets/Finales/EsheTarik.png');
        this.load.image('EsheTarikNo', 'src/Assets/Finales/EsheTarikNo.png');
        this.load.image('EsheTarikT', 'src/Assets/Finales/EsheTarikT.png');
        this.load.image('EsheTarikE', 'src/Assets/Finales/EsheTarikE.png');

        //Adio
        this.load.image('Adio', 'src/Assets/Finales/Adio.png');
        this.load.image('AdioNo', 'src/Assets/Finales/AdioNo.png');
        this.load.image('AdioChibi', 'src/Assets/Finales/AdioChibi.png');

        //Khalid
        this.load.image('Khalid', 'src/Assets/Finales/Khalid.png');
        this.load.image('KhalidNo', 'src/Assets/Finales/KhalidNo.png');
        this.load.image('KhalidChibi', 'src/Assets/Finales/KhalidChibi.png');


        //miscelanea de imagenes
        this.load.spritesheet('cardTexture', 'src/Assets/Finales/spritesheet_cartas.png', { frameWidth: 3763 / 6, frameHeight: 882 });
        this.load.image('cardback','src/Assets/Finales/CartaParteTrasera.png')
        this.load.image('batalla', 'src/Assets/Finales/boton_batalla.png')
        //Audio
        this.load.audio('SocialSound', 'src/Assets/sfx/musica/FINALES/Ethereal Golden Clouds Main.WAV')
        this.load.audio('TiendaSound', 'src/Assets/sfx/musica/TEMPORALES/Boutique - The Legend of Zelda Ocarina of Time 3D OST.WAV')
        this.load.audio('sacarcartaSFX','src/Assets/sfx/sonidos/FX Magic Deck 004.wav')
       
    }

    //REPUTACIÓN

    UpdateAffinityValues(){
        this.affinityValues = [this.inventory.affreg.GetRa()/this.inventory.affreg.maxAffinity,
            this.inventory.affreg.GetIsis()/this.inventory.affreg.maxAffinity,
            this.inventory.affreg.GetAnubis()/this.inventory.affreg.maxAffinity,
            this.inventory.affreg.GetHorus()/this.inventory.affreg.maxAffinity,
            this.inventory.affreg.GetOsiris()/this.inventory.affreg.maxAffinity,
            this.inventory.affreg.GetSeth()/this.inventory.affreg.maxAffinity];
    }

    UpdateBar(bar, affinity, initialHeight) {
        let newHeight = affinity * initialHeight; // Altura ajustada
        let offsetY = (initialHeight - newHeight) / 2; // Calcular el desplazamiento hacia abajo
        bar.setSize(bar.width, newHeight); // Ajustar el tamaño
        bar.setPosition(bar.x, 120 + offsetY); // Ajustar la posición en Y
    }

    UpdateOfrendasText() {
        this.ofrendastx.text =
            ('Ofrendas: ' + this.inventory.numgift)
            
    }

    UpdateAffinitys(){
        this.UpdateAffinityValues();
        for (let i = 0; i < this.affinitys.length; ++i){
            this.UpdateBar(this.affinitys[i],this.affinitys[i].value,160);
        }
    }

    create() {

        this.socialbacksound = this.sound.add('SocialSound');
        this.cardsound = this.sound.add('sacarcartaSFX');
        
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
        const velocitypan = 2000;

        let widthBar = 30;
        let heightBar = 160;

        this.affinitys[0] =  new AffinityBar(this,60,120,widthBar,heightBar,0xe8b14c);
        this.affinitys[1] = new AffinityBar(this,100,120,widthBar,heightBar,0x55c7c8);
        this.affinitys[2] = new AffinityBar(this,140,120,widthBar,heightBar,0x3c4e9a);
        this.affinitys[3] = new AffinityBar(this,180,120,widthBar,heightBar,0x448162);
        this.affinitys[4] = new AffinityBar(this,220,120,widthBar,heightBar,0x24212a);
        this.affinitys[5] = new AffinityBar(this,260,120,widthBar,heightBar,0xc92b1f);

        console.log(this.affinitys.length);

        this.UpdateAffinityValues();
        for (let i = 0; i < this.affinitys.length; ++i){
            this.affinitys[i].setScrollFactor(0);
            this.UpdateBar(this.affinitys[i],this.affinityValues[i],160);
        }

        this.backgroundAffinitys = this.add.image(160,120,'fondoSinergias');
        this.backgroundAffinitys.setScrollFactor(0);

        this.auxcard = this.add.sprite((this.sys.game.canvas.width / 2) * 5, this.sys.game.canvas.height / 2 + 300,null);
        this.auxcard.setVisible(false)
        this.auxlsprite = this.add.sprite(((this.sys.game.canvas.width / 2) * 5)-102, this.sys.game.canvas.height / 2 +138,'lettersTextures');
        this.auxlsprite.setScale(0.8,0.8)
        this.auxlsprite.setVisible(false);
        //Si pulsamos en el boton, se añade algo a tu inventario
        this.auxcardbool = true;
        Khayyat.on('pointerdown', pointer => {

            console.log(this.inventory.numgift + "mi numero de gift");
            if (this.inventory.numgift > 0&&this.auxcardbool) {
                this.inventory.AddCard(this, 'cardTexture');

                this.auxlsprite.setVisible(false);
                this.auxcardbool = false;

                this.inventory.numgift--;
                this.UpdateOfrendasText();
                console.log(this.inventory);
                this.auxcard.setVisible(true)
                this.auxcard.setTexture(this.inventory.listCardClass[this.inventory.numcards - 1].GetTexture()); 
                this.auxcard.setFrame(this.inventory.listCardClass[this.inventory.numcards - 1].textureindex)
                this.cardsound.play({loop:false});
                this.auxcard.setScale(1 / 2, 1 / 2);
                this.anim2 = this.tweens.add({
                    targets: this.auxcard,
                    props: {
                        scaleX: { value: 0, duration: 200, yoyo: true },
                        texture: {value:'cardTexture', frameIndex: this.inventory.listCardClass[this.inventory.numcards - 1].textureindex, duration: 0, delay: 200 }
                    },
                    onComplete: () => {
                       
                    },
                    repeat: 1,
                    ease: 'Expo.easeIn',
                });
                
                this.anim1 = this.tweens.add({
                    targets: this.auxcard,
                    y: -200,
                    duration: 500,
                    ease: 'Sine.easeInOut',
                    
                    texture: { value:  'cardback', duration:0, delay: 0},
                    
                    flipX: false,
                    yoyo: true,
                    repeat: 0,
                    delay: 10,
                    onComplete: () => {
                        this.anim2.play(); 
                        this.auxlsprite.setVisible(true)
                        this.auxlsprite.setFrame(this.inventory.listCardClass[this.inventory.numcards - 1].stads.letter)
                        this.auxcardbool = true; 

                    }
                });
            
                
                
               
                //this.anim2.play();
    
            }
        })



        //boton cambio de escena a la de combate
        this.battlebtn = this.add.image(this.sys.game.canvas.width - 50, this.sys.game.canvas.height - 50, 'batalla')
        this.battlebtn.setScale(0.2, 0.2);
        this.battlebtn.setInteractive();
       // this.battlebtn.setVisible(false);
        this.battlebtn.on('pointerup', pointer => {
            this.inventory.day++;
            console.log(this.inventory.day);
            this.socialbacksound.stop();
            this.scene.start('EscenaCombate',{oleada: this.oleada, inventario: this.inventory});
            
        })

            botonIzq.on('pointerdown', pointer => {
                console.log('Boton izquierdo presionado');
                const nuevoScrollX = this.cameras.main.scrollY - desplazamiento;
                this.animatePan(nuevoScrollX,velocitypan);
                this.InvisibleBackground();
                this.shopbacksound.stop();

                this.auxcard.setVisible(false);
                this.auxlsprite.setVisible(false);

                this.socialbacksound.play({ loop: true });
            });

            botonDch.on('pointerdown', pointer => {
                console.log('Boton derecho presionado');
                const nuevoScrollX = this.cameras.main.scrollY + desplazamiento;
                console.log(this.cameras.main.scrollY, desplazamiento);
                this.animatePan(nuevoScrollX,velocitypan);
                this.InvisibleBackground();
                console.log(this.cameras.main.scrollX);
                this.socialbacksound.stop();
                this.shopbacksound.play({ loop: true });
            });

            //PARTE SOCIALIZAR

            var ImagenesEsheTarik = ['EsheTarikChibi','EsheTarikNo','EsheTarikT','EsheTarikE'];
            var ImagenesAdio = ['AdioChibi','Adio','AdioNo'];
            var ImagenesAdio = ['KhalidChibi','Khalid','KhalidNo'];

            var ListaPersonajes = [];

            // Personaje
            ListaPersonajes[0] = new Character(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height/2 +200, ImagenesEsheTarik, 0);
            ListaPersonajes[0].switchDisponible();
            ListaPersonajes[1] = new Character(this, this.sys.game.canvas.width / 2 - 400, this.sys.game.canvas.height + 500, ImagenesAdio, 4);
       
            
            this.reader = new ReadDialog(this);  // Instanciar ReadDialog

            // Cargar el archivo JSON con los diálogos
            this.reader.loadJSON('src/Scripts/Texto/dialogs.json').then(() => {

                //console.log(this.reader.dialogData);


            });

            // Inicializar el sistema de diálogos

            this.dialogueSystem = new DialogSystem(this, this.inventory,this.reader.dialogData.Eventos);

            
            

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

                    this.dialogueSystem = new DialogSystem(this, this.inventory,this.reader.dialogData.Eventos,personaje);

                    

                    const eventoId = `evento${personaje.num}.${this.inventory.EventList[personaje.num]}`;

                    if (this.reader.dialogData.Eventos[eventoId]) {

                        


                        stage++;
                        personaje.centerPosition();
                        personaje.switchDisponible();
                        personaje.noInteractive();
                        this.hideAllCharactersExcept(personaje);
                        this.dialogueSystem.showEventDialogues(eventoId, this.reader.dialogData.Eventos);
                        botonDch.setVisible(false);

                        //console.log(stage, " ", personaje.disponible)
                        this.inventory.EventList[personaje.num]++;

                        


                    } else {
                        console.log('Evento no encontrado: ' + eventoId);
                    }

                });
            });

            this.events.on('endDialogue', () => { //volver a mostrar personajes
                this.UpdateOfrendasText();
                if(this.inventory.day == 1 && stage==1)
                {
                  
                    const nuevoScrollX = this.cameras.main.scrollY + desplazamiento;
                    console.log(this.cameras.main.scrollY, desplazamiento);
                    this.animatePan(nuevoScrollX,velocitypan);
                    console.log(this.cameras.main.scrollX);
                    this.socialbacksound.stop();
                    this.shopbacksound.play({ loop: true });
                }
               
                if(stage != 0 || this.inventory.day != 1){       

                    botonDch.setVisible(true);  
                }  

                this.showAllCharacters();
                if (stage === 3) {
                    this.battlebtn.setVisible(true);
                }

                //ACTUALIZACION DE AFINIDADES
                this.UpdateAffinityValues();
                for (let i = 0; i < this.affinitys.length; ++i){
                    this.affinitys[i].setScrollFactor(0);
                    this.UpdateBar(this.affinitys[i],this.affinityValues[i],160);
                }
                if (this.inventory.day == 1 && stage == 1) this.InvisibleBackground();
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

                        //console.log("Personaje Disponible");
                        personaje.originalPosition();
                        personaje.sprite.setVisible(true);
                    }
                    else {
                        personaje.sprite.setVisible(false);
                    }
                    console.log("Stage: ", stage);
                });
            };






            //OFRENDAS

            //texto para mostrar el número de ofrendas
            this.ofrendastx = this.add.text(this.sys.game.canvas.width - 250,20, 'Ofrendas: ' + this.inventory.numgift,
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

    animatePan(targetScrollX, duration) {
        // Usa un tween para animar el scrollX de la cámara
        this.tweens.add({
            targets: this.cameras.main, // Objetivo: la cámara principal
            scrollX: targetScrollX, // Interpolar hasta este valor
            duration: duration, // Duración de la animación en ms
            ease: 'Linear', // Efecto de interpolación (puedes cambiarlo)
            onComplete: () => {
                this.VisibleBackground();
                console.log('Animación completada');
            }
        });
    }

    InvisibleBackground(){
        this.backgroundAffinitys.setVisible(false);
        for (let i = 0; i < this.affinitys.length; ++i){
            this.affinitys[i].setVisible(false);
        }
        this.ofrendastx.setVisible(false);
    }

    VisibleBackground(){
        this.backgroundAffinitys.setVisible(true);
        for (let i = 0; i < this.affinitys.length; ++i){
            this.affinitys[i].setVisible(true);
        }
        this.ofrendastx.setVisible(true);
    }
}