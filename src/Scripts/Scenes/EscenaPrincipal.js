import Inventory from './../Comunes/Inventory.js'
/**
 * Escena de T�tulo.
 * @extends Phaser.Scene
 */

export default class EscenaPrincipal extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/
	oleada1;
	constructor() {
		super({ key: 'EscenaPrincipal' });
	}

	preload() {

		this.load.image('Background','src/Assets/Finales/fondo_socializar.png')
		this.load.image('Titulo','src/Assets/Finales/TituloChamberOfTheHeart.png');
		this.load.image('BotonComenzar','src/Assets/Finales/boton_comenzar.png');
		this.load.image('IMPORTANTITISISISMOCLAVEINDISPENSABLE','src/Assets/raizclaveimportantisimadelproyecto.jpg')
		this.load.image('BotonSalir','src/Assets/Finales/boton_salir.png');

		this.load.audio('fondito','src/Assets/sfx/musica/FINALES/EtherealHeartbeatMain.wav')
		this.oleada1 = 1;

		//ESCENA SOCIALIZAR
		        //fondo
				this.load.image('BackgroundSocialTienda', 'src/Assets/Finales/fondo_socializartienda2.png')
				//imagen botones
				this.load.image('BotonMoverseIzq', 'src/Assets/Finales/boton_socializar.png');
				this.load.image('BotonMoverseDch', 'src/Assets/Finales/boton_tienda.png');
				this.load.image('BotonGenerarCarta', 'src/Assets/Finales/Khayyat.png');
				this.load.image('fondoSinergias', 'src/Assets/Temporales/Fondo.png')
				this.load.spritesheet('lettersTextures','src/Assets/Finales/JeroglificosSpritesheet.png',{ frameWidth: 61, frameHeight: 61 })
				this.load.image('botoninventario','src/Assets/Finales/boton_inventario.png')
				this.load.image('invbackground','src/Assets/Finales/fondoinventario.png')
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
				this.load.audio('SocialSound', 'src/Assets/sfx/musica/FINALES/EtherealGoldenCloudsMain.wav')
				this.load.audio('TiendaSound', 'src/Assets/sfx/musica/FINALES/EtherealLuminesceIntensity2.wav')
				this.load.audio('sacarcartaSFX','src/Assets/sfx/sonidos/FXMagicDeck004.wav')

		//ESCENA DE COMBATE 
		//BACKGROUND IMAGEN
		this.load.image('Background1', 'src/Assets/Finales/fondo_combate.png');

		//FONDO MATRIZ
		this.load.image('MatrixGround', 'src/Assets/Finales/casilla.png');

		this.load.image('MatrixGround2', 'src/Assets/Finales/casilla2.png');

		//INFANTERÍA PRUEBA
		this.load.spritesheet('LA', 'src/Assets/Finales/ARQUEROLARGO.png',{ frameWidth:1560, frameHeight:1560});

		//ARQUERO LARGO PRUEBA
		this.load.spritesheet('G', 'src/Assets/Finales/GUERRERO.png',{ frameWidth: 1560, frameHeight: 1560});

		//MAGO PRUEBA
		this.load.spritesheet('M', 'src/Assets/Finales/MAGO.png',{ frameWidth: 1560, frameHeight: 1560});

		//HEALER PRUEBA
		this.load.spritesheet('H', 'src/Assets/Finales/CURANDERO.png',{ frameWidth: 1560, frameHeight: 1560});

		//CARRO PRUEBA
		this.load.spritesheet('C', 'src/Assets/Finales/CARRO.png',{ frameWidth: 1560, frameHeight: 1560});

		//ARCO CORTO PRUEBA
		this.load.spritesheet('SA', 'src/Assets/Finales/ARQUEROCORTO.png',{ frameWidth: 1560, frameHeight: 1560});

		//INFANTERÍA PRUEBA
		this.load.spritesheet('ELA', 'src/Assets/Finales/ARQUEROLARGOE.png',{ frameWidth:1560, frameHeight:1560});

		//ARQUERO LARGO PRUEBA
		this.load.spritesheet('EG', 'src/Assets/Finales/GUERREROE.png',{ frameWidth: 1560, frameHeight: 1560});

		//MAGO PRUEBA
		this.load.spritesheet('EM', 'src/Assets/Finales/MAGOE.png',{ frameWidth: 1560, frameHeight: 1560});

		//HEALER PRUEBA
		this.load.spritesheet('EH', 'src/Assets/Finales/CURANDEROE.png',{ frameWidth: 1560, frameHeight: 1560});

		//CARRO PRUEBA
		this.load.spritesheet('EC', 'src/Assets/Finales/CARROE.png',{ frameWidth: 1560, frameHeight: 1560});

		//ARCO CORTO PRUEBA
		this.load.spritesheet('ESA', 'src/Assets/Finales/ARQUEROCORTOE.png',{ frameWidth: 1560, frameHeight: 1560});

		//enemigo
		this.load.image('E', 'src/Assets/Finales/e.png');

		//BOSS
		this.load.image('B', 'src/Assets/Temporales/Serpiente.png');
		
		//flecha inventario
		this.load.image('flecha', 'src/Assets/Finales/boton_desplazamiento.png');
		this.load.image('Pelea', 'src/Assets/Finales/boton_batalla.png');
		//VICTORIA Y DERROTA
			this.load.image('victoria','src/Assets/Finales/Victoria.png')
			this.load.image('derrota','src/Assets/Finales/Derrota.png');
			this.load.image('volver','src/Assets/Finales/boton_volver.png')
			this.load.image('continuar','src/Assets/Finales/boton_continuar.png')

		//sinergias
		this.load.image('BackgroundPosiblesEnemigos', 'src/Assets/Finales/FondoPosiblesEnemigos.png');
		this.load.image('BackgroundChuletaSinergias', 'src/Assets/Finales/FondoSinergias.png');
		this.load.image('Rades','src/Assets/Finales/JeroglificosRa.png')
		this.load.image('Raact','src/Assets/Finales/JeroglificosRaIluminado.png')
		this.load.image('Osirisdes','src/Assets/Finales/JeroglificosOsiris.png')
		this.load.image('Osirisact','src/Assets/Finales/JeroglificosOsirisIluminado.png')
		this.load.image('Horusdes','src/Assets/Finales/JeroglificosHorus.png')
		this.load.image('Horusact','src/Assets/Finales/JeroglificosHorusIluminado.png')
		this.load.image('Isisdes','src/Assets/Finales/JeroglificosIsis.png')
		this.load.image('Isisact','src/Assets/Finales/JeroglificosIsisIluminado.png')
		this.load.image('Anubisdes','src/Assets/Finales/JeroglificosAnubis.png')
		this.load.image('Anubisact','src/Assets/Finales/JeroglificosAnubisIluminado.png')
		this.load.image('Sethdes','src/Assets/Finales/JeroglificosSeth.png')
		this.load.image('Sethact','src/Assets/Finales/JeroglificosSethIluminado.png')

		//Música
		this.load.audio('PreCombate','src/Assets/sfx/musica/FINALES/EpicVol2TrustMain.wav')
		this.load.audio('Combate','src/Assets/sfx/musica/FINALES/EpicVol2TroopsMain.wav')
		this.load.audio('CombateBoss','src/Assets/sfx/musica/FINALES/EpicVol2WhistleblowerMain.wav')
		this.load.audio('Win','src/Assets/sfx/musica/FINALES/EpicVol2WinIntensity 2.wav')
		this.load.audio('Lose','src/Assets/sfx/musica/FINALES/OrchAmbientVol2TearsIntensity2.wav')

		//SFX
		this.load.audio('Pendejo','src/Assets/sfx/sonidos/DerrotaSound.wav')
		this.load.audio('Pego','src/Assets/sfx/sonidos/pegaryeso/BryceAttackB.wav')
		this.load.audio('MePegan','src/Assets/sfx/sonidos/pegaryeso/BryceAttackA.wav')
		this.load.audio('movercartas','src/Assets/sfx/sonidos/CardPlacing007.wav')
		this.load.audio('elegircartas','src/Assets/sfx/sonidos/CardsShuffleOneshot004.wav')
		this.load.audio('iniciabatalla','src/Assets/sfx/sonidos/ImpactMetalSpring005.wav')

	}
	
	create() {
		var importante = this.add.image(this.sys.game.canvas.width / 2,300,'IMPORTANTITISISISMOCLAVEINDISPENSABLE');
		var audio = this.sound.add('fondito')
		audio.play({loop:true});
		var inventory = new Inventory(importante);
		inventory.AddGift(6);
		this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'Background');
		var title = this.add.image(this.sys.game.canvas.width / 2,300,"Titulo");
		var start = this.add.image(this.sys.game.canvas.width / 2,700,"BotonComenzar");
		var exit = this.add.image(this.sys.game.canvas.width / 2,900,"BotonSalir");
		start.setScale(0.35,0.35);
		exit.setScale(0.35,0.35);
		start.setInteractive(); 
		exit.setInteractive();
		start.on('pointerup', pointer => {
			audio.stop();
			this.scene.start('EscenaSocialTienda',{oleada: this.oleada1, inventario: inventory});
		})
		exit.on('pointerup', pointer => {

			location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
		})
	}

}