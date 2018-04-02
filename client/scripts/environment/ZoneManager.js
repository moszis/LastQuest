import * as AssetServices from '../assets/AssetServices';
import * as DataServices  from '../assets/DataServices';
import AssetLoader        from '../assets/AssetLoader';
import EventManager    from '../system/events/EventManager';

let instance = null;

export default class ZoneManager{    

    constructor() {
      if (!instance) {

        EventManager.subscribe('ZONE_CHANGE', this.changeZone.bind(this));

        instance = this;
      }
      
      return instance;
    }

    initNew(sceneInfo){
        this.zoneCode = sceneInfo.zoneCode;
        this.setData();
        
    }

    changeZone(zoneInfo){
        console.log("zone change requested!!");
    }


    setMobs(mobs){
        this.mobs = mobs;
    }

    loadAssets(callback){
        const assetLoader = new AssetLoader(callback);
        AssetServices.getAssetListByZone(this.zoneCode).then(data => {
            assetLoader.loadAssets(data);
        });
    }

    setData(){
        
        DataServices.getZone(this.zoneCode).then(data => {
            console.log(data);
            this.setMobs(data.mobs);
            this.zoneBackgroundName = data.zoneBackgroundName;
        })
        
    }

};