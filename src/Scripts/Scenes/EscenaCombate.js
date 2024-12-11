import Inventory from './../Comunes/Inventory.js'
import CardLogic from './../Comunes/CardLogic.js'
import CardClass from './../Comunes/CardClass.js'
import Matriz from './../Combate/Matriz.js'
import EnemyMatriz from './../Combate/EnemyMatriz.js'
import SlotClass from '../Combate/SlotClass.js'
import BattleManager from '../Combate/BattleManager.js'
import AlteredState from '../Combate/AlteredStateClass.js'
import UnitClass from '../Combate/UnitClass.js'
export default class EscenaCombate extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/
	//PROPIETIES
	mat;
	enemymatriz;
	matimg;
	inventory;
	inventoryindex = 0;
	battleManager;
	oleada
	//SOUNDS
	preCombatSound;
	combatSound;
	endCombatSound;
	constructor() {
		super({ key: 'EscenaCombate' });
	}
	init(data){
		this.oleada = data.oleada;
		this.inventory = data.inventario;
		console.log(this.oleada);
		console.log(this.inventory);
	}

	preload() {
		//BACKGROUND IMAGEN

		this.load.image('Background1', 'src/Assets/Finales/fondo_combate.png');

		//FONDO MATRIZ
		this.load.image('MatrixGround', 'src/Assets/Finales/casilla.png');

		this.load.image('MatrixGround2', 'src/Assets/Finales/casilla2.png');
		//INFANTERÍA PRUEBA

		this.load.image('LA', 'src/Assets/Finales/p1.png');
		//ARQUERO LARGO PRUEBA
		this.load.image('G', 'src/Assets/Finales/p2.png');
		//MAGO PRUEBA
		this.load.image('M', 'src/Assets/Finales/p3.png');
		//HEALER PRUEBA
		this.load.image('H', 'src/Assets/Finales/p4.png');
		//CARRO PRUEBA
		this.load.image('C', 'src/Assets/Finales/p5.png');
		//ARCO CORTO PRUEBA
		this.load.image('SA', 'src/Assets/Finales/p6.png');
		//enemigo
		this.load.image('E', 'src/Assets/Finales/e.png');

		//BOSS
		this.load.image('B', 'src/Assets/Temporales/Serpiente.png');
		
		//flecha inventario
		this.load.image('flecha', 'src/Assets/Finales/boton_desplazamiento.png');
		this.load.image('Pelea', 'src/Assets/Finales/boton_batalla.png');

<<<<<<< Updated upstream
=======
		//sinergias
		this.load.image('BackgroundPosiblesEnemigos', 'src/Assets/Finales/FondoPosiblesEnemigos.png');
		this.load.image('BackgroundChuletaSinergias', 'src/Assets/Finales/FondoSinergias.png');
		this.load.image('Rades','src/Assets/Finales/JeroglificosRa.png')
		this.load.image('RAact')
		this.load.image('Osirisdes','src/Assets/Finales/JeroflificosOsiris.png')
		this.load.image('Osirisact')
		this.load.image('Horusdes','src/Assets/Finales/JeroflificosHorus.png')
		this.load.image('Horusact')
		this.load.image('Irisdes','src/Assets/Finales/JeroflificosIris.png')
		this.load.image('Irisact')
		this.load.image('Anubisdes','src/Assets/Finales/JeroflificosAnubis.png')
		this.load.image('Anubisact')
		this.load.image('Sethdes','src/Assets/Finales/JeroflificosSeth.png')
		this.load.image('Setact')
		
>>>>>>> Stashed changes
		//Música
		this.load.audio('PreCombate','src/Assets/sfx/musica/FINALES/Epic Vol2 Trust Main.WAV')
		this.load.audio('Combate','src/Assets/sfx/musica/FINALES/Epic Vol2 Troops Main.WAV')
		this.load.audio('CombateBoss','src/Assets/sfx/musica/FINALES/Epic Vol2 Whistleblower Main.WAV')
		this.load.audio('Win','src/Assets/sfx/musica/FINALES/Epic Vol2 Win Intensity 2.WAV')
		this.load.audio('Lose','src/Assets/sfx/musica/FINALES/OrchAmbient Vol2 Tears Intensity 2.WAV')
		//SFX
		this.load.audio('Pendejo','src/Assets/sfx/sonidos/DerrotaSound.WAV')
		this.load.audio('Pego','src/Assets/sfx/sonidos/pegar y eso/Bryce Attack B.WAV')
		this.load.audio('MePegan','src/Assets/sfx/sonidos/pegar y eso/Bryce Attack B.WAV')
		this.load.audio('movercartas','src/Assets/sfx/sonidos/Card Placing 007.WAV')
		this.load.audio('elegircartas','src/Assets/sfx/sonidos/Cards Shuffle Oneshot 004.WAV')
		this.load.audio('iniciabatalla','src/Assets/sfx/sonidos/Impact Metal Spring 005.WAV')
	}
	cronometro;
	GameLoop()
	{
		console.log(this.battleManager.GetVictory());
		if(this.battleManager.Battle()== false){
			console.log("acabe");
			this.finaltext.setDepth(3); 
			this.finaltext.setOrigin(0.5,0.5)
			if(this.battleManager.GetVictory()== true){
				this.Win();	
			}
			else{
				this.defeat();
			}
			this.cronometro.remove();
	}
}
Win(){
	if(this.oleada < 5 || this.oleada == 7){
		this.combatSound.stop();
		this.endCombatSound = this.sound.add('Win');
		this.endCombatSound.play({loop:true});
		this.finaltext.setVisible(true);
		this.Returnwin.setVisible(true);
		this.finaltext.setText("HAS GANADO");
	}
	else{
		this.oleada = this.oleada + 1;;
		this.scene.start('EscenaCombate',{oleada: this.oleada, inventario: this.inventory});
	}
}
defeat(){
	this.combatSound.stop();
	this.endCombatSound = this.sound.add('Lose');
	this.endCombatSound.play({loop:true});
	let Pendejo = this.sound.add('Pendejo');
	Pendejo.play(Pendejo);
	this.finaltext.setVisible(true);
	this. Returndefeat.setVisible(true);
	this.finaltext.setText("HAS PERDIDO");
}
	create() {
		
		this.cronometro = this.time.addEvent({
            delay: 1000, // 1 segundos
			loop: true,
			paused: true,
            callback: () => {
				this.GameLoop()
            },})
		this.preCombatSound = this.sound.add('PreCombate');
		this.movecardsound = this.sound.add('movercartas');
		this.Choosecardsound = this.sound.add('elegircartas');
		this.starBattlesound = this.sound.add('iniciabatalla');
		
		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'Background1');
		back.setScale(this.cameras.main.width / this.textures.get('Background1').getSourceImage().width,
			this.cameras.main.height / this.textures.get('Background1').getSourceImage().height);
<<<<<<< Updated upstream
		
=======
			let listaenemigos = this.add.image(1580,675,'BackgroundPosiblesEnemigos').setScale(0.8,0.8);
			/*Sinergias */

			this.chuletaSinergias = this.add.image(1480,180,'BackgroundChuletaSinergias').setScale(0.5,0.5);
			this.rasin = this.add.image(1580,280,'Rades');




>>>>>>> Stashed changes
		//Botones para movernos por el inventario
		var upperBoton = this.add.image(this.sys.game.canvas.width / 10, this.sys.game.canvas.height / 14, 'flecha')
		upperBoton.setScale(0.2,0.2);
		upperBoton.setInteractive();
		upperBoton.on('pointerup', pointer => {
				{ 
					this.movecardsound.play({loop:false});
				if(this.inventoryindex>0){this.inventoryindex--; 
				imagecard1.setFrame(this.inventory.listCardClass[this.inventoryindex].textureindex);
				imagecard1letter.setFrame(this.inventory.listCardClass[this.inventoryindex].stads.letter);
				if(this.inventory.listCardClass[this.inventoryindex].GetIsused()== true)
					{
					imagecard1.alpha = 0.5;
					}
				else {imagecard1.alpha = 1;}
				
				imagecard2.setFrame(this.inventory.listCardClass[this.inventoryindex+1].textureindex);
				imagecard2letter.setFrame(this.inventory.listCardClass[this.inventoryindex+1].stads.letter);
				if(this.inventory.listCardClass[this.inventoryindex+1].GetIsused()== true)
					{
					imagecard2.alpha = 0.5;
				}else {imagecard2.alpha = 1;}
				
				imagecard3.setFrame(this.inventory.listCardClass[this.inventoryindex+2].textureindex);
				imagecard2letter.setFrame(this.inventory.listCardClass[this.inventoryindex+2].stads.letter);
				if(this.inventory.listCardClass[this.inventoryindex+2].GetIsused()== true){
					imagecard3.alpha = 0.5;
				}else{ imagecard3.alpha = 1;}
			}
		}
			})
		var downBoton = this.add.image(this.sys.game.canvas.width / 10, this.sys.game.canvas.height*13 / 14, 'flecha')
		downBoton.setScale(0.2,0.2);
		downBoton.setInteractive();
		downBoton.on('pointerup', pointer => {
			this.movecardsound.play({loop:false});
			if(this.inventoryindex<this.inventory.GetNumCards()-3){ 
				this.inventoryindex++; 
				imagecard1.setFrame(this.inventory.listCardClass[this.inventoryindex].textureindex);
				imagecard1letter.setFrame(this.inventory.listCardClass[this.inventoryindex].stads.letter);
				if(this.inventory.listCardClass[this.inventoryindex].GetIsused()== true)
					{
					imagecard1.alpha = 0.5;
					}
				else {imagecard1.alpha = 1;}
				
				imagecard2.setFrame(this.inventory.listCardClass[this.inventoryindex+1].textureindex);
				imagecard2letter.setFrame(this.inventory.listCardClass[this.inventoryindex+1].stads.letter);
				if(this.inventory.listCardClass[this.inventoryindex+1].GetIsused()== true)
					{
					imagecard2.alpha = 0.5;
				}else {imagecard2.alpha = 1;}
				
				imagecard3.setFrame(this.inventory.listCardClass[this.inventoryindex+2].textureindex);
				imagecard3letter.setFrame(this.inventory.listCardClass[this.inventoryindex+2].stads.letter);
				if(this.inventory.listCardClass[this.inventoryindex+2].GetIsused()== true){
					imagecard3.alpha = 0.5;
				}else{ imagecard3.alpha = 1;}
			}

		})
		downBoton.setFlipY(true);
		let actualcard = null;

		/*imagenes de las cartas interactuables del inventario*/
		var imagecard1 = this.add.image(((this.sys.game.canvas.width) / 10), (this.sys.game.canvas.height*2.5 / 10),
		this.inventory.listCardClass[this.inventoryindex].GetTexture(),this.inventory.listCardClass[this.inventoryindex].textureindex);
		imagecard1.setScale(0.3,0.3);

		var imagecard1letter =this.add.image(((this.sys.game.canvas.width) / 10)-62, (this.sys.game.canvas.height*2.5 / 10)-97,'lettersTextures')
		imagecard1letter.setFrame(this.inventory.listCardClass[this.inventoryindex].stads.letter);
		imagecard1letter.setScale(0.45,0.45)

		var imagecard2 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*5 / 10,
		this.inventory.listCardClass[this.inventoryindex+1].GetTexture(),this.inventory.listCardClass[this.inventoryindex+1].textureindex);
		imagecard2.setScale(0.3,0.3);
		var imagecard2letter =this.add.image(((this.sys.game.canvas.width) / 10)-62, (this.sys.game.canvas.height*5 / 10)-97,'lettersTextures')
		imagecard2letter.setFrame(this.inventory.listCardClass[this.inventoryindex+1].stads.letter);
		imagecard2letter.setScale(0.45,0.45)

		var imagecard3 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*7.5 / 10,
		this.inventory.listCardClass[this.inventoryindex+2].GetTexture(),this.inventory.listCardClass[this.inventoryindex+2].textureindex);
		var imagecard3letter =this.add.image(((this.sys.game.canvas.width) / 10)-62, (this.sys.game.canvas.height*7.5 / 10)-97,'lettersTextures')
		imagecard3letter.setFrame(this.inventory.listCardClass[this.inventoryindex+2].stads.letter);
		imagecard3letter.setScale(0.45,0.45)
		imagecard3.setScale(0.3,0.3);
		imagecard1.setInteractive();
		imagecard1.on('pointerup', pointer =>{
			if(this.inventory.listCardClass[this.inventoryindex].GetIsused()== false){
				this.Choosecardsound.play({loop:false});
				actualcard = this.inventoryindex;
				this.inventory.listCardClass[this.inventoryindex].SetCard().inventoryindex = this.inventoryindex;
				this.battleManager.SetCard(this.inventory.listCardClass[this.inventoryindex].SetCard(),this.inventory.listCardClass[this.inventoryindex].stads.unit_type)
				imagecard1.alpha = 0.5;
				if(this.inventory.listCardClass[this.inventoryindex+1].GetIsused()== false) imagecard2.alpha = 1;
				if(this.inventory.listCardClass[this.inventoryindex+2].GetIsused()== false) imagecard3.alpha = 1;
			}
		})
		imagecard2.setInteractive();
		imagecard2.on('pointerup', pointer =>{
			if(this.inventory.listCardClass[this.inventoryindex + 1].GetIsused()== false){
				this.Choosecardsound.play({loop:false});
				actualcard = this.inventoryindex + 1;
				this.inventory.listCardClass[this.inventoryindex + 1].SetCard().inventoryindex  = this.inventoryindex + 1;
				this.battleManager.SetCard(this.inventory.listCardClass[this.inventoryindex + 1].SetCard(),this.inventory.listCardClass[this.inventoryindex+1].stads.unit_type)
				imagecard2.alpha = 0.5;
				if(this.inventory.listCardClass[this.inventoryindex].GetIsused()== false) imagecard1.alpha = 1;
				if(this.inventory.listCardClass[this.inventoryindex+2].GetIsused()== false) imagecard3.alpha = 1;
			}
		})
		
		imagecard3.setInteractive();
		imagecard3.on('pointerup', pointer =>{
			if(this.inventory.listCardClass[this.inventoryindex + 2].GetIsused()== false){
				this.Choosecardsound.play({loop:false});
				actualcard = this.inventoryindex + 2;
				this.inventory.listCardClass[this.inventoryindex + 2].SetCard().inventoryindex  =  this.inventoryindex + 2;
				this.battleManager.SetCard(this.inventory.listCardClass[this.inventoryindex + 2].SetCard(),this.inventory.listCardClass[this.inventoryindex+2].stads.unit_type)
				imagecard3.alpha = 0.5;
				if(this.inventory.listCardClass[this.inventoryindex].GetIsused()== false) imagecard1.alpha = 1;
				if(this.inventory.listCardClass[this.inventoryindex+1].GetIsused()== false) imagecard2.alpha = 1;
			}
		})
		/*inicializacion e la matriz dde enemigos con la lectura de archivo correspondiente */

	
		let posiblesenemigos  = this.add.text(1415,450,"POSIBLES ENEMIGOS").setScale(2,2);
		this.enemymatriz = new EnemyMatriz('src/Scripts/Texto/Oleadas.json',this,null,this.oleada);	
		let fil;
		let col = 2;
		let colpos;
		this.enemymatriz.SetOleada();
		this.enemylist = new Array();
		if(this.oleada == 1){
			fil = 2;
			colpos = 480;
			this.preCombatSound.play({loop: true});
			this.combatSound = this.sound.add('Combate');
		}
		else if(this.oleada == 2){
			fil = 4;
			colpos = 320;
			this.preCombatSound.play({loop: true});
			this.combatSound = this.sound.add('Combate');
		}
		else if(this.oleada == 5){
			fil = 6;
			colpos = 160;
			this.preCombatSound.play({loop: true});
			this.combatSound = this.sound.add('CombateBoss');
		}
		else if(this.oleada > 5){
			fil = 6;
			colpos = 160;
			//this.combatSound = this.sound.add('CombateBoss');
		}
		else{
			fil = 6;
			colpos = 160;
			this.preCombatSound.play({loop: true});
			this.combatSound = this.sound.add('Combate');
		}
		//inicializacion del battlemanager
		this.mat = new Matriz(fil,col,this, 'MatrixGround',false,colpos);
		this.battleManager = new BattleManager(this.mat,this.enemymatriz,this);
		for(let i = 0; i < this.mat.row; i++){
			for(let j = 0; j < this.mat.col; j++){
				 //Colocamos el fondo
				this.mat.mat[i][j].setScale(0.85,0.85)
				this.mat.mat[i][j].setInteractive();
				this.mat.mat[i][j].on('pointerup', pointer =>{
					//Coloca la textura de las tropas
					if(this.mat.mat[i][j].texture != null){
						this.battleManager.Summon(i,j);
						if(this.battleManager.auxcard == -1){
							this.inventory.listCardClass[actualcard].DeleteCard();
						}
						else{
							if(actualcard != null) this.inventory.listCardClass[actualcard].DeleteCard();
							this.inventory.listCardClass[this.battleManager.auxcard].RecoverCard();
							if(this.inventory.listCardClass[this.inventoryindex].GetIsused()== false) imagecard1.alpha = 1;
							if(this.inventory.listCardClass[this.inventoryindex+1].GetIsused()== false) imagecard2.alpha = 1;
							if(this.inventory.listCardClass[this.inventoryindex+2].GetIsused()== false) imagecard3.alpha = 1;
						}
						this.mat.mat[i][j].setTexture(this.mat.mat[i][j].GetTexture());						
					}
				})
			}
		}
		//Boton de pegarse
		var pelea = this.add.image((this.sys.game.canvas.width)*11.55 / 12, this.sys.game.canvas.height*14.15/ 15,'Pelea')
		pelea.setScale(0.2,0.2);
		pelea.setInteractive();
		pelea.on('pointerup', pointer =>{
			this.starBattlesound.play({loop:false});

			for(let i = 0; i < this.mat.row; i++){
				for(let j = 0; j < this.mat.col; j++){
					if(this.mat.mat[i][j].ocupada == false){
						this.mat.mat[i][j].SetFree();
					}
				}
			}
			this.preCombatSound.stop();
			this.combatSound.play({loop: true})
			this.AlteredState = new AlteredState();
			let _card;
			for(_card of this.inventory.listCardClass){
				_card.RecoverCard();
				console.log("Recupero las cartas")
			}
			if(this.oleada <= 5)this.combatSound.play({loop: true})
			for(let i = 0; i < 6; i++){
				this.battleManager.ApplySinergy(i);
			}
			this.battleManager.enemymatriz.SummonEnemy();
			for(let i = 0; i < this.mat.row; i++){
				for(let j = 0; j < this.mat.col; j++){
					if(this.battleManager.enemymatriz.Enemymat.mat[i][j].ocupada == true){
						if(this.battleManager.enemymatriz.Enemymat.mat[i][j].GetTexture() == 'B'){
							this.battleManager.enemymatriz.Enemymat.mat[i][j].setTexture("B");
						}
						else{
							this.battleManager.enemymatriz.Enemymat.mat[i][j].setTexture("E");
						}
						this.battleManager.enemymatriz.Enemymat.mat[i][j].flipX = true;
					this.battleManager.enemymatriz.Enemymat.mat[i][j].setScale(0.33,0.33);
					}
				}
			}

			for(let i = 0; i < 6; i++){
				if (this.battleManager.ApplySinergy(i)) {
					for (let j = 0; j < this.mat.row; j++){
						for (let k = 0; k < this.mat.col; k++){
						this.AlteredState.applyAlteredStates(i,this.mat.mat[j][k].GetUnit()); //APLICAMOS ESTADOS ALIADOS
						this.AlteredState.applyAlteredStates(i,this.battleManager.enemymatriz.Enemymat.mat[j][k].GetUnit()); //APLICAMOS ESTADOS ENEMIGOS
						}
					}
				}
			}

			pelea.setVisible(false);
			imagecard1.setVisible(false);
			imagecard2.setVisible(false);
			imagecard3.setVisible(false);
			downBoton.setVisible(false);
			upperBoton.setVisible(false);
			listaenemigos.setVisible(false);
			posiblesenemigos.setVisible(false);
			this.enemymatriz.EliminaLista();
			this.cronometro.paused=false;			
		})

		 
	/*
	Resultados del combate
	*/
		this.finaltext = this.add.text((this.sys.game.canvas.width) /2, this.sys.game.canvas.height / 2, " has algo", { font: '60px Arial, sans-serif',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4,
            backgroundColor: '#000000',
            padding: { x: 30, y: 20 },
            fontStyle: 'bold' });
			this.finaltext.setVisible(false);
				this.Returnwin = this.add.text((this.sys.game.canvas.width) /2, this.sys.game.canvas.height*2 / 3, " Continuar", { font: '60px Arial, sans-serif',
					fill: '#fff',
					stroke: '#000',
					strokeThickness: 4,
					backgroundColor: '#000000',
					padding: { x: 30, y: 20 },
					fontStyle: 'bold' });					
					this.Returnwin.setInteractive();
					this.Returnwin.setVisible(false);
					this.Returnwin.on('pointerup', pointer =>{
						this.endCombatSound.stop();
						var numero = this.oleada;
						numero += 1;
						console.log(numero)
						if(this.oleada == 7) {
							console.log("Cambio")
							this.scene.start('EscenaVictoria',{oleada: this.oleada, inventario: this.inventory})
						}
						else this.scene.start('EscenaSocialTienda',{oleada: numero, inventario: this.inventory});
					})	
				this.Returndefeat = this.add.text((this.sys.game.canvas.width) /2, this.sys.game.canvas.height*2 / 3, " volver al menu principal", { font: '60px Arial, sans-serif',
					fill: '#fff',
					stroke: '#000',
					strokeThickness: 4,
					backgroundColor: '#000000',
					padding: { x: 30, y: 20 },
					fontStyle: 'bold' });
					this.Returndefeat.setInteractive();
					this.Returndefeat.setVisible(false);
					this.Returndefeat.on('pointerup', pointer =>{
						this.endCombatSound.stop();
						this.scene.start('EscenaPrincipal');
					})
	}

}
