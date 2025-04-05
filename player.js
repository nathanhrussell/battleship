const Player = () => {
    const attack = (enemyBoard, coord) => {
        enemyBoard.receiveAttack(coord);
    };

    return {
        attack,
    };
};

export default Player