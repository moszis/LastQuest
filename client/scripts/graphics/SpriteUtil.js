import ObjectManager from '../environment/ObjectManager';
import Scene         from '../environment/Scene';

const objectManager = new ObjectManager();
const scene         = new Scene();

let instance = null;

export default class SpriteUtil {
    
    constructor() {

        if (!instance) {

            this.stage    = objectManager.stage;
            this.queue    = objectManager.queue;
            this.createjs = objectManager.createjs;

            instance = this;
        }
          
        return instance;

    }

    createSprite(spriteSheet, combatArea, onClick){ 

        console.log("CREATING SPRITE!!");

        let sprite = new this.createjs.Sprite(spriteSheet);
        sprite.regX = 99;
        sprite.regY = 58;
        sprite.name = "spriteNameA";
        sprite.x = scene.combatArea[combatArea].centerX;
        sprite.y = scene.combatArea[combatArea].centerY;
        sprite.on("click", onClick);
        console.log("CREATED SPRITE!!");
        return sprite;


        //this.sprite.Enemy = this;
    }



}