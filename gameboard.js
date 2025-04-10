import Ship from "./ship.js";

const Gameboard = () => {
    const ships = [];
    const misses = [];
    const grid = {};

    const coordToKey = ([x,y]) => `${x},${y}`;

    const placeShip = (ship, startCoord, direction) => {
        const [x, y] = startCoord;
        const coords = [];

        for (let i = 0; i < ship.length; i++) {
            const coord = direction === "horizontal" ? [x + i, y] : [x, y + i];
            grid[coordToKey(coord)] = ship;
            coords.push(coord);
        }

        ship.setPositions(coords);
        ships.push({ ship, coords, });
    };

        const getShipAt = (coord) => {
            return grid[coordToKey(coord)] || null;
        }

        const receiveAttack = (coord) => {
            const key = coordToKey(coord);
            const ship = grid[key];

        if (ship) {
            ship.hit(coord);
            return { hit: true, sunk: ship.isSunk() };
        } else {
            misses.push(coord);
            return { hit: false, sunk: false };
        }
    };

    const getMisses = () => misses;

    const areAllShipsSunk = () =>
        ships.every(({ ship }) => ship.isSunk());

    return {
        placeShip,
        receiveAttack,
        getShipAt,
        getMisses,
        areAllShipsSunk,
    };
};

export default Gameboard;
