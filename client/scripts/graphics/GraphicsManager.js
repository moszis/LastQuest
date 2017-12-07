let instance = null;

export default class GraphicsManager {
    
    constructor() {

        if (!instance) {
            instance = this;
        }
          
        return instance;

    }

    initNew(){
        this.createjs = global.createjs;
    }

    createBitmap(asset){
        let bitmap = new this.createjs.Bitmap(asset);
        return bitmap;
    }
    

}