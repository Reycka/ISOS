import Inventory from './../Comunes/Inventory.js'
import CardLogic from './../Comunes/CardLogic.js'
import CardClass from './../Comunes/CardClass.js'
import Matriz from './../Combate/Matriz.js'
import EnemyMatriz from './../Combate/EnemyMatriz.js'
import SlotClass from '../Combate/SlotClass.js'
import BattleManager from '../Combate/BattleManager.js'
export default class EscenaCombate extends Phaser.Scene {
	/**
	* Escena principal.
	* @extends Phaser.Scene
	*/
	mat;
	Enemymat;
	matimg;
	inventory;
	inventoryindex = 0;
	battleManager;
	constructor() {
		super({ key: 'EscenaCombate' });
	}
	init(data){
		this.inventory = data;
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
		this.load.image('Pelea', 'src/Assets/Finales/boton_batalla.png')

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
	this.finaltext.setVisible(true);
	this.Returnwin.setVisible(true);
	this.finaltext.setText("HAS GANADO");
}
defeat(){
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
		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'Background1');
		back.setScale(this.cameras.main.width / this.textures.get('Background1').getSourceImage().width,
			this.cameras.main.height / this.textures.get('Background1').getSourceImage().height);
			//SETEAMOS AMBAS MATRICES
		var upperBoton = this.add.image(this.sys.game.canvas.width / 10, this.sys.game.canvas.height / 14, 'flecha')
		upperBoton.setScale(0.2,0.2);
		upperBoton.setInteractive();
		upperBoton.on('pointerup', pointer => {
			if(this.inventoryindex!=0)
				{ 
				this.inventoryindex--; 
				card1.setFrame(this.inventory.listCardClass[this.inventoryindex].textureindex);
				if(this.inventory.listCardClass[this.inventoryindex].GetIsused()== true)
					{
					card1.alpha = 0.5;
					}
				else {card1.alpha = 1;}
				
				card2.setFrame(this.inventory.listCardClass[this.inventoryindex+1].textureindex);
				if(this.inventory.listCardClass[this.inventoryindex+1].GetIsused()== true)
					{
					card2.alpha = 0.5;
				}else {card2.alpha = 1;}
				
				card3.setFrame(this.inventory.listCardClass[this.inventoryindex+2].textureindex);
				if(this.inventory.listCardClass[this.inventoryindex+2].GetIsused()== true){
					card3.alpha = 0.5;
				}else{ card3.alpha = 1;}
			}
			})
		var downBoton = this.add.image(this.sys.game.canvas.width / 10, this.sys.game.canvas.height*13 / 14, 'flecha')
		downBoton.setScale(0.2,0.2);
		downBoton.setInteractive();
		downBoton.on('pointerup', pointer => {
			if(this.inventoryindex<this.inventory.GetNumCards()-3){ 
				this.inventoryindex++; 
				card1.setFrame(this.inventory.listCardClass[this.inventoryindex].textureindex);
				if(this.inventory.listCardClass[this.inventoryindex].GetIsused()== true)
					{
					card1.alpha = 0.5;
					}
				else {card1.alpha = 1;}
				
				card2.setFrame(this.inventory.listCardClass[this.inventoryindex+1].textureindex);
				if(this.inventory.listCardClass[this.inventoryindex+1].GetIsused()== true)
					{
					card2.alpha = 0.5;
				}else {card2.alpha = 1;}
				
				card3.setFrame(this.inventory.listCardClass[this.inventoryindex+2].textureindex);
				if(this.inventory.listCardClass[this.inventoryindex+2].GetIsused()== true){
					card3.alpha = 0.5;
				}else{ card3.alpha = 1;}
			}

		})
		downBoton.setFlipY(true);
		var card1 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*2.5 / 10,
		this.inventory.listCardClass[this.inventoryindex].GetTexture(),this.inventory.listCardClass[this.inventoryindex].textureindex);
		card1.setScale(0.3,0.3);

		card1.setInteractive();
		card1.on('pointerup', pointer =>{
			this.battleManager.SetCard(this.inventory.listCardClass[this.inventoryindex].SetCard(),this.inventory.listCardClass[this.inventoryindex].stads.unit_type)
			card1.alpha = 0.5;
		})
		var card2 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*5 / 10,
		this.inventory.listCardClass[this.inventoryindex+1].GetTexture(),this.inventory.listCardClass[this.inventoryindex+1].textureindex);
		card2.setScale(0.3,0.3);
		card2.setInteractive();
		card2.on('pointerup', pointer =>{
			this.battleManager.SetCard(this.inventory.listCardClass[this.inventoryindex + 1].SetCard(),this.inventory.listCardClass[this.inventoryindex+1].stads.unit_type)
			card2.alpha = 0.5;
		})
		
		var card3 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*7.5 / 10,
		this.inventory.listCardClass[this.inventoryindex+2].GetTexture(),this.inventory.listCardClass[this.inventoryindex+2].textureindex);
		card3.setScale(0.3,0.3);
		card3.setInteractive();
		card3.on('pointerup', pointer =>{
			this.battleManager.SetCard(this.inventory.listCardClass[this.inventoryindex + 2].SetCard(),this.inventory.listCardClass[this.inventoryindex+2].stads.unit_type)
			card3.alpha = 0.5;
		})
		this.mat = new Matriz(6,2,this, null);
		this.battleManager = new BattleManager(this.mat,'./../Combate/OleadaDePrueba.txt',this);
		for(let i = 0; i < this.mat.row; i++){
			for(let j = 0; j < this.mat.col; j++){
				this.mat.mat[i][j] = this.add.image(j * 180  + 550 , i * 160 + 150,'MatrixGround'); //Colocamos el fondo
				this.mat.mat[i][j].setScale(0.85,0.85)
				this.mat.mat[i][j].setInteractive();
				this.mat.mat[i][j].on('pointerup', pointer =>{
					console.log("Soy clickable");
					//this.battleManager.Summon(i,j);this
					if(this.mat.mat[i][j].texture != null){
						//console.log(this.mat.mat[i][j]._texture);
						this.mat.mat[i][j].setTexture(this.battleManager._texture);
						this.mat.mat[i][j].setScale(0.2,0.2);
					}
				})
			}
		}
		//Boton de pegarse
		var pelea = this.add.image((this.sys.game.canvas.width)*11.5 / 12, this.sys.game.canvas.height*14/ 15,'Pelea')
		pelea.setScale(0.3,0.3);
		pelea.setInteractive();
		pelea.on('pointerup', pointer =>{
			for(let i = 0; i < 6; ++i){
				console.log(this.battleManager.ApplySinergy(i));
			}
			for(let i = 0; i < this.mat.row; i++){
				for(let j = 0; j < this.mat.col; j++){
					var algo = this.add.image(j * 180  + 550 +600, i * 160 + 150,'MatrixGround2'); //Colocamos el fondo
					algo.setScale(0.85,0.85);
					var set = this.add.image(j * 180  + 550+600 , i * 160 + 150,this.battleManager.enemymatriz.Enemymat.mat[i][j].GetTexture());
					set.setScale(0.20,0.20);
				}
			}
			pelea.setVisible(false);
			card1.setVisible(false);
			card2.setVisible(false);
			card3.setVisible(false);
			downBoton.setVisible(false);
			upperBoton.setVisible(false);
			this.cronometro.paused=false;

			
			
		})

		 
	
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
					this.scene.start('EscenaSocialTienda',inventory);
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
						this.scene.start('EscenaPrincipal');
					})
	}

	update(){		

	}/*for(let i = 0; i < this.mat.row; i++){
			for(let j = 0; j < this.mat.col; j++){
				var algo = this.add.image(j * 180  + 550 , i * 160 + 150,'MatrixGround'); //Colocamos el fondo
				algo.setScale(0.85,0.85)
				algo.setInteractive();
				algo.on('pointerup', pointer =>{
				this.mat.mat[i][j] = this.add.image(j * 180  + 550 , i * 160 + 150,'MatrixGround'); //Colocamos el fondo
				this.mat.mat[i][j].setScale(0.85,0.85)
				this.mat.mat[i][j].setInteractive();
				this.mat.mat[i][j].on('pointerup', pointer =>{
					console.log("Soy clickable");
					this.battleManager.Summon(i,j);
					if(this.mat.mat[i][j].GetTexture() != null){
						var set = this.add.image(j * 180  + 550 , i * 160 + 150,this.mat.mat[i][j].GetTexture());
						set.setScale(0.2,0.2);
						this.mat.mat[i][j].image.setTexture(this.mat.mat[i][j].GetTexture());
						this.mat.mat[i][j].image.set.setScale(0.2,0.2);
					}
					
				})
			}
		}

@@ -200,10 +202,10 @@ defeat(){
		pelea.on('pointerup', pointer =>{
			for(let i = 0; i < this.mat.row; i++){
				for(let j = 0; j < this.mat.col; j++){
					var algo = this.add.image(j * 180  + 550 +600, i * 160 + 150,'MatrixGround2'); //Colocamos el fondo
					algo.setScale(0.85,0.85);
					var set = this.add.image(j * 180  + 550+600 , i * 160 + 150,this.battleManager.enemymatriz.Enemymat.mat[i][j].GetTexture());
					set.setScale(0.20,0.20);
					this.battleManager.enemymatriz.Enemymat.mat[i][j] = this.add.image(j * 180  + 550 +600, i * 160 + 150,'MatrixGround2'); //Colocamos el fondo
					this.battleManager.enemymatriz.Enemymat.mat[i][j].setScale(0.85,0.85);
					this.battleManager.enemymatriz.Enemymat.mat[i][j].image.setTexture(this.battleManager.enemymatriz.Enemymat.mat[i][j].GetTexture());
					this.battleManager.enemymatriz.Enemymat.mat[i][j].setScale(0.20,0.20);
				}
			}*/ 
}
