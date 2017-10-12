/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__combat_enemy_js__ = __webpack_require__(1);


var windowHeight;
var windowWidth;
var combatAreaCenter = {};
var combatAreaLeft = {};
var combatAreaRight = {};

var combatAreaWidth;
var combatAreaHeight;

var stage;

var context;
var queue;
var mouseXPosition;
var mouseYPosition;
var batImage;
var deathAnimation;
var spriteSheet;
var batDeathSpriteSheet;
var enemyXPos = 100;
var enemyYPos = 100;
var enemyXSpeed = 1.5;
var enemyYSpeed = 1.75;
var score = 0;
var scoreText;
var gameTimer;
var gameTime = 0;
var timerText;

window.onload = function () {

    const sayMyName = () => {
        alert(`Hello!`);
    };

    sayMyName();

    class Greeter {
        constructor(message) {
            this.message = message;
        }

        greet() {
            alert(this.message);
        }
    };

    let greeter = new Greeter("Sergey");
    greeter.greet();

    let greeterMod = new __WEBPACK_IMPORTED_MODULE_0__combat_enemy_js__["a" /* default */]("Mod Ser");
    greeterMod.greet();

    setSceneCoordinates();

    var canvas = document.getElementById('mainCanvas');
    context = canvas.getContext('2d');
    context.canvas.width = windowWidth;
    context.canvas.height = windowHeight;

    stage = new createjs.Stage("mainCanvas");
    var consoleCanvas = new createjs.Stage("consoleCanvas");

    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on("complete", queueLoaded, this);
    createjs.Sound.alternateExtensions = ["ogg"];

    queue.loadManifest(getAssets());
    queue.load();

    gameTimer = setInterval(updateTime, 1000);
};

function setSceneCoordinates() {
    windowHeight = window.innerHeight - window.innerHeight / 20;
    windowWidth = window.innerWidth - window.innerWidth / 20;

    combatAreaWidth = windowWidth / 4;
    combatAreaHeight = combatAreaWidth;

    combatAreaCenter.centerX = windowWidth / 2;
    combatAreaCenter.centerY = windowHeight / 2;
    combatAreaCenter.width = combatAreaWidth;
    combatAreaCenter.height = combatAreaHeight;
    combatAreaCenter.x = combatAreaCenter.centerX - combatAreaCenter.width / 2;
    combatAreaCenter.y = combatAreaCenter.centerY - combatAreaCenter.height / 2;

    combatAreaLeft.centerX = windowWidth / 4;
    combatAreaLeft.centerY = windowHeight / 2;
    combatAreaLeft.width = combatAreaWidth;
    combatAreaLeft.height = combatAreaHeight;
    combatAreaLeft.x = combatAreaLeft.centerX - combatAreaLeft.width / 2;
    combatAreaLeft.y = combatAreaLeft.centerY - combatAreaLeft.height / 2;

    combatAreaRight.centerX = windowWidth - windowWidth / 4;
    combatAreaRight.centerY = windowHeight / 2;
    combatAreaRight.width = combatAreaWidth;
    combatAreaRight.height = combatAreaHeight;
    combatAreaRight.x = combatAreaRight.centerX - combatAreaRight.width / 2;
    combatAreaRight.y = combatAreaRight.centerY - combatAreaRight.height / 2;
}

function queueLoaded(event) {

    // Add background image
    var backgroundImage = new createjs.Bitmap(queue.getResult("backgroundImage"));
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
    createjs.Sound.play("background", { loop: -1 });

    // Create bat spritesheet
    spriteSheet = new createjs.SpriteSheet({
        // x, y, width, height, imageIndex*, regX*, regY*
        "images": [queue.getResult('batSpritesheet')],
        "frames": { "width": 198, "height": 117 },
        "animations": { "flap": [0, 4] }
    });

    // Create bat death spritesheet
    batDeathSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('batDeath')],
        "frames": { "width": 198, "height": 148 },
        "animations": { "die": [0, 7, false, 1] }
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

function createEnemies() {
    alert("here");
    var enemy = new createjs.Sprite(spriteSheet, "flap");
    enemy.regX = 99;
    enemy.regY = 58;
    enemy.x = combatAreaCenter.centerX;
    enemy.y = combatAreaCenter.centerY;
    enemy.gotoAndPlay("flap");
    enemy.addEventListener("click", handleClickEvent);
    stage.addChildAt(enemy, 1);

    var enemy2 = new createjs.Sprite(spriteSheet, "flap");
    enemy2.regX = 99;
    enemy2.regY = 58;
    enemy2.x = combatAreaLeft.centerX;
    enemy2.y = combatAreaLeft.centerY;
    enemy2.gotoAndPlay("flap");
    enemy2.addEventListener("click", handleClickEvent);
    stage.addChildAt(enemy2, 2);

    var enemy3 = new createjs.Sprite(spriteSheet, "flap");
    enemy3.regX = 99;
    enemy3.regY = 58;
    enemy3.x = combatAreaLeft.centerX;
    enemy3.y = combatAreaLeft.centerY;
    enemy3.gotoAndPlay("flap");
    enemy3.addEventListener("click", handleClickEvent);
    stage.addChildAt(enemy3, 2);
}

function handleClickEvent() {}

function selectEnemy(count) {
    alert("Selecting enemy # " + count);
}
function createEnemySprite(enemy) {
    var enemy3 = new createjs.Sprite(spriteSheet, "flap");
    enemy3.regX = 99;
    enemy3.regY = 58;
    enemy3.x = combatAreaLeft.centerX;
    enemy3.y = combatAreaLeft.centerY;
    enemy3.gotoAndPlay("flap");
    enemy3.addEventListener("click", handleClickEvent);
    stage.addChildAt(enemy3, 2);
}

function batDeath() {
    deathAnimation = new createjs.Sprite(batDeathSpriteSheet, "die");
    deathAnimation.regX = 99;
    deathAnimation.regY = 58;
    deathAnimation.x = combatAreaCenter.centerX;
    deathAnimation.y = combatAreaCenter.centerY;
    deathAnimation.gotoAndPlay("die");
    stage.addChild(deathAnimation);
}

function tickEvent() {

    /*
    animation.x = enemyXPos;
    animation.y = enemyYPos;
    */

    drawSceneRectangles();
}

function handleMouseMove(event) {
    crossHair.x = event.clientX - 45;
    crossHair.y = event.clientY - 45;
}

function handleMouseDown(event) {

    //Display CrossHair
    crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    crossHair.x = event.clientX - 45;
    crossHair.y = event.clientY - 45;
    stage.addChild(crossHair);
    createjs.Tween.get(crossHair).to({ alpha: 0 }, 1000);

    //Play Gunshot sound
    createjs.Sound.play("shot");

    //Increase speed of enemy slightly
    enemyXSpeed *= 1.05;
    enemyYSpeed *= 1.06;

    //Obtain Shot position
    var shotX = Math.round(event.clientX);
    var shotY = Math.round(event.clientY);
    var spriteX = Math.round(animation.x);
    var spriteY = Math.round(animation.y);

    // Compute the X and Y distance using absolte value
    var distX = Math.abs(shotX - spriteX);
    var distY = Math.abs(shotY - spriteY);

    // Anywhere in the body or head is a hit - but not the wings
    if (distX < 30 && distY < 59) {
        //Hit
        stage.removeChild(animation);
        batDeath();
        score += 100;
        scoreText.text = "1UP: " + score.toString();
        createjs.Sound.play("deathSound");

        //Make it harder next time
        enemyYSpeed *= 1.25;
        enemyXSpeed *= 1.3;

        //Create new enemy
        var timeToCreate = Math.floor(Math.random() * 3500 + 1);
        setTimeout(createEnemy, timeToCreate);
    } else {
        //Miss
        score -= 10;
        scoreText.text = "1UP: " + score.toString();
    }
}

function updateTime() {
    gameTime += 1;
    if (gameTime > 60) {
        //End Game and Clean up
        timerText.text = "GAME OVER";
        stage.removeChild(animation);
        stage.removeChild(crossHair);
        createjs.Sound.removeSound("background");
        var si = createjs.Sound.play("gameOverSound");
        clearInterval(gameTimer);
    } else {
        timerText.text = "Time: " + gameTime;
        createjs.Sound.play("tick");
    }
}

function getAssets() {
    return [{ id: 'backgroundImage', src: '/client/assets/blueBack.jpg' }, { id: 'crossHair', src: '/client/assets/crosshair.png' }, { id: 'shot', src: '/client/assets/shot.mp3' }, { id: 'background', src: '/client/assets/countryside.mp3' }, { id: 'gameOverSound', src: '/client/assets/gameOver.mp3' }, { id: 'tick', src: '/client/assets/tick.mp3' }, { id: 'deathSound', src: '/client/assets/die.mp3' }, { id: 'batSpritesheet', src: '/client/assets/batSpritesheet.png' }, { id: 'batDeath', src: '/client/assets/batDeath.png' }];
}

function drawSceneRectangles() {
    drawRectangle(combatAreaCenter);
    drawRectangle(combatAreaLeft);
    drawRectangle(combatAreaRight);

    var frame = {};
    frame.x = 0;
    frame.y = 0;
    frame.height = context.canvas.height;
    frame.width = context.canvas.width;
    drawRectangle(frame);
}

function drawRectangle(coordinates) {

    context.beginPath();
    context.lineWidth = "6";
    context.strokeStyle = "red";
    context.rect(coordinates.x, coordinates.y, coordinates.width, coordinates.height);
    context.stroke();
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GreeterModule {
  constructor(message) {
    this.message = message;
  }

  greet() {
    alert(this.message);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (GreeterModule);

/***/ })
/******/ ]);