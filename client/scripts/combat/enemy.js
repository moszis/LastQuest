import Scene           from '../environment/Scene';
import SpriteManager   from '../graphics/SpriteManager';
import StageManager    from '../graphics/StageManager';
import GraphicsManager from '../graphics/GraphicsManager';

const scene           = new Scene();
const stageManager    = new StageManager();
const spriteManager   = new SpriteManager();
const graphicsManager = new GraphicsManager();

export default class Enemy {

    constructor(mob) {

      this.mob = mob;
      this.health = mob.mobHeath;
      this.setSpriteSheet();

    }


    spawn(combatArea){

      this.combatArea = combatArea;

      this.sprite = spriteManager.createSprite(this.spriteSheet, this.combatArea, this.mob.mobName, this.leftClick.bind(this));

      scene.combatArea[this.combatArea].isEnemy = true;
      scene.combatArea[this.combatArea].Enemy = this;

      stageManager.addChild(this.sprite);
      this.setHealthBar();
      this.idle();
    }

    idle(){
      spriteManager.playAnimation(this.sprite, "idle");
    }

    attack(){
      console.log("attacking!!!!!!!!");
      spriteManager.playAnimation(this.sprite, "attack", this.idle.bind(this));
    }

    kill(){
      spriteManager.playAnimation(this.sprite, "death", this.destroy.bind(this));
    }

    destroy(){
      stageManager.removeChild(this.sprite);
      stageManager.removeChild(this.healthBar);
      stageManager.removeChild(this.healthText);
      scene.combatArea[this.combatArea].isEnemy = false;
      scene.combatArea[this.combatArea].Enemy = null;
    }

    leftClick(event){

      this.health -= 20;
      
      console.log(this.health);

      if(this.health <= 0){
        this.kill();
      }
      
      this.updateHealthBar();

    }



    setSpriteSheet(){
      this.spriteSheet = spriteManager.createSpriteSheet(this.mob.mobSpriteSheet);
    }

    setHealthBar(){

      let x = scene.combatArea[this.combatArea].x + scene.combatArea[this.combatArea].width * 0.2;
      let y = scene.combatArea[this.combatArea].y;
      let width = scene.combatArea[this.combatArea].width * 0.6;
      let textX = scene.combatArea[this.combatArea].x + scene.combatArea[this.combatArea].width / 2;

      this.healthBar = graphicsManager.createRoundRectangle(x, scene.combatArea[this.combatArea].y, width, 20, 5);
      this.healthText = graphicsManager.createText(this.getHealthPercent()+"%", "20px Arial", "#FFF", textX, y);

      stageManager.addChild(this.healthBar);
      stageManager.addChild(this.healthText);

    }

    updateHealthBar(){
      let x = scene.combatArea[this.combatArea].x + scene.combatArea[this.combatArea].width * 0.2;
      let width = scene.combatArea[this.combatArea].width * 0.6 * this.getHealthPercent() / 100;
      width = (width < 0) ? 0 : width;
      let hPercent = this.getHealthPercent();
      if(hPercent < 0) hPercent = 0;

      this.healthBar = graphicsManager.updateRoundRectangle(this.healthBar, x, scene.combatArea[this.combatArea].y, width, 20, 5);
      this.healthText = graphicsManager.updateText(this.healthText, hPercent+"%");

      //TODO: TEMPORARY!!
      if(hPercent > 0){
        this.attack();
      }
    }

    getHealth(){
      return this.health;
    }

    getHealthPercent(){
      return this.mob.mobHeath*this.health/100;
    }

};