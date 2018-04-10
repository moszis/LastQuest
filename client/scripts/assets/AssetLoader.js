let instance = null;

export default class AssetLoader {
    
    constructor(onComplete) {

        if (!instance) {

            let queue = new createjs.LoadQueue(false);
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
    
    queueComplete(event){
        console.log("QUEUE COMPLETE!!");
    }
    

    queueError(event){
        console.log("QUEUE ERROR!!");
    }
}