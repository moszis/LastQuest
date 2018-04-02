import Scene           from '../environment/Scene';
import GraphicsManager from '../system/graphics/GraphicsManager';
import StageManager    from '../system/graphics/StageManager';


const scene           = new Scene();
const stageManager    = new StageManager();

if(!global.gameStore) global.gameStore = [];
if(!global.gameStore.targetIndicators) global.gameStore.targetIndicators = [];
if(!global.gameStore.actionIndicators) global.gameStore.actionIndicators = [];

export default class CombatGraphics {
    
    constructor() {
        throw new Error('Combat Graphics is a Singleton Utility Class; May not create new Instance');
    }


    static showEnemyActionIndicators(actions, clearOthers, enemySlotId){

        if(clearOthers && global.gameStore.actionIndicators[enemySlotId]){
            global.gameStore.actionIndicators[enemySlotId].forEach( (indicator) => {
                
            });
        }

        actions.forEach(action => {
            console.log("MUST DRAW Attack direction: "+action.directionCode+" in slot: "+enemySlotId);

        })
    }


    static showEnemyTargetedIndicator(enemySlotId, clearOthers){

       console.log("***ADDING TARGET INDICATOR to slotID: "+enemySlotId);

       let targetRect = GraphicsManager.createRectangle(scene.combatArea[enemySlotId].x, scene.combatArea[enemySlotId].y, scene.combatArea[enemySlotId].width, scene.combatArea[enemySlotId].height, "#FFF");
       stageManager.addChild(targetRect);

       global.gameStore.targetIndicators[enemySlotId] = targetRect;

    }
    

    static removeEnemyTargetedIndicator(enemySlotId){

        console.log("***REMOVING TARGET INDICATOR from slotID: "+enemySlotId);
        
        stageManager.removeChild(global.gameStore.targetIndicators[enemySlotId]);
     }

}