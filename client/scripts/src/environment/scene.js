export default class Scene{    

      constructor(sceneProperties) {

        this.zoneCode = sceneProperties.zoneCode;
        this.eventCode = sceneProperties.eventCode;

        //Physical client system parameters
        this.windowHeight = window.innerHeight - window.innerHeight/20; 
        this.windowWidth  = window.innerWidth - window.innerWidth/20;

        //Canvas and visual game component dimentions
        if(this.eventCode === "combat"){
          this.setCombatDimentions();
        }

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
          y       : y
      }

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
          y       : y
      }

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
          y       : y
      }

    }    
};