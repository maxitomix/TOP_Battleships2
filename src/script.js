//-------------------
function Ship(name, length){
    let hits = Array(length).fill(false);

    return{
        name,
        length,
        hits,
        hit: function(position){
            hits[position] = true;
        },
        isSunk: function(){
            return hits.every((hit) => hit === true);
        }
    }
}

//-------------------
function Gameboard(){
    let board = Array(10).fill(null).map(() => Array(10).fill(null))
    let missedAttacks = [];

    function placeShip(ship, x, y){
        if (x +ship.length >10){
            throw new Error('Ship cannot fit on this position')
        }

        for (let i=0; i < ship.length; i++){
            if (board[x+i][y] !== null){
                throw new Error('There is already a ship in this position')
            }
        }

        for (let i=0; i < ship.length; i++){
            board[x+i][y] = ship;
        }
    }

    function receiveAttack(x,y){
        let target = board[x][y];
        if (target === null){
            missedAttacks.push({x, y});
        } else {
            target.ship.hit(target.position); // atention
        }
    }

    function allShipsSunk(){
        let ships = board.flat().filter(item => item !== null)

        if (ships.length === 0) return false;

        return ships.every(ship => ship.isSunk()); // atention
    }

    return{
        board,
        placeShip,
        receiveAttack,
        allShipsSunk,

    }
}

//-------------------
function Player(name, gameboard){
    function attack(x, y){
        gameboard.receiveAttack(x, y);
    }


    function randomAttack(){
        let x,y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        }
        while (gameboard.board[x][y] !== null){
            gameboard.receiveAttack(x, y);
        }
    }

    return {
        name,
        gameboard,
        attack,
        randomAttack
    }
}

//-------------------
function Game(){
    const player1 = Player('human', Gameboard());
    const player2 = Player('computer', Gameboard())

    player1.gameboard.placeShip(Ship(4),0,0);
    player2.gameboard.placeShip(Ship(4),0,0);

    let currentPlayer = player1;

    function playRound(x, y){
        if(currentPlayer === player1){
            player1.attack(x, y);
            currentPlayer = player2;
       } else{
        player2.randomAttack();
        currentPlayer = player1;
       }

       if (player1.gameboard.allShipsSunk() || player2.gameboard.allShipsSunk()){
        endGame();
       }
    }

    function endGame(){
        if(player1.gameboard.allShipsSunk()){
            console.log('Player2 Wins!')
        } else {
            console.log('Player1 Wins!')
        }
    }

    return {
        player1,
        player2,
        playRound
    }

}



//-------------------
// Initialize the game
let game = Game();

// Play a few rounds
console.log(game.player1.gameboard.board)
game.playRound(0, 0);  // Player1 attacks
game.playRound();  // Player2 attacks (random)

game.playRound(1, 0);  // Player1 attacks
game.playRound();  // Player2 attacks (random)

game.playRound(2, 0);  // Player1 attacks
game.playRound();  // Player2 attacks (random)

// and so on...