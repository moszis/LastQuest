import ObjectManager from '../environment/ObjectManager';
import Scene         from '../environment/Scene';

const objectManager = new ObjectManager();
const scene         = new Scene();

let instance = null;

export default class SpriteManager {
    
    constructor() {

        if (!instance) {
            instance = this;
        }
          
        return instance;

    }

    initNew(){
        this.createjs = objectManager.createjs;
        this.queue    = objectManager.queue;
    }

    createSpriteSheet(mobSpriteSheet){

        let spriteSheet = new this.createjs.SpriteSheet({
            "images": [this.queue.getResult(mobSpriteSheet.ssName)],
            "frames": {"width": mobSpriteSheet.frameWidth, "height": mobSpriteSheet.frameHeight},
            "animations": {         
              idle: mobSpriteSheet.animations.idle,
              death: mobSpriteSheet.animations.death,
            }
        });

        return spriteSheet;
    }

    //TODO: instead of onclick pass event list
    createSprite(spriteSheet, combatArea, name, onClick){ 

        let sprite = new this.createjs.Sprite(spriteSheet);
        sprite.regX = spriteSheet._frameWidth/2;
        sprite.regY = spriteSheet._frameHeight/2;
        sprite.name = name;
        sprite.x = scene.combatArea[combatArea].centerX;
        sprite.y = scene.combatArea[combatArea].centerY;
        sprite.on("click", onClick);

        return sprite;
    }


    playAnimation(sprite, animationName, onComplete){

        if(onComplete != undefined){
            sprite.on("animationend", () => onComplete());
        }
        sprite.gotoAndPlay(animationName);
    }


    //TODO: SpriteSheets should be stored in a collection(array, map, etc..)
    //TODO: On request to create new existing one can be pulled out
    //TODO: This about same for sprites.. but there might be a problem with call back functions
}