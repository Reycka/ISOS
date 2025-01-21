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
	inventoryindex;
	battleManager;
	oleada;
	BattleParticles;
	HealParticles;
	cronometro;
	//SOUNDS
	preCombatSound;
	combatSound;
	endCombatSound;
	constructor() {
		super({ key: 'EscenaCombate' });
	}
	init(data){
		this.inventoryindex = 0;
		this.oleada = data.oleada;
		this.inventory = data.inventario;
	}
	GameLoop()
	{
		if(this.battleManager.Battle()== false){
		
			if(this.battleManager.GetVictory()== true){
				console.log("Entro en el fokin Win")
				this.Win();	
			}
			else{
				console.log("Entro en el fokin Loose")
				this.defeat();
			}
			this.cronometro.remove();
	}
	var x = 1-(this.battleManager.numenemiestrops/(this.battleManager.numenemiestrops+this.battleManager.numplayertrops))
	this.barradeprogreso.setScale(x,1);
}
Win(){
	if(this.oleada < 5 || this.oleada == 7){
		//Cambiamos la música de combate
		this.combatSound.stop();
		this.endCombatSound = this.sound.add('Win');
		this.endCombatSound.play({loop:true});
		//Seteamos los botones de victoria
		let victoriaimg = this.add.image((this.sys.game.canvas.width)/2, this.sys.game.canvas.height / 4,'victoria')
	    victoriaimg.setScale(1,1.1);
		let Returnwin = this.add.image((this.sys.game.canvas.width)/2, this.sys.game.canvas.height / 1.5,'continuar').setScale(0.5,0,5);				
			Returnwin.setInteractive();
			Returnwin.setDepth(3); 
			Returnwin.on('pointerup', pointer =>{
				this.endCombatSound.stop();
				if(this.oleada == 7) {
					this.scene.start('EscenaVictoria',{oleada: this.oleada, inventario: this.inventory})
				}
				else this.scene.start('EscenaSocialTienda',{oleada: numero, inventario: this.inventory});
			})	
		
	}
	else{
		this.oleada = this.oleada + 1;
		this.scene.start('EscenaCombate',{oleada: this.oleada, inventario: this.inventory});
	}
}
defeat(){
	//Sonidos de derrota
	this.combatSound.stop();
	this.endCombatSound = this.sound.add('Lose');
	this.endCombatSound.play({loop:true});
	let Pendejo = this.sound.add('Pendejo');
	Pendejo.play(Pendejo);
	let derr = this.add.image((this.sys.game.canvas.width)/2, this.sys.game.canvas.height / 4,'derrota');
	derr.setScale(1,1.1);
	//Seteamos los botones de derrota
	let Returndefeat = this.add.image((this.sys.game.canvas.width)/2, this.sys.game.canvas.height / 1.5,'volver').setScale(0.5,0.5);
			Returndefeat.setInteractive();			
			Returndefeat.on('pointerup', pointer =>{
				this.endCombatSound.stop();
				this.scene.start('EscenaPrincipal');
			})
}
activeSinergy(dios){
	if(dios==0){
		this.rasin.setTexture('Raact')
	}
	if(dios==1){
		this.isissin.setTexture('Isisact')
	}
	if(dios==2){
		this.anubissin.setTexture('Anubisact')
	}if(dios==3){
		this.osirissin.setTexture('Osirisact')
	}
	if(dios==4){
		this.horussin.setTexture('Horusact')
	}
	if(dios==5){
		this.sethsin.setTexture('Sethact')
	}
}
desactiveSinergy(dios){
	if(dios==0){
		this.rasin.setTexture('Rades')
	}
	if(dios==1){
		this.isissin.setTexture('Isisdes')
	}
	if(dios==2){
		this.anubissin.setTexture('Anubisdes')
	}if(dios==3){
		this.osirissin.setTexture('Osirisdes')
	}
	if(dios==4){
		this.horussin.setTexture('Horusdes')
	}
	if(dios==5){
		this.sethsin.setTexture('Sethdes')
	}
}

	create() {
		//animaciones
		this.anims.create({
			key: 'LAIDLE',
			frames: this.anims.generateFrameNumbers('LA', { start: 0, end: 6 }),
			frameRate: 7,
			repeat: -1 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'GIDLE',
			frames: this.anims.generateFrameNumbers('G', { start: 0, end: 6 }),
			frameRate: 7,
			repeat: -1 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'MIDLE',
			frames: this.anims.generateFrameNumbers('M', { start: 0, end: 6 }),
			frameRate: 7,
			repeat: -1 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'HIDLE',
			frames: this.anims.generateFrameNumbers('H', { start: 0, end: 6 }),
			frameRate: 7,
			repeat: -1 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'CIDLE',
			frames: this.anims.generateFrameNumbers('C', { start: 0, end: 6 }),
			frameRate: 7,
			repeat: -1 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'SAIDLE',
			frames: this.anims.generateFrameNumbers('SA', { start: 0, end: 6 }),
			frameRate: 7,
			repeat: -1 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'LAA',
			frames: this.anims.generateFrameNumbers('LA', { start: 7, end: 13 }),
			frameRate: 7,
			repeat: 0// Repetir indefinidamente
		});
		this.anims.create({
			key: 'GA',
			frames: this.anims.generateFrameNumbers('G', { start: 7, end: 13 }),
			frameRate: 7,
			repeat: 0 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'MA',
			frames: this.anims.generateFrameNumbers('M', { start: 7, end: 13 }),
			frameRate:7,
			repeat: 0 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'HA',
			frames: this.anims.generateFrameNumbers('H', { start: 7, end: 13 }),
			frameRate: 7,
			repeat: 0 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'CA',
			frames: this.anims.generateFrameNumbers('C', { start: 7, end: 13 }),
			frameRate: 7,
			repeat: 0 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'SAA',
			frames: this.anims.generateFrameNumbers('SA', { start: 7, end: 13 }),
			frameRate: 7,
			repeat: 0 // Repetir indefinidamente
		});

		//animaciones enemigos
		this.anims.create({
			key: 'ELAIDLE',
			frames: this.anims.generateFrameNumbers('ELA', { start: 0, end: 6 }),
			frameRate: 7,
			repeat: -1 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'EGIDLE',
			frames: this.anims.generateFrameNumbers('EG', { start: 0, end: 6 }),
			frameRate: 7,
			repeat: -1 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'EMIDLE',
			frames: this.anims.generateFrameNumbers('EM', { start: 0, end: 6 }),
			frameRate: 7,
			repeat: -1 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'EHIDLE',
			frames: this.anims.generateFrameNumbers('EH', { start: 0, end: 6 }),
			frameRate: 7,
			repeat: -1 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'ECIDLE',
			frames: this.anims.generateFrameNumbers('EC', { start: 0, end: 6 }),
			frameRate: 7,
			repeat: -1 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'ESAIDLE',
			frames: this.anims.generateFrameNumbers('ESA', { start: 0, end: 6 }),
			frameRate: 7,
			repeat: -1 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'ELAA',
			frames: this.anims.generateFrameNumbers('ELA', { start: 7, end: 13 }),
			frameRate: 7,
			repeat: 0// Repetir indefinidamente
		});
		this.anims.create({
			key: 'EGA',
			frames: this.anims.generateFrameNumbers('EG', { start: 7, end: 13 }),
			frameRate: 7,
			repeat: 0 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'EMA',
			frames: this.anims.generateFrameNumbers('EM', { start: 7, end: 13 }),
			frameRate:7,
			repeat: 0 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'EHA',
			frames: this.anims.generateFrameNumbers('EH', { start: 7, end: 13 }),
			frameRate: 7,
			repeat: 0 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'ECA',
			frames: this.anims.generateFrameNumbers('EC', { start: 7, end: 13 }),
			frameRate: 7,
			repeat: 0 // Repetir indefinidamente
		});
		this.anims.create({
			key: 'ESAA',
			frames: this.anims.generateFrameNumbers('ESA', { start: 7, end: 13 }),
			frameRate: 7,
			repeat: 0 // Repetir indefinidamente
		});


		this.cronometro = this.time.addEvent({
            delay: 1000, // 1 segundos
			loop: true,
			paused: true,
            callback: () => {
				console.log("Estoy Llamando al GameLoop")
				this.GameLoop()
            },})
		//Audio y Sonidos
		this.preCombatSound = this.sound.add('PreCombate');
		this.movecardsound = this.sound.add('movercartas');
		this.Choosecardsound = this.sound.add('elegircartas');
		this.starBattlesound = this.sound.add('iniciabatalla');
		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'Background1');
		back.setScale(this.cameras.main.width / this.textures.get('Background1').getSourceImage().width,
			this.cameras.main.height / this.textures.get('Background1').getSourceImage().height);

			let listaenemigos = this.add.image(1580,675,'BackgroundPosiblesEnemigos').setScale(0.8,0.8);
			/*Sinergias */

			this.chuletaSinergias = this.add.image(1580,180,'BackgroundChuletaSinergias').setScale(0.5,0.5);
			this.rasin = this.add.image(1455,145,'Rades').setScale(0.2,0.2);
			this.isissin = this.add.image(1620,145,'Isisdes').setScale(0.2,0.2);
			this.horussin = this.add.image(1790,145,'Horusdes').setScale(0.2,0.2);
			this.anubissin = this.add.image(1460,265,'Anubisdes').setScale(0.2,0.2);
			this.osirissin = this.add.image(1640,265,'Osirisdes').setScale(0.2,0.2);
			this.sethsin = this.add.image(1760,265,'Sethdes').setScale(0.2,0.2);
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
						this.mat.mat[i][j].setTexture(this.mat.mat[i][j].GetTexture()).setScale(0.15);		
								
					}
				})
			}
		}
		this.barradeprogresobacgound = this.add.rectangle(((this.sys.game.canvas.width)/2),this.sys.game.canvas.height*14.15/ 15, 1000,60,0xffffffff)
		this.barradeprogreso = this.add.rectangle(((this.sys.game.canvas.width)/2)-500,this.sys.game.canvas.height*14.15/ 15, 1000,50,0xff00ff00)

		this.barradeprogreso.setOrigin(0,0.5);
		this.barradeprogreso.setScale(0.5,1);
		this.barradeprogresobacgound.setVisible(false);
		this.barradeprogreso.setVisible(false);
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
						 this.battleManager.enemymatriz.Enemymat.mat[i][j].setTexture();
						}
						this.battleManager.enemymatriz.Enemymat.mat[i][j].flipX = true;
					this.battleManager.enemymatriz.Enemymat.mat[i][j].setScale(0.15);
					
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
			imagecard1letter.setVisible(false);
			imagecard2.setVisible(false);
			imagecard2letter.setVisible(false);
			imagecard3.setVisible(false);
			imagecard3letter.setVisible(false);
			downBoton.setVisible(false);
			upperBoton.setVisible(false);
			listaenemigos.setVisible(false);
			posiblesenemigos.setVisible(false);
			this.enemymatriz.EliminaLista();
			this.chuletaSinergias.setVisible(false)
			this.rasin.setVisible(false)
			this.isissin.setVisible(false)
			this.horussin.setVisible(false)
			this.sethsin.setVisible(false)
			this.anubissin.setVisible(false)
			this.osirissin.setVisible(false)
			this.barradeprogresobacgound.setVisible(true);
			this.barradeprogreso.setVisible(true);
			this.cronometro.paused=false;			
		})
	}
}
