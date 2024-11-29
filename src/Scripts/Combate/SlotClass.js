//import Unit from UnitClass cuando tengamos la clase Unit hecha
export default class SlotClass extends Phaser.GameObjects.Sprite{
///PROPIEDADES
row;
col;
unit; //UnitClass
ocupada = false;
 _texture;
 imagen;
//CONSTRUCTOR
    constructor(scene, x, y,_texture){
        super(scene,x*10,y*5,_texture)
        this.row = x;
        this.col = y;
        this._texture = _texture;
        //console.log("Me construyo" + "\n");
        this.unit = null;
        this.ocupada = false;
       
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
        return this._texture;
    }
    //Setea la unidad 
    SetUnit(unit,t){
        this.unit = unit;
        this.ocupada = true;
        this._texture =t;
        console.log(t+" " +this._texture);
    }
    //Método que se llamará cada vez que una tropa muera o se desplace, coloca a False su valor ocupada
    SetFree(){
        //console.log("Libero" + "\n") //DEBUG
           this.ocupada = false;
           this._texture = null;
    }
    //Asigna la tropa pasada a la nueva posición y setea a true en la matriz de booleanos
    SetFull(mat){ //mat representa la posición nueva a seteear, es un slotClass que hay que pasarle
        if(mat.GetState()){
            //Llamada al método que cambia la posición de la tropa
           console.log("He cambiado los valores" + "\n") //Debug
           this.ocupada = false;
           mat.SetUnit(this.unit);
           this.unit = null;
           this._texture = null;
        }
        else console.log("No he podido cambiarlos, no habia hueco disponible" + "\n");//DEBUG
    }
    GetUnit(){
        return this.unit;
    }
};