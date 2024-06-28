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
  } else if ((userChoice === 'paper' && opponentChoice === 'scissors') ||
  (userChoice === 'scissors' && opponentChoice === 'rock') ||
  (userChoice === 'rock' && opponentChoice === 'paper')) {
    result = 'lose';
  } else {
    result = 'win';
  }

  alert(`You chose ${userChoice}. Opponent chose ${opponentChoice}. You ${result}!`)
}