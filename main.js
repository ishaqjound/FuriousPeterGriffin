/**
 * Floppy
 */

/** 
 * Shim layer, polyfill, for requestAnimationFrame with setTimeout fallback.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */ 

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();



/**
 * Shim layer, polyfill, for cancelAnimationFrame with setTimeout fallback.
 */
window.cancelRequestAnimFrame = (function(){
  return  window.cancelRequestAnimationFrame || 
          window.webkitCancelRequestAnimationFrame || 
          window.mozCancelRequestAnimationFrame    || 
          window.oCancelRequestAnimationFrame      || 
          window.msCancelRequestAnimationFrame     || 
          window.clearTimeout;
})();



/**
 * Trace the keys pressed
 * http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
 */
window.Key = {
  pressed: {},

  LEFT:   37,
  UP:     38,
  RIGHT:  39,
  DOWN:   40,
  A:      65,
  S:      83,
  D:      68,
  w:      87,
  
  isDown: function(keyCode) {
    return this.pressed[keyCode];// || this.pressed[keyCode1];
  },
  
  onKeydown: function(event) {
    this.pressed[event.keyCode] = true;
    //console.log(event.keyCode);
  },
  
  onKeyup: function(event) {
    delete this.pressed[event.keyCode];
  }
};
window.addEventListener('keyup',   function(event) { Key.onKeyup(event); },   false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);



/**
 * All positions and forces 
 */
function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

// Sounds
//bg sound
var bgsnd = $('#bgmusic');

function playmusic()
{
	bgmusic.play();
}

function pausemusic()
{
	bgmusic.pause();
}
playmusic();
/**
 * chicken!
 *
 */
var chickenimg = new Image();
chickenimg.src = "img/chicken.gif";
function Chicken(width, height, position){
this.position = position || new Vector();
this.width = width       || 40;
this.height = height     || 40;
}
Chicken.prototype.draw = function(ct){
 
 ct.drawImage(chickenimg, this.position.x, this.position.y, 40,40);

 }

//this variable is true when the game starts, false from that point on 

/**
 * A Player as an object.
 */
  var playerPNG = new Image();
  playerPNG.src = "img/player.png";
  
function Player(width, height,x,y) {
  this.width = width;
  this.height = height;
  this.x = x || 100;
  this.y = y || 100;
}

Player.prototype.draw = function(ct) {
ct.drawImage(playerPNG, this.x, this.y,100,100);  
};

Player.prototype.moveLeft = function() {
  this.x -= 7;
  //console.log('moveLeft');
};

Player.prototype.moveRight = function() {
  this.x += 7;
  //console.log('moveRight');
};

Player.prototype.moveUp = function() {
  this.y -= 7;
  //console.log('moveUp');
};

Player.prototype.moveDown = function() {
  this.y += 7;
  //console.log('moveDown');
};
//doesn't work.

var chickens = 0;

Player.prototype.update = function() {
  if (Key.isDown(Key.UP, Key.W))     this.moveUp();
  if (Key.isDown(Key.LEFT, Key.A))   this.moveLeft();
  if (Key.isDown(Key.DOWN, Key.S))   this.moveDown();
  if (Key.isDown(Key.RIGHT, Key.D))  this.moveRight();
};

Player.prototype.stayInArea = function(width, height) {
  if(this.y < 00)  this.y = 00;
  if(this.x < 0)  this.x = 0;
  if(this.y > height - this.height)  this.y = height - this.height;
  if(this.x > width - this.width)  this.x = width - this.width;
};

Player.prototype.action = function(player, chicken, time){
 chicken.position.y +=1;
 var i;
 for (i = 0;  i < chickens; i++)
 {
   chicken.position.y +=0.3;
 }
if(player.x <= (chicken.position.x + 10)
  && chicken.position.x <= (player.x + 60)
  && player.y <= (chicken.position.y + 10)
  && chicken.position.y <= (player.y + 80)
  )


 {
  chicken.position.x = Math.random() * (width-chicken.width);
 	chicken.position.y= Math.random();
    chickens++;
 //peter griffin sound
 var snd = new Audio("audio/petergriffin.mp3");
  snd.play();
}

//To remove the chicken from screen when game is over
else if (time === 0)
{
  chicken.position.y += 1000;

}
    

};



/**
 * EatChicken, the Game
 */
window.Game = (function(){
  var canvas, ct, player;

  var init = function(canvas) {
    canvas = document.getElementById(canvas);
    ct = canvas.getContext('2d');
    width = 900,
    height = 500,
    player = new Player(100, 100,300,300);
    chickens=0;
    chicken = new Chicken(40, 40, new Vector(width/2, height/2));
    time = 30;
    timer = setInterval(function(){time--}, 1000);
    success = false;
    console.log('Init the game');

  };


  var update = function() {
    player.update();
    player.stayInArea(width, height);
    player.action(player, chicken, time);
    if(time == 0 || chicken.position.y > height){
     clearInterval(timer);
     ct.clearRect(chicken.position.x, chicken.position.y, chicken.width, chicken.height);
     success = true;
     }
  };

  var render = function() {
    ct.clearRect(0,0,width,height);
    player.draw(ct);
    chicken.draw(ct);
    ct.fillStyle = 'black';
    ct.font = '30px Arial';
    ct.fillText('Time left: ' + time, 10, 30);
    ct.fillText('Eaten Chickens: ' + chickens, 600, 30);
    ct.fillText('Target: 25', 320, 30);
    if(success && chickens >=25){
    ct.fillText('You WON!', 300, 200);
    ct.fillText(' You ate ' + chickens + ' Chickens!',200,260);
    }
    else if(success && chickens < 25) {
    	ct.fillText('You LOST!', 300, 200);
    	ct.fillText(' You ate ' + chickens + ' Chickens!',300,260);
    	
    }

  };

  var gameLoop = function() {
    lastGameTick = Date.now();
    requestAnimFrame(gameLoop);
    update();
    render();

  };

  return {
    'init': init,
    'gameLoop': gameLoop
  }
})();



// On ready
$(function(){
  'use strict';
  Game.init('mycanvas', 0);
  Game.gameLoop();
     
  $('#button').click(function(){Game.init('mycanvas',chickens)});
  console.log('Ready to play.');  
});
