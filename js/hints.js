function activeMagnifyingGlass(elMagGlass) {
    if (!gGame.isOn) return
    if (gMegaHintOn) return
    if (gGame.hints === 0) return
    if (gMagGlassOn) {
        gMagGlassOn = false
    } else if (!gMagGlassOn) {
        gMagGlassOn = true
    }
    elMagGlass.classList.toggle('magnifyingGlassToggled')
}


function displayHints(cellI, cellJ, gBoard) {
    gGame.isOn = false
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue //skips tiles beyond border of mat
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue //skips tiles beyond border of mat
            if (gBoard[i][j].isMarked || gBoard[i][j].isShown) continue
            const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCell.classList.replace('hide', 'isHinted')




            setTimeout(() => {
                elCell.classList.replace('isHinted', 'hide')
                gGame.isOn = true
            }, 1000);
        }
    }
    gGame.hints--
    const elMagGlass = document.querySelector('.magnifyingGlass ')
    elMagGlass.classList.toggle('magnifyingGlassToggled')
    gMagGlassOn = false
    renderUI()
}


function activeMegaHint(elMegaHint) {
    if (!gGame.isOn) return
    if (gMagGlassOn) return
    if (gGame.megaHint === 0) return
    if (gMegaHintOn) {
        gMegaHintOn = false
    } else if (!gMegaHintOn) {
        gMegaHintOn = true
    }
    megaHintLocation1 = null
    megaHintLocation2 = null
    elMegaHint.classList.toggle('megaHintToggled')
}

function displayMegaHints(gBoard) {
    gGame.isOn = false
    var firstI
    var SecondI
    var firstJ
    var SecondJ
    const elMegaHint = document.querySelector('.megaHint ')

    if (megaHintLocation1.cellI < megaHintLocation2.cellI) {
        firstI = megaHintLocation1.cellI
        SecondI = megaHintLocation2.cellI
    } else {
        firstI = megaHintLocation2.cellI
        SecondI = megaHintLocation1.cellI
    }
    if (megaHintLocation1.cellJ < megaHintLocation2.cellJ) {
        firstJ = megaHintLocation1.cellJ
        SecondJ = megaHintLocation2.cellJ
    } else {
        firstJ = megaHintLocation2.cellJ
        SecondJ = megaHintLocation1.cellJ
    }

    for (var i = firstI; i <= SecondI; i++) {
        if (i < 0 || i >= gBoard.length) continue //skips tiles beyond border of mat
        for (var j = firstJ; j <= SecondJ; j++) {


            if (j < 0 || j >= gBoard[i].length) continue //skips tiles beyond border of mat
            if (gBoard[i][j].isMarked || gBoard[i][j].isShown) continue
            const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCell.classList.replace('hide', 'isHinted')




            setTimeout(() => {
                elCell.classList.replace('isHinted', 'hide')
                gGame.isOn = true
            }, 2000)
        }
    }
    gGame.megaHint--
    elMegaHint.classList.toggle('megaHintToggled')
    gMegaHintOn = false
    renderUI()
    megaHintLocation1 = null
    megaHintLocation2 = null
}