import CardLogic from "./CardLogic.js";
import UnitClass from "../Combate/UnitClass.js";

export default class CardClass extends Phaser.GameObjects.Sprite {
    
    isHealer = false; 
    isaCard;
    texture;
    stads;
    textureindex;
    isused
    
    constructor(scene, x, y,_texture, _cardLogic) {
        
       super(scene, x, y,_texture);
        this.texture = _texture;
        //this.load.image("cardTexture", 'Assets/Temporales/cardPh.jpg'); 
        
        this.stads = _cardLogic;
        this.textureindex = this.stads.textureindex;
        if (this.stads.unit_type == 3) this.isHealer = true;
        this.isaCard = this.stads.iscard;
       this.isused = false;
        console.log(this.textureindex);
      
    }
    GetTextureIndex(){
        return this.textureindex;
    }

    GetTexture(){
        return this.texture;
    }

    setScene(scene) {
        this.scene = scene;
    }
    SummonUnit(unitexture){
        return new UnitClass(this,unitexture);
    }
    SetCard(){
        
        if (this.isused == false){
            this.isused = true;
            return this;
        }
    }
    back(){
        this.isused = false;
    }
    GetIsused(){
        return this.isused;
    }
}