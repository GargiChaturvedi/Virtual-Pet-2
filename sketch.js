var dog,sadDog,happyDog;
var feedPetButton, addFoodButton, foodObj, database;
var fedTime, lastFed;

function preload(){
  sadDog=loadAnimation("Images/Dog.png");
  happyDog=loadAnimation("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database();
  
  foodObj = new Food();
  foodObj.getFoodStock();
  foodObj.getName();

  /*
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed = data.val();
  });
  */
  
  dog=createSprite(800,200,150,150);
  dog.addAnimation("sadDog", sadDog);
  dog.addAnimation("happyDog", happyDog);
  dog.scale=0.15;
}

function draw() {
  background(46,139,87);
  drawSprites();

  foodObj.updateFoodStock();
  foodObj.button();
  foodObj.display();
  foodObj.updateName();

  /*
  fill(255);
  textSize(15);
  if(lastFed>=12) {
    text("Last feed: " + lastFed-12 + " PM", 300, 0);
  } else if(lastFed === 0) {
    text("Last feed: 12 AM", 300, 0);
  } else {
    text("Last feed: " + lastFed + " AM", 300, 0);
  }
  */
}