function getOpponentChoice() {
  const choices = ["paper", "scissors", "rock"];
  const randomIndex = Math.floor(Math.random() * choices.length); // Corrected Math.random() usage

  return choices[randomIndex];
}

function playGame(userChoice) {
  const opponentChoice = getOpponentChoice();
  alert(
    `You chose ${userChoice}
    Computer chose ${opponentChoice}`
  );
}