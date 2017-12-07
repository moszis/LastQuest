import ObjectManager from '../environment/ObjectManager';
import Scene         from '../environment/Scene';
import SpriteUtil    from '../graphics/SpriteUtil';

const objectManager = new ObjectManager();
const scene         = new Scene();

export default class Enemy {

    constructor(mob) {

      this.mob = mob;

      this.stage = objectManager.stage;

      this.setSpriteSheet();

      this.combatArea;

    }


    spawn(combatArea){

      const spriteUtil    = new SpriteUtil();

      this.combatArea = combatArea;


      this.sprite = spriteUtil.createSprite(this.spriteSheet, this.combatArea, this.mob.mobName, this.leftClick);

      //TODO: This needs to be abtructed by SpriteUtil
      this.sprite.gotoAndPlay("idle");

      this.sprite.Enemy = this;

      //TODO: This should probably be handled elsewhere..
      this.stage.addChild(this.sprite);
      
      scene.combatArea[this.combatArea].isEnemy = true;
      scene.combatArea[this.combatArea].Enemy = this;

    }

    //TODO: This needs to be abtructed by SpriteUtil
    // SpriteUtil.playAnimation(this.sprite, "death", this.destroy());
    kill(){
        this.sprite.on("animationend", () => this.destroy());
        this.sprite.gotoAndPlay("death");
    }

    destroy(){

      this.stage.removeChild(this.sprite);
      scene.combatArea[this.combatArea].isEnemy = false;
      scene.combatArea[this.combatArea].Enemy = null;

      console.log(this.stage);
    }

    leftClick(event){

      this.Enemy.kill();

    }

    setSpriteSheet(){
      const spriteUtil    = new SpriteUtil();
      this.spriteSheet = spriteUtil.createSpriteSheet(this.mob.mobSpriteSheet);
    }
};