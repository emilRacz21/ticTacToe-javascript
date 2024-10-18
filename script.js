//Początkowy gracz.
currentPlayer = "X";
//Kombinacja wygranych...
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
//Przechowywanie punktacji dla gracza "X" oraz "O"
let [pointsX, pointsO] = [0, 0];
//Pobranie elementów z dokumentu html...
let cells = document.querySelectorAll("td");
let playerScore = document.querySelectorAll(".player");
let playerPoints = document.querySelectorAll(".player-points");
//Utworzenie tablicy do sprawdzania wyników...
let board = Array(9).fill("");
//metoda rozpoczynająca grę
beginGame = (event) => {
  //sprawdzenie czy event zawiera juz element "X" lub "O"
  if (["X", "O"].some((value) => event.target.textContent.includes(value))) {
    return;
  } else {
    //wywolanie metody do zmiany kolorów graczy, oraz do zmiany gracza po kliknieiu w komórkę
    currentPlayer = setColorAndSwitchPlayer(event, currentPlayer);
    event.target.innerHTML = currentPlayer;
    board[event.target.id] = currentPlayer;
    //metoda która ciągle sprawdza czy kombinacja wygranych została trafiona
    checkWinner();
  }
  //Animacja planszy po kliku...
  animBoard(event);
};

setColorAndSwitchPlayer = (event, player) => {
  //Przechowanie w obiekcie koloru dla gracza "X" oraz "O"
  const colors = {
    X: "rgb(217, 200, 67)",
    O: "rgb(49, 162, 203)",
  };
  if (currentPlayer == "X") {
    //animacja pokazujaca czyj teraz jest ruch...
    setBoxAnim(1, 0);
  } else if (currentPlayer == "O") {
    setBoxAnim(0, 1);
  }
  event.target.style.color = colors[player];
  return player === "X" ? "O" : "X";
};
//Dla wszytskich komórek cell...
cells.forEach((cell) => {
  //Uruchom metode beginGame()
  cell.addEventListener("click", beginGame);
});

//Metoda sprawdzajaca czy dany gracz jest na wygrywających komórkach.
checkWinner = () => {
  for (i = 0; i < winningVariants.length; i++) {
    //Destruktaryzacja tablicy...
    let [a, b, c] = winningVariants[i];
    //Warunek sprawdzajacy czy czy dany gracz wygrał grę.
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      //Jeśli tak to zresetuj plansze.
      restartGame();
      if (currentPlayer == "X") {
        //Dodaj punkty jesli gracz "X" wygrał.
        pointsX++;
        playerPoints[0].innerHTML = pointsX;
      }
      if (currentPlayer == "O") {
        //Dodaj punkty jeśli gracz "O" wygrał.
        pointsO++;
        playerPoints[1].innerHTML = pointsO;
      }
    } else if (!board.includes("")) {
      /*Jeśli w tablicy sprawdzajacej wyniki nie ma pustego stringa, 
      czyli cała plansza jest zapełniona zresetuj grę i nie dodawaj punktów*/
      restartGame();
    }
  }
};
//Metoda do resetu gry.
restartGame = () => {
  cells.forEach((cell) => {
    //Usuń obsluge klikania na puste komórki
    cell.removeEventListener("click", beginGame);
    //Interval stworzony aby wszytskie komórki z klasa active mogły zostać zresetowane
    let interval = setInterval(() => {
      cell.innerHTML = "";
      if (cell.className == "active") {
        cell.style = "";
        cell.classList.remove("active");
      }
      //Po sekundzie wyczyść interval
      clearInterval(interval);
      //Dodaj obsługę klikania na wszyatkie juz wyczyszczone komórki
      cell.addEventListener("click", beginGame);
      getBoardColor();
    }, 1000);
  });
  //Wypełnij tablice pustym stringiem
  board = board.fill("");
};
//Animacja wystepująca po kliknieciu w komórkę
animBoard = (event) => {
  //Dodanie klasy active do kliknietej komórki
  event.target.classList.add("active");
  event.target.addEventListener("animationend", () => {
    //Po wykonanej animacji zrob tranfsorm kliknietej komórki...
    event.target.style.transform = "rotateY(180deg) scale(0.9)";
    //Zmień kolor komórki...
    event.target.style.backgroundColor = "rgba(18, 44, 58, 0.527)";
  });
};
//Ustawia kolory planszy, zmienia kolor nieparzystych pól.
getBoardColor = () => {
  Array.from(cells.keys())
    .filter((e) => e % 2 == 0)
    .forEach((event) => {
      //Zmień kolor nieparzystych komórek
      cells[event].style.backgroundColor = "rgb(10, 33, 41)";
    });
};
//Animacja która pokazuje czyj teraz jest aktualny ruch...
setBoxAnim = (num1, num2) => {
  playerScore.item(num1).style.transform = "scale(0.8)";
  playerScore.item(num1).style.backgroundColor = "rgb(10, 33, 41)";
  playerScore.item(num2).style.backgroundColor = " rgb(23, 47, 67)";
  playerScore.item(num2).style.transform = "scale(1)";
};
//Ustaw kolory planszy...
getBoardColor();
setBoxAnim(0, 1);
