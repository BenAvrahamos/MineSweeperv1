'use strict'
//--------------------------Utilities----------------------------



//---------------------------Create Matrix----------------------
// function createMat(ROWS, COLS, content = ' ') {
//     const mat = []
//     for (var i = 0; i < ROWS; i++) {
//         const row = []
//         for (var j = 0; j < COLS; j++) {
//             row.push(content)
//         }
//         mat.push(row)
//     }
//     return mat
// }

//-------------------------------Copy Matrix -------------------------
function copyMat(mat) {
    const newMat = []
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = []
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j]
        }
    }
    return newMat
}


//-------------------------------Random Number------------------------
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is inclusive and the minimum is inclusive
}


//-----------------------------RandomColor----------------------------

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}



//------------------------count Neighbors -------------------------
// function countNeighbors(cellI, cellJ, mat, content = '') {
//     var neighborsCount = 0
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= mat.length) continue //skips tiles beyond border of mat
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (i === cellI && j === cellJ) continue//skip self
//             if (j < 0 || j >= mat[i].length) continue //skips tiles beyond border of mat
//             if (cell[i][j] === content) neighborsCount++

//         }
//     }
//     return neighborsCount
// }

//-------------------------Get Specific positions--------------------

function getPos(board,posContent = ' ') {
    const PosList = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            if (currCell === posContent) {
                PosList.push({ i, j })
            }
        }
    }
    return PosList
}