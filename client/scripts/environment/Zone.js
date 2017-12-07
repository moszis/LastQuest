let instance = null;

export default class Zone{    

    constructor() {
      if (!instance) {
        instance = this;
      }
      
      return instance;
    }

    setNew(zone){
        this.zoneCode = zone.zoneCode;
        this.setMobs(zone.mobs);
    }

    setMobs(mobs){
        this.mobs = mobs;
    }

};