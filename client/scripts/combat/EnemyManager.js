import Enemy  from './Enemy';
import Scene  from '../environment/Scene';
import Zone   from '../environment/Zone';

const scene = new Scene();
const zone  = new Zone();

export default class EnemyManager {
    
    constructor() {
        
    }

    processTick(){ 

        this.processSpawnTick();
        this.processCombatTick();

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

    processCombatTick(){

        if(scene.combatArea[0].isEnemy === true){
            if(Math.random() > 0.95){
              scene.combatArea[0].Enemy.attack();
            }
        }

        if(scene.combatArea[1].isEnemy === true){
            if(Math.random() > 0.95){
                scene.combatArea[1].Enemy.attack();
              }
        }

        if(scene.combatArea[2].isEnemy === true){
            if(Math.random() > 0.95){
                scene.combatArea[2].Enemy.attack();
              }
        }
    }



    spawnEnemy(combatArea){
        let mob = this.getNextMob();
        var enemy = new Enemy(mob);
        enemy.spawn(combatArea);
    }

    getNextMob(){
        let ranNum =  Math.floor(Math.random()*zone.mobs.length);
        return zone.mobs[2];
    }
}