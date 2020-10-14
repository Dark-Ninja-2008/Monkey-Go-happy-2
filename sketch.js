var PLAY=1;
var END=0;
var gameState = PLAY;

var ground,invisibleGround

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup

var score
var gameOver, restart, gameOverImg, restartImg;
var jumpSound , checkPointSound, dieSound


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stopped = loadImage("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  
  gameOverImg= loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup(){
  createCanvas(400, 400);
  
  monkey = createSprite(50,390,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addImage("stopped", monkey_stopped)
  monkey.scale = 0.2;
  
  ground = createSprite(200,390,400,20);
  
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  gameOver = createSprite(200,100);
  gameOver.addImage("gameOverImage",gameOverImg);
  gameOver.scale = 0.5;
  
  restart = createSprite(200,140);
  restart.addImage("restartImage",restartImg);
  restart.scale = 0.5;
  
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false
  
  score = 0;
}

function draw() {
background("brown");
  
text("Score: "+ score, 300,50);
  
  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60);
    
    
    if (ground.x < 600){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& monkey.y >= 250) {
        monkey.velocityY = -12;
        jumpSound.play();
    }
    
    monkey.velocityY = monkey.velocityY + 0.5
    
    spawnObstacles();
    
    spawnBananas();
    
    
    
    if(obstaclesGroup.isTouching(monkey)){
        jumpSound.play();
        gameState = END;
        dieSound.play()
    }
    }
  
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    monkey.changeAnimation("stopped",monkey);
    
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0); 
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  monkey.collide(ground);
  
  drawSprites();
}

function reset(){
  gameState= PLAY
  monkey.changeAnimation("running", monkey_running);
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   
     var obstacle = createSprite(600,351,10,40);
     obstacle.velocityX = -(6 + score/100);
     var rand = Math.round(random(1,6));
     obstacle.addImage("obstacle",obstacleImage);        
     obstacle.scale = 0.2;
     obstacle.lifetime = 300;
     obstaclesGroup.add(obstacle);
   
 }
} 
  function spawnBananas(){
    if (frameCount % 60 === 0) {
      
    var bananas= createSprite(600,100,40,10);
    bananas.y = Math.round(random(50,100));
    bananas.addImage(bananaImage);
    bananas.scale = 0.1;
    bananas.velocityX = -3;
    bananas.lifetime = 600;
    bananas.depth = bananas.depth;
    bananas.depth = bananas.depth + 1;
    foodGroup.add(bananas);
      
  }
  }
  
