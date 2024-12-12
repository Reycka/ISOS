import CardLogic from "./CardLogic.js";
import CardClass from "./CardClass.js";
import AffinityRegister from "./AffinityRegister.js";
export default class Inventory{
    day = 1;
    numgift;
    numcards;
    listCardlogic = [];
    listCardClass=[]
    affreg;

    //Eventos de las personas
    EventList =[];

    

    constructor(nabo){
        if(nabo.texture.key == 'IMPORTANTITISISISMOCLAVEINDISPENSABLE'){
            this.numgift = 0;
             this.numcards = 0;
            this.day = 1;
            this.affreg = new AffinityRegister();

        for (var i=0; i<5; i++)
        {
            this.EventList[i] = 1;
        }
        }
        else console.warn("me falta la raiz de todo lo importante, me falta el pilar que sustenta este proyecto sin el el barco se hunde, ¿por que? la pregunta no es porque si no desde cuando, es el nabo el que lo sustenta todo o es porque lenta pero inexorablemete esta clase mal llamada inventario que guarda mas cosas que solo lo que se esperaria de un inventario es el pilar fundamental en el paso de informacion entre escenas es el alfa y el omega el principio y el fin es el todo de este proyecto y por eso si no existe la imagen de un nabo en los archivos del juego se caga encima y deja de compilar, de na da")
        
    }
    
    AddGift(n) {
        this.numgift = this.numgift + n;
    }
    RemoveGift(n){ 
        if(this.CheckGift(n))this.numgift = this.numgift - n;
    }
    CheckGift(n){
        return this.numgift>= n;
    }
    
    AddCard(scene, cardTexture) { 

            
         
            var cardLogic = new CardLogic(this.affreg.GetRandomLetter()); 
            this.listCardlogic.push(cardLogic);
          
            this.listCardClass.push(new CardClass(scene, 1, 1,cardTexture, cardLogic));
            console.log(this.listCardClass); 
            this.numcards++;
    }
    increaseDay(){
        this.day++;
    }
    GetGitf(){
        return this.numgift
    }
    GetNumCards(){
        return this.numcards;
    }
}