const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);


function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
reverseStart();

// Function random for a aleatory number

function randomNum(min, max) {
  let range = max - min + 1

  return Math.floor(Math.random() * range) + min
}


/// Funcion Start() second game
async function reverseStart(){
  let life = 3;
  let compuNumber = randomNum(1,100);
  console.log(compuNumber);
  console.log("Let's play a game where  the (computer) make up a number and you (human)try to guess it.")
  let secretNumber = await ask("See if you can guess it in: " + life + " tries. \nWhat is your secret number?\nI won't peek, I promise...\n");
   
  while(life >0){
  
     if (secretNumber == compuNumber){
        console.log("Congratulations. You Win!");
        break;
     }
     if(secretNumber>compuNumber){
       console.log(" Sorry my number is lower");
       secretNumber = await ask("Please try again: ");
       
     }
     if(secretNumber<compuNumber){
      console.log(" Sorry my number is higter");
      secretNumber = await ask("Please try again: ");
      
     }// close if
     life--;
  }// close while
    if (life == 0){
      console.log("Sorry. You loose!!")
    }


  process.exit();
}

