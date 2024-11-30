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
        //console.log("Me construyo" + "\n");
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
        this.setTint(0xff08000) //color ARGB
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
        //console.log(this.ocupada + "\n"); //DEBUG
        return this.ocupada;
    } 
    GetTexture(){
        console.log(this._unittexture)
        return this._unittexture;
    }
    //Setea la unidad 
    SetUnit(unit){
        this.unit = unit;
        this.ocupada = true;
        this._unittexture = unit.unittexture;
        //console.log(t+" " +this._unittexture);
        this.setTexture(this._unittexture);
    }
    //Método que se llamará cada vez que una tropa muera o se desplace, coloca a False su valor ocupada
    SetFree(){
        //console.log("Libero" + "\n") //DEBUG
           this.ocupada = false;
           this._unittexture = null;
           this.setTexture('MatrixGround');
    }
    //Asigna la tropa pasada a la nueva posición y setea a true en la matriz de booleanos
    SetFull(mat){ //mat representa la posición nueva a seteear, es un slotClass que hay que pasarle
        if(mat.GetState()){
            //Llamada al método que cambia la posición de la tropa
           console.log("He cambiado los valores" + "\n") //Debug
           this.ocupada = false;
           mat.SetUnit(this.unit);
           this.unit = null;
           this._unittexture = null;
        }
        else console.log("No he podido cambiarlos, no habia hueco disponible" + "\n");//DEBUG
    }
    GetUnit(){
        return this.unit;
    }
};