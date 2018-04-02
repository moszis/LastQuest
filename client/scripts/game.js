import * as AssetServices from './assets/AssetServices';
import AssetLoader     from './assets/AssetLoader';
import ZoneManager     from './environment/ZoneManager';
import Scene           from './environment/Scene';
import ObjectManager   from './environment/ObjectManager';
import EnemyManager    from './combat/EnemyManager';
import StageManager    from './system/graphics/StageManager';
import SpriteManager   from './system/graphics/SpriteManager';
import GraphicsManager from './system/graphics/GraphicsManager';

var objectManager   = new ObjectManager();
var stageManager    = new StageManager();
var spriteManager   = new SpriteManager();
//var graphicsManager = new GraphicsManager();


var scene         = new Scene();
var zoneManager   = new ZoneManager();

var assetLoader;
var enemyManager;


//TEMPORARY ***********
//var context;
var ticks = 0;

//THIS NEEDS TO GO TO GLOBAL PROPERTIES
var fps = 5;

//This should be defined on zone change request
var sceneInfo = {
    zoneCode : "testCombatArea",
    eventCode : "combat"
}
//***************/


window.onload = function()
{  
    //objectManager.setCreatejs(createjs);

    assetLoader = new AssetLoader(queueLoaded);

    scene.initNew(sceneInfo);
    zoneManager.initNew(sceneInfo);
    
    stageManager.initNew("mainCanvas", scene);
    //graphicsManager.initNew();

    createjs.Sound.alternateExtensions = ["ogg"]; 


    AssetServices.getAssetListByZone(sceneInfo.zoneCode).then(data => {
        assetLoader.loadAssets(data);
    })

}



function queueLoaded(event){

    objectManager.setScene(scene);
    objectManager.setStage(stageManager.stage);
    objectManager.setQueue(assetLoader.getQueue());

    spriteManager.initNew();
    enemyManager = new EnemyManager();

    scene.setAssets();

    /****TODOOO */
    // Play background sound
    //createjs.Sound.play(zoneObject.zoneSoundName, {loop: -1});

    // Add ticker
    createjs.Ticker.setFPS(fps);
    createjs.Ticker.addEventListener('tick', stageManager.stage);
    createjs.Ticker.addEventListener('tick', tickEvent);

}



function tickEvent(){

    /*
    let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gamepads) {
      return;
    }
  
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

