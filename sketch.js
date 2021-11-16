var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var fedTime, lastFed;
var feed;
//crea aquí las variables feed y lastFed 

function preload(){
sadDog=loadImage("oyo.png");
happyDog=loadImage("jnj.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //crea aquí el boton Alimentar al perro

  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
 textSize(15);
 if(lastFed>=12){
   text("ultima hora que se caguameo :"+ lastFed%12 + "PM", 350,30);
 }else if(lastFed==0){
   text("ultima hora que se caguameo : 12 AM",350,30);
 }else{
   text("ultima hora que se caguameo : "+ lastFed + "AM", 350,30); 
 }
  //escribe el código para mostrar el texto lastFed time aquí

 
  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro
  if(foodObj.getFoodstock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodstock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodstock()-1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodstock(),
    FeedTime:hour()
  })
}

//funcón para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
