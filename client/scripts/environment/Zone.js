import * as AssetServices from '../assets/AssetServices';
import AssetLoader        from '../assets/AssetLoader';

let instance = null;

export default class Zone{    

    constructor() {
      if (!instance) {
        instance = this;
      }
      
      return instance;
    }

    initNew(zone){
        this.zoneCode = zone.zoneCode;
        this.zoneBackgroundName = zone.zoneBackgroundName;
        this.setMobs(zone.mobs);
    }

    setMobs(mobs){
        this.mobs = mobs;
    }

    loadAssets(){
        let assetLoader = new AssetLoader();

        AssetServices.getAssetListByZone(this.zoneCode)
        .then(data => {
            assetLoader.loadAssets(data);
        })
    }

};