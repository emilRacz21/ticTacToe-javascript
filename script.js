currentPlayer = "X";
winningVariants = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let pointsX = 0;
let pointsO = 0;
getCells = (event) => {
  showCells(event.target);
};
showCells = (player) => {
  if (player.innerHTML == "X" || player.innerHTML == "O") return;
  player.innerHTML = this.currentPlayer;
  goWinner();
  console.log(this.currentPlayer);
  switch (this.currentPlayer) {
    case "X":
      return (this.currentPlayer = "O");
      break;
    case "O":
      return (this.currentPlayer = "X");
      break;
  }
};
goWinner = () => {
  for (i = 0; i < winningVariants.length; i++) {
    let variant = winningVariants[i];
    console.log(variant);
    let a = showVariants(variant[0]);
    let b = showVariants(variant[1]);
    let c = showVariants(variant[2]);

    if (a === "" || b === "" || c === "") continue;
    if (a == b && b == c) {
      document.querySelectorAll(".cell").forEach((cell) => {
        cell.removeEventListener("click", getCells);
      });
    }
    if (c === "X" && b === "X" && a === "X") {
      pointsX++;
      pointX.innerHTML = "Punkty gracza X: " + pointsX;
    } else if (c === "O" && b === "O" && a === "O") {
      pointsO++;
      pointO.innerHTML = "Punkty gracza O: " + pointsO;
    }
  }
};
showVariants = (index) => {
  return document.querySelector(`.cell[data-index='${index}']`).innerHTML;
};
reset = () => {
  document.querySelectorAll(".cell").forEach((element) => {
    element.innerHTML = "";
  });
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", getCells);
  });
};
document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", getCells);
});
document.querySelector(".restart-game").addEventListener("click", reset);

let pointX = document.querySelector(".points1");
let pointO = document.querySelector(".points2");
