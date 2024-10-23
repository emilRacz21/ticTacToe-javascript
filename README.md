# Tic Tac Toe Game

This repository contains a simple Tic Tac Toe game implemented in JavaScript, HTML, and CSS. The game allows two players, "X" and "O," to take turns playing on a 3x3 grid, with the objective of placing three of their marks in a horizontal, vertical, or diagonal row.

* [Tic Tac Toe Game](https://tic-tac-toe-er.netlify.app/)

## Features

- Two-player gameplay.
- Win detection for both "X" and "O".
- Score tracking for both players.
- Animated UI interactions for an enhanced user experience.

## Code Overview

### Initial Setup

- **Current Player**: The game starts with player "X".
- **Winning Combinations**: An array defines all possible winning combinations on the board.
- **Score Tracking**: Points are stored for both players.

### HTML Elements

- The game board is represented by a series of `<td>` elements.
- Player scores are displayed in designated elements with the classes `.player` and `.player-points`.

### Game Logic

1. **Game Start**:
   - The game begins when a player clicks on an empty cell.
   - The clicked cell updates to reflect the current player's symbol ("X" or "O").

2. **Player Switch**:
   - The function `setColorAndSwitchPlayer` changes the text color of the current player's symbol and switches to the next player.

3. **Win Checking**:
   - The `checkWinner` function checks if the current player's symbols form any of the winning combinations. If a player wins, the score is updated, and the game board resets.

4. **Board Reset**:
   - The `restartGame` function resets the game board and allows players to continue playing.

5. **Animations**:
   - The game features animations for cell clicks and player turns to enhance user experience. The `animBoard` function handles these animations.

### Game Colors

- The `getBoardColor` function applies specific background colors to the board cells for a better visual appearance.

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/emilRacz21/ticTacToe-javascript.git
   cd ticTacToe-javascript
2. Open index.html in a web browser.

3. Enjoy the game!

## Contributions

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Design

![TicTacToe](https://github.com/user-attachments/assets/8b0b19e7-4a4d-4e1e-8f89-38d40244bf67)


## License

This project is licensed under the MIT License.
