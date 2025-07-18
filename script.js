const hand = ["rock", "paper", "scissors"]; // valid options

let humanScore = 0;
let computerScore = 0;

// 1. Function to get computer's random choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * hand.length);
  return hand[randomIndex];
}

// 2. Function to get user's choice
function getHumanChoice() {
  let input = prompt("Enter your choice: rock, paper, or scissors");
  if (!input) {
    alert("No input provided!");
    return getHumanChoice();
  }

  const choice = input.trim().toLowerCase(); // case-insensitive and trimmed

  if (hand.includes(choice)) {
    return choice;
  } else {
    alert("Invalid choice! Please enter rock, paper, or scissors.");
    return getHumanChoice(); // ask again
  }
}

// 3. Play a single round and return outcome
function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase(); // ensure case-insensitivity

  if (humanChoice === computerChoice) {
    return "It's a tie!";
  }

  const winningCombos = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  if (winningCombos[humanChoice] === computerChoice) {
    humanScore++;
    return `You win! ${humanChoice} beats ${computerChoice}`;
  } else {
    computerScore++;
    return `You lose! ${computerChoice} beats ${humanChoice}`;
  }
}

// 4. Function to play the full 3-round game
function playGame() {
  humanScore = 0;
  computerScore = 0;

  for (let i = 1; i <= 3; i++) {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();

    const result = playRound(humanChoice, computerChoice);
    console.log(`Round ${i}: ${result}`);
    console.log(`Score - You: ${humanScore}, Computer: ${computerScore}`);
  }

  if (humanScore > computerScore) {
    console.log("You win the game!");
    return "You win the game!";
  } else if (computerScore > humanScore) {
    console.log("You lose the game!");
    return "You lose the game!";
  } else {
    console.log("The game is a tie!");
    return "The game is a tie!";
  }
}

const animateComputer = (finalChoice) => {
const computerChoiceDisplay = document.getElementById("computer-choice-display");
  const images = ["images/rock.png", "images/paper.png", "images/scissors.png"];
  let i = 0;
  const interval = setInterval(() => {
    computerChoiceDisplay.src = images[i % images.length];
    i++;
    if (i > 15) { // after some cycles, stop and show final choice
      clearInterval(interval);
      computerChoiceDisplay.src = `images/${finalChoice}.png`;
    }
  }, 100);
}

const setDisplay = () => {
  const gameInfo = document.querySelector(".game-info");
  gameInfo.style.display = "flex";
  const gameControls = document.querySelector(".game-controls");
  gameControls.style.display = "flex";
}

const humanButtons = document.querySelector(".human-choice").querySelector(".choice-buttons").querySelectorAll("button");
humanButtons.forEach(button => {
  button.addEventListener("click", () => {
    const humanChoice = button.id; // button id should match the choices
    // add active class
    button.classList.add("active");
    const computerChoice = getComputerChoice();
    animateComputer(computerChoice);

    setTimeout(() => {
      const result = playRound(humanChoice, computerChoice);
      console.log(result)
      document.getElementById("result").innerText = result;
      document.getElementById("score").innerText = `Score - You: ${humanScore}, Computer: ${computerScore}`;
      // remove active class at the end
      setDisplay();
      button.classList.remove("active");
    }, 2000); // wait for animation to finish before showing result
  });
});

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  humanScore = 0;
  computerScore = 0;
  document.getElementById("result").innerText = "";
  document.getElementById("score").innerText = "Score - You: 0, Computer: 0";
  const gameInfo = document.querySelector(".game-info");
  gameInfo.style.display = "none";
  const gameControls = document.querySelector(".game-controls");
  gameControls.style.display = "none";
});
