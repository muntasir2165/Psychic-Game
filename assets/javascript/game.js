// generate an array of English alphabet characters
var alphabetArray = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

// object containing the state of the game
var gameState = {"wins": 0,
"remainingGuesses": 9,
"losses": 0,
"chosenLetter": "",
"guessedLetters": []};

function playGame() {
	initializeGameState();
	document.onkeyup = function(event) {
		var pressedKey = event.key.toUpperCase();
		if (pressedKey === gameState.chosenLetter) {
			gameState.wins++;
			updateGameState();
			setTimeout(provideGameFeedback("win"), 500);
			playGame();
		} else if (gameState.guessedLetters.indexOf(pressedKey) > -1) {
				setTimeout(provideGameFeedback("duplicate", pressedKey), 500);
		} else if (alphabetArray.indexOf(pressedKey) === -1) {
			console.log("Ignoring the non-alphabetic key on the keyboard that was pressed");
		} else {
			gameState.guessedLetters.push(pressedKey);
			gameState.remainingGuesses--;
			updateGameState();
			if (gameState.remainingGuesses <= 0) {
				setTimeout(provideGameFeedback("loss"), 500);
				gameState.losses++;
				playGame();
			}
		}
	}
}

playGame();

// initialize game state
function initializeGameState() {
	// choose a random letter from the alphabet
	gameState.chosenLetter = alphabetArray[Math.floor(Math.random() * alphabetArray.length)];
	// console.log the chosen letter (for debugging and perhaps cheating purposes!)
	console.log("Chosen leter: " + gameState.chosenLetter);
	gameState.remainingGuesses = 9;
	gameState.guessedLetters = [];
	updateGameState();
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

	gameState.guessedLetters.forEach(function(guessedLetter){
		lettersGuessed.innerHTML += guessedLetter + " ";
	});
}

// acceptable string parameter values for the provideGameFeedback function:
	// "win": the player won the game
	// "loss": the player lost the game
	// "duplicate": the player has already guessed the passed in letter
function provideGameFeedback(status, letter) {
	switch (status) {
		case "win":
			alert("You have successfully guessed the letter: " + gameState.chosenLetter);
			break;
		case "loss":
			alert("You failed to correctly guess the letter: " + gameState.chosenLetter);
			break;
		case "duplicate":
			if (letter) {
				alert("You have already guessed the letter: " + letter);
			}
			break;
	}
}