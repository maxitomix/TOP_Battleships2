import './style.css';
import { component } from './component.js';
import { Ship } from './ships.js';
import { Gameboard, displayBoard } from './gameboard.js';

//-------------------

const container = document.getElementsByClassName('container')[0]


let destroyerP1 = new Ship('destroyerP1', 3)

console.log(destroyerP1)

let player1 = new Gameboard()
let player2 = new Gameboard()


console.log(player1)
console.log(player2)

displayBoard(player1.board)
displayBoard(player2.board)

console.log(destroyerP1.name)