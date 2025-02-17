// Selectors
const scoresElement = document.getElementById("js-scores");
const userChoiceElement = 
  document.getElementById("js-selected-user-choice-icon");
const opponentChoiceElement = 
  document.getElementById("js-selected-opponent-choice-icon");
const resultsElement = document.getElementById("js-results");

// Event listeners
document.getElementById('js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  })

document.getElementById('js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  })

document.getElementById('js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  })

document.getElementById('js-reset-button')
  .addEventListener('click', () => {
    resetDisplay();
  })

// Retrieve scores and result from localStorage
let result = localStorage.getItem('result');
let score = JSON.parse(localStorage.getItem('score'));
let userChoice = localStorage.getItem('userChoice');
let opponentChoice = localStorage.getItem('opponentChoice');

// Retrieve counters from localStorage
let gameCount = localStorage.getItem('gameCount');
let userChoiceHistory = JSON.parse(localStorage.getItem('userChoiceHistory'));

/* Note to self: 'score' and 'userChoiceHistory' variables need to be stringified 
for storage and parsed on retrieval as all other variables are already strings. */

// Initialize score if it doesn't exist
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };

  userChoiceHistory = {
    paper: 0,
    scissors: 0,
    rock: 0
  };

  // Set default values on display
  resetDisplay();
} else {
  // If retrieved, set retrieved values on display
  updateDisplay(result, userChoice, opponentChoice);
}

function getOpponentChoice() {

  if (Number(gameCount) < 5 || (result === 'You win!' || result === "It's a tie!")) {
    /* If less than 5 rounds have been played OR the opponent lost the
    previous round, opponent will pick a random choice. */
    const choices = ["paper", "scissors", "rock"];
    const randomIndex = Math.floor(Math.random() * choices.length);

    return choices[randomIndex];
  } else {
    /* If more than 5 rounds have been played, AND the opponent won
    the previous round, opponent will pick the choice most likely to
    win based on the amount of times the player has played each choice. */
    console.log('Opponent chooses depending on userChoiceHistory');
    if (userChoiceHistory.paper >= userChoiceHistory.scissors &&
      userChoiceHistory.paper >= userChoiceHistory.rock) {
      return 'scissors';
    } else if (userChoiceHistory.rock >= userChoiceHistory.scissors) {
      return 'paper';
    } else {
      return 'rock';
    }
  }
}

function playGame(userChoice) {
  const opponentChoice = getOpponentChoice();

  gameCount++;
  userChoiceHistory[userChoice]++;

  // Determine winner
  if (userChoice === opponentChoice) {
    result = "It's a tie!";
    score.ties++;
  } else if ((userChoice === 'paper' && opponentChoice === 'scissors') ||
  (userChoice === 'scissors' && opponentChoice === 'rock') ||
  (userChoice === 'rock' && opponentChoice === 'paper')) {
    result = 'You lose!';
    score.losses++;
  } else {
    result = 'You win!';
    score.wins++;
  }

  // Store round details in local storage
  localStorage.setItem('result', result);
  localStorage.setItem('score', JSON.stringify(score));
  localStorage.setItem('userChoice', userChoice);
  localStorage.setItem('opponentChoice', opponentChoice);

  // Store updated counters in local storage
  localStorage.setItem('gameCount', gameCount);
  localStorage.setItem('userChoiceHistory', JSON.stringify(userChoiceHistory));
 
  // Update display with round details
  updateDisplay(result, userChoice, opponentChoice);
}

function updateDisplay(result, userChoice, opponentChoice) {
  let resultMessage = `<strong>${result}</strong>`;
  let scoresMessage = `Wins: ${score.wins}<br>
  Losses: ${score.losses}<br>
  Ties: ${score.ties}`
  let userChoiceIcon = `images/${userChoice}.png`;
  let opponentChoiceIcon = `images/${opponentChoice}.png`;
  
  scoresElement.innerHTML = scoresMessage;
  resultsElement.innerHTML = resultMessage;
  userChoiceElement.src = userChoiceIcon;
  opponentChoiceElement.src = opponentChoiceIcon;
}

function resetDisplay() {
  // Reset score values to zero
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  // Remove saved details
  localStorage.removeItem('result');
  localStorage.removeItem('score');
  localStorage.removeItem('userChoice');
  localStorage.removeItem('opponentChoice');

  // Reset counters
  gameCount = 0;
  userChoiceHistory.paper = 0;
  userChoiceHistory.scissors = 0;
  userChoiceHistory.rock = 0;

  // Reset current round details
  result = 'Press an option to start';
  userChoice = 'blank';
  opponentChoice = 'blank';

  // Reset display
  updateDisplay(result, userChoice, opponentChoice);
}