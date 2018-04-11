import * as AssetServices from '../assets/AssetServices';
import * as DataServices  from '../assets/DataServices';
import AssetLoader        from '../assets/AssetLoader';
import EventManager       from '../system/events/EventManager';
import Scene              from '../environment/Scene';

let instance = null;

export default class ZoneManager{    

    constructor() {
      if (!instance) {

        EventManager.subscribe('ZONE_CHANGE', this.changeZone.bind(this));

        instance = this;
      }
      
      return instance;
    }

    changeZone(zoneInfo){
        console.log("zone change requested!!");
        this.zoneCode  = zoneInfo.zoneCode;
        let scene = new Scene();
        scene.clearScene();

        this.setData();
        this.loadAssets();


        //0. show load screen
        //1. clean old objects
        //2. set data
        //3. load assets
        //4. show zone
    }


    setMobs(mobs){
        this.mobs = mobs;
    }

    loadAssets(){

        const assetLoader = new AssetLoader(this.zoneAssetsLoaded.bind(this));
        AssetServices.getAssetListByZone(this.zoneCode).then(data => {
            assetLoader.loadAssets(data);
        });

    }

    setData(){
        
        DataServices.getZone(this.zoneCode).then(data => {
            this.setMobs(data.mobs);
            this.zoneBackgroundName = data.zoneBackgroundName;
            this.eventCode = data.defaultEventCode;
        })
        
    }

    zoneAssetsLoaded(){
        let scene = new Scene();
        scene.initNew({zoneCode:this.zoneCode, eventCode:this.eventCode});
        scene.setAssets();
    }

};