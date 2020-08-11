// document.addEventListener('DOMContentLoaded',() => {
//     const gameGrid = document.querySelector('.gameGrid')
//     let squares = Array.from(document.querySelectorAll('.gameGrid div'))
//     const width = 10
//     //const height = 20
//     const score = document.querySelector('#score')
//     const start_pause = document.querySelector('#start-button')
//
//     const raw_t_tetrimino = [
//         [0, 0, 0],
//         [0, 1, 0],
//         [1, 1, 1]
//     ]
//
//     const raw_o_tetrimino = [
//         [0, 0, 0],
//         [0, 1, 1],
//         [0, 1, 1]
//     ]
//
//     const raw_i_tetrimino = [
//         [0, 0, 1, 0],
//         [0, 0, 1, 0],
//         [0, 0, 1, 0],
//         [0, 0, 1, 0]
//     ]
//
//     const raw_z_tetrimino = [
//         [0, 0, 0],
//         [1, 1, 0],
//         [0, 1, 1]
//     ]
//
//     const raw_s_tetrimino = [
//         [0, 0, 0],
//         [0, 1, 1],
//         [1, 1, 0]
//     ]
//
//     const raw_j_tetrimino = [
//         [0, 0, 0],
//         [1, 0, 0],
//         [1, 1, 1]
//     ]
//     const raw_l_tetrimino = [
//         [0, 0, 0],
//         [0, 0, 1],
//         [1, 1, 1]
//     ]
//
//     const raw_tetriminoes = [raw_t_tetrimino,
//                              raw_o_tetrimino,
//                              raw_i_tetrimino,
//                              raw_z_tetrimino,
//                              raw_s_tetrimino,
//                              raw_j_tetrimino,
//                              raw_l_tetrimino,]
//     var curPos = 3 //match with top left of matrix
//     // var ranNum = 7
//     // while (ranNum === 7) {
//     //     ranNum = Math.floor(Math.random()*7)
//     // }
//     var curTetrimino_raw = getTetriminoRaw()
//     var curTetrimino = condenseTetrimino(curTetrimino_raw)
//
//     //console.log(curTetrimino)
//
//     function getTetriminoRaw() {
//         let ranNum = 7
//         while (ranNum === 7) {
//             ranNum = Math.floor(Math.random()*7)
//         }
//         return(raw_tetriminoes[ranNum])
//     }
//
//     function condenseTetrimino(){
//         let condTetr = curTetrimino_raw.filter(row => row.some(e => e === 1))  // filter the rows that have different values
//                           .map(row => row.slice(0));
//           for(var i = curTetrimino_raw[0].length - 1; i >= 0; i--) {               // for each column (looping backwards so that removing  column won't affect the index i)                                    // getting the value of the i-th column of the first row
//               if(curTetrimino_raw.every(row => row[i] === 0)) {                   // if all rows have the same value as first for the i-th column
//                 condTetr.forEach(row => row.splice(i, 1));                 // then remove the i-th item (column) from each row
//               }
//           }
//       return condTetr;
//     }
//
    // function addgameGridClass(classToAdd) {
    //     curTetrimino.forEach((row, y) => {
    //         row.forEach((value,x) => {
    //             if (value !== 0) {
    //                 console.log(curPos+10*y+x,x,y)
    //                 squares[curPos+10*y+x].classList.add(classToAdd)
    //             }
    //         })
//         })
//     }
//
//     function rmgameGridClass(classToRm) {
//         curTetrimino.forEach((row, y) => {
//             row.forEach((value,x) => {
//                 if (value !== 0) {
//                     squares[curPos+10*y+x].classList.remove(classToRm)
//                 }
//             })
//         })
//     }
//
//     function draw() {
//         addgameGridClass('tetrimino')
//     }
//
//     function undraw() {
//         rmgameGridClass('tetrimino')
//     }
//
//     // function to move tetrimino down one level
//     function moveDown() {
//         //const block = condenseTetrimino(curTetrimino)
//         undraw()
//         curPos += width
//         draw()
//         if (shouldFreeze()){
//             freeze()
//         }
//     }
//     function shouldFreeze() {
//         let temp = curPos + 10*curTetrimino.length
//         let rightUnder = []
//         for (var i=0; i< curTetrimino[0].length; i++) {
//             rightUnder.push(squares[temp+i])
//         }
//         //if (tetrimino[tetrimino.length].some(index => squares[temp+tetrimino.length+index].contains('taken')))
//         let gameGridConditions = rightUnder.some(e => e.classList.contains('taken') || e.classList.contains('bottom-border'))
//         return(gameGridConditions)
//     }
//     function freeze() {
//         addgameGridClass('taken')
//         draw()
//     }
//
//     // move block down every 1 s
//     timerId = setInterval(moveDown, 100)
//
// })
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.fillStyle = '#000';
context.fillRect(0,0,canvas.width,canvas.height);

const block = [
    [0,0,0],
    [1,1,1],
    [0,1,0]
];

const player = {
    'topLeftPos' : [3,0],
    'block' : block
};

const gameGrid = createMatrix(20,10)    //gameGrid to keep track of stuck pieces

function createMatrix(numRow, numCol){
    const newMatrix = [];
    while (numRow !== 0){
        newMatrix.push(new Array(numCol).fill(0));
        numRow--;
    }
    return newMatrix;
}

function blockToGrid(player, gameGrid){
    player['block'].forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1){
                gameGrid[y + player['topLeftPos'][1]][x + player['topLeftPos'][0]] = 1;
            }
        })
    })
}

function collisionExists(player, gameGrid){
    const [block, pos] = [player['block'],player['topLeftPos']];
    //iterate through block
    //check each block component against corresponding position in gameGrid at cur player pos
    for (let x=0; x < block.length; x++){
        for (let y=0; y < block[x].length; y++){
            if (block[y][x] === 1 &&
                (gameGrid[y + pos[1]] === undefined || //did not hit pass border
                gameGrid[y + pos[1]][x + pos[0]] === 1) ){ //spot is taken in gameGrid
                    return true;
                }
        }
    }
    return false;
}

function drawMatrix(block, delta) {
    block.forEach((row, y) => {
        row.forEach((value,x) => {
            if (value === 1) {
                context.fillStyle = 'red';
                context.fillRect((x+delta[0])*24,
                                 (y+delta[1])*24,
                                 24,
                                 24)
            };
        });
    });
}

function draw(){
    context.fillStyle = '#000';
    context.fillRect(0,0,canvas.width,canvas.height);
    drawMatrix(gameGrid, [0,0]);
    drawMatrix(player['block'], player['topLeftPos']);
}

function playerMoveDown(){
    player['topLeftPos'][1] ++; //move down one
    if (collisionExists(player, gameGrid)){
        player['topLeftPos'][1] --; //move back up one
        blockToGrid(player, gameGrid);  //block can't move down, mark this in gameGrid
        player['topLeftPos'] = [3,0]; //go back to row 0, col 3
    }
    stopTime = 0    //reset time elapsed before auto moving down
}

let stopTime = 0; //time elapsed before auto moving down
let maxStopTime = 1000;  //max time before auto moving down
let prevTime = 0;    //prev log time since page load
function update(time = 0){
    console.log(player['topLeftPos'])
    const deltaTime = time - prevTime //diff time between updates
    prevTime = time //updateprevious time since page load

    stopTime += deltaTime   //add to time elapsed since last auto down move
    if (stopTime > maxStopTime){    //time at cur pos is more than max allowed
        playerMoveDown()
    }
    draw()
    requestAnimationFrame(update)
}

document.addEventListener('keydown', event => {
    if (event['key'] === 'ArrowRight'){
        player['topLeftPos'][0] ++;
    }
    else if (event['key'] === 'ArrowLeft'){
        player['topLeftPos'][0] --;
    }
    else if (event['key'] === 'ArrowDown'){
        playerMoveDown()
    }
})
update();
