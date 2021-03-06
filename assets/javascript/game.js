
// the array with all guessing words
var selectableWords = 
    [
        "bamboo",
        "greatwhite",
        "hammerhead",
        "tiger",
        "sand",
        "whale",
        "bull",
        "mako",
        "nurse",
        "loan",
        "blue",
        "leopard",
        "reef",
        "megamouth",
        "goblin",
        "basking",
        "hound",
        "zebra",
        "carpet",
        "angel",
        "saw",
    ];
console.log("My Shark list " + selectableWords );
//global variables
var maxTries = 11;
var guessedLetters = [];
var guessingWord = [];      
var gameStarted = false;  
var hasFinished = false;          
var wins = 0; 
var losses = 0;

var winning = new Audio("./assets/audio/bubbles.mp3");
var losing = new Audio("./assets/audio/waterphone.mp3");

// the reset game function
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;
    // the call that chooses the random guess word
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    guessedLetters = [];
    guessingWord = [];

    winning.pause();
    losing.pause();
    //the loop that pushes the guessing word for the user to guess
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("lose").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";
    updateDisplay();
    console.log(currentWordIndex + selectableWords);
};

// the display function
function updateDisplay() {
    //updates the display of wins and the current word text
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    };
    //updates the losses and the current word text
    document.getElementById("totalLosses").innerText = losses;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    };
    //updates the remaining guesses (11) and the guessed letters
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        //if you lose you get the game over page
        document.getElementById("lose").style.cssText= "display: none";
        document.getElementById("gameover-image").style.cssText = "display: block";
        hasFinished = true;
    };
};


document.onkeyup = function(event) {

    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
 
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
            console.log(event.key);
        };
    };
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }


        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    };
    
    updateDisplay();
    checkWin();
    checkLosses();
};

function evaluateGuess(letter) {
    var positions = [];
    console.log(positions - remainingGuesses);
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
    } else {

        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    };
};
//function that updates all the win effects
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        winning.play();
        hasFinished = true;
        console.log("total wins = " + wins + " You win!");
    }
};
//function that updates all of the lost effects
function checkLosses() {
    if(remainingGuesses <= 0) {
    document.getElementById("gameover-image").style.cssText = "display: block";
    document.getElementById("lose").style.cssText = "display: block";
    losses++;
    losing.play();
    hasFinished = true;
    console.log("total losses = " + losses + " You lose!");
    }
};
