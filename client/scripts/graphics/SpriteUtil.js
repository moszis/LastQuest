import Enemy from './Enemy';
import ObjectManager from '../environment/ObjectManager';
import Scene         from '../environment/Scene';

const objectManager = new ObjectManager();
const scene         = new Scene();

let instance = null;

export default class SpriteUtil {
    
    constructor() {

        if (!instance) {

            this.stage    = objectManager.stage;
            this.queue    = objectManager.queue;
            this.createjs = objectManager.createjs;

            instance = this;
        }
          
        return instance;

    }

    createSprite(){ 

    }



}