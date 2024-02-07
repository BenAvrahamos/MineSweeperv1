'use strict'

var gBoard

var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

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
            // if (i === 2 & j === 2) {
            //     board[i][j].isMine = true
            // }
            // if (i === 3 & j === 3) {
            //     board[i][j].isMine = true
            // }

        }
    }
    randomMines(board)
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
    if (gGame.isOn === false) return
    gBoard[i][j].isShown = true
    const elCell = cell
    elCell.classList.add('shown')
    const elCellId = elCell.getAttribute('id')

    console.log(elCellId);
    // if (elCellId === '0') {
    //     revealNeighbors(i, j, gBoard,)
    // }

    elCell.classList.remove('hide')





}


function randomMines(gBoard) {
    for (var i = 0; i <= gLevel.MINES - 1; i++) {
        const randomI = getRandomInt(0, gLevel.SIZE)
        const randomJ = getRandomInt(0, gLevel.SIZE)
        while (gBoard[randomI][randomJ].isMine === false) {
            (gBoard[randomI][randomJ].isMine === false) ? gBoard[randomI][randomJ].isMine = true : i - 1

        }
    }
}














function revealNeighbors(cellI, cellJ, board,) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        // if (board[cellI][cellJ].isShown === true)return
        if (i < 0 || i >= board.length) continue //skips tiles beyond border of mat
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            const currCell = board[i][j]
            if (i === cellI && j === cellJ) continue//skip self
            if (j < 0 || j >= board[i].length) continue //skips tiles beyond border of mat
            if (currCell.isMine === false) {
                const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                currCell.isShown = true
                console.log(currCell.isShown);
                elCell.classList.remove('hide')
                console.log('updated', gBoard);
            }
            if (currCell.minesAroundCount === 0) revealNeighbors(i, j, gBoard,)


        }
    }

}


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is inclusive and the minimum is inclusive
}










































