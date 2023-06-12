import './style.css';
import { component } from './component.js';
import { Ship } from './ships.js';
import { Gameboard, displayBoard } from './gameboard.js';


//-------------------






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

//-------------------

let rosterAngle = '0deg'

const roster = document.getElementsByClassName('roster-area')[0];
const rosterShips = Array.from(roster.children)


const rotateBtn = document.getElementById('rotate');
rotateBtn.addEventListener('click', rotate)

function rotate(){
    // const roster = document.getElementsByClassName('roster-area')[0];
    // const rosterShips = Array.from(roster.children)
    rosterAngle ===  '0deg'? rosterAngle = '90deg': rosterAngle = '0deg'
    rosterShips.forEach(rostership => {
        rostership.style.transform = `rotate(${rosterAngle})`;
        rostership.dataset.rosterAngle = rosterAngle;
    })
    
}

rosterShips.forEach(rostership => {
    rostership.addEventListener('dragstart', dragShipStart)
})

rosterShips.forEach(rostership => {
    rostership.addEventListener('dragend',dragShipEnd)
})


function dragShipStart(e){
    console.log('drag-start');
    // console.log(this.getAttribute('data-size'));
    let dataSize = this.getAttribute('data-size');
    // console.log(this.getAttribute('data-name'));
    let dataName = this.getAttribute('data-name');
    console.log('text', dataSize +','+ dataName)
    e.dataTransfer.setData('text', dataSize +','+ dataName);

  }

function dragShipEnd(){
    console.log('drag-end')
}
