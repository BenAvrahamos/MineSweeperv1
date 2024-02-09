'use strict'

var gBoard

var gMagGlassToggled = false
var gMegaHintToggled = false

var hintCord1 = null
var hintCord2 = null

var gGame = {
    isOn: true,
    shownCount: 0,
    correctMarkedCount: 0,
    secsPassed: 0,
    lives: 3,
    hints: 3,
    megaHint: 1
}

var gLevel = {
    SIZE: 4,
    MINES: 2,
    FLAGS: 2
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

function onCellClicked(elCell, cellI, cellJ) {

    if (gGame.isOn === false) return
    //hint section
    if (gMagGlassToggled) { displayHints(cellI, cellJ, gBoard); return }
    if (gMegaHintToggled && hintCord1 === null) { hintCord1 = { cellI, cellJ }, console.log('hintCord1',hintCord1);; return }
    if (gMegaHintToggled && hintCord1 !== null) {
        hintCord2 = { cellI, cellJ },
            displayMegaHints(gBoard); console.log('hintCord2',hintCord2); return
    }
    //-------
    if (gBoard[cellI][cellJ].isMarked) return
    if (elCell.classList.contains('shown')) return
    const isMine = elCell.getAttribute('data-isMine')
    if (isMine === 'true') {
        gGame.lives--
    }
    // if (gBoard[i][j].minesAroundCount) gGame.shownCount++
    elCell.classList.replace('hide', 'shown')

    const elCellId = elCell.getAttribute('id')
    if (elCellId === '0' && !gBoard[cellI][cellJ].isMine) {
        expandShown(cellI, cellJ, gBoard)
    } else { gGame.shownCount++ }
    gBoard[cellI][cellJ].isShown = true

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
    //Lives
    const elLives = document.querySelector('.uI .lives')
    elLives.innerHTML = gGame.lives
    const elSmile = document.querySelector('.smily span')
    if (gGame.lives === 0) elSmile.innerHTML = '🤯'
    if (gGame.shownCount + gGame.correctMarkedCount === gLevel.SIZE ** 2) elSmile.innerHTML = '🥳'
    //flags
    const elFlags = document.querySelector('.uI .flagsLeft')
    elFlags.innerHTML = gLevel.FLAGS
    //hints
    const elMagGlass = document.querySelector('.magnifyingGlass ')
    elMagGlass.textContent = `🔎${gGame.hints}`
    const elMegaHint = document.querySelector('.megaHint ')
    elMegaHint.textContent = `🔬${gGame.megaHint}`

}

function gameState() {
    if (gGame.lives === 0) gGame.isOn = false
    if (gGame.shownCount + gGame.correctMarkedCount === gLevel.SIZE ** 2) gGame.isOn = false
}

function resetGame() {
    gGame = {
        isOn: true,
        shownCount: 0,
        correctMarkedCount: 0,
        secsPassed: 0,
        lives: 3,
        hints: 3,
        megaHint:1
    }
    gLevel.FLAGS = gLevel.MINES
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
            if (j < 0 || j >= board[i].length) continue

            const currCell = board[i][j]
            const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            if (currCell.isShown) continue
            if (currCell.isMarked) continue
            if (!currCell.isMine) {
                currCell.isShown = true
                elCell.classList.replace('hide', 'shown')
            }
            if (currCell.minesAroundCount === 0) expandShown(i, j, gBoard,)
            gGame.shownCount++
        }
    }
}

function changeDifficulty(event) {

    if (event === 1) { gLevel.SIZE = 4, gLevel.MINES = 2, gLevel.FLAGS = 2 }
    if (event === 2) { gLevel.SIZE = 8, gLevel.MINES = 12, gLevel.FLAGS = 12 }
    if (event === 3) { gLevel.SIZE = 12, gLevel.MINES = 23, gLevel.FLAGS = 23 }
    resetGame()
}

function placeFlag(event, elCell, cellI, cellJ, gBoard) {
    event.preventDefault()

    if (gGame.isOn === false) return
    if (elCell.classList.contains('shown')) return
    const currCell = gBoard[cellI][cellJ]

    if (gLevel.FLAGS === 0 && !elCell.classList.contains('flag')) return
    elCell.classList.toggle('flag')
    if (!currCell.isMarked) {
        currCell.isMarked = true
        if (currCell.isMine) {
            gGame.correctMarkedCount++
        }

        gLevel.FLAGS--
    } else {
        currCell.isMarked = false
        if (currCell.isMine) {
            gGame.correctMarkedCount--
        }
        gLevel.FLAGS++


    }

    gameState()
    renderUI()
}



function activeMagnifyingGlass(elMagGlass) {
    if (!gGame.isOn) return
    if (gMegaHintToggled) return
    if (gGame.hints === 0) return
    if (gMagGlassToggled) {
        gMagGlassToggled = false
    } else if (!gMagGlassToggled) {
        gMagGlassToggled = true
    }
    console.log(gMagGlassToggled);
    elMagGlass.classList.toggle('magnifyingGlassToggled')
}


function displayHints(cellI, cellJ, gBoard) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue //skips tiles beyond border of mat
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            // if (i === cellI && j === cellJ) continue//skip self
            if (j < 0 || j >= gBoard[i].length) continue //skips tiles beyond border of mat
            if (gBoard[i][j].isMarked || gBoard[i][j].isShown) continue
            const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCell.classList.replace('hide', 'isHinted')




            setTimeout(() => {
                elCell.classList.replace('isHinted', 'hide')
            }, 1000);
        }
    }
    gGame.hints--
    const elMagGlass = document.querySelector('.magnifyingGlass ')
    elMagGlass.classList.toggle('magnifyingGlassToggled')
    gMagGlassToggled = false
    console.log(gMagGlassToggled);
    renderUI()
}


function activeMegaHint(elMegaHint) {
    if (!gGame.isOn) return
    if (gMagGlassToggled) return
    if (gGame.megaHint === 0) return
    if (gMegaHintToggled) {
        gMegaHintToggled = false
    } else if (!gMegaHintToggled) {
        gMegaHintToggled = true
    }
    elMegaHint.classList.toggle('megaHintToggled')
}

function displayMegaHints(gBoard) {
    const elMegaHint = document.querySelector('.megaHint ')
    if (hintCord1.cellI > hintCord2.cellI || hintCord1.cellJ > hintCord2.cellJ) {
        elMegaHint.classList.toggle('megaHintToggled')
        gMegaHintToggled = false
        hintCord1 = null
        hintCord2 = null
        console.log(gMegaHintToggled);
        console.log('hintcord1', hintCord1);
        return
    }
    for (var i = hintCord1.cellI; i <= hintCord2.cellI; i++) {
        if (i < 0 || i >= gBoard.length) continue //skips tiles beyond border of mat
        for (var j = hintCord1.cellJ; j <= hintCord2.cellJ; j++) {
            console.log('i', i, 'j', j);

            if (j < 0 || j >= gBoard[i].length) continue //skips tiles beyond border of mat
            if (gBoard[i][j].isMarked || gBoard[i][j].isShown) continue
            const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCell.classList.replace('hide', 'isHinted')




            setTimeout(() => {
                elCell.classList.replace('isHinted', 'hide')
            }, 2000);
        }
    }
    gGame.megaHint--
    elMegaHint.classList.toggle('megaHintToggled')
    gMegaHintToggled = false
    renderUI()
    hintCord1 = null
    hintCord2 = null
    console.log(hintCord1, hintCord2);
}