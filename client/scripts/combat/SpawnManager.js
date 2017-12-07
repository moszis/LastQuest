import Enemy from './Enemy';
import ObjectManager from '../environment/ObjectManager';
import Scene         from '../environment/Scene';
import Zone          from '../environment/Zone';

const objectManager = new ObjectManager();
const scene         = new Scene();
const zone          = new Zone();

export default class SpawnManager {
    
    constructor() {
        
    }

    processSpawnTick(){ 

        if(Math.random() < 0.95){
            return;
        }

        if(scene.combatArea[0].isEnemy != true){
            this.spawnEnemy(0);
            return;
        }

        if(scene.combatArea[1].isEnemy != true){
            this.spawnEnemy(1);
            return;
        }

        if(scene.combatArea[2].isEnemy != true){
            this.spawnEnemy(2);
            return;
        }
    }

    spawnEnemy(combatArea){
        let mob = this.getNextMob();
        var enemy = new Enemy(mob);
        enemy.spawn(combatArea);
    }

    getNextMob(){
        return zone.mobs[0];
    }
}