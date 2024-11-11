//IMPORT GATOTIENDA
import Inventory from './../Comunes/Inventory.js'
import DialogueSystem from '../Socializar/Dialogos/DialogSystem.js';
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
		this.load.image('BackgroundSocialTienda', 'ChamberOfTheHeart/Assets/Temporales/backgroundsocialtienda.png')
		//BOTON IMAGEN
		this.load.image('BotonMoverseIzq', 'ChamberOfTheHeart/Assets/Temporales/flechaizquierda.png');
		this.load.image('BotonMoverseDch', 'ChamberOfTheHeart/Assets/Temporales/flechaizquierda.png');
        this.load.image('BotonGenerarCarta', 'ChamberOfTheHeart/Assets/Temporales/PlaceHolderCat.png');
		this.load.image('cardTexture', 'ChamberOfTheHeart/Assets/Temporales/cardPh.jpg'); 

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

        //Creamos el boton y hacemos que sea interactivo
		var sprite = this.add.image((this.sys.game.canvas.width / 2)*3, this.sys.game.canvas.height / 2, 'BotonGenerarCarta')
		sprite.setInteractive();

        //Hacemos un boton que se ajusta para ir a la izquierda usando el ancho de la pantalla
        var botonIzq = this.add.image(0, 0, 'BotonMoverseIzq');
        botonIzq.setScale(0.25);
        botonIzq.setInteractive();
        //WIDTH + MEDIDA DEL BOTON PARA EL LADO DERECHO
        botonIzq.setPosition(width + botonIzq.width / 2, height - botonIzq.height / 2);

        //Hacemos un boton que se ajusta para ir a la derecha usando el ancho de la pantalla
        var botonDch = this.add.image(0, 0, 'BotonMoverseDch');
        botonDch.setInteractive();
        botonDch.setScale(0.25);
        //WIDTH - MEDIDA DEL BOTON PARA EL LAZO IZQUIERDO
        botonDch.setPosition(width - botonDch.width / 2, height - botonDch.height / 2);
        botonDch.rotation = Math.PI;

		var auxcard;
        //El desplazamiento es a 4/5 de la pantalla cuando nos posicionamos en el lado derecho
        const desplazamiento = 3840 - 3840 / 5;
		
		//Si pulsamos en el boton, se añade algo a tu inventario
		sprite.on('pointerdown', pointer => {
			inventory.AddGift(1);
			inventory.AddCard(this,'cardTexture');
			console.log(inventory.GetGitf());
			auxcard =this.add.image(inventory.numcards*10, this.sys.game.canvas.height / 2, inventory.listCardClass[0].GetTexture());

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
	}

}