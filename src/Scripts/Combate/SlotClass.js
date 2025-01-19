//import Unit from UnitClass cuando tengamos la clase Unit hecha
export default class SlotClass extends Phaser.GameObjects.Sprite{
    ///PROPIEDADES
    row;
    col;
    unit; //UnitClass
    ocupada = false;
    
    PosX;
    PosY;
    scene;
     _unittexture;
     _slottexture
     imagen;
     Particles;
    //CONSTRUCTOR
        constructor(scene, x, y,_texture,PosX,PosY){
            super(scene,x*10,y*5,_texture)
            this.scene = scene;
            this.row = x;
            this.col = y;
            this._unittexture = _texture;
            this.unit = null;
            this.ocupada = false;
            this.scene.add.existing(this);
            this.PosX = PosX;
            this.PosY = PosY;
            //Imágenes de las Partículas
            this.scene.load.image('DamageParticles','src/Assets/Finales/damageParticles.png');
            this.scene.load.image('HealParticles','src/Assets/Finakes/healParticles.png');
        }
        Getdamage(){
            this.setTint(0xffff0000) //color ARGB
            //Partículas de Sangre
            this.Particles = this.scene.add.particles(0,0,'DamageParticles',{ 
                x: this.PosX,
                y: this.PosY,
                lifespan: { min: 300, max: 500 },
                speed: { min: 150, max: 170 },
                timeScale: 0.35,
                gravityY: 42,
                scale: {
                    start: 0.33,
                    end: 0.51,
                },
                duration: 200,
                quantity: 1,
                frequency: 25,
            });  
            this.Particles.start();
            this.scene.time.addEvent({
                delay: 700,
                callback: ()=>{this.setTint(0xffffffff);
                this.Particles.stop();
                }  //después de 0.5 segundos modificamos a un tinte blanco que dejará la imagen igual
            })
        }Getheal(){
            this.setTint(0xff00ff00) //color ARGB
            //Partículas de Cuarción
            this.Particles = this.scene.add.particles(0,0,'HealParticles',{ 
                x: this.PosX,
                y: this.PosY,
                lifespan: { min: 300, max: 500 },
                speed: { min: 150, max: 170 },
                timeScale: 0.35,
                gravityY: 42,
                scale: {
                    start: 0.33,
                    end: 0.51,
                },
                duration: 200,
                quantity: 1,
                frequency: 25,
            });  
            this.Particles.start();
            this.scene.time.addEvent({
                delay: 700,
                callback: ()=>{this.setTint(0xffffffff);
                this.Particles.stop();
                }  //después de 0.5 segundos modificamos a un tinte blanco que dejará la imagen igual
            })
        }
        GetRow(){
            return this.row;
        }
        GetCol(){
            return this.col;
        }
        //Devuelve si hay una tropa o no en dicha posición
        GetState(){
            return this.ocupada;
        } 
        GetTexture(){
            return this._unittexture;
        }
        //Setea la unidad 
        SetUnit(_unit){
            if(_unit){
                this.setVisible(true);
                this.unit = _unit;
                this.ocupada = true;
                this._unittexture = _unit.unittexture;
                this.setTexture(this.unit.unittexture);
                this.setScale(0.33,0.33);
                
            }
            else{
                this.unit = null;
                this.ocupada = false;
                this._unittexture =  this._unittexture = 'MatrixGround';;
                
                this.setTexture('MatrixGround').setScale(0.85,0.85);
            }
        }
        AttackMove(isenemy){
            var dir;
            if(isenemy){
                 dir =  (this.x -20);
            }else {
                dir =  (this.x +20);
            }
            this.scene.anim1 = this.scene.tweens.add({
                targets: this,
                x: dir,
                duration: 1000,
                ease: 'easeInOutQuart', 
        
                flipX: false,
                yoyo: true,
                repeat: 0,
                delay: 0,
                
            });
            this.scene.anim1.play();
        }
        //Método que se llamará cada vez que una tropa muera o se desplace, coloca a False su valor ocupada
        SetFree(){
               this.ocupada = false;
               this._unittexture = 'MatrixGround';
               this.setTexture('MatrixGround').setVisible(false);//No se como elminar la textura xd
        }
        //Asigna la tropa pasada a la nueva posición y setea a true en la matriz de booleanos
        SetFull(mat){ //mat representa la posición nueva a seteear, es un slotClass que hay que pasarle
            if(mat.GetState()){
                //Llamada al método que cambia la posición de la tropa
               this.ocupada = false;
               mat.SetUnit(this.unit);
               this.unit = null;
               this._unittexture = null;
            }
        }
        GetUnit(){
            return this.unit;
        }
    };