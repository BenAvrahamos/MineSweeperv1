'use strict'

var gBoard

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var cell = {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false
}

const MINE = '💣'





function onInInt() {
    gBoard = buildBoard(gLevel.SIZE, gLevel.SIZE)
    renderBoard(gBoard)

}

function buildBoard(ROWS, COLS) {
    const board = []
    for (var i = 0; i < ROWS; i++) {
        board.push([])
        for (var j = 0; j < COLS; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            if (i === 2 & j === 2) {
                board[i][j].isMine = true
            }
            if (i === 3 & j === 3) {
                board[i][j].isMine = true
            }

        }
    }
    setMinesNeighsCount(board)
    console.log(board);
    return board

}

function renderBoard(board) {

    const elBoard = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {

            const currCell = board[i][j]
            const bombsAround = currCell.minesAroundCount

            strHTML += `\t<td id=${bombsAround} data-i=${i} data-j=${j} class="cell hide" onclick="onCellClicked(this,${i},${j})" >\n`
            strHTML += '<span>'

            if (currCell.isMine === true) strHTML += MINE
            if (currCell.isMine === false) strHTML += bombsAround
            strHTML += '</span>'

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'

        elBoard.innerHTML = strHTML

    }
}

function setMinesNeighsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            board[i][j].minesAroundCount = countNeighbors(i, j, board)
        }


    }

    return board
}

function countNeighbors(cellI, cellJ, board,) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue //skips tiles beyond border of mat
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue//skip self
            if (j < 0 || j >= board[i].length) continue //skips tiles beyond border of mat
            if (board[i][j].isMine === true) neighborsCount++

        }
    }
    return neighborsCount
}

function onCellClicked(cell, i, j) {
    const elCell = cell
    const elCellId = elCell.getAttribute('id')
    console.log(elCellId);
    if (elCellId === '0') {
        // revealNeighbors(i, j, gBoard,)
    }

    elCell.classList.remove('hide')





}

// function revealNeighbors(cellI, cellJ, board,) {
//     var neighborsCount = 0
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= board.length) continue //skips tiles beyond border of mat
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (i === cellI && j === cellJ) continue//skip self
//             if (j < 0 || j >= board[i].length) continue //skips tiles beyond border of mat
//             if (board[i][j].isMine === false){
//                 const elCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
//                 // elCell.classList.remove('hide')
//                 console.log(elCell);
                

//             }

//         }
//     }
//     return neighborsCount
// }









































