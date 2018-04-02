import Enemy  from './Enemy';
import Scene  from '../environment/Scene';
import ZoneManager   from '../environment/ZoneManager';
import EventManager from '../system/events/EventManager';

const scene = new Scene();
const zoneManager = new ZoneManager();

export default class EnemyManager {
    
    constructor() {
        EventManager.subscribe('PLAYER_ABILITY_ACTIVATED', this.handleAttack.bind(this));
        EventManager.subscribe('COMBAT_SLOT_LEFT_CLICKED', this.handleTargetting.bind(this));
        EventManager.subscribe('SWITCH_TO_NEXT_TARGET',    this.targetNextEnemy.bind(this));
        EventManager.subscribe('ENEMY_DYING',              this.targetNextEnemy.bind(this));
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

    targetNextEnemy(){
        let currentTargetArea = this.getCurrentTargetArea();

        if(currentTargetArea == null){
            for(let x = 0; x < scene.combatArea.length; x++){
                if(scene.combatArea[x].Enemy && !scene.combatArea[x].Enemy.isDying()){
                    this.handleTargetting(scene.combatArea[x].id);
                    return;
                }
            }
            return;
        }

        for(let x = currentTargetArea + 1; x < scene.combatArea.length; x++){
            if(scene.combatArea[x].Enemy && !scene.combatArea[x].Enemy.isDying()){
                this.handleTargetting(scene.combatArea[x].id);
                return;
            }
        }

        for(let x = 0; x < currentTargetArea; x++){
            if(scene.combatArea[x].Enemy && !scene.combatArea[x].Enemy.isDying()){
                this.handleTargetting(scene.combatArea[x].id);
                return;
            }
        }
    }

    //returns current targeted combatArea
    getCurrentTargetArea(){

        for(let x = 0; x < scene.combatArea.length; x++){
            if(scene.combatArea[x].Enemy && scene.combatArea[x].Enemy.isTargeted){
                return scene.combatArea[x].id;
            }

        }
        return null;
    }

    //Returns Enemy Object
    getCurrentTarget(){
        scene.combatArea.forEach((combatArea) => {
            if(combatArea.Enemy && combatArea.Enemy.isTargeted){
                return combatArea.Enemy;
            }
        });
    }


  
    processSpawnTick(){
        if(Math.random() < 0.95){
            return;
        }

        let currentTargetArea = this.getCurrentTargetArea();

        if(scene.combatArea[0].isEnemy != true){
            this.spawnEnemy(0);
            if(currentTargetArea == null){
                this.targetNextEnemy();
            }
            return;
        }

        if(scene.combatArea[1].isEnemy != true){
            this.spawnEnemy(1);
            if(currentTargetArea == null){
                this.targetNextEnemy();
            }
            return;
        }

        if(scene.combatArea[2].isEnemy != true){
            this.spawnEnemy(2);
            if(currentTargetArea == null){
                this.targetNextEnemy();
            }
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
        let ranNum =  Math.floor(Math.random()*zoneManager.mobs.length);
        return zoneManager.mobs[2];
    }
}