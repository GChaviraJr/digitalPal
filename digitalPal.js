const inquirer = require("inquirer")



function DigitalPal(hungry, sleepy, bored, age, health, isAlive) {
    this.hungry = false,
    this.sleepy = false,
    this.bored = true,
    this.age = 0,
    this.health = 100
    this.isAlive = true
    this.feed = function() {
        if (this.hungry) {
            console.log("Mom! Meatloaf!!!")
            this.hungry = false
            this.health += 5
            console.log("Current health is " + this.health)
        } else {
            console.log("No thanks! I'm full!")
            this.hungry = true
        }
    }
    this.sleep = function() {
        if (this.sleepy) {
            console.log("Zzzzzzzz")
            this.increaseAge()
            this.health += 10
            this.hungry = true
            console.log("Current health is " + this.health)
        } else {
            console.log("But I want millllk!!")
        }
    }
    this.play = function() {
        if (this.bored) {
            console.log("Yay! Let's Play!")
            this.bored = false
            this.hungry = true
            this.health -= 15
            console.log("Current health is " + this.health)
        } else {
            console.log("Not right now. LATER!")
        }
    }
    this.increaseAge = function() {
        this.age += 1
        console.log("Happy Birthday to MEEE!! I am " + this.age + " years old!")
        if (age === 85) {
            this.isAlive = false
        } else {
            this.isAlive = true
        }
    }
    this.isSick = function() {
        if (this.health > 70) {
            clearInterval()
        } else {
            console.log("I'm not feeling too well! I think I need a nap and some food")
            setInterval(function(){ 
                this.health -= 5; 
                console.log("Current health is " + this.health) 
            }, 3000);
        }
        if (this.health <= 0) {
            this.isAlive = false
            this.funeral()
        }
    }
    this.funeral = function() {
        if (this.isAlive) {

        } else {
            console.log("Your pet has died. You FAILED!")
            return
        }
        if (this.age > 100) {

        } else {
            console.log("Your pet has lived a long life. May it rest in peace!")
            return
        }
    }
} 

let dog = new DigitalPal()
dog.outside = false
dog.bark = function() {
    console.log("Woof! Woof!")
}
dog.goOutside = function() {
    if (this.outside === false) {
        console.log("Yay! I love the outdoors!")
        outside = true
        this.bored = false
        this.health -= 5
        console.log("Current health is " + this.health)
        dog.bark()
    } else {
        console.log("We're already outside though...")
    }
}
dog.goInside = function() {
    if (this.outside) {
        console.log("Do we have to? Fine...")
        outside = false
        this.hungry = true
        this.sleepy = true
    } else {
        console.log("I'm already inside!!")
    }
}


let cat = new DigitalPal()

   cat.houseCondition = 100

   cat.meow = function() {
    console.log("Meow! Meow!")
   }
   cat.destroyFurniture = function(){
    console.log("Current house condition: " + cat.houseCondition)
    this.houseCondition -= 10
    console.log("MUAHAHAHAHA! TAKE THAT FURNITURE")
    this.bored = false
    this.sleepy = true
    console.log("updated house condition:" + cat.houseCondition)
    if (cat.houseCondition === 0) {
        cat.buyNewFurniture()
    }
   }

   cat.buyNewFurniture = function() {
    cat.houseCondition += 50
    console.log("Are you sure about that?")
   }

   var animals = {
    cat: cat,
    dog: dog
}

function promptAction(animalPrompt) {
    var animal = animals[animalPrompt.creatureChosen]
    console.log(animal)
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: `What do you want your ${animalPrompt.creatureChosen} to do?`,
        choices: Object.keys(animal).filter(function(key) {
            return typeof animal[key] === 'function'
        })
        
    }]).then(function(actionPrompt) {
        animal[actionPrompt.action]()
        if (animal.isAlive === true) {
            promptAction(animalPrompt)
        } else {
            return
        }
    }) 
}


inquirer.prompt([
    {
      type: "list",
      name: "creatureChosen",
      message: "Choose your animal!" ,
      choices:  [ 
          "cat",
          "dog"
      ]
   }
]).then(promptAction)
