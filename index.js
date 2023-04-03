const { exit } = require('process');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Function random for a aleatory number
function randomNum(min, max) {
  let range = max - min + 1

  return Math.floor(Math.random() * range) + min
}


guessChoose(); // call the function guessChoose

// menu for choose with game to play!!!
async function guessChoose(){

  let ans= await ask("This is a game for guess a number between 1 to 100. But can you choose into 2 ways. (1) The computer guess your number and (2) the user guess the number. \n Please choose answer: ");

  if(ans == 1){

    start(); 
  }else{
    //const reverseStart = require("./reverse_game.js"); // import the reverseStar function from reverse_game
    reverseStart();
  }

}
/// Funcion Start() first game
async function start() {
  let min = 1;
  let max = 100;
  let counter = 0;
  //let life = 3;
  let guess = Math.floor((max + min) / 2); //Binary search algorithm
  console.log(guess);
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it. \n Think of a number between 1 and 100.") 
  //let secretNumber = await ask("You have: " + life + " Life. Think of a number between 1 and 100\nWhat is your secret number?\nI won't peek, I promise...\n");
  //console.log('you entered: ' + secretNumber);
  let answer = await ask('Is it your number? ' + guess  + 'Put your answer (Y)es, (H)igher, (L)ower');


  while(answer.toUpperCase() != 'Y'){ //If your number is different - devuelve el      valor convertido en Mayuscula que realiza la llamada
    if(answer.toUpperCase()=== 'H'){  //the number is highter
      min = guess;
      console.log(min + " is your number lower."); // Print the new number low
      guess = Math.floor((max + min) / 2);
      console.log("so, the guess number is higher")
      answer = await ask("Is this your number? " + guess + " Put your answer (Y)es, (H)igher, (L)ower")
    } else if (answer.toUpperCase() === 'L') {
      max = guess;
      console.log(max + ' is your number higher.') //Print the new number higher
      guess = Math.floor((max + min) / 2);
      console.log("so, the guess number is lower...")
      answer = await ask("Is this your number? " + guess + " Put your answer (Y)es, (H)igher, (L)ower")
      } else {
        console.log("Please try again.")
        answer = await ask("Is this your number? " + guess + " Please answer (Y)es, (H)igher, (L)ower")

      }// End else
      counter = counter + 1;
  }// End While 

  // Ask if the guess player want to play again!
    if((answer.toUpperCase() === 'Y')){
      console.log("Your number was: " + guess + "And take: " + counter + "try. \n Would you like to play again?. \n (Y)es or (N)o " );
      let ans = (await ask("Please put your answer:"));
      if((ans.toUpperCase() === "Y" )){
        return start();
      }else {
        exit();
      }
      
    }
   
  // Now try and complete the program.
  process.exit();
} //End start

/// Funcion Start() second game
async function reverseStart(){
  let life = 4;
  let compuNumber = randomNum(1,100);
  console.log(compuNumber);
  console.log("Let's play a game where  the (computer) make up a number and you (human)try to guess it.")
  let secretNumber = await ask("See if you can guess it in: " + life + " tries. \nWhat is your secret number?\nI won't peek, I promise...\n");
   
  while(life >0){
  
     if (secretNumber == compuNumber){
        console.log("Congratulations. You Win!");
        console.log("Your number was: " + secretNumber + "And take: " + life + "try. \n Would you like to play again?. \n (Y)es or (N)o " );
      let ans = (await ask("Please put your answer:"));  // Ask if the guess player want to play again!
      if((ans.toUpperCase() === "Y" )){
        return reverseStart();
      }else {
        exit();
      }
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
      console.log("Sorry. You loose!!");
      console.log("Would you like to play again?. \n (Y)es or (N)o " );
      let ans = (await ask("Please put your answer:"));  // Ask if the guess player want to play again!
      if((ans.toUpperCase() === "Y" )){
        return reverseStart();
      }else {
        exit();
      }
    }

  process.exit();
}



