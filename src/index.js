//----imports
import './style.css';


//---variables
const container = document.getElementsByClassName('container')[0]
const info = document.getElementsByClassName('info')[0]
const roster = document.getElementsByClassName('roster')[0];
const controls = document.getElementsByClassName('controls')[0];
let rosterAngle = '0deg'
let currentPlayer 




//-------------------


//-------roster area

function displayRoster() {
    const rosterArea = document.createElement('div');
    rosterArea.className = 'roster-area';

    const shipData = [
        {name: 'destroyer', size: 3},
        {name: 'battleship', size: 4},
        {name: 'submarine', size: 3},
        {name: 'carrier', size: 5},
        {name: 'tug', size: 2}
    ];

    shipData.forEach(ship => {
        const shipDiv = document.createElement('div');
        shipDiv.className = `${ship.name}-roster ${ship.name}`;
        shipDiv.draggable = 'true';
        shipDiv.dataset.name = ship.name;
        shipDiv.dataset.size = ship.size;
        
        rosterArea.appendChild(shipDiv);
    });

    // Append the rosterArea to your container (or another element in your DOM)
    
    roster.appendChild(rosterArea);

    const rosterShips = Array.from(rosterArea.children)

    rosterShips.forEach(rostership => {
        rostership.addEventListener('dragstart', dragShipStart)
    })
    
    rosterShips.forEach(rostership => {
        rostership.addEventListener('dragend',dragShipEnd)
    })

    return 
}






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

//-----------end roster area------------------------------------------------------------
//----controls area----------

function displayControls(){
    // Create the rotate button
    const rotateBtn = document.createElement('button');
    rotateBtn.id = 'rotate';
    rotateBtn.textContent = 'Rotate';

    // Create the reset button
    const resetBtn = document.createElement('button');
    resetBtn.id = 'reset';
    resetBtn.textContent = 'Reset Game';

    // Append the buttons to the parent element
    controls.appendChild(rotateBtn);
    controls.appendChild(resetBtn);

    
    
    
    
    // const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', reset)
    
   
    // const rotateBtn = document.getElementById('rotate');
    rotateBtn.addEventListener('click', rotate)
    
    
}

function reset(){
    rosterAngle =  '0deg';
    container.innerHTML = '';
    game()
}

function rotate(){
    rosterAngle ===  '0deg'? rosterAngle = '90deg': rosterAngle = '0deg'
    rosterShips.forEach(rostership => {
        rostership.style.transform = `rotate(${rosterAngle})`;
        rostership.dataset.rosterAngle = rosterAngle;
    })
}

//----controls area end----------

function Gameboard(name){
    let board = Array(10).fill(null).map(() => Array(10).fill(null));
    
    function placeShip(dataCoord, dataDropped){ 
        // let grid = document.getElementsByClassName('grid')[0];
        // let grid = currentPlayer.board
        let grid = document.querySelector(`.grid[data-player="${currentPlayer.name}"]`);
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

            }

            const rosterArea = document.getElementsByClassName('roster-area')[0];
            let rosterItem = rosterArea.getElementsByClassName(`${name}-roster`)[0];
            rosterItem.remove()
            
        }else {
            info.textContent = 'unable to place ship. try somewhere else.'
            console.log('unable to place ship. try somewhere else.')    
        } 


    }

   
    return{
        board,
        placeShip,
        name
    }
}


function checkOutOfBounds(col, row, size) {
    // let grid = document.getElementsByClassName('grid')[0];
    let grid = document.querySelector(`.grid[data-player="${currentPlayer.name}"]`);
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
    grid.dataset.player = currentPlayer.name;
    content.appendChild(grid);

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
    currentPlayer.placeShip(dataCoord,dataDropped )

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

function game(){
    //---run code 
    // let destroyerP1 = new Ship('destroyerP1', 3)

    // console.log(destroyerP1)

    let player1 = new Gameboard('player1')
    let player2 = new Gameboard('player2')

    currentPlayer = player1


    console.log(player1)
    // console.log(player2)

    displayBoard(player1.board)
    displayRoster();
    displayControls();
    // currentPlayer = 'player2'
    // displayBoard(player2.board)

    // console.log(destroyerP1.name)
}

game()