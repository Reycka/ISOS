import CardLogic from "./CardLogic.js";
export default class CardClass extends Phaser.GameObjects.Sprite{
    stads = new CardLogic();
    altered_state;
    isHealer;
    isaCard;
    texture;
    constructor(scene, x,y,_texture,_cardLogic){
        
        this.stads = _cardLogic;
        if (this.stads.unit_type == 3) this.isHealer = true;
        this.isaCard = this.stads.iscard;
        this.texture = _texture;
        super(scene,x,y,texture);
    }
}