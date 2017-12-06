import ObjectManager from '../environment/ObjectManager';
import Scene         from '../environment/Scene';

const objectManager = new ObjectManager();
const scene = new Scene();

export default class Enemy {

    constructor() {

      this.stage    = objectManager.stage;
      this.queue    = objectManager.queue;
      this.createjs = objectManager.createjs;

      this.spriteSheet = new this.createjs.SpriteSheet({
          "images": [this.queue.getResult('batSpritesheet')],
          "frames": {"width": 198, "height": 117},
          "animations": { "flap": [0,4] }
      });

      this.deathSpriteSheet = new this.createjs.SpriteSheet({
        "images": [this.queue.getResult('batDeath')],
        "frames": {"width": 198, "height" : 148},
        "animations": {"die": [0,7, false,1 ] }
      });

      this.combatArea;

      this.name = "Enemy!";

    }


    spawn(combatArea){

      this.combatArea = combatArea;

      this.sprite = new this.createjs.Sprite(this.spriteSheet, "flap");
      this.sprite.regX = 99;
      this.sprite.regY = 58;
      this.sprite.name = "spriteNameA";
      this.sprite.x = scene.combatArea[combatArea].centerX;
      this.sprite.y = scene.combatArea[combatArea].centerY;
      this.sprite.gotoAndPlay("flap");
      this.sprite.on("click", this.leftClick);
      this.sprite.Enemy = this;

      //TODO: This should probably be handled elsewhere..
      this.stage.addChild(this.sprite);
      scene.combatArea[this.combatArea].isEnemy = true;
      scene.combatArea[this.combatArea].Enemy = this;

    }


    kill(){
    
        this.stage.removeChild(this.sprite);

        let deathAnimation = new this.createjs.Sprite(this.deathSpriteSheet, "die");
        deathAnimation.regX = 99;
        deathAnimation.regY = 58;
        deathAnimation.x = this.sprite.x;
        deathAnimation.y = this.sprite.y;
        deathAnimation.on("animationend", () => this.destroy());
        deathAnimation.gotoAndPlay("die");
        this.stage.addChild(deathAnimation);

        this.deathAnimation = deathAnimation;

    }

    destroy(){

      this.stage.removeChild(this.sprite);
      this.stage.removeChild(this.deathAnimation);
      scene.combatArea[this.combatArea].isEnemy = false;
      scene.combatArea[this.combatArea].Enemy = null;

        console.log(this.stage);
    }

    leftClick(event){

      this.Enemy.kill();

    }
};