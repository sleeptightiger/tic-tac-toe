




let row = ['A', 'B', 'C'];
let column = ['0', '1', '2'];


//true === x, false === o
let whosTurn = true;
let gameOver = false;
let isFirstMove = true;


//creat board
var createBoard = function() {

    for (var i = 0; i < row.length; i++) {
        var rowElement = document.createElement('div');
        rowElement.setAttribute('class', `${row[i]}`);
        document.querySelector('.board').appendChild(rowElement);
        for (var j = 0; j < column.length; j++) {
            var boxElement = document.createElement('div');
            boxElement.setAttribute('class', `${row[i]}${column[j]} box`);
            document.querySelector(`.${row[i]}`).appendChild(boxElement);

        }
    }
}

//populate board
function populateBoard() {

    let board = [
        [{}, {}, {}],
        [{}, {}, {}],
        [{}, {}, {}]
    ];
    for (var i = 0; i < row.length; i++) {
        for (var j = 0; j < column.length; j++) {
            let box = {
                mark: '',
                marked: false,
                link: `.${row[i]}${column[j]}`,
            };
            board[i][j] = box;
            let thisBox = board[i][j];
            let boxElement = document.querySelector(`.${row[i]}${column[j]}`);



            boxElement.addEventListener('click', function(event){
                if(!gameOver) {
                    var marked = thisBox.marked;
                    if(thisBox.marked === true) {
                        displayTry();
                    } else {
                        thisBox.marked = true;
                        //console.log('about to mark box');

                        thisBox.mark = turn(true);
                    }


                    displayBoard(board, marked);




                } else {
                    displayAlert();
                }

            });

        }
    }

    return board;
}

function displayAlert() {
    let heading = document.querySelector('.displayTurn');
    heading.innerHTML = `<span class="alert largeAlert">!</span><p>Reset board if you want to play again</p>`;
    //heading.classList.add('isActive');
}

function displayTry() {
    console.log("try going through");
    let heading = document.querySelector('.displayTurn');
    heading.innerHTML = '<span class="alert">!</span><p>Try again</p>';
    //heading.classList.add('isActive');
}

function displayWhosMove() {

    let heading = document.querySelector('.displayTurn');
    //heading.classList.add('isActive');
    let t = turn(true);
    heading.innerHTML = `<span class="${t}">${t}</span><p>Your Move</p>`;
    //heading.classList.add('isActive');

}


// display who's turn
function turn(justChecking) {

    if(justChecking) {
        //rewrite as ternary shorthand
        if(whosTurn) {
            return 'X';
        } else {
            return 'O';
        }
    } else {

        whosTurn = !whosTurn;
    }

}



function isBoardFull(board) {

    let check = true;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if(board[i][j].marked === false) {
                check = false;
                break;
            }
        }
    }
    return check;
}

// check if three in a row
function check3inRow(board, turn) {

    let check = false;

    let count = 0;
    let columnCount = 0;
    let dCount = 0;
    let invDCount = 0;


    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            //check row
            if(board[i][j].mark === turn) {
                count++;
            }
            //check column
            if (board[j][i].mark === turn) {
                columnCount++;
            }
            //check diagonal
            if(i === j && board[i][j].mark === turn) {
                dCount++;
            }
            //check inverse diagonal
            if(((i === 1 && j === 1) || (i === 0 && j === 2) || (i === 2 && j === 0)) && board[i][j].mark === turn) {
                invDCount++;
            }
        }
        //console.log(`dCount: ${dCount}, invDCount: ${invDCount}`);
        if(count === 3 || columnCount === 3 || dCount === 3 || invDCount === 3) {
            check = true;
            break;
        } else {
            count = 0;
            columnCount = 0;
            //dCount = 0;
        }
    }
    console.log(dCount + ' ' + check);
    return check;
}

function getWinner(board, turn) {
    //MUST BE WINNING BOARD
    let check = false;

    let count = 0;
    let columnCount = 0;
    let dCount = 0;
    let invDCount = 0;

    let rows = [];
    let columns = [];
    let diagonal = [];
    let invDiagonal = [];


    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            //check row
            if(board[i][j].mark === turn) {
                count++;
                rows.push(board[i][j].link);
            }
            //check column
            if (board[j][i].mark === turn) {
                columnCount++;
                columns.push(board[j][i].link);
            }
            //check diagonal
            if(i === j && board[i][j].mark === turn) {
                dCount++;
                diagonal.push(board[i][j].link);
                console.log(diagonal);
            }
            //check inverse diagonal
            if(((i === 1 && j === 1) || (i === 0 && j === 2) || (i === 2 && j === 0)) && board[i][j].mark === turn) {
                invDCount++;
                invDiagonal.push(board[i][j].link);
            }
        }
        //console.log(`dCount: ${dCount}, invDCount: ${invDCount}`);
        if(count === 3 || columnCount === 3 || dCount === 3 || invDCount === 3) {
            check = true;
            break;
        } else {
            count = 0;
            columnCount = 0;
            rows = [];
            columns = [];
            //diagonal = [];
            //invDiagonal = [];
        }
    }

    if(rows.length === 3) {
        return rows;
    } else if (columns.length === 3) {
        return columns;
    } else if (diagonal.length == 3) {
        console.log('diagonal returned');
        return diagonal;
    } else if(invDiagonal.length === 3) {
        return invDiagonal;
    }
}

function strike(winners) {
    for (var i = 0; i < winners.length; i++) {
        document.querySelector(winners[i]).classList.add('strike');
    }
}


function displayWinner(turn) {


    let heading = document.querySelector('.displayTurn');

    heading.innerHTML = `<span class="win">${turn}</span><p>You Win!</p>`;
    gameOver = true;
    //heading.classList.add('isActive');
}

function displayDraw() {

    let heading = document.querySelector('.displayTurn');
    heading.innerHTML = `<span class="alert largeAlert">!</span><p>This game is a draw ¯\\_(ツ)_/¯</p>`;
    gameOver = true;
    //heading.classList.add('isActive');
}

function displayBoard(board, isMarked) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            let thisBox = board[i][j];
            let square = document.querySelector(`.${row[i]}${column[j]}`);
            if(board[i][j].marked) {
                square.innerText = `[${board[i][j].mark}]`;
            } else {
                square.innerHTML = '[  &nbsp; ]';
            }

        }
    }

    let checkForThisTurn = turn(true);


    if(!isFirstMove && !isMarked) {

        turn();
    }
    isFirstMove = false;

    if(!isMarked) {

        displayWhosMove();
    }


    if(isBoardFull(board)) {
        displayDraw();
    }

    if(check3inRow(board, checkForThisTurn)) {
        displayWinner(checkForThisTurn);
        let winners = getWinner(board, checkForThisTurn);
        console.log(winners);
        strike(winners);

    }






}




function reset() {

    clearBoard();


    whosTurn = true;
    gameOver = false;
    isFirstMove = true;
    createBoard();
    let nextGame = populateBoard();
    displayBoard(nextGame);

}

function clearBoard() {

    let board = document.querySelector('.board');
    board.innerHTML = '';
}


let button = document.querySelector('button');
button.addEventListener('click', reset);

//GAME IN PLAY
createBoard();
let inGameBoard = populateBoard();
displayBoard(inGameBoard);
