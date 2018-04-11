import ZoneManager     from './ZoneManager';
import AssetLoader     from '../assets/AssetLoader';
import StageManager    from '../system/graphics/StageManager';
import GraphicsManager from '../system/graphics/GraphicsManager';
import EventManager    from '../system/events/EventManager';

let instance = null;
const stageManager    = new StageManager();


if(!global.gameStore) global.gameStore = [];

export default class Scene{    

    constructor() {
      if (!instance) {
        instance = this;
      }
      
      return instance;
    }

    initNew(sceneProperties){

      if(!global.gameStore.combatArea) global.gameStore.combatArea = [];
      console.log(sceneProperties);
      this.zoneCode  = sceneProperties.zoneCode;
      this.eventCode = sceneProperties.eventCode;

      this.combatArea = global.gameStore.combatArea;
      
      //Physical client system parameters
      this.windowHeight = window.innerHeight - window.innerHeight/20; 
      this.windowWidth  = window.innerWidth  - window.innerWidth/20;

      //Canvas and visual game component dimentions
      if(this.eventCode === "combat"){
        this.setCombatDimentions();
      }

    }

    setAssets(){
      this.setBackground();
      if(this.eventCode === "combat"){
        this.setCombatHitAreas();
      }
      

      /****TODOOO */
      // Play background sound
      //createjs.Sound.play(zoneObject.zoneSoundName, {loop: -1});
    }

    clearScene(){
      stageManager.removeChild(this.backgroundImage);
      this.clearAllCombatAreas();
    }


    setBackground(){

      let stageManager = new StageManager();
      let zoneManager  = new ZoneManager();
      let assetLoader  = new AssetLoader();

      this.backgroundImage = GraphicsManager.createBitmap(assetLoader.getAsset(zoneManager.zoneBackgroundName));
      
      stageManager.addChild(this.backgroundImage);
    }

    setCombatDimentions(){
    
        this.combatAreaWidth  = this.windowWidth/4;
        this.combatAreaHeight = this.combatAreaWidth;
        
        this.setCombatAreaCenter();
        this.setCombatAreaLeft();
        this.setCombatAreaRight();     
    }

    setCombatAreaCenter(){

      let centerX = this.windowWidth/2;
      let centerY = this.windowHeight/2;
      let width   = this.combatAreaWidth;
      let height  = this.combatAreaHeight;
      let x       = centerX - width/2;
      let y       = centerY - height/2;


      this.combatAreaCenter = {
          centerX : centerX,
          centerY : centerY,
          width   : width,
          height  : height,
          x       : x,
          y       : y,
          id      : 0,
          sprites : []
      }

      this.combatArea[0] = this.combatAreaCenter;

    }

    setCombatAreaLeft(){
      
      let centerX = this.windowWidth/4;
      let centerY = this.windowHeight/2;
      let width   = this.combatAreaWidth;
      let height  = this.combatAreaHeight;
      let x       = centerX - width/2;
      let y       = centerY - height/2;


      this.combatAreaLeft = {
          centerX : centerX,
          centerY : centerY,
          width   : width,
          height  : height,
          x       : x,
          y       : y,
          id      : 1,
          sprites : []
      }

      this.combatArea[1] = this.combatAreaLeft;
    }

    setCombatAreaRight(){
      
      let centerX = this.windowWidth - this.windowWidth/4;
      let centerY = this.windowHeight/2;
      let width   = this.combatAreaWidth;
      let height  = this.combatAreaHeight;
      let x       = centerX - width/2;
      let y       = centerY - height/2;


      this.combatAreaRight = {
          centerX : centerX,
          centerY : centerY,
          width   : width,
          height  : height,
          x       : x,
          y       : y,
          id      : 2,
          sprites : []
      }

      this.combatArea[2] = this.combatAreaRight;
    }  
  
    setCombatHitAreas(){

      let shape = null;

      this.combatArea.forEach(combatArea => {
        shape = GraphicsManager.createHitAreaRectangle(combatArea.x, combatArea.y, combatArea.width, combatArea.height);
        shape.addEventListener("click", function(event) { EventManager.publish("COMBAT_SLOT_LEFT_CLICKED", combatArea.id); });
        stageManager.addChild(shape);
        console.log(combatArea.id);
        this.combatArea[combatArea.id].hitAreaRectangle = shape;
        this.combatArea[combatArea.id].sprites.push(shape);
      });

      let zoneManager  = new ZoneManager();
      let assetLoader  = new AssetLoader();
      let corner = GraphicsManager.createBitmap(assetLoader.getAsset("attackNWIndicator"));
      
      corner.setTransform(this.combatArea[1].x+114.4, this.combatArea[1].y+110, 0.1, 0.1, 180);
      
      console.log(corner.image.width);
      this.attackNWIndicator = corner;
      
      stageManager.addChild(corner);
      this.combatArea[1].sprites.push(corner);
    }

    clearAllCombatAreas(){

      if(!this.combatArea) return;


      this.combatArea.forEach(combatArea => {
        combatArea.sprites.forEach(sprite => {
          stageManager.removeChild(sprite);
        })
      })

      this.combatArea = [];
      global.gameStore.combatArea = [];

    }

    clearCombatArea(combatAreaId){

      this.combatArea[combatAreaId].sprites.forEach(sprite => {
        stageManager.removeChild(sprite);
      })

    }

};