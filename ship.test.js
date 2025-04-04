import Ship from "./ship";

test("Ship is created with correct length", () => {
  const ship = Ship(3);
  expect(ship.length).toBe(3);
});

test("Ship is not sunk when created", () => {
  const ship = Ship(2);
  expect(ship.isSunk()).toBe(false);
});

test("Ship can record a hit", () => {
  const ship = Ship(2);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("Ship is sunk after correct number of hits", () => {
  const ship = Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
