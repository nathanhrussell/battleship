import Player from "./player";
import Gameboard from "./gameboard";
import Ship from "./ship";

test("player can attack enemy gameboard", () => {
  const player = Player();
  const enemyBoard = Gameboard();
  const ship = Ship(1);

  enemyBoard.placeShip(ship, [0, 0], "horizontal");
  player.attack(enemyBoard, [0, 0]);

  expect(ship.hits).toBe(1);
});
