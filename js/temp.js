function randomMines(gBoard, cellI, CellJ) {
    for (var i = 0; i <= gLevel.MINES - 1; i++) {
        const randomI = getRandomInt(0, gLevel.SIZE)
        const randomJ = getRandomInt(0, gLevel.SIZE)
        while (gBoard[randomI][randomJ].isMine === false) {
            (gBoard[randomI][randomJ].isMine === false) ? gBoard[randomI][randomJ].isMine = true : i - 1

        }
    }
}


function randomMines(gBoard, cellI, CellJ) {
    for (var i = 0; i <= gLevel.MINES; i++) {
        const randomI = getRandomInt(0, gLevel.SIZE)
        const randomJ = getRandomInt(0, gLevel.SIZE)
        if (!gBoard[randomI][randomJ].isMine|| gBoard[cellI][CellJ].isShown) gBoard[randomI][randomJ].isMine = true
    }
}