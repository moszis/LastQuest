import * as AssetServices from './assets/AssetServices';
import Zone          from './environment/Zone';
import Scene         from './environment/Scene';
import ObjectManager from './environment/ObjectManager';
import SpawnManager  from './combat/SpawnManager';

var objectManager = new ObjectManager();
var scene         = new Scene();
var zone          = new Zone();

var stage;
var queue;

var spawnManager;


//TEMPORARY ***********
var context;
var score = 0;
var scoreText;
var gameTimer;
var gameTime = 0;
var timerText;
var crossHair;


//This should be defined on zone change request
var sceneInfo = {
    zoneCode : "testCombatArea",
    eventCode : "combat"
}
//***************/

var zoneObject = {
    zoneId : 1,
    zoneCode : "testCombatArea",
    zoneBackgroundName : "backgroundImage",
    zoneBackgroundImg  : "blueBack.jpg",
    zoneSoundName      : "countryside",
    mobs : [
        {
            mobId : 1,
            mobName : "bat",
            mobSpriteSheet : {
                ssName : "batSS",
                ssFile : "batSS.png",
                frameWidth : 198,
                frameHeight : 120, 
                animations: {
                    idle  : {
                        frames: [0,1,2,3,4],
                        next: true,
                        speed: 1
                    },
                    death : {
                        frames: [5,6,7,8,9],
                        next: false,
                        speed: 0.3
                    }
                }
            },
            mobDeathSound : "batDeathSound"
        }
    ]

}

window.onload = function()
{

    scene.setNew(sceneInfo);
    zone.setNew(zoneObject);

    stage = new createjs.Stage("mainCanvas");

    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on("progress", queueProgress, this);
    queue.on("error", queueError, this);
    queue.on("complete", queueLoaded, this);


    createjs.Sound.alternateExtensions = ["ogg"];
    

    //Using ES6 export module
    AssetServices.getAssetListByZone(zoneObject.zoneCode)
    .then(data => {
        queue.loadManifest(data);
        queue.load();
    })

    //stage.update();

    gameTimer = setInterval(updateTime, 1000);

}


function queueProgress(event){}

function queueError(event){
    console.log("QUEUE ERROR!!");
}


function queueLoaded(event){

    objectManager.setScene(scene);
    objectManager.setStage(stage);
    objectManager.setQueue(queue);
    objectManager.setCreatejs(createjs);

    spawnManager = new SpawnManager();

    // Add background image
    var backgroundImage = new createjs.Bitmap(queue.getResult(zoneObject.zoneBackgroundName))
    stage.addChild(backgroundImage);
    

    // Play background sound
    createjs.Sound.play(zoneObject.zoneSoundName, {loop: -1});

    // Add ticker
    createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.addEventListener('tick', tickEvent);

    // Set up events AFTER the game is loaded
    //window.onmousemove = handleMouseMove;
    window.onmousedown = handleMouseDown;


    
            /* TEMPORARY UNTIL USELESS*************/
            //Add Score
            scoreText = new createjs.Text("1UP: " + score.toString(), "36px Arial", "#FFF");
            scoreText.x = 10;
            scoreText.y = 10;
            stage.addChild(scoreText);
            //Ad Timer
            timerText = new createjs.Text("Time: " + gameTime.toString(), "36px Arial", "#FFF");
            timerText.x = 800;
            timerText.y = 10;
            stage.addChild(timerText);
            /* TEMPORARY TO DRAW COMBAT STRUCTURE*************/
            var canvas = document.getElementById('mainCanvas');
            context = canvas.getContext('2d');
            context.canvas.width  = scene.windowWidth;
            context.canvas.height = scene.windowHeight;
            /*****************************************/
}




function tickEvent(){

    spawnManager.processSpawnTick();

    
    drawSceneRectangles();
}


function handleMouseMove(event){
    crossHair.x = event.clientX-45;
    crossHair.y = event.clientY-45;
}


function handleMouseDown(event){
   
    

    //Display CrossHair
    crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    crossHair.x = event.clientX-45;
    crossHair.y = event.clientY-45;
    stage.addChild(crossHair);
    createjs.Tween.get(crossHair).to({alpha: 0},1000);

    //Play Gunshot sound
    createjs.Sound.play("shot");

    setTimeout(()=> stage.removeChild(crossHair), 50);
    /*

    //Obtain Shot position
    var shotX = Math.round(event.clientX);
    var shotY = Math.round(event.clientY);

    var spriteX = Math.round(enemy.x);
    var spriteY = Math.round(enemy.y);

    // Compute the X and Y distance using absolte value
    var distX = Math.abs(shotX - spriteX);
    var distY = Math.abs(shotY - spriteY);

    // Anywhere in the body or head is a hit - but not the wings
    if(distX < 30 && distY < 59 )
    {
    	//Hit
    	stage.removeChild(enemy);
    	batDeath();
    	score += 100;
    	scoreText.text = "1UP: " + score.toString();
    	createjs.Sound.play("deathSound");
    	
        //Make it harder next time
    	enemyYSpeed *= 1.25;
    	enemyXSpeed *= 1.3;

    	//Create new enemy
    	var timeToCreate = Math.floor((Math.random()*3500)+1);
	    //setTimeout(createEnemySprite, timeToCreate);

    } else
    {
    	//Miss
    	score -= 10;
    	scoreText.text = "1UP: " + score.toString();

    }

    */
}

function updateTime(){
	gameTime += 1;
	if(gameTime > 60)
	{
		//End Game and Clean up
		timerText.text = "GAME OVER";
		stage.removeChild(crossHair);
        createjs.Sound.removeSound("background");
        var si =createjs.Sound.play("gameOverSound");
		clearInterval(gameTimer);
	}
	else
	{
		timerText.text = "Time: " + gameTime
        createjs.Sound.play("tick");
	}
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