import Scene           from '../environment/Scene';
import GraphicsManager from '../system/graphics/GraphicsManager';

const scene           = new Scene();

let instance = null;

export default class CombatGraphics {
    
    constructor() {

        if (!instance) {
            let actionIndicators = [];
            instance = this;
        }
          
        return instance;

    }


    showEnemyActionIndicators(actions, clearOthers, enemySlotId){

        if(clearOthers){
            actionIndicators[enemySlotId].forEach( (indicator) => {
                
            });
        }

        actions.forEach(action => {
            console.log("MUST DRAW Attack direction: "+action.directionCode+" in slot: "+enemySlotId);

        })
    }

    

}