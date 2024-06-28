const score = {
  wins: 0,
  losses: 0,
  ties: 0
};

function getOpponentChoice() {
  const choices = ["paper", "scissors", "rock"];
  const randomIndex = Math.floor(Math.random() * choices.length); // Corrected Math.random() usage

  return choices[randomIndex];
}

function playGame(userChoice) {
  const opponentChoice = getOpponentChoice();
  let result = ''
  
  if (userChoice === opponentChoice) {
    result = 'tie';
    score.ties++;
  } else if ((userChoice === 'paper' && opponentChoice === 'scissors') ||
  (userChoice === 'scissors' && opponentChoice === 'rock') ||
  (userChoice === 'rock' && opponentChoice === 'paper')) {
    result = 'lose';
    score.losses++;
  } else {
    result = 'win';
    score.wins++;
  }

  alert(`You chose ${userChoice}. Opponent chose ${opponentChoice}. You ${result}!
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`)
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
}