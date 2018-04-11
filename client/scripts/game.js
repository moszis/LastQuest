import StageManager from './system/graphics/StageManager';
import EventManager from './system/events/EventManager';
import GameLoop     from './system/events/GameLoop';

//THIS NEEDS TO GO TO GLOBAL PROPERTIES
const fps        = 5;
const canvasId   = "mainCanvas";
let windowHeight = window.innerHeight - window.innerHeight/20; 
let windowWidth  = window.innerWidth  - window.innerWidth/20;
if(!global.gameStore) global.gameStore = [];

const defaultZone = {
    zoneCode : "testCombatArea"
}

window.onload = function()
{  

    new StageManager().init(canvasId, windowWidth, windowHeight);
    new GameLoop(fps);

    createjs.Sound.alternateExtensions = ["ogg"]; 

    EventManager.publish("ZONE_CHANGE", defaultZone);
}

