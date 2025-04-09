import Player from "./player.js";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

const Game = (() => {
  const human = Player();
  const computer = Player();

  human.board = Gameboard();
  computer.board = Gameboard();

  const boardSize = 10;
  const shipLengths = [5, 4, 3, 3, 2];

  const createGrid = (container, board, isEnemy = false) => {
    container.innerHTML = "";

    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = x;
        cell.dataset.y = y;

        if (isEnemy) {
          cell.classList.add("enemy");
          cell.addEventListener("click", () => handlePlayerAttack([x, y]));
        }

        container.appendChild(cell);
      }
    }
  };

  const handlePlayerAttack = (coord) => {
    const alreadyAttacked = playerAttacks.some(
      ([px, py]) => px === coord[0] && py === coord[1]
    );

    if(alreadyAttacked || gameOver) return;

    playerAttacks.push(coord);

    if (gameOver) return;

    computer.board.receiveAttack(coord);
    renderBoard(computer.board, enemyBoardEl, true);

    if (computer.board.areAllShipsSunk()) {
      alert("You win!");
      gameOver = true;
      return;
    }

    setTimeout(() => {
      handleComputerAttack();
    }, 500);
  };

  const handleComputerAttack = () => {
    let coord;

    do {
      coord = [Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)];
    } while (
      computerAttacks.some(
        (c) => c[0] === coord[0] && c[1] === coord[1]
      )
    );

    computerAttacks.push(coord);
    human.board.receiveAttack(coord);
    renderBoard(human.board, playerBoardEl);

    if (human.board.areAllShipsSunk()) {
      alert("Computer wins!");
      gameOver = true;
    }
  };

  const placeShipsRandomly = (board) => {
    shipLengths.forEach((length) => {
      let placed = false;

      while (!placed) {
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
        const x = Math.floor(Math.random() * boardSize);
        const y = Math.floor(Math.random() * boardSize);
        const ship = Ship(length);

        const coords = [];
        for (let i = 0; i < length; i++) {
          const coord = direction === "horizontal" ? [x + i, y] : [x, y + i];
          coords.push(coord);
        }

        const valid = coords.every(([cx, cy]) => {
          return (
            cx >= 0 &&
            cx < boardSize &&
            cy >= 0 &&
            cy < boardSize &&
            !board.getShipAt([cx, cy])
          );
        });

        if (valid) {
          board.placeShip(ship, [x, y], direction);
          placed = true;
        }
      }
    });
  };

  const renderBoard = (board, container, hideShips = false) => {
    const cells = container.querySelectorAll(".cell");

    cells.forEach((cell) => {
      const x = Number(cell.dataset.x);
      const y = Number(cell.dataset.y);
      const ship = board.getShipAt([x, y]);
      const coordKey = `${x},${y}`;

      cell.classList.remove("hit", "miss", "ship");

      if (ship && !hideShips) {
        cell.classList.add("ship");
      }

      if (ship && ship.hits > 0) {
        cell.classList.add("hit");
      } else if (board.getMisses().some(([mx, my]) => mx === x && my === y)) {
        cell.classList.add("miss");
      }
    });
  };

  const startGame = () => {
    placeShipsRandomly(human.board);
    placeShipsRandomly(computer.board);
    createGrid(playerBoardEl, human.board);
    createGrid(enemyBoardEl, computer.board, true);
    renderBoard(human.board, playerBoardEl);
  };

  let gameOver = false;
  const computerAttacks = [];
  const playerAttacks = [];

  // DOM elements (very basic setup)
  const playerBoardEl = document.querySelector("#player-board");
  const enemyBoardEl = document.querySelector("#enemy-board");
  const startBtn = document.querySelector("#start-game");
  const placeRandomBtn = document.querySelector("#place-random");
  const messageEl = document.querySelector("#message");

  placeRandomBtn.addEventListener("click", () => {
    human.board = Gameboard();
    placeShipsRandomly(human.board);
    createGrid(playerBoardEl, human.board);
    renderBoard(human.board, playerBoardEl);
    messageEl.textContent = "Ships placed! You can now start the game.";
  });

  startBtn.addEventListener("click", () => {
    gameOver = false;
    computerAttacks.length = 0;
    human.board = Gameboard();
    computer.board = Gameboard();
    startGame();
  });

  return {
    startGame,
  };
})();

export default Game;
