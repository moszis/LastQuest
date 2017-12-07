let instance = null;

export default class AssetLoader {
    
    constructor(onComplete) {

        if (!instance) {
            this.createjs = global.createjs;

            let queue = new this.createjs.LoadQueue(false);
            queue.installPlugin(createjs.Sound);
            queue.on("progress", this.queueProgress, this);
            queue.on("error", this.queueError, this);
            queue.on("complete", onComplete, this);

            this.queue = queue;
            instance = this;
        }
          
        return instance;

    }

    getQueue(){
        return this.queue;
    }


    loadAssets(assets){
        this.queue.loadManifest(assets);
        this.queue.load();
    }


    getAsset(assetName){
        return this.queue.getResult(assetName)
    }


    queueProgress(event){
        console.log("QUEUE Progress.....!!");
    }
    
    queueError(event){
        console.log("QUEUE ERROR!!");
    }
}