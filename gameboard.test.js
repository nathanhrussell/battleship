import Gameboard from "./gameboard";
import Ship from "./ship";

test("places a ship at given coordinates", () => {
  const board = Gameboard();
  const ship = Ship(3);
  board.placeShip(ship, [0, 0], "horizontal");
  expect(board.getShipAt([0, 0])).toBe(ship);
});

test("registers a hit on a ship", () => {
  const board = Gameboard();
  const ship = Ship(2);
  board.placeShip(ship, [1, 1], "vertical");
  board.receiveAttack([1, 1]);
  expect(ship.hits).toBe(1);
});

test("registers a missed attack", () => {
  const board = Gameboard();
  board.receiveAttack([4, 4]);
  expect(board.getMisses()).toContainEqual([4, 4]);
});

test("reports all ships sunk correctly", () => {
  const board = Gameboard();
  const ship = Ship(1);
  board.placeShip(ship, [2, 2], "horizontal");
  board.receiveAttack([2, 2]);
  expect(board.areAllShipsSunk()).toBe(true);
});
