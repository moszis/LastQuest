import Scene           from '../environment/Scene';
import SpriteManager   from '../system/graphics/SpriteManager';
import StageManager    from '../system/graphics/StageManager';
import GraphicsManager from '../system/graphics/GraphicsManager';
import CombatGraphics  from './CombatGraphics';
import EventManager    from '../system/events/EventManager';

const scene           = new Scene();
const stageManager    = new StageManager();
const spriteManager   = new SpriteManager();

export default class Enemy {

    constructor(mob) {

      this.mob = mob;
      this.health = mob.mobHeath;
      this.setSpriteSheet();
      this.activeAnimation = null;
      this.isActing = false;
      //Set based on mob object passed in
      this.setAnimations();
      this.setActions();
    }


    spawn(combatArea){

      this.combatArea = combatArea;

      this.sprite = spriteManager.createSprite(
                      this.spriteSheet, 
                      this.combatArea, 
                      this.mob.mobName, 
                      this.getSpriteScale(), 
                      null
                    );

      scene.combatArea[this.combatArea].isEnemy = true;
      scene.combatArea[this.combatArea].Enemy = this;

      stageManager.addChild(this.sprite);
      this.setHealthBar();
      this.idle();
      this.isTargeted = false;
    }

    idle(){
      if(this.activeAnimation != "idle"){
        spriteManager.playAnimation(this.sprite, "idle");
        this.activeAnimation = "idle";
        this.isActing = false;
      }
    }

    target(){
      this.isTargeted = true;
      console.log("TARGET");
      CombatGraphics.showEnemyTargetedIndicator(this.combatArea, false);
    }

    unTarget(){
      this.isTargeted = false;
      console.log("UN--TARGET");
      CombatGraphics.removeEnemyTargetedIndicator(this.combatArea);
    }

    impact(impact){
      if(impact.damageHealth){

        this.health -= impact.damageHealth;

        if(this.health <= 0){
          this.die();
        }
        
        this.updateHealthBar();
      }
    }


    act(){
      if(this.isActing || this.activeAnimation === "death") return;

      let action = this.actions[Math.floor(Math.random()*this.actions.length)];

      spriteManager.playAnimation(this.sprite, action.animation, this.idle.bind(this));
      this.activeAnimation = action.animation;
      this.isActing = true;

      CombatGraphics.showEnemyActionIndicators([action], true, this.combatArea);
    }

    die(){
      if(this.activeAnimation != "death"){
        spriteManager.playAnimation(this.sprite, "death", this.destroy.bind(this));
        this.activeAnimation = "death";
        this.isActing = false;
        this.unTarget();
        EventManager.publish("ENEMY_DYING");
      }
    }

    destroy(){
      stageManager.removeChild(this.sprite);
      stageManager.removeChild(this.healthBar);
      stageManager.removeChild(this.healthText);
      scene.combatArea[this.combatArea].isEnemy = false;
      scene.combatArea[this.combatArea].Enemy = null;
    }

    leftClick(event){

      //this.target();

    }

    setSpriteSheet(){
      this.spriteSheet = spriteManager.createSpriteSheet(this.mob.mobSpriteSheet);
    }

    setAnimations(){
      this.attackAnimations = ["attackSE", "attackNW"];
    }

    setActions(){

      this.actions = [];

      this.actions[0] = {
        type: 'attack',
        directional: true,
        direction: 1,
        directionCode: 'SE',
        isAnimated: true,
        animation: 'attackSE',
        speed: 5,
        interaptable: true
      };

      this.actions[1] = {
        type: 'attack',
        directional: true,
        direction: 6,
        directionCode: 'NW',
        isAnimated: true,
        animation: 'attackNW',
        speed: 5,
        interaptable: true
      };

    }

    setHealthBar(){

      let x = scene.combatArea[this.combatArea].x + scene.combatArea[this.combatArea].width * 0.2;
      let y = scene.combatArea[this.combatArea].y;
      let width = scene.combatArea[this.combatArea].width * 0.6;
      let textX = scene.combatArea[this.combatArea].x + scene.combatArea[this.combatArea].width / 2;

      this.healthBar = GraphicsManager.createRoundRectangle(x, scene.combatArea[this.combatArea].y, width, 20, 5);
      this.healthText = GraphicsManager.createText(this.getHealthPercent()+"%", "20px Arial", "#FFF", textX, y);

      stageManager.addChild(this.healthBar);
      stageManager.addChild(this.healthText);
    }

    updateHealthBar(){

      let x = scene.combatArea[this.combatArea].x + scene.combatArea[this.combatArea].width * 0.2;
      let width = scene.combatArea[this.combatArea].width * 0.6 * this.getHealthPercent() / 100;
      width = (width < 0) ? 0 : width;
      let hPercent = this.getHealthPercent();
      if(hPercent < 0) hPercent = 0;

      this.healthBar = GraphicsManager.updateRoundRectangle(this.healthBar, x, scene.combatArea[this.combatArea].y, width, 20, 5);
      this.healthText = GraphicsManager.updateText(this.healthText, hPercent+"%");
    }

    getHealth(){
      return this.health;
    }

    getHealthPercent(){
      return this.mob.mobHeath*this.health/100;
    }

    getSpriteScale(){
      
      console.log("sprite height: "+this.spriteSheet._frameHeight);
      console.log("combat frame height: "+scene.combatArea[this.combatArea].height);

      let scale = scene.combatArea[this.combatArea].height/this.spriteSheet._frameHeight*100/100;
      scale *=this.mob.mobSizeMultiplier;
      console.log("scale: "+scale);
      return scale;
    }


    isDying(){
      console.log("siDying??");
      if(this.activeAnimation == "death"){
        console.log("YES");
        return true;
      }
      console.log("NO");
      return false;
    }

};