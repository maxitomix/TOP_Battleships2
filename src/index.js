import './style.css';
import { component } from './component.js';
import { Ship } from './ships.js';
import { Gameboard, displayBoard } from './gameboard.js';

//-------------------

const container = document.getElementsByClassName('container')[0]


let destroyer = new Ship('destroyer', 3)

console.log(destroyer)

let player1 = new Gameboard()
let player2 = new Gameboard()


console.log(player1)
console.log(player2)

displayBoard(player1.board)