let instance = null;

class ObjectManager {
  
  constructor(){
    
    if (!instance) {
      instance = this;
    }
    
    return instance;
  }

  setScene(scene){
    this.scene = scene;
  }

  setStage(stage){
    this.stage = stage;
  }

  setQueue(queue){
    this.queue = queue;
  }

  setCreatejs(createjs){
    this.createjs = createjs;
  }


}
  
export default ObjectManager;




