// generate an array of English alphabet characters
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

// thee variable containing the guessed letter
// var randomLetter = "";

// object containing the state of the game
var gameState = {"wins": 0,
"remainingGuesses": 9,
"losses": 0,
"chosenLetter": "",
"guessedLetters": []};

function playGame() {
	initializeGameState();
	document.onkeyup = function(event) {
		console.log(event);
		var pressedKey = event.key;
		if (gameState.remainingGuesses <= 1) {
			gameState.losses++;
			provideGameFeedback("lose");
			playGame();
		} else if (pressedKey === gameState.chosenLetter) {
			gameState.wins++;
			provideGameFeedback("win");
			playGame();
		} else {
			gameState.guessedLetters.push(pressedKey);
			gameState.remainingGuesses--;
		}
		updateGameState();
	}
}

playGame();

// initialize game state
function initializeGameState() {
	// choose a random letter from the alphabet
	gameState.chosenLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
	console.log("chosen leter: " + gameState.chosenLetter);
	gameState.remainingGuesses = 9;
	gameState.guessedLetters = [];
	updateGameState();
	// provideGameFeedback("");
}

// update the state of the game and display it in the user interface
function updateGameState() {
	var wins = document.getElementById("wins");
	wins.innerHTML = gameState.wins;
	var losses = document.getElementById("losses");
	losses.innerHTML = gameState.losses;
	var remainingGuesses = document.getElementById("remaining-guesses");
	remainingGuesses.innerHTML = gameState.remainingGuesses;
	var lettersGuessed = document.getElementById("letters-guessed");
	lettersGuessed.innerHTML = "";
	// for (var i = 0;  i < gameState.remainingGuesses.length; i++) {
 //  		// someFn(arr[i]);
	// }
	gameState.guessedLetters.forEach(function(guessedLetter){
		lettersGuessed.innerHTML += guessedLetter + ", ";
	});
	// provideGameFeedback("");
}

// acceptable string parameters:
	// "win": the player won the game
	// "lose": the player lost the game
function provideGameFeedback(status) {
	var gameFeedback = document.getElementById("game-feedback");
	switch (status) {
		case "win":
			alert("You have successfully guessed the letter: " + gameState.chosenLetter);
			break;
		case "lose":
			alert("You failed to correctly guessed the letter: " + gameState.chosenLetter);
			break;
	}
}