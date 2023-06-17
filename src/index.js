//----imports
import './style.css';


//---variables
const container = document.getElementsByClassName('container')[0]
const info = document.getElementsByClassName('info')[0]
const roster = document.getElementsByClassName('roster')[0];
const controls = document.getElementsByClassName('controls')[0];
let rosterAngle = '0deg'
let currentPlayer;
let rosterShips = [] 
let player1;
let player2;
let isPlacingShips = true
let RandomShotTracker = []
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
        shipDiv.dataset.rosterAngle = '0deg'
        
        rosterArea.appendChild(shipDiv);
    });

    
    roster.appendChild(rosterArea);

    rosterShips = Array.from(rosterArea.children)

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


    resetBtn.addEventListener('click', reset)
    
    rotateBtn.addEventListener('click', rotate)
    
    
}

function reset(){
    rosterAngle =  '0deg';
    rosterShips = [] 
    container.innerHTML = '';
    roster.innerHTML = '';
    controls.innerHTML = '';
    isPlacingShips = true;
    info.style.fontSize = '';
    RandomShotTracker = []
    info.textContent = 'Player 1: Place your ships'
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
    let ships = [];

    function placeShip(dataCoord, dataDropped){ 
        console.log('dataCoord',dataCoord)
        console.log('dataDropped',dataDropped)
        let grid = document.querySelector(`.grid[data-player="${currentPlayer.name}"]`);
        console.log('grid:',grid)
        let  [col,row] = dataCoord.split(',')
        let [size,name] = dataDropped.split(',')
        console.log(col, row)
        let cell = grid.querySelector(`.cell[data-coord="${col},${row}"]`)
        console.log('cell:',cell)
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
                    cell = grid.querySelector(`.cell[data-coord="${col},${stringRow}"]`)
                    console.log(cell)
                }

                cell.dataset.content = name;
                cell.classList.add(name);

                if (grid.dataset.player === 'player2') {
                    cell.classList.add('player2');
                }
            }


            let newShip = new Ship(name, size);
            ships.push(newShip);
            console.log(currentPlayer.name,ships)

            if (currentPlayer === player1){
            const rosterArea = document.getElementsByClassName('roster-area')[0];
            let rosterItem = rosterArea.getElementsByClassName(`${name}-roster`)[0];
            rosterItem.remove()
            if (currentPlayer.ships.length === 5) {
                isPlacingShips = false;
                info.textContent = 'Player1: Your turn to SHOOT!'
            }
            }
            
        }else {
            info.textContent = 'unable to place ship. try somewhere else.'
            blinkElement(info)
            console.log('unable to place ship. try somewhere else.')    
        } 


    }

   
    return{
        board,
        placeShip,
        name,
        ships,
    }
}


function checkOutOfBounds(col, row, size) {
    let grid = document.querySelector(`.grid[data-player="${currentPlayer.name}"]`);
    console.log('checkOutOfBounds grid:',`.grid[data-player="${currentPlayer.name}"]`)
    console.log(grid)
    let numCol = Number(col);
    let numRow = Number(row);
    let stringCol, stringRow;

    for (let i = 0; i < size; i++) {
        if (rosterAngle === '0deg') {
            console.log('start debug 0deg',row)
            console.log(numCol)
            stringCol = (numCol + i).toString();
            console.log(stringCol)
            console.log(`.cell[data-coord="${stringCol},${row}"]`)
            let cell = grid.querySelector(`.cell[data-coord="${stringCol},${row}"]`);
            console.log(cell)
            if (!cell || cell.dataset.content !== 'water') 
            return 
                false, console.log('fail 0deg')
            
        }
        if (rosterAngle === '90deg') {
            console.log('start debug 90deg',col)
            console.log(numRow)
            stringRow = (numRow + i).toString();
            console.log(stringRow)
            console.log(`.cell[data-coord="${col},${stringRow}"]`)
            let cell = grid.querySelector(`.cell[data-coord="${col},${stringRow}"]`);
            console.log(cell)
            if (!cell || cell.dataset.content !== 'water') return false, console.log('fail 90deg')
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
            cell.dataset.coord = `${row},${col}`
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
    if (!isPlacingShips && cell.parentNode.dataset.player !== currentPlayer.name) {
        

        console.log(cell.dataset.coord)
        if (cell.dataset.content === 'water') {
            cell.dataset.content = 'miss'
            cell.classList.add('miss') 
            info.textContent = 'Miss...'
            blinkElement(info)
            blinkElement(cell)
            console.log('Miss...')  
            switchPlayer()
        }

        if (cell.dataset.content !== 'water' && cell.dataset.content !== 'miss' && cell.dataset.content !== 'hit') {

            let shipName = cell.dataset.content;
            // let ship = currentPlayer.ships
            let ship = currentPlayer.ships.find(ship => ship.name === shipName);
            console.log(shipName)
            console.log(ship)
            console.log(ship.getHits())
            ship.hit()
            console.log(ship)
            console.log(ship.getHits())

            if (ship.isSunk()){
                cell.dataset.content = 'hit'
                cell.classList.add('hit') 
                info.textContent = `Its a HIT! You sank a ${ship.name}`
                console.log(`Its a HIT! You sank a ${ship.name}`)  
                info.style.fontSize = '2rem';
                blinkElement(info)
                blinkElement(cell)
                currentPlayer.ships = currentPlayer.ships.filter(x => x.name !== ship.name)
                console.log(currentPlayer.ships)

                setTimeout(() => {
                    info.style.fontSize = '';
                    checkForGameEnd()
                    switchPlayer()
                }, 2000)

            } else{

                cell.dataset.content = 'hit'
                cell.classList.add('hit') 
                info.textContent = 'Its a HIT!'
                console.log('Its a HIT!')  
                blinkElement(info)
                blinkElement(cell)
                switchPlayer()
        
            }

        }else{
            return
        }

    }
    
    
}



function checkForGameEnd(){
    if(currentPlayer.ships.length === 0) {
        isPlacingShips = true
        setTimeout(function(){
            console.log(` ${currentPlayer}You won! All ships sunk`);
            info.textContent = `You won! All ships sunk`
            info.style.fontSize = '4rem';
            blinkElement(info)
        }, 1000)
        setTimeout(function(){
            blinkElement(info)
        }, 3000)
        setTimeout(function(){
            blinkElement(info)
        }, 5000)
    }    
}


function blinkElement(element) {
    element.classList.add('blink'); // Add the blink class

    setTimeout(() => {
        element.classList.remove('blink'); // Remove the blink class after 1 second
    }, 1000);
}

function handleDrop(e){
    let dataCoord = e.target.getAttribute('data-coord')
    console.log(dataCoord);
    let dataDropped = e.dataTransfer.getData("text");
    console.log('Dropped data: ', dataDropped);
    currentPlayer.placeShip(dataCoord,dataDropped)

}



function Ship(name, length){
    let hits = length
  
    return{
        name,
        length,
        hits,
        hit: function(){
            hits = hits - 1;
        },
        isSunk: function(){
            return hits === 0;
        },
        getHits: function(){
            return hits;
        }
    }
}

//-----------------ship end
//place ship random

function placeShipsRandom(currentPlayer) {
    const shipData = [
        {name: 'destroyer', size: 3},
        {name: 'battleship', size: 4},
        {name: 'submarine', size: 3},
        {name: 'carrier', size: 5},
        {name: 'tug', size: 2}
    ];

    shipData.forEach(ship =>{
        let placed = false;
        while (!placed){
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);
            let dataCoord = `${col},${row}`;
            console.log(dataCoord)
            let dataDropped = `${ship.size},${ship.name}`;
            console.log(dataDropped);

            rosterAngle = Math.random() > 0.5 ? '0deg' : '90deg';
            // rosterAngle = '0deg'
            
            console.log(rosterAngle);

            if (checkOutOfBounds(col, row, ship.size)){
                console.log('placed')
                currentPlayer.placeShip(dataCoord, dataDropped)
                placed = true
                
            }else{
                console.log('NotPlaced')
            }
        }
    })

    rosterAngle = '0deg'
}

function switchPlayer() {
    // toggle currentPlayer between player1 and player2
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    info.textContent = `${currentPlayer.name}: Your turn to SHOOT!`
    blinkElement(info)

    if (currentPlayer === player2){
        info.textContent = `${currentPlayer.name} is aiming....`
        setTimeout(randomShoot, 3000)
    }

    console.log(currentPlayer.name)
}

function randomShoot(){

    let x = (Math.floor(Math.random() * 10)).toString();
    let y = (Math.floor(Math.random() * 10)).toString();
    const grid = document.querySelector(`.grid[data-player="${player1.name}"]`);
    const randomCell = grid.querySelector(`.cell[data-coord="${x},${y}"]`);
    console.log('random', x, y)
    console.log(grid)
    console.log(`.grid[data-coord="${x},${y}"]`)
    console.log(randomCell)
    
    if (!RandomShotTracker.includes(randomCell)){
        RandomShotTracker.push(randomCell)
        cellClickLogic(randomCell)
    }else{
        randomShoot()
    }
}




function game(){

    player1 = new Gameboard('player1')
    player2 = new Gameboard('player2')


    currentPlayer = player1
    console.log(currentPlayer.name)
    displayBoard(player1.board)

    currentPlayer = player2
    console.log(currentPlayer.name)
    displayBoard(player2.board)


    displayRoster();
    displayControls();

    currentPlayer = player2
    placeShipsRandom(currentPlayer)
   
    
    console.log(currentPlayer.name)
    currentPlayer = player1
    console.log(currentPlayer.name)
    
    
}

game()
