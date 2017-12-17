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
      this.activeSprite = null;

    }


    spawn(combatArea){

      this.combatArea = combatArea;

      this.spriteIdle = spriteManager.createSprite(
                      this.ssIdle, 
                      this.combatArea, 
                      this.mob.mobName, 
                      this.getSpriteScale(this.ssIdle),
                      this.leftClick.bind(this)
                    );
      this.spriteAttackNW = spriteManager.createSprite(
                      this.ssDeath, 
                      this.combatArea, 
                      this.mob.mobName, 
                      this.getSpriteScale(this.ssDeath),
                      this.leftClick.bind(this)
                    );

      this.spriteDeath = spriteManager.createSprite(
                      this.ssDeath, 
                      this.combatArea, 
                      this.mob.mobName, 
                      this.getSpriteScale(this.ssDeath),
                      this.leftClick.bind(this)
                    );
      scene.combatArea[this.combatArea].isEnemy = true;
      scene.combatArea[this.combatArea].Enemy = this;

      
      this.setHealthBar();
      this.idle();
    }

    idle(){
      if(this.activeSprite != this.spriteIdle){
        stageManager.removeChild(this.activeSprite);
        stageManager.addChild(this.spriteIdle);
        this.activeSprite = this.spriteIdle;
      }
      spriteManager.playAnimation(this.spriteIdle, "play");
    }

    attack(){
      if(this.activeSprite != this.spriteAttackNW){
        stageManager.removeChild(this.activeSprite);
        stageManager.addChild(this.spriteAttackNW);
        this.activeSprite = this.spriteAttackNW;
      }
      spriteManager.playAnimation(this.spriteAttackNW, "play", this.idle.bind(this));
    }

    kill(){
      if(this.activeSprite != this.spriteDeath){
        stageManager.removeChild(this.activeSprite);
        stageManager.addChild(this.spriteDeath);
        this.activeSprite = this.spriteDeath;
        spriteManager.playAnimation(this.spriteDeath, "play", this.destroy.bind(this));
      }
    }

    destroy(){
      stageManager.removeChild(this.spriteIdle);
      stageManager.removeChild(this.spriteAttackNW);
      stageManager.removeChild(this.spriteDeath);
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
      
      this.ssIdle     = spriteManager.createSpriteSheet(this.mob.mobAnimations.idle);
      console.log("idle done");
      this.ssAttackNW = spriteManager.createSpriteSheet(this.mob.mobAnimations.attackNW);
      this.ssAttackSE = spriteManager.createSpriteSheet(this.mob.mobAnimations.attackSE);
      this.ssStagger  = spriteManager.createSpriteSheet(this.mob.mobAnimations.stagger);
      this.ssDeath    = spriteManager.createSpriteSheet(this.mob.mobAnimations.death);
      console.log("spritesheets done");
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

    getSpriteScale(spriteSheet){
      console.log("sprite height: "+spriteSheet._frameHeight);
      console.log("combat frame height: "+scene.combatArea[this.combatArea].height);

      let scale = scene.combatArea[this.combatArea].height/spriteSheet._frameHeight * 100/100;

      scale *=this.mob.mobSizeMultiplier;
      console.log("scale: "+scale);
      return scale;

    }

};