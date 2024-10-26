//IMPORT GATOTIENDA
import Inventory from './../Comunes/Inventory.js'
import DialogueSystem from '../Socializar/Dialogos/DialogsSystem.js';
import CardClass from '../Comunes/CardClass.js';

export default class EscenaSocialTienda extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/

	constructor() {
		super({ key: 'EscenaSocialTienda' });
	}

	preload() {
		//BACKGROUND IMAGEN
		this.load.image('BackgroundSocialTienda', 'Assets/Temporales/backgroundsocialtienda.jpg')
		//BOTON IMAGEN
		this.load.image('BotonMoverseIzq', 'Assets/Temporales/flechaizquierda.png');
		this.load.image('BotonMoverseDch', 'Assets/Temporales/flechaizquierda.png');
        this.load.image('BotonGenerarCarta', 'Assets/Temporales/PlaceHolderCat.png');
		this.load.image('cardTexture', 'Assets/Temporales/cardPh.jpg'); 

	}

	create() {
        //Tomamos las medidas de la pantalla para la camara
        const { width, height } = this.cameras.main;
        //Aplicamos funciones de lo que importemos en una variable
		var inventory = new Inventory();

		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width, this.sys.game.canvas.height / 2, 'BackgroundSocialTienda');
		//back.setScale(this.cameras.main.width / this.textures.get('BackgroundSocialTienda').getSourceImage().width / 2,
		//	this.cameras.main.height / this.textures.get('BackgroundSocialTienda').getSourceImage().height);
		
        this.cameras.main.setBounds(0,0,3840,1080);

        //Creamos el boton y hacemos que sea interactivo
		var sprite = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'BotonGenerarCarta')
		sprite.setInteractive();

        var botonIzq = this.add.image(0, 0, 'BotonMoverseIzq');
        botonIzq.setScale(0.25);
        botonIzq.setInteractive();
        botonIzq.setPosition(width + botonIzq.width / 2, height - botonIzq.height / 2);
        //botonIzq.setScrollFactor(0);

        var botonDch = this.add.image(0, 0, 'BotonMoverseDch');
        botonDch.setInteractive();
        botonDch.setScale(0.25);
        botonDch.setPosition(width - botonDch.width / 2, height - botonDch.height / 2);
        botonDch.rotation = Math.PI;
        //botonDch.setScrollFactor(0);

		var auxcard;
        const desplazamiento = 2500;
		
		//Si pulsamos en el boton, se añade algo a tu inventario
		sprite.on('pointerdown', pointer => {
			inventory.AddGift(1);
			inventory.AddCard(this,'cardTexture');
			console.log(inventory.GetGitf());
			auxcard =this.add.image(inventory.numcards*10, this.sys.game.canvas.height / 2, inventory.listCardClass[0].GetTexture());

		});

        botonIzq.on('pointerdown', pointer =>{
            console.log('Boton izquierdo presionado');
            const nuevoScrollX = Math.max(this.cameras.main.scrollX - desplazamiento, 0); // No baja de 0
            this.cameras.main.pan(
                nuevoScrollX, this.cameras.main.scrollY, 500
            );
            //botonIzq.setPosition = Math.min(botonIzq.position + this.desplazamiento, 1600);
            //botonDch.setPosition = Math.min(botonIzq.position + this.desplazamiento, 1600);
            
        });

        botonDch.on('pointerdown', pointer =>{
            console.log('Boton derecho presionado');
            const nuevoScrollX = Math.min(this.cameras.main.scrollX + desplazamiento, 2500);
            this.cameras.main.pan(
                nuevoScrollX, this.cameras.main.scrollY, 500
            );
            //botonIzq.setPosition = Math.max(botonIzq.position - this.desplazamiento, 0);
            //botonDch.setPosition = Math.max(botonDch.position - this.desplazamiento, 0);
        });
	}

}