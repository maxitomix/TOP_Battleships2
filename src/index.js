//----imports
import './style.css';


//---variables
const container = document.getElementsByClassName('container')[0]
let rosterAngle = '0deg'




//-------------------


//-------------------


const roster = document.getElementsByClassName('roster-area')[0];
const rosterShips = Array.from(roster.children)


const rotateBtn = document.getElementById('rotate');
rotateBtn.addEventListener('click', rotate)

function rotate(){
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
    let dataSize = this.getAttribute('data-size');
    let dataName = this.getAttribute('data-name');
    console.log('text', dataSize +','+ dataName)
    e.dataTransfer.setData('text', dataSize +','+ dataName);

  }

function dragShipEnd(){
    console.log('drag-end')
}



function Gameboard(){
    let board = Array(10).fill(null).map(() => Array(10).fill(null))

    function placeShip(dataCoord, dataDropped){ 
        let grid = document.getElementsByClassName('grid')[0];
        // console.log(grid)
        let  [col,row] = dataCoord.split(',')
        let [size,name] = dataDropped.split(',')
        console.log(col, row)
        let cell = grid.querySelector(`.cell[data-coord="${col},${row}"]`)
        console.log(cell)
        console.log(name,size)

        
        if (checkOutOfBounds(col, row, size)){
            
            let numCol = Number(col)
            let numRow = Number(row)
            let stringCol 
            let stringRow
            for (let i = 0; i < size; i++){
                stringCol = (numCol+i).toString()
                stringRow = (numRow+i).toString()

                if (rosterAngle === '0deg'){
    
                    console.log(`.cell[data-coord="${stringCol},${row}"]`)
                    cell = grid.querySelector(`.cell[data-coord="${stringCol},${row}"]`)
                    console.log(cell)
                
                }
                if (rosterAngle === '90deg'){
                   
                    console.log(`.cell[data-coord="${col},${stringRow}"]`)
                    cell = grid.querySelector(`.cell[data-coord="${col}, ${stringRow}"]`)
                    console.log(cell)
                }

                cell.dataset.content = name;
                cell.classList.add(name)
                let rosterItem = roster.getElementsByClassName(`${name}-roster`)[0];
                rosterItem.remove()
            }
            
        }else {
            console.log('unable to place ship. try somewhere else.')    

    } 

    }

   
    return{
        board,
        placeShip
    }
}


function checkOutOfBounds(col, row, size) {
    let grid = document.getElementsByClassName('grid')[0];
    let numCol = Number(col);
    let numRow = Number(row);
    let stringCol, stringRow;

    for (let i = 0; i < size; i++) {
        if (rosterAngle === '0deg') {
            stringCol = (numCol + i).toString();
            let cell = grid.querySelector(`.cell[data-coord="${stringCol},${row}"]`);
            if (!cell || cell.dataset.content !== 'water') return false;
        }
        if (rosterAngle === '90deg') {
            console.log('start debug',col)
            console.log(numRow)
            stringRow = (numRow + i).toString();
            console.log(stringRow)
            console.log(`.cell[data-coord="${col}, ${stringRow}"]`)
            let cell = grid.querySelector(`.cell[data-coord="${col}, ${stringRow}"]`);
            console.log(cell)
            if (!cell || cell.dataset.content !== 'water') return false;
        }
    }
    return true;
}





//----display-----
function displayBoard(board){
    let content = document.getElementsByClassName('container')[0];
    let grid = document.createElement('div');
    grid.classList.add('grid');
    content.appendChild(grid)
    
    for (let col = 0; col < board.length; col++) {
        for (let row = 0; row < board[col].length; row++) {

            let cell = document.createElement('div');
            cell.dataset.coord = `${row}, ${col}`
            cell.dataset.content = 'water'

            cell.addEventListener('click', () =>{
                cellClickLogic(cell);
            })

            cell.addEventListener('dragover', (e) =>{
                e.preventDefault();
            })

            cell.addEventListener('drop',  handleDrop)

            cell.classList.add('cell');
            grid.appendChild(cell);
        }
    }
}    

function cellClickLogic(cell){
    console.log(cell.dataset.coord)
    if (cell.dataset.content === 'water') {
        cell.dataset.content = 'miss'
        cell.classList.add('miss') 
    }
    if (cell.dataset.content !== 'water' && cell.dataset.content !== 'miss') {
        cell.dataset.content = 'hit'
        cell.classList.add('hit') 
    }
    if (cell.dataset.content === 'miss') {
        return
    }

       

}

function handleDrop(e){
    let dataCoord = e.target.getAttribute('data-coord')
    console.log(dataCoord);
    let dataDropped = e.dataTransfer.getData("text");
    console.log('Dropped data: ', dataDropped);
    player1.placeShip(dataCoord,dataDropped )

}


//---------------ship
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

//---run code 
let destroyerP1 = new Ship('destroyerP1', 3)

console.log(destroyerP1)

let player1 = new Gameboard()
let player2 = new Gameboard()


console.log(player1)
console.log(player2)

displayBoard(player1.board)
displayBoard(player2.board)

console.log(destroyerP1.name)
