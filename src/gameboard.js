function Gameboard(){
    let board = Array(10).fill(null).map(() => Array(10).fill(null))

    return{
        board,
    }
}


function displayBoard(board){
    let content = document.getElementsByClassName('container')[0];
    
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                let cell = document.createElement('div');
                // cell.textContent = board[row][col];
                cell.dataset.coord = `${row}, ${col}`
                cell.addEventListener('click', () =>{
                    console.log(cell.textContent)
                })
                // addClickFunctionality(cell)
                cell.classList.add('cell');
                content.appendChild(cell);
            }
        }
    }    

export  { Gameboard, displayBoard};
