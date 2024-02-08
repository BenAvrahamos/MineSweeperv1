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
                minesAroundCount: 0, isShown: false,
                isMine: false, isMarked: false
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

            strHTML += `\t<td id=${minesAroundTile} data-i=${i} data-j=${j} data-isMine=${isMine} class="cell hide" onclick="onCellClicked(this,${i},${j},gBoard)"' oncontextmenu="placeFlag(event,this,${i},${j},gBoard)" >\n`
            //decides rendered value of  of cell:
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

function onCellClicked(elCell, i, j) {
    // const temp = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
    // console.log(temp);
    // if (gGame.shownCount === 0) {
    //     elCell.classList.replace('hide', 'shown')
    //     randomMines( i, j)
    //     gBoard[i][j].isShown = true
    //         ; return
    // }

    if (gGame.isOn === false) return
    if (gBoard[i][j].isMarked) return
    if (elCell.classList.contains('shown')) return
    const isMine = elCell.getAttribute('data-isMine')
    if (isMine === 'true') gGame.lives--
    if (gBoard[i][j].minesAroundCount) gGame.shownCount++
    elCell.classList.replace('hide', 'shown')

    const elCellId = elCell.getAttribute('id')
    if (elCellId === '0') expandShown(i, j, gBoard)

    gBoard[i][j].isShown = true
    renderUI()
    gameState()
}

function randomMines( cellI, cellJ) {
    gGame.shownCount++
    for (var i = 0; i < gLevel.MINES; i++) {
        const randomI = getRandomInt(0, gLevel.SIZE - 1)
        const randomJ = getRandomInt(0, gLevel.SIZE - 1)
        if (gBoard[randomI][randomJ].isMine || (randomI === cellI && randomJ === cellJ))
        gBoard[randomI][randomJ].isMine = true

    
    
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
    if (gGame.shownCount + gGame.markedCount === gLevel.SIZE ** 2) elSmile.innerHTML = '🥳'
}

function gameState() {
    if (gGame.lives === 0) gGame.isOn = false
    if (gGame.shownCount + gGame.markedCount === gLevel.SIZE ** 2) gGame.isOn = false
    // console.log('showncount', gGame.shownCount);
    // console.log('markedcount', gGame.markedCount);
    // console.log('maxpoints', gLevel.SIZE ** 2);



}
function resetGame() {
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        lives: 3
    }

    const elSmile = document.querySelector('.smily span')
    elSmile.innerHTML = '😊'
    onInInt()
}





function expandShown(cellI, cellJ, board,) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            const currCell = board[i][j]
            if (currCell.isShown) continue

            if (!currCell.isMine) {
                const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                currCell.isShown = true
                gGame.shownCount++
                elCell.classList.replace('hide', 'shown')
            }
            if (currCell.minesAroundCount === 0) expandShown(i, j, gBoard,)
        }
    }
}

function changeDifficulty(event) {
    if (event === 1) { gLevel.SIZE = 4, gLevel.MINES = 2 }
    if (event === 2) { gLevel.SIZE = 8, gLevel.MINES = 14 }
    if (event === 3) { gLevel.SIZE = 12, gLevel.MINES = 32 }
    resetGame()
}

function placeFlag(event, elCell, cellI, cellJ, gBoard) {
    event.preventDefault()
    if (gGame.isOn === false) return
    if (elCell.classList.contains('shown')) return
    const currCell = gBoard[cellI][cellJ]
    elCell.classList.toggle('flag')
    if (!currCell.isMarked) {
        currCell.isMarked = true
        gGame.markedCount++
    } else {
        currCell.isMarked = false
        gGame.markedCount--
    }
    gameState()
}






























