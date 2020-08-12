const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.fillStyle = '#000';
context.fillRect(0,0,canvas.width,canvas.height);

//initial, 1 CW, 2 CW, 3 CW
// 1 => t piece
// 2 => z piece
// 3 => s piece
// 4 => j piece
// 5 => l piece
// 6 => o piece
// 7 => i piece
const t_rotations = [
    [
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ],
    [
        [0,1,0],
        [0,1,1],
        [0,1,0]
    ],
    [
        [0,0,0],
        [1,1,1],
        [0,1,0]
    ],
    [
        [0,1,0],
        [1,1,0],
        [0,1,0]
    ]
];

const z_rotations = [
    [
        [2,2,0],
        [0,2,2],
        [0,0,0]
    ],
    [
        [0,0,2],
        [0,2,2],
        [0,2,0]
    ],
    [
        [0,0,0],
        [2,2,0],
        [0,2,2]
    ],
    [
        [0,2,0],
        [2,2,0],
        [2,0,0]
    ]
];
const s_rotations = [
    [
        [0,3,3],
        [3,3,0],
        [0,0,0]
    ],
    [
        [0,3,0],
        [0,3,3],
        [0,0,3]
    ],
    [
        [0,0,0],
        [0,3,3],
        [3,3,0]
    ],
    [
        [3,0,0],
        [3,3,0],
        [0,3,0]
    ]
];
const j_rotations = [
    [
        [4,0,0],
        [4,4,4],
        [0,0,0]
    ],
    [
        [0,4,4],
        [0,4,0],
        [0,4,0]
    ],
    [
        [0,0,0],
        [4,4,4],
        [0,0,4]
    ],
    [
        [0,4,0],
        [0,4,0],
        [4,4,0]
    ]
];
const l_rotations = [
    [
        [0,0,5],
        [5,5,5],
        [0,0,0]
    ],
    [
        [0,5,0],
        [0,5,0],
        [0,5,5]
    ],
    [
        [0,0,0],
        [5,5,5],
        [5,0,0]
    ],
    [
        [5,5,0],
        [0,5,0],
        [0,5,0]
    ]
];
const o_rotations = [
    [
        [0,6,6],
        [0,6,6],
        [0,0,0]
    ],
    [
        [0,0,0],
        [0,6,6],
        [0,6,6]
    ],
    [
        [0,0,0],
        [6,6,0],
        [6,6,0]
    ],
    [
        [6,6,0],
        [6,6,0],
        [0,0,0]
    ]
];
const i_rotations = [
    [
        [0,0,0,0],
        [7,7,7,7],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [0,0,7,0],
        [0,0,7,0],
        [0,0,7,0],
        [0,0,7,0]
    ],
    [
        [0,0,0,0],
        [0,0,0,0],
        [7,7,7,7],
        [0,0,0,0]
    ],
    [
        [0,7,0,0],
        [0,7,0,0],
        [0,7,0,0],
        [0,7,0,0]
    ]
];
const jlstz_offset = [
  [
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [0,0]
  ],
  [
      [0,0],
      [1,0],
      [1,1],
      [0,-2],
      [1,-2]
  ],
  [
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [0,0]
  ],
  [
      [0,0],
      [-1,0],
      [-1,1],
      [0,-2],
      [-1,-2]
  ]
];
const o_offset = [
    [[0,0]],
    [[0,1]],
    [[-1,1]],
    [[-1,0]]
];
const i_offset = [
    [
        [0,0],
        [-1,0],
        [2,0],
        [-1,0],
        [2,0]
    ],
    [
        [-1,0],
        [0,0],
        [0,0],
        [0,-1],
        [0,2]
    ],
    [
        [-1,-1],
        [1,-1],
        [-2,-1],
        [1,0],
        [-2,0]
    ],
    [
        [0,-1],
        [0,-1],
        [0,-1],
        [0,1],
        [0,-2]
    ]
];
// 1 => t piece
// 2 => z piece
// 3 => s piece
// 4 => j piece
// 5 => l piece
// 6 => o piece
// 7 => i piece
const all_blocks = [
    t_rotations,
    z_rotations,
    s_rotations,
    j_rotations,
    l_rotations,
    o_rotations,
    i_rotations
]

const numToColor = {
    1:'952D98',
    2:'ED2939',
    3:'69BE28',
    4:'0065BD',
    5:'FF7900',
    6:'FECB00',
    7:'009FDA'
}
const player = {
    'curPos' : [0,0],
    'blockNum' : 0,
    'rotNum': 0
};

var gameGrid = createGrid(20,10);    //gameGrid to keep track of stuck pieces

function generateBlockNum(){
    return Math.floor(Math.random()*7);
}

function getBlock(){
    return all_blocks[player['blockNum']][player['rotNum']];
}

function collisionExists(player, gameGrid){
    const [block, pos] = [getBlock(),player['curPos']];
    //iterate through block
    //check each block component against corresponding position in gameGrid at cur player pos
    for (let y=0; y < block.length; y++){
        for (let x=0; x < block[y].length; x++){
            if (block[y][x] !== 0) {
                if (x + pos[0] < 0){
                    return true; //left border
                } else if (x + pos[0] >= gameGrid[y].length){
                    return true; //right sideborder
                } else if (y + pos[1] >= gameGrid.length){
                    return true; //bottom border
                } else if (gameGrid[y + pos[1]][x + pos[0]] !== 0){
                    return true; //another piece
                }
            }
        }
    }
    return false;
}
//make matrix of 0s
function createGrid(numRow, numCol){
    const newMatrix = [];
    while (numRow !== 0){
        newMatrix.push(new Array(numCol).fill(0));
        numRow--;
    }
    return newMatrix;
}

//draw current tetrimino to gamegrid
function blockToGrid(player, gameGrid){
    var block = getBlock();
    block.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0){
                gameGrid[y + player['curPos'][1]][x + player['curPos'][0]] = value;
            }
        })
    })
}

//draw matrix onto board
// 1 => t piece => purple
// 2 => z piece => red
// 3 => s piece => green
// 4 => j piece => dark blue
// 5 => l piece => orange
// 6 => o piece => yellow
// 7 => i piece => light blue
function drawMatrix(block, delta) {
    block.forEach((row, y) => {
        row.forEach((val,x) => {
            if (val !== 0) {
                context.fillStyle = '#'+numToColor[val];
                context.fillRect((x+delta[0])*24,
                                 (y+delta[1])*24,
                                 24,
                                 24);
            }
        });
    });
}

//clear lines
function updateGrid(player, gameGrid){
    let width = gameGrid[0].length
    // loop backwars to prevent index error when deleting
    for (var row=gameGrid.length-1; row >=0; row--){
        if (!gameGrid[row].includes(0)){
            gameGrid.splice(row,1);
            gameGrid.unshift(new Array(width).fill(0));
        }
    }
}

//function to draw grid and current block
function draw(){
    context.fillStyle = '#000';
    context.fillRect(0,0,canvas.width,canvas.height);
    updateGrid(player, gameGrid);
    drawMatrix(gameGrid, [0,0]);
    drawMatrix(getBlock(), player['curPos']);
}

//move player down
function playerMoveDown(){
    player['curPos'][1] ++; //move down one
    if (collisionExists(player, gameGrid)){
        player['curPos'][1] --; //move back up one
        blockToGrid(player, gameGrid);  //block can't move down, mark this in gameGrid
        player['curPos'] = [3,0]; //go back to row 0, col 3
        player['blockNum'] = generateBlockNum();
        player['rotNum'] = 0;
    }
    stopTime = 0;    //reset time elapsed before auto moving down
}

//move player left and right
function playerMoveLateral(dir){
    player['curPos'][0] += dir;
    if (collisionExists(player, gameGrid)){
        player['curPos'][0] -= dir;
    }
}

function rotate(dir) {
    player['rotNum'] = (player['rotNum'] + dir + 4) % 4
}

function playerRotate(dir){
    var oldPos = player['curPos'];
    var curBlockNum = player['blockNum'];
    var curRotNum = player['rotNum'];
    rotate(dir);
    var newRotNum = player['rotNum'];
    for (var i=0; i<5; i++){
        var offset;
        //console.log(newRotNum);
        //console.log(jlstz_offset[newRotNum][i]);
        if (curBlockNum <= 4){  //jlstz
            offset = jlstz_offset[curRotNum][i].map((e,k) => e-jlstz_offset[newRotNum][i][k]);
        } else if (curBlockNum === 5){ //o
            offset = o_offset[curRotNum][i].map((e,k) => e-o_offset[newRotNum][i][k]);
        } else {    //i
            offset = i_offset[curRotNum][i].map((e,k) => e-i_offset[newRotNum][i][k]);
        }
        player['curPos'] = player['curPos'].map((e,k) => e + offset[k]);
        if (!collisionExists(player, gameGrid)){
            return;
        } else {
            player['curPos'] = oldPos;
        }
    }
    rotate(-dir);
}

var stopTime = 0; //time elapsed before auto moving down
var maxStopTime = 1000;  //max time before auto moving down
var prevTime = 0;    //prev log time since page load

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

function play(){
    update();
}

function start(){
    player['curPos'] = [3,0];
    player['blockNum'] = generateBlockNum();
    player['rotNum']= 0;
    gameGrid = createGrid(20,10);
}
function lose(gameGrid){
    return (gameGrid[0][3] !== 0 ||
           gameGrid[0][4] !== 0 ||
           gameGrid[0][4] !== 0 ||
           gameGrid[0][6] !== 0);
}

function game(){
    start();
    play();
}
game();
