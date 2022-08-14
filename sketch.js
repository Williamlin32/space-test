//different screens;
const mainLobby = 0;
const nameLobby = 1;
const gameMain = 2;
const gameOverScreen = 3;
const scoreList = 4;
//current screen variable to change screens;
var currentScreen = 0;

//variables for preload
var playerImage, shieldImage, enemyImage1, enemyImage2, backgroundImage;
var introVideo, gameOverVideo;
var bulletImage1, enemyBulletImage1, enemyBulletImage2;
var instructionIcon, soundIcon;
var introSound, gameSound, soundWhenLose, coinSound;

//variables for player & enemies and shield
var player;
var shield;
var coin;
var wall1, wall2;

//variable for groups
var walls, bullets, enemies, enemyBullets;

//other stuffs
var hit = false;
var shieldDuration = 7;
var Timer1;

//GUI stuffs
var score = 0;
var numOfEnemies = 5;
var username;
var button;
var input1;
var volumeSlider;
var showSlider = false;
var showInstruction = false; 
var margin = 10; 
var temp = [];
var para = []; 

var imageInstruct1, imageInstruct2, imageInstruct3, imageInstruct4;

var leaderBoard; 

function preload() {
  introVideo = createVideo("Videos/Intro.mp4");
  gameOverVideo = createVideo("Videos/GameOver.mp4");
  playerImage = loadImage("images/Player.png");
  shieldImage = loadImage("images/yellowShield.png");
  enemyImage1 = loadImage("images/Enemy1.png");
  enemyImage2 = loadImage("images/Enemy2.png");
  
  backgroundImage = loadImage("images/Background.png");
  
  bulletImage1 = loadImage("images/Bullets/playerBullet1.png");
  enemyBulletImage1 = loadImage("images/Bullets/enemyBeam1.png");
  enemyBulletImage2 = loadImage("images/Bullets/enemyBeam2.png");
  
  imageInstruct1 = loadImage("InstructionStuffs/blueEnemy.png")
  imageInstruct2 = loadImage("InstructionStuffs/redEnemy.png")
  imageInstruct3 = loadImage("InstructionStuffs/coinnPICTURE.png")
  imageInstruct4 = loadImage("InstructionStuffs/playerAndShield.png")
  
  instructionIcon = loadImage("images/instruction.png");
  soundIcon = loadImage("images/soundIcon.png");
  
  introSound = loadSound("Sounds/mainMenuSong.mp3");
  gameSound = loadSound("Sounds/gameBackgroundSong.mp3");
  soundWhenLose = loadSound("Sounds/gameLostSound.mp3");
  coinSound = loadSound("Sounds/coinSound.wav")
  
  leaderBoard = loadJSON("JsonFiles/leaderBoard.json")
}

function setup() {
  createCanvas(1000, 1000);
  textFont('Georgia')
  hideVideos();
  designInputs();
  createPlayerAndShield();
  createWalls();
  enemies = new Group();
  bullets = new Group();
  enemyBullets = new Group();
  coin = createSprite(random(20, width - 20), random(100, 200));
  coin.remove();
  //Soundss
  volumeSlider = createSlider(0.0, 0.7, 0.3, 0.1);
  volumeSlider.position(770, 45);
  volumeSlider.hide();
  introSound.play();
  introSound.setVolume(volumeSlider.value());
  introSound.loop();
  makingVarsForPara();
  for (var i = 0; i < numOfEnemies; i++) {
    createEnemies();
  }
}
function makingVarsForPara(){
  para[0] = createP("Your goal is to get as many scores as you can in this game.")
    
    para[1] = createP("The blue enemies are one hit and you get 200 score points for each ship")
  
    para[2] = createP("The red enemies are three hit and you get 400 score points for each ship")
  
    para[3] = createP("There are also coins that give you 3000 score points "); 
  
  para[4] =  createP("The enemies and coins are randomly spawned and you loss a life when hit")
  
  para[5] = createP("You are given 3 lives and when you lose a life you get shield for 7 seconds") 
  
  para[6] = createP("Use right arrow and left arrow keys to move left and right")
  
  para[7] = createP("Click spacebar to shoot")
  
  para[8] = createP("Blue Enemy")
  para[8].position(130, 655);
  
  para[9] = createP("Red Enemy")
  para[9].position(370, 655);
  
  para[10] = createP("Coin")
  para[10].position(640, 655);
    
  para[11] = createP("Player and Shield")
  para[11].position(350, 925);
   
      var positionVar = 110; 
    
  for(var j = 0; j< para.length; j++){
      para[j].style('font-size', '25px')
  }
    for(var i = 0; i < 8; i++){ 
      para[i].position(110, positionVar);
      positionVar += 40; 
    }
  for(var k = 0; k < para.length; k++){
          para[k].hide();
  }
  
  
}
function createEnemies() {
  var enemyShip = createSprite(random(20, width - 20), random(100, 200));
  changingEnemies(enemyShip);
  enemies.add(enemyShip);
}

function changingEnemies(enemyShip) {
  var enemyType = round(random(1, 2));
  enemyShip.type = enemyType;

  if (enemyType == 1) {
    enemyShip.addImage(enemyImage1);
  }
  if (enemyType == 2) {
    enemyShip.addImage(enemyImage2);
    enemyShip.heart = 3;
  }
  enemyShip.scale = 0.5;
  enemyShip.setCollider("rectangle", 0, 0, 130, 50);
}

function createPlayerAndShield() {
  shield = createSprite(width / 2, height - 50, 3, 3);
  player = createSprite(width / 2, height - 50);
  shield.setCollider("circle", 0, 0, 225);
  player.setCollider("rectangle", 0, 0, 120, 50);
  shield.addImage(shieldImage);
  player.addImage(playerImage);
  shield.scale = 0.2;
  player.scale = 0.5;
  player.heart = 3;
  player.debug = true;
}
function showCoin() {
  coin = createSprite(random(20, width - 20), random(100, 200));
  coin.addAnimation(
    "flip",
    "images/Coin/Coin1.png",
    "images/Coin/Coin2.png",
    "images/Coin/Coin3.png",
    "images/Coin/Coin4.png",
    "images/Coin/Coin5.png",
    "images/Coin/Coin6.png"
  );
  coin.setVelocity(0, 3);
  coin.setCollider("rectangle", 0, 0, 30, 30);
  // coin.debug = true;
}

function createWalls() {
  walls = new Group();
  wall1 = createSprite(0, 2, width * 2, 2);
  wall2 = createSprite(0, height - 2, width * 2, 2);

  walls.add(wall1);
  walls.add(wall2);
}

function enemyShooting() {
  for (var i = 0; i < enemies.length; i++) {
    var enemyBullet = createSprite(
      enemies[i].position.x,
      enemies[i].position.y
    );
    enemyBullet.setCollider("rectangle", 0, 0, 25, 35);
    enemyBullet.setVelocity(0, round(random(3, 5)));
    if (enemies[i].type == 1) {
      enemyBullet.addImage(enemyBulletImage1);
    } else {
      enemyBullet.addImage(enemyBulletImage2);
    }
    enemyBullet.scale = 0.5;
    enemyBullets.add(enemyBullet);
  }
}

//////////////////////////////////////////////////////////////////////
//First screen players see
function mainLobbyScreen() {
  image(introVideo, 0, 0, width, height);
  styleForTexts();
  text("Click here to play", 400, 800);
  styleForTexts();
}

function draw() {
  if (currentScreen == mainLobby) {
    mainLobbyScreen();
    if (mouseX > 300 && mouseX < 750 && mouseY > 600 && mouseY < 950) {
      if (mouseIsPressed == true) {
        currentScreen = nameLobby;
      }
    }
  }
  //changing screens
  if (currentScreen == nameLobby) {
    nameScreen();
  }
  if (currentScreen == gameMain) {
    gameScreen();
  }
  if (currentScreen == gameOverScreen) {
    gameOver();
  }
  if (currentScreen == scoreList) {
    scorePage();
  }
  else {
    soundButtons();
  }

}
/////////////////////////////////////////////////////////////////////////////
//functions for buttons and input as well as sliders
function designInputs() {
  button = createButton("Enter");
  button.position(550, 400);
  button.size(150, 50);
  button.style("font-size", "30px");
  button.mousePressed(changeScreen);
  button.hide();

  input1 = createInput("", "text");
  input1.position(300, 400);
  input1.size(250, 45);
  input1.style("font-size", "30px");
  input1.hide();
}
function soundButtons() {
  if (showSlider == true) {
    volumeSlider.show();
    introSound.setVolume(volumeSlider.value());
  } else {
    volumeSlider.hide();
  }
  if (dist(mouseX, mouseY, 950, 50) < 25) {
    fill(100);
    if (mouseIsPressed == true) {
      if (showSlider == false) {
        showSlider = true;
        print(showSlider);
      }
      else {
        showSlider =  false;
      }
      mouseIsPressed = false;
    }
  } 
  else {
    fill(200);
  }
  circle(950, 50, 50);
  image(soundIcon, 935, 35, 32.5, 32.5);
}

function changeScreen() {
  button.hide();
  input1.hide();
  currentScreen = currentScreen + 1;
  leaderBoard[5].name = input1.value() + " (You)";
  if (input1.value() == "") {
    leaderBoard[5].name = "Unknown (You)";
  }
  introSound.stop();

  setTimeout(playGameMusic, 0)
  //calling CoINS to appear;
  setInterval(showCoin, random(10000, 20000));
  setTimeout(enemyShooting, random(1000, 5000));
  setTimeout(enemyShooting, random(10000, 30000));
  setInterval(enemyShooting, random(2500, 4000));
  setInterval(enemyShooting, random(4000, 6500));
}

/////////////////////////////////////////////////////////////////////////////
//Second Screen player see
function nameScreen() {
  background(0);
  styleForTexts();
  text("Username: ", 130, 440);
  instructionButtons();
  if (keyIsPressed == true) {
    if (keyCode == 13) {
      changeScreen();
    }
  }
}

function instructionButtons(){
  print(showInstruction)
  if(showInstruction == true){
    instructionPage();
     input1.hide();
  button.hide();
    for(var i = 0; i < para.length; i++){
      para[i].show();
    }
  }
  else { 
    for(var j = 0; j < para.length; j++){
      para[j].hide();
    }
   button.show();
    input1.show();
  }
  if (dist(mouseX, mouseY, 950, 110) < 25) {
    if(mouseIsPressed == true){
      if(showInstruction == false){
        showInstruction = true; 
      }
      else{
      
        showInstruction = false; 
      }
      mouseIsPressed = false;
    }
    fill(100);
  }
  else{
      
    fill(200);
  }
  
  circle(950, 110, 50);
  image(instructionIcon, 932.5, 95, 32.5, 32.5);
  styleForTexts();
  text("About Game: ", 740, 115)
  
}
function instructionPage(){ 
  fill(150);
  rect(100, 100, 800, 900, 20);
  textSize(25); 
  stroke(0)
  fill(0);
  image(imageInstruct1, 110, 475, 200, 200) 
  
  image(imageInstruct2, 340, 475, 200, 200)
  
  image(imageInstruct3, 570, 475, 200, 200);
  
  image(imageInstruct4, 340, 725, 200, 200); 
  

  
}

/////////////////////////////////////////////////////////////////////////////
//Game Screen where player shoots and play
function gameScreen() {
  background(backgroundImage);
  gameSound.setVolume(volumeSlider.value());
  styleForTexts();
  text("Your score: " + score, 0, 25);
  text("Your lives : " + player.heart, 0, 60);
  customKeyPressed();
  checkCollision();
  coin.display();
  player.display();
  

  if (hit == true) {
  shield.display();
    
    enemyBullets.overlap(shield, protectPlayer);
  }
  if (shieldDuration <= 1) {
    clearInterval(Timer1);
    hit = false;
    shieldDuration = 5;
  }
  drawSprites(bullets);
  drawSprites(walls);
  drawSprites(enemies);
  drawSprites(enemyBullets);
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].type == 1) {
      enemies[i].setVelocity(0, 0.35);
    } else {
      enemies[i].setVelocity(0, 0.15);
    }
  }
  if(player.position.x < -margin) {
    player.position.x = width + margin;
    shield.position.x = width + margin; 
    
  }
  if(player.position.x > width + margin){
    player.position.x = -margin;
    shield.position.x = -margin; 
    
  }
}

function customKeyPressed() {
  if (keyIsDown(RIGHT_ARROW)) {
    player.position.x += 7;
    if (player.overlap(wall2) == false) {
      shield.position.x += 7;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    player.position.x -= 7;
    if (player.overlap(wall1) == false) {
      shield.position.x -= 7;
    }
  }
}

function keyPressed() {
  if (keyCode == 32) {
      setTimeout(playerShooting, 0);
  }
}
function playerShooting(){
    var bullet = createSprite(player.position.x, player.position.y);
    bullet.setVelocity(0, -15);
    bullet.addImage("normal", bulletImage1);
    bullet.setCollider("rectangle", 0, 0, 15, 35);
    bullets.add(bullet);
}
function checkCollision() {
  if (coin.position.y >= 700) {
    coin.setVelocity(0, 0);
  }
  player.collide(walls);
  bullets.overlap(walls, removeBullets);
  coin.overlap(bullets, increaseScore);
  enemies.overlap(bullets, removeEnemies);
  enemyBullets.overlap(player, removeBadBullets);
}

///////////////////////////////////////////////////////////////////////////
function protectPlayer(enemyBullet, shield) {
  enemyBullet.remove();
}
function removeBadBullets(enemyBullet, player) {
  enemyBullet.remove();
  player.heart--;
  if(player.heart == 0){
    setTimeout(playGameLoseSound, 0);
    player.heart = 1; 
    currentScreen = gameOverScreen;
  }
  player.position.x = width / 2;
  shield.position.x = width / 2;
  hit = true;
  Timer1 = setInterval(startShieldTimer, 1000);
}
function startShieldTimer() {
  shieldDuration--;
  print(shieldDuration);
}
function removeBullets(bullet, walls) {
  bullet.remove();
}
function increaseScore(bullet, coin) {
  coin.remove();
  bullet.remove();
  score = score + 3000;
  setTimeout(coinDropSound, 0)
}
function removeEnemies(enemyShip, bullet) {
  bullet.remove();
  if (enemyShip.type == 2) {
    if (enemyShip.heart == 1) {
      score = score + 400;
      enemyShip.position.x = random(20, width - 20);
      enemyShip.position.y = random(100, 200);
      changingEnemies(enemyShip);
    }
    enemyShip.heart--;
  }
  if (enemyShip.type == 1) {
    enemyShip.position.x = random(20, width - 20);
    enemyShip.position.y = random(100, 200);
    changingEnemies(enemyShip);
    score = score + 200;
  }
}
/////////////////////////////////////////////////////////////////////////////
function gameOver() {
   clearInterval(Timer1);
  image(gameOverVideo, 0, 0, width, height);
  styleForTexts();
  text("Click here to continue", width / 2 - 150, 850);
  if (mouseX > 200 && mouseX < 800 && mouseY > 700 && mouseY < 1000)
    if (mouseIsPressed == true) {
      currentScreen = scoreList;
      leaderBoard[5].score = score;
      listRankings();
    }
}

function listRankings(){ 
  for(var i = 5; i > 1 ; i--){
    if(leaderBoard[5].score > leaderBoard[i].score){
      leaderBoard[5].ranking = leaderBoard[i].ranking; 
      leaderBoard[i].ranking += 1; 
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////
function scorePage() {
  background(0);
  textSize(45); 
   fill(200,200,0)
    stroke(255,255,0);
  text("LEADERBOARD", width/2 -150, 100);
    styleForTexts();
  for(var i = 1; i < 7; i++){
    for(var j = 0; j < 6; j++){
      if(leaderBoard[j].ranking == i){
        temp[i-1] = j;
      }
    }
  }
  for(var k = 0; k < temp.length; k++){
    push();
    fill(200,200,0)
    stroke(255,255,0);
    text("Score", 650, 200)
    text("Ranking" + "           " + "Username", 200, 200)
    pop();
    
    text("Top " + (k+1) + "                 " + leaderBoard[temp[k]].name, 200, 250 + (100*k)); 
    text(leaderBoard[temp[k]].score, 650, 250 + (100*k));
  }
}

///////////////////////////////////////////////////////////////////////////////////
function styleForTexts() {
  fill(200);
  stroke(200);
  textSize(30);
}
function hideVideos() {
  introVideo.hide();
  introVideo.loop();
  gameOverVideo.hide();
  gameOverVideo.loop();
}
function playGameLoseSound(){
    gameSound.stop();
    soundWhenLose.setVolume(volumeSlider.value());
    soundWhenLose.play();
}
function playGameMusic(){
    gameSound.setVolume(volumeSlider.value());
    gameSound.play();
    gameSound.loop();
}
function coinDropSound(){
  coinSound.setVolume(volumeSlider.value());
  coinSound.play();
}