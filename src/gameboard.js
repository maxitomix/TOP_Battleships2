

function Gameboard(){
    let board = Array(10).fill(null).map(() => Array(10).fill(null))

    function placeShip(dataCoord, dataDropped){ 
        let grid = document.getElementsByClassName('grid')[0];
        console.log(grid)
        let orientation;
        rosterAngle === '0deg'? orientation = 'horizontal':'vertical';
        console.log(orientation)
        
        // for (let i = 0; i < length; col++) {
   
        //     grid.dataset.coord = `${row}, ${col}`
        //     grid.dataset.content = 'water'

    }

    return{
        board,
        placeShip
    }
}


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
    cell.dataset.content === 'ship'? 
        cell.dataset.content = 'hit':
        cell.classList.add('miss') 
        cell.dataset.content = 'miss'

}

function handleDrop(e){
    let dataCoord = e.target.getAttribute('data-coord')
    console.log(dataCoord);
    let dataDropped = e.dataTransfer.getData("text");
    console.log('Dropped data: ', dataDropped);
    player1.placeShip(dataCoord,dataDropped )

}


