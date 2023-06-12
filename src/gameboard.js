function Gameboard(){
    let board = Array(10).fill(null).map(() => Array(10).fill(null))

    return{
        board,
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

export  { Gameboard, displayBoard};
