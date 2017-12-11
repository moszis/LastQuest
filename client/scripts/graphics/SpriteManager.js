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
              attack: mobSpriteSheet.animations.attack,
              death: mobSpriteSheet.animations.death,
            }
        });

        return spriteSheet;
    }

    //TODO: instead of onclick pass mouse event map
    //TODO: build scaling functionality.
    //TODO: pass in mob object instead of just name
    //TODO: add relative size to mob (size relative to average mob)
    //TODO: calculate scaleX and scaleY relative to combat area
    //TODO: calculate regX and regY relative to frame size and scale multiplier
    createSprite(spriteSheet, combatArea, name, scale, onClick){ 

        let sprite = new this.createjs.Sprite(spriteSheet);
        //sprite.regX = spriteSheet._frameWidth/2;
        //sprite.regY = spriteSheet._frameHeight/2;
        sprite.scaleX = scale;
        sprite.scaleY = scale;
        sprite.name = name;
        sprite.x = scene.combatArea[combatArea].centerX - spriteSheet._frameWidth/2*scale;
        sprite.y = scene.combatArea[combatArea].centerY - spriteSheet._frameHeight/2*scale;
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