const Ship = (length) => {
    let positions = [];
    let hitPositions = [];

    const setPositions = (coords) => {
        positions = coords;
    };

    const hit = (coord) => {
        const alreadyHit = hitPositions.some(
            ([hx,hy]) => hx === coord[0] && hy === coord[1]
        );

        if(!alreadyHit) {
            hitPositions.push(coord);
        }
    };

    const isSunk = () => {
        return (
          positions.length > 0 &&
          positions.every(([x, y]) =>
            hitPositions.some(([hx, hy]) => hx === x && hy === y)
          )
        );
      };

    return {
        length,
        setPositions,
        hit,
        isSunk,
        get positions() {
            return positions;
        },
        get hits() {
            return hitPositions.length;
        },
        get hitPositions() {
            return hitPositions;
        },
    };
};

export default Ship;