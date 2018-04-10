//import ObjectManager from '../../environment/ObjectManager';
import Scene         from '../../environment/Scene';
import AssetLoader   from '../../assets/AssetLoader';

//const objectManager = new ObjectManager();
const scene         = new Scene();

let instance = null;

export default class SpriteManager {
    
    constructor() {

        if (!instance) {
            instance = this;
        }
          
        return instance;

    }

    createSpriteSheet(mobSpriteSheet){
        let assetLoader = new AssetLoader();
        let queue = assetLoader.getQueue();

        let images = mobSpriteSheet.ssNames.map(name => queue.getResult(name));

        let spriteSheet = new createjs.SpriteSheet({
            "images": images,
            "frames": {"width": mobSpriteSheet.frameWidth, "height": mobSpriteSheet.frameHeight},
            "animations": mobSpriteSheet.animations
        });

        return spriteSheet;
    }


    //TODO: instead of onclick pass mouse event map
    //TODO: pass in mob object instead of just name
    //TODO: add relative size to mob (size relative to average mob)
    //TODO: calculate scaleX and scaleY relative to combat area
    //TODO: calculate regX and regY relative to frame size and scale multiplier
    createSprite(spriteSheet, combatArea, name, scale, onClick){ 
        let sprite = new createjs.Sprite(spriteSheet);
        //sprite.regX = spriteSheet._frameWidth/2;
        //sprite.regY = spriteSheet._frameHeight/2;
        sprite.scaleX = scale;
        sprite.scaleY = scale;
        sprite.name = name;
        sprite.x = scene.combatArea[combatArea].centerX - spriteSheet._frameWidth/2*scale;
        sprite.y = scene.combatArea[combatArea].centerY - spriteSheet._frameHeight/2*scale;
        if(onClick) sprite.on("click", onClick);

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