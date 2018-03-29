import * as AssetServices from './assets/AssetServices';
import AssetLoader     from './assets/AssetLoader';
import Zone            from './environment/Zone';
import Scene           from './environment/Scene';
import ObjectManager   from './environment/ObjectManager';
import EnemyManager    from './combat/EnemyManager';
import StageManager    from './system/graphics/StageManager';
import SpriteManager   from './system/graphics/SpriteManager';
import GraphicsManager from './system/graphics/GraphicsManager';

var objectManager   = new ObjectManager();
var stageManager    = new StageManager();
var spriteManager   = new SpriteManager();
var graphicsManager = new GraphicsManager();

var scene         = new Scene();
var zone          = new Zone();

var assetLoader;
var enemyManager;


//TEMPORARY ***********
var context;
var crossHair;
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

    objectManager.setCreatejs(createjs);

    assetLoader = new AssetLoader(queueLoaded);

    scene.initNew(sceneInfo);
    zone.initNew(sceneInfo);
    
    stageManager.initNew("mainCanvas");
    graphicsManager.initNew();

    createjs.Sound.alternateExtensions = ["ogg"]; 

    //Using ES6 export module
    AssetServices.getAssetListByZone(sceneInfo.zoneCode)
    .then(data => {
        assetLoader.loadAssets(data);
    })

}



function queueLoaded(event){

    objectManager.setScene(scene);
    objectManager.setStage(stageManager.stage);
    objectManager.setQueue(assetLoader.getQueue());

    spriteManager.initNew();
    enemyManager = new EnemyManager();

    scene.setBackground();

    /****TODOOO */
    // Play background sound
    //createjs.Sound.play(zoneObject.zoneSoundName, {loop: -1});

    // Add ticker
    createjs.Ticker.setFPS(fps);
    createjs.Ticker.addEventListener('tick', stageManager.stage);
    createjs.Ticker.addEventListener('tick', tickEvent);


    window.onmousedown = handleMouseDown;


            /* TEMPORARY TO DRAW COMBAT STRUCTURE*************/
            var canvas = document.getElementById('mainCanvas');
            context = canvas.getContext('2d');
            context.canvas.width  = scene.windowWidth;
            context.canvas.height = scene.windowHeight;
            /*****************************************/
}



function tickEvent(){
    ticks+=1;
    if(ticks % fps == 0)
      console.log("game seconds: "+ticks/fps);

    enemyManager.processTick();

    
    //drawSceneRectangles();
}


function handleMouseDown(event){
   
    //Display CrossHair
    crossHair = new createjs.Bitmap(assetLoader.getAsset("crossHair"));
    crossHair.x = event.clientX-45;
    crossHair.y = event.clientY-45;
    stageManager.addChild(crossHair);
    createjs.Tween.get(crossHair).to({alpha: 0},1000);

    
    createjs.Sound.play("slash-sword-miss");

    setTimeout(()=> stageManager.removeChild(crossHair), 50);
}


//TEMPORARY TO SHOW STRUCTURE
function drawSceneRectangles(){
    drawRectangle(scene.combatAreaCenter);
    drawRectangle(scene.combatAreaLeft);
    drawRectangle(scene.combatAreaRight);

    var frame = {};
    frame.x = 0;
    frame.y = 0;
    frame.height = context.canvas.height;
    frame.width = context.canvas.width;
    drawRectangle(frame);
}

function drawRectangle(coordinates){

    context.beginPath();
    context.lineWidth="6";
    context.strokeStyle="red";
    context.rect(coordinates.x, coordinates.y, coordinates.width, coordinates.height); 
    context.stroke();

}