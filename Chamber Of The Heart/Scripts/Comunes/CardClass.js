import CardLogic from "./CardLogic.js";

export default class CardClass extends Phaser.GameObjects.Sprite {
    
    altered_state;
    isHealer = false; 
    isaCard;
    texture;
    stads;
    
    constructor(scene, x, y,_texture, _cardLogic) {
        
       super(scene, x, y,_texture);
        this.texture = _texture;
        //this.load.image("cardTexture", 'Assets/Temporales/cardPh.jpg'); 
        
        this.stads = _cardLogic;
        
        if (this.stads.unit_type == 3) this.isHealer = true;
        this.isaCard = this.stads.iscard;
       

      
    }

    GetTexture(){
        return this.texture;
    }

    setScene(scene) {
        this.scene = scene;
    }
}
