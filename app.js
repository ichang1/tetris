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

const gameGrid = createMatrix(20,10);    //gameGrid to keep track of stuck pieces

//make matrix of 0s
function createMatrix(numRow, numCol){
    const newMatrix = [];
    while (numRow !== 0){
        newMatrix.push(new Array(numCol).fill(0));
        numRow--;
    }
    return newMatrix;
}

//draw current tetrimino to gamegrid
function blockToGrid(player, gameGrid){
    player['block'].forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0){
                gameGrid[y + player['topLeftPos'][1]][x + player['topLeftPos'][0]] = value;
            }
        })
    })
}

//check if player curPos and curBlock collide with the grid
function collisionExists(player, gameGrid){
    const [block, pos] = [player['block'],player['topLeftPos']];
    //iterate through block
    //check each block component against corresponding position in gameGrid at cur player pos
    for (let y=0; y < block.length; y++){
        for (let x=0; x < block[y].length; x++){
            if  (block[y][x] !== 0 &&
                (x + pos[0] < 0 || //reached left border
                x + pos[0] >= gameGrid[y].length ||   //reached right border
                y + pos[1] >= gameGrid.length ||  //reached bottom border
                gameGrid[y + pos[1]][x + pos[0]] !== 0)) {
                    //spot is taken in gameGrid by another piece
                    return true;
                }
        }
    }
    return false;
}

//draw matrix onto board
function drawMatrix(block, delta) {
    block.forEach((row, y) => {
        row.forEach((value,x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect((x+delta[0])*24,
                                 (y+delta[1])*24,
                                 24,
                                 24);
            };
        });
    });
}

//function to draw grid and current block
function draw(){
    context.fillStyle = '#000';
    context.fillRect(0,0,canvas.width,canvas.height);
    drawMatrix(gameGrid, [0,0]);
    drawMatrix(player['block'], player['topLeftPos']);
}

//move player down
function playerMoveDown(){
    player['topLeftPos'][1] ++; //move down one
    if (collisionExists(player, gameGrid)){
        player['topLeftPos'][1] --; //move back up one
        blockToGrid(player, gameGrid);  //block can't move down, mark this in gameGrid
        player['topLeftPos'] = [3,0]; //go back to row 0, col 3
    }
    stopTime = 0;    //reset time elapsed before auto moving down
}

//move player left and right
function playerMoveLateral(dir){
    player['topLeftPos'][0] += dir;
    if (collisionExists(player, gameGrid)){
        player['topLeftPos'][0] -= dir;
    }
}

//rotate player current piece
function rotate(dir){
    //transpose + reflect = rotate
    for (let y=0; y < block.length; y++){
        for (let x=0; x < y; x++){
            let temp = player['block'][y][x]
            player['block'][y][x] = player['block'][x][y];
            player['block'][x][y] = temp;
        }
    }
    if (dir > 0) {
    //rotate CW by vertial reflect
        player['block'].forEach(row => row.reverse());
    } else {
    //rotate CCW by horizaontal reflect
        player['block'].reverse();
    }
}

function playerRotate(dir){
    rotate(dir);
}

let stopTime = 0; //time elapsed before auto moving down
let maxStopTime = 1000;  //max time before auto moving down
let prevTime = 0;    //prev log time since page load
function update(time = 0){
    const deltaTime = time - prevTime; //diff time between updates
    prevTime = time; //updateprevious time since page load

    stopTime += deltaTime;   //add to time elapsed since last auto down move
    if (stopTime > maxStopTime){    //time at cur pos is more than max allowed
        playerMoveDown();
    }
    draw();
    requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
    if (event['key'] === 'ArrowRight'){
        playerMoveLateral(1);
    } else if (event['key'] === 'ArrowLeft'){
        playerMoveLateral(-1);
    } else if (event['key'] === 'ArrowDown'){
        playerMoveDown();
    } else if (event['key'] === 'ArrowUp'){
        playerRotate(1);
    } else if (event['key'] === 'z'){
        playerRotate(-1);
    }
})
update();
