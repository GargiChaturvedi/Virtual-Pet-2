class Food {
    constructor() {
        this.milkImage = loadImage("Images/Milk.png");
        this.foodStock = 0;
        this.lastFed = 0;
        this.feedPetButton;
        this.addFoodButton;
        this.name = "dog";
        this.nameInput = createInput("Write your dog's name here!");
        this.nameButton = createButton("Name dog");
        this.nameInput.position(0, 20);
        this.nameButton.position(0, 60);
    }

    getName() {
        var nameRef = database.ref('Name');
        nameRef.on("value", function(data) {
            this.name = data.val();
        });
    }

    updateName() {
        database.ref('/').update({
            Name: this.name
        });
    }

    getFoodStock() {
        var foodRef = database.ref('Food');
        foodRef.on("value", function(data) {
            this.foodStock = data.val();
        });
    }
         
    updateFoodStock() {
        database.ref('/').update({
            Food: this.foodStock
        });
        console.log("hello");
    }
    

    deductFood() {
        if(this.foodStock > 0) {
            this.foodStock--;
        }
        database.ref('/').update({
            Food: this.foodStock
            //FeedTime: hour()
        });
        dog.changeAnimation("happyDog", happyDog);
    }

    addFood() {
        console.log("Hi");
        this.foodStock++;
        database.ref('/').update({
            Food: this.foodStock
        });
        dog.changeAnimation("sadDog", sadDog);
    }

    display() {
        var x = 80, y = 100;
        console.log(this.foodStock);
        imageMode(CENTER);
        if(this.foodStock != 0) {
            image(this.milkImage, 720, 220, 70, 70);
        }
        if(this.foodStock != 0) {
            for(var i = 0; i < this.foodStock; i++) {
                if(i % 10 === 0) {
                    x = 80;
                    y += 50;
                }
                image(this.milkImage, x, y, 50, 50);
                x += 30;
            }
        }
        this.nameButton.mousePressed(() => {
            this.nameButton.hide();
            this.nameInput.hide();
            this.name = this.nameInput.value();
        });
    }

    button() {
        this.feedPetButton = createButton("Feed " + this.name);
        this.feedPetButton.position(350, 0);
        if(this.foodStock > 0) {
            this.feedPetButton.mousePressed(()=>{
                    this.deductFood();
                    /*
                    database.ref('/').update({
                        FeedTime: hour()
                    });
                    */
                }
            );
        }
        this.addFoodButton = createButton("Add Food for " + this.name);
        this.addFoodButton.position(500, 0);
        this.addFoodButton.mousePressed(()=>{foodObj.addFood();});
    }
}