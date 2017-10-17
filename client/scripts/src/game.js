import Enemy from './combat/enemy';
import Scene from './environment/scene'
//import AssetServices from './assets/testAssetServices';
import * as AssetServices from './assets/AssetServices';
//********test */
import omTest from './environment/objectManager';


//This should be passed on page request
var sceneInfo = {
    zoneCode : "testCombatArea",
    eventCode : "combat"
}

var scene;
var stage;
var context;
var queue;



var mouseXPosition;
var mouseYPosition;
var batImage;
var deathAnimation;
var spriteSheet;
var batDeathSpriteSheet;
var enemyXPos=100;
var enemyYPos=100;
var enemyXSpeed = 1.5;
var enemyYSpeed = 1.75;
var score = 0;
var scoreText;
var gameTimer;
var gameTime = 0;
var timerText;

var crossHair;
var enemy;

window.onload = function()
{
    scene = new Scene(sceneInfo);


    var canvas = document.getElementById('mainCanvas');
    context = canvas.getContext('2d');
    context.canvas.width  = scene.windowWidth;
    context.canvas.height = scene.windowHeight;

    stage = new createjs.Stage("mainCanvas");



    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on("complete", queueLoaded, this);
    createjs.Sound.alternateExtensions = ["ogg"];
    


    AssetServices.getAssetListByZone("arena")
    .then(data => {
        queue.loadManifest(data);
        queue.load();
    })


    gameTimer = setInterval(updateTime, 1000);

}



function queueLoaded(event)
{


    // Add background image
    var backgroundImage = new createjs.Bitmap(queue.getResult("backgroundImage"))
    stage.addChild(backgroundImage);
    

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

    // Play background sound
    createjs.Sound.play("background", {loop: -1});

    // Create bat spritesheet
    spriteSheet = new createjs.SpriteSheet({
        // x, y, width, height, imageIndex*, regX*, regY*
        "images": [queue.getResult('batSpritesheet')],
        "frames": {"width": 198, "height": 117},
        "animations": { "flap": [0,4] }
    });

    // Create bat death spritesheet
    batDeathSpriteSheet = new createjs.SpriteSheet({
    	"images": [queue.getResult('batDeath')],
    	"frames": {"width": 198, "height" : 148},
    	"animations": {"die": [0,7, false,1 ] }
    });

    createEnemies();

    // Add ticker
    createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.addEventListener('tick', tickEvent);

    // Set up events AFTER the game is loaded
    //window.onmousemove = handleMouseMove;
    window.onmousedown = handleMouseDown;


}

function createEnemy(){
  var enemy = new Enemy(sceneInfo);

}

function createEnemies()
{

	enemy = new createjs.Sprite(spriteSheet, "flap");
    enemy.regX = 99;
    enemy.regY = 58;
    enemy.x = scene.combatAreaCenter.centerX;
    enemy.y = scene.combatAreaCenter.centerY;
    enemy.gotoAndPlay("flap");
    enemy.addEventListener("click", handleClickEvent);
    stage.addChildAt(enemy,1);

    var enemy2 = new createjs.Sprite(spriteSheet, "flap");
    enemy2.regX = 99;
    enemy2.regY = 58;
    enemy2.x = scene.combatAreaLeft.centerX;
    enemy2.y = scene.combatAreaLeft.centerY;
    enemy2.gotoAndPlay("flap");
    enemy2.addEventListener("click", handleClickEvent);
    stage.addChildAt(enemy2, 2);

    var enemy3 = new createjs.Sprite(spriteSheet, "flap");
    enemy3.regX = 99;
    enemy3.regY = 58;
    enemy3.x = scene.combatAreaLeft.centerX;
    enemy3.y = scene.combatAreaLeft.centerY;
    enemy3.gotoAndPlay("flap");
    enemy3.addEventListener("click", handleClickEvent);
    stage.addChildAt(enemy3, 2);
    
}

function handleClickEvent(){}


function createEnemySprite(enemy){
	enemy = new createjs.Sprite(spriteSheet, "flap");
    enemy.regX = 99;
    enemy.regY = 58;
    enemy.x = scene.combatAreaCenter.centerX;
    enemy.y = scene.combatAreaCenter.centerY;
    enemy.gotoAndPlay("flap");
    enemy.addEventListener("click", handleClickEvent);
    stage.addChildAt(enemy,1);
}


function batDeath()
{
  deathAnimation = new createjs.Sprite(batDeathSpriteSheet, "die");
  deathAnimation.regX = 99;
  deathAnimation.regY = 58;
  deathAnimation.x = scene.combatAreaCenter.centerX;
  deathAnimation.y = scene.combatAreaCenter.centerY;
  deathAnimation.gotoAndPlay("die");
  stage.addChild(deathAnimation);
}

function tickEvent()
{


	enemy.x = enemyXPos;
	enemy.y = enemyYPos;
    

    drawSceneRectangles();
	
}


function handleMouseMove(event)
{
    crossHair.x = event.clientX-45;
    crossHair.y = event.clientY-45;
}


function handleMouseDown(event)
{
   
    //Display CrossHair
    crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    crossHair.x = event.clientX-45;
    crossHair.y = event.clientY-45;
    stage.addChild(crossHair);
    createjs.Tween.get(crossHair).to({alpha: 0},1000);
   
    //Play Gunshot sound
    createjs.Sound.play("shot");

    //Increase speed of enemy slightly
    enemyXSpeed *= 1.05;
    enemyYSpeed *= 1.06;

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
	    setTimeout(createEnemySprite, timeToCreate);

    } else
    {
    	//Miss
    	score -= 10;
    	scoreText.text = "1UP: " + score.toString();

    }
}

function updateTime()
{
	gameTime += 1;
	if(gameTime > 60)
	{
		//End Game and Clean up
		timerText.text = "GAME OVER";
		stage.removeChild(enemy);
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