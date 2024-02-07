'use strict'

var gBoard

var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: 3
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

const MINE = '💥'





function onInInt() {
    gBoard = buildBoard(gLevel.SIZE, gLevel.SIZE)
    renderBoard(gBoard)
    renderUI()

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
    return board

}

function renderBoard(board) {

    const elBoard = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {

            const currCell = board[i][j]
            const minesAroundTile = currCell.minesAroundCount
            const isMine = currCell.isMine

            strHTML += `\t<td id=${minesAroundTile} data-i=${i} data-j=${j} data-isMine=${isMine} class="cell hide" onclick="onCellClicked(this,${i},${j})" >\n`
            strHTML += '<span>'

            if (currCell.isMine) strHTML += MINE
            if (!currCell.isMine && minesAroundTile > 0) strHTML += minesAroundTile
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
    const elCell = cell
    const isMine = elCell.getAttribute('data-isMine')
    if (elCell.classList.contains('shown')) return
    elCell.classList.add('shown')
    if (isMine === 'true') gGame.lives--
    elCell.classList.remove('hide')
    const elCellId = cell.getAttribute('id')
    if (elCellId === '0') revealNeighbors(i, j, gBoard)

    gBoard[i][j].isShown = true
    gGame.shownCount++
    renderUI()
    gameState()

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

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is inclusive and the minimum is inclusive
}

function renderUI() {
    const elLives = document.querySelector('.uI .lives')
    elLives.innerHTML = gGame.lives
    const elSmile = document.querySelector('.smily span')
    if (gGame.lives === 0) elSmile.innerHTML = '🤯'
}

function gameState() {
    if (gGame.lives === 0) gGame.isOn = false


}
function resetGame() {
    gGame.lives = 3
    gGame.isOn = true
    const elSmile = document.querySelector('.smily span')
    elSmile.innerHTML = '😊'
    onInInt()
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
                gGame.shownCount++
                elCell.classList.remove('hide')
                elCell.classList.add('shown')
            }
            // if (currCell.minesAroundCount === 0) revealNeighbors(i, j, gBoard,)
        }
    }

}

function changeDifficulty(event) {
    console.log(event);
    if (event === 1) { gLevel.SIZE = 5 ,gLevel.MINES =2}
    if (event === 2) { gLevel.SIZE = 8 ,gLevel.MINES =14}
    if (event === 3) { gLevel.SIZE = 12 ,gLevel.MINES =32}
    resetGame()
}































