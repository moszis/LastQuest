import ObjectManager from '../environment/ObjectManager';
import Scene         from '../environment/Scene';
import SpriteUtil    from '../graphics/SpriteUtil';

const objectManager = new ObjectManager();
const scene         = new Scene();

export default class Enemy {

    constructor() {

      this.stage    = objectManager.stage;
      this.queue    = objectManager.queue;
      this.createjs = objectManager.createjs;

      this.spriteSheet = new this.createjs.SpriteSheet({
          "images": [this.queue.getResult('batSS')],
          "frames": {"width": 198, "height": 120},
          "animations": {         
              // start, end, next*, speed*
              idle : [0,4],
              die   : [5,9, false, 0.3 ]
          }
      });

      /*
      this.deathSpriteSheet = new this.createjs.SpriteSheet({
        "images": [this.queue.getResult('batSS')],
        "frames": {"width": 198, "height" : 120},
        "animations": {"death": [5,9, false, 1 ] }
      });
*/
      this.combatArea;

      this.name = "Enemy!";

    }


    spawn(combatArea){

      const spriteUtil    = new SpriteUtil();

      this.combatArea = combatArea;

      this.sprite = spriteUtil.createSprite(this.spriteSheet, combatArea, this.leftClick);

     /*
      this.sprite = new this.createjs.Sprite(this.spriteSheet);
      this.sprite.regX = 99;
      this.sprite.regY = 58;
      this.sprite.name = "spriteNameA";
      this.sprite.x = scene.combatArea[combatArea].centerX;
      this.sprite.y = scene.combatArea[combatArea].centerY;
      this.sprite.on("click", this.leftClick);
     */

      this.sprite.gotoAndPlay("idle");

      this.sprite.Enemy = this;

      //TODO: This should probably be handled elsewhere..
      this.stage.addChild(this.sprite);
      
      scene.combatArea[this.combatArea].isEnemy = true;
      scene.combatArea[this.combatArea].Enemy = this;

    }


    kill(){

        this.sprite.on("animationend", () => this.destroy());
        this.sprite.gotoAndPlay("die");
    }

    destroy(){

      console.log("DESTROYING!!!!!");

      this.stage.removeChild(this.sprite);
      scene.combatArea[this.combatArea].isEnemy = false;
      scene.combatArea[this.combatArea].Enemy = null;

        console.log(this.stage);
    }

    leftClick(event){

      console.log(this);
      console.log(this.Enemy);

      this.Enemy.kill();

    }
};