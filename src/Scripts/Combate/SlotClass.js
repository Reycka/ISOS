//import Unit from UnitClass cuando tengamos la clase Unit hecha
export default class SlotClass extends Phaser.GameObjects.Sprite{
///PROPIEDADES
row;
col;
unit; //UnitClass
ocupada = false;
 _unittexture;
 _slottexture
 imagen;
//CONSTRUCTOR
    constructor(scene, x, y,_texture){
        super(scene,x*10,y*5,_texture)
        this.row = x;
        this.col = y;
        this._unittexture = _texture;
        this.unit = null;
        this.ocupada = false;
        this.scene.add.existing(this);
        
    }
    Getdamage(){
        this.setTint(0xffff0000) //color ARGB
        this.scene.time.addEvent({
            delay: 700,
            callback: ()=>{this.setTint(0xffffffff)}  //después de 0.5 segundos modificamos a un tinte blanco que dejará la imagen igual
        })
    }Getheal(){
        this.setTint(0xff00ff00) //color ARGB
        this.scene.time.addEvent({
            delay: 700,
            callback: ()=>{this.setTint(0xffffffff)}  //después de 0.5 segundos modificamos a un tinte blanco que dejará la imagen igual
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