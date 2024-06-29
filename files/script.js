// Selectors
let scoresElement = document.getElementById("scores");
let userChoiceElement = 
  document.getElementById("selected-user-choice-icon");
let opponentChoiceElement = 
  document.getElementById("selected-opponent-choice-icon");
let resultsElement = document.getElementById("results");

score = {
  wins: 0,
  losses: 0,
  ties: 0
};

resetDisplay();

function getOpponentChoice() {
  const choices = ["paper", "scissors", "rock"];
  const randomIndex = Math.floor(Math.random() * choices.length);

  return choices[randomIndex];
}

function playGame(userChoice) {
  const opponentChoice = getOpponentChoice();
  let result = ''

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

  // Store scores in local storage
  localStorage.setItem('score', JSON.stringify(score));

  // Display results and score on document
  let resultMessage = `<strong>${result}</strong>`;

  // Display played moves
  let userChoiceIcon = `images/${userChoice}.png`;
  let opponentChoiceIcon = `images/${opponentChoice}.png`;

  updateDisplay(resultMessage, userChoiceIcon, opponentChoiceIcon);
}

function updateDisplay(resultMessage, userChoiceIcon, opponentChoiceIcon) {
  let scoresMessage = `Wins: ${score.wins}<br>
  Losses: ${score.losses}<br>
  Ties: ${score.ties}`
  
  scoresElement.innerHTML = scoresMessage;
  resultsElement.innerHTML = resultMessage;
  userChoiceElement.src = userChoiceIcon;
  opponentChoiceElement.src = opponentChoiceIcon;
}

function resetDisplay() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  // Reset current round details on document
  let resultMessage = 'Press an option to start';
  let userChoiceIcon = `images/blank.png`;
  let opponentChoiceIcon = `images/blank.png`;

  // Reset display on document
  updateDisplay(resultMessage, userChoiceIcon, opponentChoiceIcon);
}