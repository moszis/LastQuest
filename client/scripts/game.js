import EnemyManager    from './combat/EnemyManager';
import StageManager    from './system/graphics/StageManager';
import EventManager    from './system/events/EventManager';

let stageManager = new StageManager();
let enemyManager = new EnemyManager();


//TEMPORARY ***********
let ticks = 0;

//THIS NEEDS TO GO TO GLOBAL PROPERTIES
const fps        = 5;
const canvasId   = "mainCanvas";
let windowHeight = window.innerHeight - window.innerHeight/20; 
let windowWidth  = window.innerWidth  - window.innerWidth/20;

//This should be defined on zone change request
const defaultZone = {
    zoneCode : "testCombatArea"
}
//***************/


window.onload = function()
{  

    stageManager.initNew(canvasId, windowWidth, windowHeight);

    createjs.Ticker.setFPS(fps);
    createjs.Ticker.addEventListener('tick', stageManager.stage);
    createjs.Ticker.addEventListener('tick', tickEvent);

    createjs.Sound.alternateExtensions = ["ogg"]; 

    EventManager.publish("ZONE_CHANGE", defaultZone);
}


function tickEvent(){

    /*
    let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gamepads) return;

  
    var gp = gamepads[0];
    //console.log(gamepads[0]);
    gamepads[0].buttons.forEach((button) => {
        //if(button.pressed) console.log(button);
    });
   
    gamepads[0].axes.forEach((axe) => {
        if(axe.pressed) console.log(axe);
    });
    
    */

    ticks+=1;
    if(ticks % fps == 0)
      console.log("game seconds: "+ticks/fps);

    enemyManager.processTick();
}

