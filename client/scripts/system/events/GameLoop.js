import EnemyManager    from '../../combat/EnemyManager';
import StageManager    from '../graphics/StageManager';
import EventManager    from './EventManager';

let stageManager = new StageManager();
let enemyManager = new EnemyManager();

let instance = null;

export default class GameLoop {
    
    constructor(fps) {

        if (!instance) {

            this.ticks = 0;
            this.fps = fps;
            createjs.Ticker.setFPS(this.fps);
            createjs.Ticker.addEventListener('tick', stageManager.stage);
            createjs.Ticker.addEventListener('tick', this.processTick.bind(this));

            instance = this;
        }
          
        return instance;

    }

    processTick(){

        this.ticks+=1;
        if(this.ticks % this.fps == 0)
          console.log("game seconds: "+this.ticks/this.fps);
    
        enemyManager.processTick();
    }



}