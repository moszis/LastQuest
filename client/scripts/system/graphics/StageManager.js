let instance = null;

export default class StageManager {
    
    constructor(canvasId) {

        if (!instance) {
            instance = this;
        }
          
        return instance;

    }

    initNew(canvasId, windowWidth, windowHeight){

        let canvas  = document.getElementById(canvasId);
        let context = canvas.getContext('2d');

        context.canvas.width  = windowWidth;
        context.canvas.height = windowHeight;

        this.stage    = new createjs.Stage(canvasId);
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