import * as AssetServices from '../assets/AssetServices';
import * as DataServices  from '../assets/DataServices';
import AssetLoader        from '../assets/AssetLoader';

let instance = null;

export default class ZoneManager{    

    constructor() {
      if (!instance) {
        instance = this;
      }
      
      return instance;
    }

    initNew(sceneInfo){
        this.zoneCode = sceneInfo.zoneCode;
        this.setData();
        
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

    setData(){
        
        DataServices.getZone(this.zoneCode).then(data => {
            console.log(data);
            this.setMobs(data.mobs);
            this.zoneBackgroundName = data.zoneBackgroundName;
        })
        
    }

};