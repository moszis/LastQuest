import Enemy  from './Enemy';
import Scene  from '../environment/Scene';
import Zone   from '../environment/Zone';
import EventManager from '../system/events/EventManager';

//const eventManager = new EventManager();

const scene = new Scene();
const zone  = new Zone();

export default class EnemyManager {
    
    constructor() {
        EventManager.subscribe('PLAYER_ABILITY_ACTIVATED', this.handleAttack.bind(this));
        EventManager.subscribe('COMBAT_SLOT_LEFT_CLICKED', this.handleTargetting.bind(this));
    }

    processTick(){ 
        this.processSpawnTick();
        this.processCombatTick();
    }

    
    handleAttack(abilityId){
        console.log("processing attack....");

        scene.combatArea.forEach((combatArea) => {
            if(combatArea.Enemy && combatArea.Enemy.isTargeted){
                combatArea.Enemy.impact({damageHealth: 20});
            }
        });
    }

    handleTargetting(slotId){
        if(scene.combatArea[slotId].Enemy && scene.combatArea[slotId].Enemy.health > 0 && !scene.combatArea[slotId].Enemy.isTargeted){
            scene.combatArea.forEach((combatArea) => {
                if(combatArea.Enemy){
                    if(combatArea.Enemy.combatArea === slotId){
                        combatArea.Enemy.target();
                    }else if(combatArea.Enemy.isTargeted){
                        combatArea.Enemy.unTarget();
                    }
                }
            })
        }    

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
              scene.combatArea[0].Enemy.act();
            }
        }

        if(scene.combatArea[1].isEnemy === true){
            if(Math.random() > 0.95){
                scene.combatArea[1].Enemy.act();
              }
        }

        if(scene.combatArea[2].isEnemy === true){
            if(Math.random() > 0.95){
                scene.combatArea[2].Enemy.act();
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