var inquirer = require("inquirer");//require inquirer
var Word = require("./game.js");//word files
var checkLetter = require("./word.js");//check if the letter is in the word
var Letter = require("./letter.js");//Link in the letters to display

//variables to use
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var lettersGuessed = [];
var goodLetters = [];      
var displayHangman;

var game = {

  wordBank : Word, // import a list of words
  guessesRemaining : 10, // per word
  currentWord : null, // the word object

  startGame : function(){
    // make sure you get 10 guesses
    this.guessesRemaining = 10;

    // get a random word from the array
    var j = Math.floor(Math.random() * this.wordBank.length);
    this.currentWord = this.wordBank[j];

    //Here we go
    console.log("Animal hangman, again - it worked before! ");

    // Show the empty letters and guesses, whatever
    displayHangman = new Letter(this.currentWord);
    displayHangman.parseDisplay();
    console.log("Guesses Left: " + game.guessesRemaining);

    // prompt for a letter
    keepPromptingUser();
  }

};

//ask if they want to play again
function playAgain() {
  inquirer
  .prompt([
     {
      type: "list",
      name: "choice",
      message: "Would you like to play again?",
      choices: ["Yes", "No"]
    }
  ]).then(function(inquirerResponse) {
    if (inquirerResponse.choice === "Yes") {
    lettersGuessed = [];
    goodLetters = [];      
      game.startGame();
     } else {
      console.log("\n Thanks for playing... ");
    }
  });
};

//keep asking user for letters (recursive)
function keepPromptingUser(){

  //spaces
  console.log(" ");

  //if still alive
  if(game.guessesRemaining > 0){
    inquirer.prompt([
      {
        type: "value",
        name: "letter",
        message: "Guess a Letter: "
      }
    ]).then(function(userInput){

      // Collect Letter Input
      var inputLetter = userInput.letter.toLowerCase();
      
      // Valid input.  I always forget about validate in inquirer, too late now!
      if(alphabet.indexOf(inputLetter) == -1){

        // Tell user they did not guess a letter
        console.log("Wait, " + inputLetter + " isn't a letter");
        console.log("Guesses Left: " + game.guessesRemaining);
        console.log("Used Letter board" + lettersGuessed);
        keepPromptingUser();

      } else if(alphabet.indexOf(inputLetter) != -1 && lettersGuessed.indexOf(inputLetter) != -1){

        // Tell user they already guessed that letter
        console.log("You already used " + inputLetter + ". Try again!");
        console.log("Guesses Left: " + game.guessesRemaining);
        console.log("Used letter board: " + lettersGuessed);
        keepPromptingUser();

      } else {

        // Remove the entry from the list of possible inputs
        lettersGuessed.push(inputLetter);

        // Check for the letter in the word
        var letterInWord = checkLetter(inputLetter, game.currentWord);

        // If the letter is in the word, update the letter object
        if(letterInWord){

          // Add to correct letters list
          goodLetters.push(inputLetter);

          // Show the empty letters and guesses, whatever
          displayHangman = new Letter(game.currentWord, goodLetters);
          displayHangman.parseDisplay();

          // Winner?
          if(displayHangman.winner){
            console.log("\n\n Winner winner chicken dinner (yep, stupid) \n\n");
            playAgain();
          }
          // Not a win yet, so ask for another input and decrement guesses
          else{
            console.log("Guesses Left: " + game.guessesRemaining);
            console.log("Letters already guessed: " + lettersGuessed);
            keepPromptingUser();
          }

        }
        // Otherwise, decrement guesses and re-prompt
        else{
          game.guessesRemaining--;
          displayHangman.parseDisplay();
          console.log("Guesses Left: " + game.guessesRemaining);
          console.log("Letters already guessed: " + lettersGuessed);
          keepPromptingUser();
        }
        
      }

    });
    
  }
  // If not enough guesses left, then your a loser...
  else{
    console.log("\n\n Sorry, you lost.  The word was: " + game.currentWord + "\n\n");
    playAgain();
  }

}

// Restart
game.startGame();