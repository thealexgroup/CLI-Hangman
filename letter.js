var Letter = function(word, goodLetters){

  this.word = word;
  this.goodLetters = goodLetters;
  this.displayText = "";
  this.winner = false;

  // Function to display hangman word to user
  this.parseDisplay = function(){

    // Show the user the hangman word
    var shown = "";

    // If no goodLetters yet then single For Loop
    if(this.goodLetters == undefined){
     for(var i = 0; i < this.word.length; i++){
        // If not the letter
        shown += " _ ";
      }
    }
    // Otherwise, check all letters in a double loop
    else{

      // Double for loop... loop through the word itself and then each possible correct letter
      for(var i = 0; i < this.word.length; i++){

        // To determine whether a _ is needed
        var letterWasFound = false;

        for(var j = 0; j < this.goodLetters.length; j++){
          // If yes the letter
          if(this.word[i] == this.goodLetters[j]){
            shown += this.goodLetters[j];
            letterWasFound = true;
          }
        }
        // If nothing was found
        if(!letterWasFound){
          shown += " _ ";
        }
      }
    }

    // Remove first/last space and console log
    this.displayText = shown.trim();
    console.log(this.displayText);

    // Check to see if the game was won 
    if(this.displayText == this.word){
      this.winner = true;
    }

  }
};

// export to use in word.js
module.exports = Letter;