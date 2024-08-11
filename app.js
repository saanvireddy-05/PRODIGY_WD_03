let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerO, playerX
let count = 0; // To Track Draw
let isAI = false; // Mode flag

// Handle mode selection
document.getElementById("person-vs-person").addEventListener("click", function () {
  startGame(false);
});

document.getElementById("person-vs-ai").addEventListener("click", function () {
  startGame(true);
});

function startGame(aiMode) {
  isAI = aiMode;
  document.getElementById("mode-selection").classList.add("hide");
  document.getElementById("game-container").classList.remove("hide");
  resetGame(); // Reset game state when a new game starts
}

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // playerO (user)
      box.innerText = "O";
      turnO = false;
    } else {
      // playerX or AI
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    } else if (!isWinner && isAI && !turnO) {
      // AI's turn if playing in AI mode and no winner yet
      setTimeout(aiPlay, 500);
    }
  });
});

const aiPlay = () => {
  // Simple AI: find the first available box
  for (let box of boxes) {
    if (box.innerText === "") {
      box.innerText = "X";
      box.disabled = true;
      count++;

      let isWinner = checkWinner();
      if (count === 9 && !isWinner) {
        gameDraw();
      }

      turnO = true; // User's turn next
      break;
    }
  }
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

newGameBtn.addEventListener("click", () => {
  document.getElementById("mode-selection").classList.remove("hide");
  document.getElementById("game-container").classList.add("hide");
});
resetBtn.addEventListener("click", resetGame);
