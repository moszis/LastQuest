import Scene         from '../environment/Scene';
import SpriteManager from '../graphics/SpriteManager';
import StageManager  from '../graphics/StageManager';

const scene         = new Scene();
const stageManager  = new StageManager();
const spriteManager = new SpriteManager();

export default class Enemy {

    constructor(mob) {

      this.mob = mob;

      this.setSpriteSheet();

    }


    spawn(combatArea){

      this.combatArea = combatArea;

      this.sprite = spriteManager.createSprite(this.spriteSheet, this.combatArea, this.mob.mobName, this.leftClick.bind(this));

      spriteManager.playAnimation(this.sprite, "idle");

      stageManager.addChild(this.sprite);
      
      scene.combatArea[this.combatArea].isEnemy = true;
      scene.combatArea[this.combatArea].Enemy = this;

    }


    kill(){
      spriteManager.playAnimation(this.sprite, "death", this.destroy.bind(this));
    }

    destroy(){
      stageManager.removeChild(this.sprite);
      scene.combatArea[this.combatArea].isEnemy = false;
      scene.combatArea[this.combatArea].Enemy = null;
    }

    leftClick(event){

      this.kill();

    }

    setSpriteSheet(){
      this.spriteSheet = spriteManager.createSpriteSheet(this.mob.mobSpriteSheet);
    }
};