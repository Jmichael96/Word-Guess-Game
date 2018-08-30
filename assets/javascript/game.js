

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

var maxTries = 11;

var guessedLetters = [];
var guessingWord = [];      
var gameStarted = false;  
var hasFinished = false;          
var wins = 0; 
var losses = 0;

var winning = new Audio("./assets/audio/bubbles.mp3");
var losing = new Audio("./assets/audio/waterphone.mp3");

function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    guessedLetters = [];
    guessingWord = [];

    winning.pause();
    losing.pause();

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


function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("totalLosses").innerText = losses;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        document.getElementById("lose").style.cssText= "display: none";
        document.getElementById("gameover-image").style.cssText = "display: block";
        hasFinished = true;
    }
};


document.onkeyup = function(event) {

    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
 
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
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
    }
    
    updateDisplay();
    checkWin();
    checkLosses();
};

function evaluateGuess(letter) {
    var positions = [];
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
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        winning.play();
        hasFinished = true;
    }
};
function checkLosses() {
    if(remainingGuesses <= 0) {
    document.getElementById("gameover-image").style.cssText = "display: block";
    document.getElementById("lose").style.cssText = "display: block";
    losses++;
    losing.play();
    hasFinished = true;
    }
};
