//import Unit from UnitClass cuando tengamos la clase Unit hecha
export default class SlotClass{
///PROPIEDADES
 unit;
 ocupada;
//CONSTRUCTOR
    constructor(){
        console.log("Me construyo" + "\n");
        this.unit = null;
        this.ocupada = false;
    }
    render(unit){
        console.log("Renderizo tropa" +"\n");
        deph.number(1); //Colocamos la imagen por encima
        this.add.sprites(this.unit, "IP"); //Seteamos la imagen
    }
    //coloca la unidad en la casilla y pone el booleano ocupada en true.
    SetUnit(unit){
        if(!this.GetState()){
            console.log("Seteo" + "\n"); //Debug
            this.render();
            ocupada = true;
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
    }
    //Asigna la tropa pasada a la nueva posición y setea a true en la matriz de booleanos
    SetFull(mat){ //mat representa la posición nueva a seteear, es un slotClass que hay que pasarle
        if(mat.GetState()){
            //Llamada al método que cambia la posición de la tropa
           console.log("He cambiado los valores" + "\n") //Debug
           this.ocupada = false;
           mat.ocupada = true;
        }
        else console.log("No he podido cambiarlos, no habia hueco disponible" + "\n");//DEBUG
    }

};