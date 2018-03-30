import Zone            from './Zone';
import AssetLoader     from '../assets/AssetLoader';
import StageManager    from '../system/graphics/StageManager';
import GraphicsManager from '../system/graphics/GraphicsManager';
import EventManager    from '../system/events/EventManager';

let instance = null;
const stageManager    = new StageManager();


export default class Scene{    

    constructor() {
      if (!instance) {
        instance = this;
      }
      
      return instance;
    }

    initNew(sceneProperties){
      this.zoneCode = sceneProperties.zoneCode;
      this.eventCode = sceneProperties.eventCode;
      this.combatArea = [];
      
      //Physical client system parameters
      this.windowHeight = window.innerHeight - window.innerHeight/20; 
      this.windowWidth  = window.innerWidth - window.innerWidth/20;

      //Canvas and visual game component dimentions
      if(this.eventCode === "combat"){
        this.setCombatDimentions();
      }
    }

    setAssets(){
      this.setBackground();
      this.setCombatHitAreas();
    }

    setBackground(){

      let stageManager    = new StageManager();
      let graphicsManager = new GraphicsManager();
      let zone = new Zone();
      let assetLoader = new AssetLoader();

      let backgroundImage = graphicsManager.createBitmap(assetLoader.getAsset(zone.zoneBackgroundName));
      
      stageManager.addChild(backgroundImage);
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
          id      : 0
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
          id      : 1
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
          id      : 2
      }

      this.combatArea[2] = this.combatAreaRight;
    }  
  
    setCombatHitAreas(){

      let shape = null;

      this.combatArea.forEach(combatArea => {
        shape = GraphicsManager.createRectangle(combatArea.x, combatArea.y, combatArea.width, combatArea.height);
        shape.addEventListener("click", function(event) { EventManager.publish("COMBAT_SLOT_LEFT_CLICKED", combatArea.id); });
        stageManager.addChild(shape);
      });

    }
};