//create board
//populate board with box objects
//box object properties:
//link to appropriate div
//boolean marked
//method if marked display

//creat board
let board = [
    [{}, {}, {}],
    [{}, {}, {}],
    [{}, {}, {}]
];
let row = ['A', 'B', 'C'];
let column = ['0', '1', '2'];


//true === x, false === o
let whosTurn = true;
let gameOver = false;

//populate board
function populateBoard(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            let box = {
                mark: '',
                marked: false,
                link: `.${row[i]}${column[j]}`,
            };
            board[i][j] = box;
        }
    }
    return board;
}

//add click event to each box
function clickable(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            let thisBox = board[i][j];

            let square = document.querySelector(`.${row[i]}${column[j]}`);
            square.addEventListener('click', function(event) {
                //console.log(board);
                //console.log(thisBox.marked);
                if(thisBox.marked === true) {
                    alert('Try Again!');
                } else {
                    if(!gameOver) {

                        // show box as marked
                        thisBox.marked = true;
                        thisBox.mark = turn();
                        gameOver = check3inRow(board);
                        displayBoard(board);
                        if(!gameOver) {
                            whosTurn = !whosTurn;
                        } else {
                            displayWinner();
                        }
                    } else {
                        alert('Please reset the board.');
                    }
                }
            });
        }
    }
    //return board;
}

// display who's turn
function turn() {
    //console.log('TURN function starting');
    if(whosTurn) {
        return 'X';
    } else {
        return 'O';
    }
}

function displayWhosMove() {
    let heading = document.querySelector('.displayTurn');
    let t = turn();
    heading.innerText = `Player ${t}\'s move`;
}


// display mark
function displayMark(divClass) {
    let box = document.querySelector(divClass);
    box.innerText = `[${turn()}]`;
}

// check if three in a row
function check3inRow(board) {
    let check = false;

    let count = 0;
    let columnCount = 0;
    let dCount = 0;
    let invDCount = 0;


    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            //check row
            if(board[i][j].mark === turn()) {
                count++;
            }
            //check column
            if (board[j][i].mark === turn()) {
                columnCount++;
            }
            //check diagonal
            if(i === j && board[i][j].mark === turn()) {
                dCount++;
            }
            //check inverse diagonal
            if((i === j || (i === 0 && j === 2) || (i === 2 && j === 0)) && board[i][j].mark === turn()) {
                invDCount++;
            }
        }
        if(count === 3 || columnCount === 3 || dCount === 3 || invDCount === 3) {
            check = true;
            break;
        } else {
            count = 0;
            columnCount = 0;
        }
    }
    return check;
}


function displayWinner() {
    alert(`Player ${turn()} wins!!`);
}

function displayBoard(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            let thisBox = board[i][j];
            let square = document.querySelector(`.${row[i]}${column[j]}`);
            if(board[i][j].marked) {
                square.innerText = `[${board[i][j].mark}]`;
            } else {
                square.innerText = `[ ]`;
            }

        }
    }
    displayWhosMove();
}


// function reset(board) {
//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[i].length; j++) {
//             let box = {
//                 mark: '',
//                 marked: false,
//                 link: `.${row[i]}${column[j]}`,
//             };
//             board[i][j] = box;
//             let thisBox = board[i][j];
//
//             let square = document.querySelector(`.${row[i]}${column[j]}`);
//             thisBox.marked = false;
//             thisBox.mark = '';
//             unmark(thisBox.link);
//             whosTurn = true;
//             gameOver = false;
//             displayWhosMove();
//         }
//     }
//     return board;
//
// }
//
// function unmark(divClass) {
//     let box = document.querySelector(divClass);
//     box.innerText = "[ ]";
//}

let button = document.querySelector('button');
button.addEventListener('click', function(event) {
    alert('Clicked!');
    //board = reset();
    //console.log(board);
    //populateBoard();
});

//GAME IN PLAY
let inGameBoard = populateBoard(board);
clickable(inGameBoard);
displayBoard(inGameBoard);
