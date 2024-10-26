//import Unit from UnitClass cuando tengamos la clase Unit hecha
export default class SlotClass extends Phaser.GameObjects.Sprite{
///PROPIEDADES
 unit;
 ocupada;
 texture;
//CONSTRUCTOR
    constructor(scene, x, y,_texture){
        this.texture = null;
        console.log("Me construyo" + "\n");
        this.unit = null;
        this.ocupada = false;
    }
    render(unit,texture){
        console.log("Renderizo tropa" +"\n");
        //deph.number(1); //Colocamos la imagen por encima
        if(unit == 'M'){
            this.texture = "Assets/Temporales/Mago.jpg"; //Imagen Mago
        }
        else if(unit == 'H'){
            this.texture = "Assets/Temporales/Healer.jpg"; //Imagen Healer
        }
        else if(unit == 'G'){
            this.texture = "Assets/Temporales/Tropa.jpg"; //Imagen Guerrero
        }
        else if(unit == 'A'){
            this.texture = "Assets/Temporales/Arquero.jpeg"; //Imagen Arquero
        }
        this.add.image(unit, texture); //Seteamos la imagen del Guerrero
    }
    //coloca la unidad en la casilla y pone el booleano ocupada en true.
    SetUnit(unit){
        if(!this.GetState()){
            console.log("Seteo" + unit + "\n"); //Debug
            this.unit = unit;
            this.render(this.unit);
            this.ocupada = true;
        }
        else console.log("La casilla está ocupada colega" + "\n"); //DEBUG
    }
    //Devuelve si hay una tropa o no en dicha posición
    GetState(){
        console.log(this.ocupada + "\n"); //DEBUG
        return this.ocupada;
    }   
    //Método que se llamará cada vez que una tropa muera o se desplace, coloca a False su valor ocupada
    SetFree(){
        console.log("Libero" + "\n") //DEBUG
           this.ocupada = false;
           this.texture = null;
    }
    //Asigna la tropa pasada a la nueva posición y setea a true en la matriz de booleanos
    SetFull(mat){ //mat representa la posición nueva a seteear, es un slotClass que hay que pasarle
        if(mat.GetState()){
            //Llamada al método que cambia la posición de la tropa
           console.log("He cambiado los valores" + "\n") //Debug
           this.ocupada = false;
           mat.SetUnit(this.unit);
           this.unit = null;
           this.texture = null;
        }
        else console.log("No he podido cambiarlos, no habia hueco disponible" + "\n");//DEBUG
    }

};