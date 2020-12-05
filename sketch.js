var towerImg,tower;
var ghost,ghostImg;
var climberImg,climber,climberGroup;
var door, doorImg,doorGroup;
var invClimber,invClimberGroup;
var score=0;
var gamestate="play";

function preload()
{
  towerImg=loadImage("tower.png");
  ghostImg=loadImage("ghost-standing.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  doorGroup= new Group();
  climberGroup = new Group();
  invClimberGroup = new Group();
}
function setup()
{
createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.5;
  
  
}
function draw(){
  background("white");
  if(gamestate==="play"){
  score=score+Math.round(getFrameRate()/60)
tower.velocityY=3;
 if(keyDown("space")){
    ghost.velocityY=-5;
    }
 ghost.VelocityY+=0.3;
 if(tower.y>600){
   tower.y=300;
 }
 if(keyDown("left")){
    ghost.x-=3;
    }
  if(keyDown("right")){
     ghost.x+=3;
     }
  spawnObstacles();
  if(climberGroup.isTouching(ghost)){
     ghost.velocityY=0;
     }

  if(invClimberGroup.isTouching(ghost)||ghost.y>600){
     ghost.destroy();
    gamestate="end";
     }
    fill("yellow");
    textSize(40);
  text("score:"+score,290,60);
  console.log(score)
  drawSprites();}
  if(gamestate==="end"){
     background("black");
    stroke("yellow")
    textSize(40);
    text("game over",150,200);}
}
function spawnObstacles(){
 if(frameCount%200===0){
   door = createSprite(300,10,10,40);
   door.addImage(doorImg);
   door.velocityY=2;
   door.x=Math.round(random(130,240));
   door.lifetime=150;
   doorGroup.add(door);

   climber = createSprite(300,60,30,40);
   climber.addImage(climberImg);
   climber.velocityY=2;
   climber.x=door.x;
   climber.lifetime=150;
   climberGroup.add(climber);
 
   invClimber = createSprite(300,80);
   invClimber.width=climber.width;
   invClimber.height=2;
   invClimber.velocityY=2;
   invClimber.x=door.x;
   invClimberGroup.add(invClimber);
   
   ghost.depth=door.depth
   ghost.depth+=1;
 
 }
}
