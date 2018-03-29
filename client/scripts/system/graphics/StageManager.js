let instance = null;

export default class StageManager {
    
    constructor(canvasId) {

        if (!instance) {
            instance = this;
        }
          
        return instance;

    }

    initNew(canvasId){
        this.createjs = global.createjs;

        this.stage    = new this.createjs.Stage(canvasId);
    }


    updateBackground(){


    }

    getStage(){
        return this.stage;
    }

    addChild(displayEntity){
        this.stage.addChild(displayEntity);
    }

    removeChild(displayEntity){
        this.stage.removeChild(displayEntity);
    }


    updateStage(){
        this.stage.update();
    }

}