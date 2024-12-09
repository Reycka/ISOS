import CardLogic from "./CardLogic.js";
import UnitClass from "../Combate/UnitClass.js";

export default class CardClass extends Phaser.GameObjects.Sprite {
    
    isHealer; 
    isaCard;
    texture;
    stads;
    textureindex;
    isused
    scene;
    constructor(scene, x, y,_texture, _cardLogic) {   
       super(scene, x, y,_texture);
        this.texture = _texture;
        
        this.scene = scene;
        this.stads = _cardLogic;
        this.textureindex = this.stads.textureindex;
        this.isHealer  =this.stads.isahealer;
        this.isaCard = this.stads.iscard;
       this.isused = false;
        console.log(this.textureindex);
        this.setScale(1 / 2, 1 / 2);
      
        
      
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
        return new UnitClass(this.scene,this,unitexture);
    }
    SetCard(){
        
        if (this.isused == false){
            this.isused = true;
            return this;
        }
    }
    RecoverCard(){
        if (this.isused == true){
            this.isused = false;
        }
    }
    back(){
        this.isused = false;
    }
    GetIsused(){
        return this.isused;
    }
}
