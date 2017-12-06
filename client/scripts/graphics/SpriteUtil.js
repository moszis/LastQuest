import Enemy from './Enemy';
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

    createSprite(spriteSheet, animName){ 
        this.sprite = new this.createjs.Sprite(this.spriteSheet, "flap");
        this.sprite.regX = 99;
        this.sprite.regY = 58;
        this.sprite.name = "spriteNameA";
        this.sprite.x = scene.combatArea[combatArea].centerX;
        this.sprite.y = scene.combatArea[combatArea].centerY;
        this.sprite.gotoAndPlay("flap");
        this.sprite.on("click", this.leftClick);
        this.sprite.Enemy = this;
    }



}