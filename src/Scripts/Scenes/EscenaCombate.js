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

		this.load.image('Background1', 'src/Assets/Temporales/FondoCombate.jpeg');

		//FONDO MATRIZ
		this.load.image('MatrixGround', 'src/Assets/Temporales/marco-papiro.jpg');
		//INFANTERÍA PRUEBA

		this.load.image('LA', 'src/Assets/Temporales/Arquero.jpeg');
		//ARQUERO LARGO PRUEBA
		this.load.image('G', 'src/Assets/Temporales/Tropa.jpg');
		//MAGO PRUEBA
		this.load.image('M', 'src/Assets/Temporales/Mago.jpeg');
		//HEALER PRUEBA
		this.load.image('H', 'src/Assets/Temporales/Healer.jpeg');
		//CARRO PRUEBA
		this.load.image('C', 'src/Assets/Temporales/Carro.png');
		//ARCO CORTO PRUEBA
		this.load.image('SA', 'src/Assets/Temporales/ArcoCorto.png');
		//BOSS
		this.load.image('B', 'src/Assets/Temporales/Serpiente.png');
		
		//flecha inventario
		this.load.image('flecha', 'src/Assets/Temporales/flecha.png');
		this.load.image('Pelea', 'src/Assets/Temporales/BotonDeBatalla.jpeg')

	}
	cronometro;
	create() {
		this.cronometro = this.time.addEvent({
            delay: 1000, // 1 segundos
			loop: true,
			paused: true,
            callback: () => {
				
				this.battleManager.Battle();
               //if(this.battleManager.){
				//console.log("acabe");
				//this.cronometro.remove();
			   //}; 
            },})
		//Creamos el background y le aplicamos la escala
		var back = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'Background1');
		back.setScale(this.cameras.main.width / this.textures.get('Background1').getSourceImage().width,
			this.cameras.main.height / this.textures.get('Background1').getSourceImage().height);
			//SETEAMOS AMBAS MATRICES
		var upperBoton = this.add.image(this.sys.game.canvas.width / 10, this.sys.game.canvas.height / 14, 'flecha')
		upperBoton.setScale(0.5,0.5);
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
		downBoton.setScale(0.5,0.5);
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
		card1.setScale(1/4,1/4);

		card1.setInteractive();
		card1.on('pointerup', pointer =>{
			this.battleManager.SetCard(this.inventory.listCardClass[this.inventoryindex].SetCard(),this.inventory.listCardClass[this.inventoryindex].stads.unit_type)
			card1.alpha = 0.5;
		})
		var card2 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*5 / 10,
		this.inventory.listCardClass[this.inventoryindex+1].GetTexture(),this.inventory.listCardClass[this.inventoryindex+1].textureindex);
		card2.setScale(1/4,1/4);
		card2.setInteractive();
		card2.on('pointerup', pointer =>{
			this.battleManager.SetCard(this.inventory.listCardClass[this.inventoryindex + 1].SetCard(),this.inventory.listCardClass[this.inventoryindex+1].stads.unit_type)
			card2.alpha = 0.5;
		})
		
		var card3 = this.add.image((this.sys.game.canvas.width) / 10, this.sys.game.canvas.height*7.5 / 10,
		this.inventory.listCardClass[this.inventoryindex+2].GetTexture(),this.inventory.listCardClass[this.inventoryindex+2].textureindex);
		card3.setScale(1/4,1/4);
		card3.setInteractive();
		card3.on('pointerup', pointer =>{
			this.battleManager.SetCard(this.inventory.listCardClass[this.inventoryindex + 2].SetCard(),this.inventory.listCardClass[this.inventoryindex+2].stads.unit_type)
			card3.alpha = 0.5;
		})
		this.mat = new Matriz(6,2,this, null);
		this.battleManager = new BattleManager(this.mat,'./../Combate/OleadaDePrueba.txt',this);
		for(let i = 0; i < this.mat.row; i++){
			for(let j = 0; j < this.mat.col; j++){
				var algo = this.add.image(j * 120  + 500 , i * 125 + 150,'MatrixGround'); //Colocamos el fondo
				algo.setScale(0.25,0.25);
				algo.setInteractive();
				algo.on('pointerup', pointer =>{
					console.log("Soy clickable");
					this.battleManager.Summon(i,j);
					if(this.mat.mat[i][j].GetTexture() != null){
						var set = this.add.image(j * 120  + 500 , i * 125 + 150,this.mat.mat[i][j].GetTexture());
						set.setScale(0.35,0.35);
					}
				})
			}
		}
		//Boton de pegarse
		var pelea = this.add.image((this.sys.game.canvas.width) / 1.12, this.sys.game.canvas.height / 1.15,'Pelea')
		pelea.setScale(2,2);
		pelea.setInteractive();
		pelea.on('pointerup', pointer =>{
			for(let i = 0; i < this.mat.row; i++){
				for(let j = 0; j < this.mat.col; j++){
					var algo = this.add.image(j * 120  + 1000 , i * 125 + 150,'MatrixGround'); //Colocamos el fondo
					algo.setScale(0.25,0.25);
					var set = this.add.image(j * 120  + 1000 , i * 125 + 150,this.battleManager.enemymatriz.Enemymat.mat[i][j].GetTexture());
					set.setScale(0.35,0.35);
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

		
	}

	update(){		

	}
}
