//your JS code here. If required.
const submitButton = document.getElementById("submit");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");

const setupDiv = document.querySelector(".setup");
const borderDiv = document.getElementById("border");
const messageDiv = document.querySelector(".message");

let name1 = "";
let name2 = "";
let currentTurn = "X"; 
let isGameActive = true;

let cellValues = ["", "", "", "", "", "", "", "", ""];

borderDiv.style.display = "none";

submitButton.addEventListener("click", function() {
  name1 = player1Input.value.trim() || "Player 1";
  name2 = player2Input.value.trim() || "Player 2";

    setupDiv.style.display = "none";
  borderDiv.style.display = "block";

    messageDiv.textContent = name1 + ", you're up";
});


const cells = document.querySelectorAll(".bord div");

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function() {
    
    if (cells[i].textContent !== "" || !isGameActive) {
      return;
    }

  const cellIndex = Number(cells[i].className) - 1;

    if (currentTurn === "X") {
      cells[i].textContent = "x";
      cellValues[cellIndex] = "x";

      if (checkWin("x")) {
        messageDiv.textContent = name1 + " congratulations you won!";
        isGameActive = false;
      } else if (checkDraw()) {
        messageDiv.textContent = "It's a draw!";
        isGameActive = false;
      } else {
        currentTurn = "O";
        messageDiv.textContent = name2 + ", you're up";
      }
    }  

     else {
      cells[i].textContent = "o";
      cellValues[cellIndex] = "o";

      if (checkWin("o")) {
        messageDiv.textContent = name2 + " congratulations you won!";
        isGameActive = false;
      } else if (checkDraw()) {
        messageDiv.textContent = "It's a draw!";
        isGameActive = false;
      } else {
        currentTurn = "X";
        messageDiv.textContent = name1 + ", you're up";
      }
    }
  });
}

function checkWin(playerSign) {
  const winLines = [, [3, 4, 5], [6, 7, 8], 
  ];

  for (let i = 0; i < winLines.length; i++) {
    const line = winLines[i];
    if (cellValues[line[0]] === playerSign && 
        cellValues[line[1]] === playerSign && 
        cellValues[line[2]] === playerSign) {
      return true; 
    }
  }
  return false;
}

function checkDraw() {
  for (let i = 0; i < cellValues.length; i++) {
    if (cellValues[i] === "") {
      return false; 
    }
  }
  return true;
}