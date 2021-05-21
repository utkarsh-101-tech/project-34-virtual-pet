//Create variables here
var dog, doggy, happyDog, database, foodS, foodStock;

function preload()
{
	//load images here
dog = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  
  doggy = createSprite(width/2,height/2+50,50,50);
  doggy.addImage(dog,doggy.x,doggy.y);
  doggy.scale= 0.25;

  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
background(rgb(46, 138, 87));
 
 if(keyWentDown(UP_ARROW) && foodS!==0){
   writeStock(foodS);
   doggy.addImage(happyDog);
 }

 if(keyWentDown("f")){
   if(foodS==0)
   foodS = 20;
 }
  drawSprites();

 textSize(25);
 fill("yellow");
 strokeWeight(10);
 text("Food Remaning : "+foodS,150,150);
 
 textSize(22);
 text("Press UP arrow key to feed Bruno",75,50);
 text("Press F to refill the food, if out of supplies",45,70);
 
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x>0){
database.ref('/').update({
  food:x-1
})
}}
