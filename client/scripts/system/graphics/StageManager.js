let instance = null;

export default class StageManager {
    
    constructor(canvasId) {

        if (!instance) {
            instance = this;
        }
          
        return instance;

    }

    initNew(canvasId, scene){
        this.createjs = global.createjs;

        let canvas = document.getElementById('mainCanvas');
        let context = canvas.getContext('2d');
        context.canvas.width  = scene.windowWidth;
        context.canvas.height = scene.windowHeight;

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