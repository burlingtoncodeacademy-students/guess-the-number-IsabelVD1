
/************************************************************************************************
 * PROJECT: GUESS THE NUMBER - ISABELVD1                                                        *
 ************************************************************************************************/


const { exit } = require('process');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// Function ask for a question
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


guessChoose(); // Call the function guessChoose

// Menu for choose with game to play!!!
async function guessChoose(){

  let ans= await ask("\n This is a game for guess a number between 1 to 100. But can you choose into 2 ways. (1) The computer guessing your number and (2) the user guessing the number.\nPlease choose answer enter 1 or 2: ");
 // Choose the correct game to play acording to the answer
  if(ans == 1){
    start(); 
  }else if (ans == 2){
    
    reverseStart();
  }else if (ans == "n"){
    console.log("Thanks for playing!");
    process.exit();

}
}

/// Funcion Start() First game, where the computer guess the number
async function start() {
  let name = await ask("What is your name?\n ");
  console.log("\nHello " + name + ". Let's play a game where you (human) make up a number and I (computer) try to guess it. \n Think of a number between 1 and 100.");
  // 
  let min = 1;
  let rangeMax = await ask("\nWhat would you like the high range to be? "); // Extending the guessing range
  let max = parseInt(rangeMax); //making the entered max an integer
  let counter = 1; // counter for the number of tries

   // The player enters their number
  let playerNumber = await ask( "\nThink of a number. What would you like your number to be?\nI won't peek, I promise...\n");
  playerNumber = parseInt(playerNumber); //making the players number an integer

  let guess = Math.floor((max + min) / 2); //Binary search algorithm
 
  let answer = await ask('Is it your number? ' + guess + ' ' + '\nPut your answer (Y)es, (N)o. ');
  let ans; 

  while(answer.toUpperCase() === 'N' && playerNumber != guess){ //If your number is different 

     ans = await ask('Is your number (H)igher or (L)ower than ' + guess + ' ?'+ ' ');

    if(ans.toUpperCase()==='L' && guess <= max && guess > playerNumber){  //the number is highter
      max = guess - 1;
      guess = Math.floor((max + min) / 2);
      answer = await ask("Is this your number? " + guess + "?" + " ");
    } else if (ans.toUpperCase() === 'L' &&  guess < playerNumber) {
      console.log("You are a cheater!!! I don't want to play anymore!!!");
      process.exit();

    } else if (ans.toUpperCase() === 'H' && guess >= min && guess < playerNumber) {
      min = guess;
      guess = Math.floor((max + min) / 2);
      answer = await ask("Is this your number? " + guess + "?" + ' ');
      } else if (ans.toUpperCase() === 'H' && guess > playerNumber) {
        console.log("You are a cheater!!! I don't want to play anymore!!!");
        process.exit();
      }
      counter= counter+1; // counter for the number of tries
}
    
  // Ask if the guess player want to play again!
    if((answer.toUpperCase() === 'Y' && playerNumber === guess)){
      console.log("Your number was: " + guess+' '+ "And take: " + counter +' '+"tries. \n Would you like to play again?. \n (Y)es or (N)o " );
      ans = (await ask("Please put your answer:"));
      if((ans.toUpperCase() === "Y" )){
        return guessChoose();
      }else {
        console.log("Thanks for playing!");
        process.exit();
      }
      // if the player says the computer guessed correctly when it actually didn't it graciously accepts the win 
      // Check if the player is a cheater
    } else if (answer.toUpperCase() === 'Y' && playerNumber != guess){
      console.log("Why you are a cheater!!! :( . \n Would you like to play again?. \n (Y)es or (N)o " );
      ans = (await ask("Please put your answer:"));
      if((ans.toUpperCase() === "Y" )){
        return guessChoose();
      }else {
        console.log("Thanks for playing!");
        process.exit();
      }
    }else if (answer.toUpperCase() === 'N' && playerNumber === guess){
      console.log("You are a cheater!!! I don't want to play anymore!!!");
    }
    process.exit();
} 

/// Funcion reverseStart() second game
async function reverseStart(){
  
 // Variables for the game
  let tryMax = 4; // Number of tries
  let tries = 1; // counter for the number of tries
  let compuNumber = randomNum(1,100);
  console.log(compuNumber); /// RECUERDA ELIMINAR ESTE
  let name = await ask("What is your name?\n ");
  console.log("Hello "+name+". "+"Let's play a game where  I (computer) make up a number and you (human)try to guess it. \n Think of a number between 1 and 20.")
  let playerNumber = await ask("See if you can guess in: " + tryMax+ " "+ "tries. Please put your number: \n");

  while(tryMax > 0){
     
  
     if (playerNumber == compuNumber){
        console.log("Congratulations. You Win!");
        console.log("Your number was: " + playerNumber + " "+ "And take: "+ tries + " "+ "tries. \n Would you like to play again?. \n (Y)es or (N)o " );

      let ans = (await ask("Please put your answer: "));  // Ask if the guess player want to play again!
      if((ans.toUpperCase() === "Y" )){
        return reverseStart();
      }else {
        console.log("Thanks for playing!");
        exit();
      }
        break;
      }
      if(playerNumber>compuNumber){
       console.log(" Sorry my number is lower");
       playerNumber = await ask("Please try again: ");
       tries = tries + 1;
      }
      if(playerNumber<compuNumber){
      console.log(" Sorry my number is higher");
      playerNumber = await ask("Please put a number higher. Try again: ");
      tries = tries + 1;
      }
      tryMax--;
  }
    if (tryMax==0){
      console.log("Sorry. You loose!!");
      console.log("Would you like to play again?. \n (Y)es or (N)o " );
      let ans = (await ask("Please put your answer: "));  // Ask if the guess player want to play again!
      if((ans.toUpperCase() === "Y" )){
        return guessChoose();
      }else {
        exit();
      }
    }

  process.exit();
}



