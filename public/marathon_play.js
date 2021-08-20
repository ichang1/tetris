const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

context.fillStyle = "#000";
context.fillRect(0, 0, canvas.width, canvas.height);

const hold_canvas = document.getElementById("tetris-hold");
const hold_context = hold_canvas.getContext("2d");

hold_context.fillStyle = "#000";
hold_context.fillRect(500, 0, hold_canvas.width, hold_canvas.height);

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
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];
const z_rotations = [
  [
    [2, 2, 0],
    [0, 2, 2],
    [0, 0, 0],
  ],
  [
    [0, 0, 2],
    [0, 2, 2],
    [0, 2, 0],
  ],
  [
    [0, 0, 0],
    [2, 2, 0],
    [0, 2, 2],
  ],
  [
    [0, 2, 0],
    [2, 2, 0],
    [2, 0, 0],
  ],
];
const s_rotations = [
  [
    [0, 3, 3],
    [3, 3, 0],
    [0, 0, 0],
  ],
  [
    [0, 3, 0],
    [0, 3, 3],
    [0, 0, 3],
  ],
  [
    [0, 0, 0],
    [0, 3, 3],
    [3, 3, 0],
  ],
  [
    [3, 0, 0],
    [3, 3, 0],
    [0, 3, 0],
  ],
];
const j_rotations = [
  [
    [4, 0, 0],
    [4, 4, 4],
    [0, 0, 0],
  ],
  [
    [0, 4, 4],
    [0, 4, 0],
    [0, 4, 0],
  ],
  [
    [0, 0, 0],
    [4, 4, 4],
    [0, 0, 4],
  ],
  [
    [0, 4, 0],
    [0, 4, 0],
    [4, 4, 0],
  ],
];
const l_rotations = [
  [
    [0, 0, 5],
    [5, 5, 5],
    [0, 0, 0],
  ],
  [
    [0, 5, 0],
    [0, 5, 0],
    [0, 5, 5],
  ],
  [
    [0, 0, 0],
    [5, 5, 5],
    [5, 0, 0],
  ],
  [
    [5, 5, 0],
    [0, 5, 0],
    [0, 5, 0],
  ],
];
const o_rotations = [
  [
    [0, 6, 6],
    [0, 6, 6],
    [0, 0, 0],
  ],
  [
    [0, 0, 0],
    [0, 6, 6],
    [0, 6, 6],
  ],
  [
    [0, 0, 0],
    [6, 6, 0],
    [6, 6, 0],
  ],
  [
    [6, 6, 0],
    [6, 6, 0],
    [0, 0, 0],
  ],
];
const i_rotations = [
  [
    [0, 0, 0, 0],
    [7, 7, 7, 7],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 7, 0],
    [0, 0, 7, 0],
    [0, 0, 7, 0],
    [0, 0, 7, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [7, 7, 7, 7],
    [0, 0, 0, 0],
  ],
  [
    [0, 7, 0, 0],
    [0, 7, 0, 0],
    [0, 7, 0, 0],
    [0, 7, 0, 0],
  ],
];
const jlstz_offset = [
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, -2],
    [1, -2],
  ],
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [0, -2],
    [-1, -2],
  ],
];
const o_offset = [[[0, 0]], [[0, 1]], [[-1, 1]], [[-1, 0]]];
const i_offset = [
  [
    [0, 0],
    [-1, 0],
    [2, 0],
    [-1, 0],
    [2, 0],
  ],
  [
    [-1, 0],
    [0, 0],
    [0, 0],
    [0, -1],
    [0, 2],
  ],
  [
    [-1, -1],
    [1, -1],
    [-2, -1],
    [1, 0],
    [-2, 0],
  ],
  [
    [0, -1],
    [0, -1],
    [0, -1],
    [0, 1],
    [0, -2],
  ],
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
  i_rotations,
];

const numToColor = {
  1: "952D98",
  2: "ED2939",
  3: "69BE28",
  4: "0065BD",
  5: "FF7900",
  6: "FECB00",
  7: "009FDA",
  [-1]: "D3D3D3",
};
const player = {
  curPos: [0, 0],
  nextSeven: [],
  blockNum: 0,
  rotNum: 0,
  holdBlockNum: -1,
  hasHold: false,
  score: 0,
  lines: 0,
  level: 1,
};

var gameGrid = createGrid(20, 10); //gameGrid to keep track of stuck pieces

function generateBlockNum() {
  return Math.floor(Math.random() * 7);
}

function getBlock() {
  //return nextSeven[0][player['rotNum']];
  return all_blocks[player["blockNum"]][player["rotNum"]];
}

function getHoldBlock() {
  return all_blocks[player["holdBlockNum"]][0];
}

function collisionExists(player, gameGrid) {
  const [block, pos] = [getBlock(), player["curPos"]];
  if (pos[1] < 0) {
    //not fully in grid yet
    if (pos[0] >= 0 && block[0].length + pos[0] - 1 <= 9) {
      return false;
    } else {
      return true;
    }
  }
  //iterate through block
  //check each block component against corresponding position in gameGrid at cur player pos
  for (let y = 0; y < block.length; y++) {
    for (let x = 0; x < block[y].length; x++) {
      if (block[y][x] !== 0) {
        if (x + pos[0] < 0) {
          return true; //left border
        } else if (x + pos[0] >= gameGrid[y].length) {
          return true; //right sideborder
        } else if (y + pos[1] >= gameGrid.length) {
          return true; //bottom border
        } else if (gameGrid[y + pos[1]][x + pos[0]] > 0) {
          return true; //another piece
        }
      }
    }
  }
  return false;
}
//make matrix of 0s
function createGrid(numRow, numCol) {
  const newMatrix = [];
  while (numRow !== 0) {
    newMatrix.push(new Array(numCol).fill(0));
    numRow--;
  }
  return newMatrix;
}

//draw current tetrimino to gamegrid
function blockToGrid(player, gameGrid) {
  let block = getBlock();
  block.forEach((row, y) => {
    row.forEach((value, x) => {
      const [posX, posY] = [x + player["curPos"][0], y + player["curPos"][1]];
      if (value !== 0 && posX >= 0 && posY >= 0) {
        gameGrid[posY][posX] = value;
      }
    });
  });
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
    row.forEach((val, x) => {
      if (val !== 0) {
        context.fillStyle = "#" + numToColor[val];
        context.fillRect((x + delta[0]) * 24, (y + delta[1]) * 24, 24, 24);
      }
    });
  });
}

function drawShadow(block, curPos) {
  //move all the way down
  let mostDownPos = [...curPos];
  while (!collisionExists({ curPos: mostDownPos }, gameGrid)) {
    mostDownPos[1]++;
  }
  mostDownPos[1]--;
  //as down as block can go
  block.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val !== 0) {
        context.fillStyle = "#" + numToColor[-1];
        context.fillRect(
          (x + mostDownPos[0]) * 24,
          (y + mostDownPos[1]) * 24,
          24,
          24
        );
      }
    });
  });
}

function drawHold(block) {
  block.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val !== 0) {
        hold_context.fillStyle = "#" + numToColor[val];
        hold_context.fillRect(x * 24, y * 24, 24, 24);
      }
    });
  });
}

function undrawHold() {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      hold_context.fillStyle = "#000";
      hold_context.fillRect(x * 24, y * 24, 24, 24);
    }
  }
}

//clear lines
function updateGrid(player, gameGrid) {
  let width = gameGrid[0].length;
  // loop backwars to prevent index error when deleting
  let consecutive = 0;
  for (let row = gameGrid.length - 1; row >= 0; row--) {
    if (!gameGrid[row].includes(0) && !gameGrid[row].includes(-1)) {
      const filledRow = gameGrid.splice(row, 1)[0];
      player["score"] += 5;
      player["lines"] += 1;
      consecutive += 1;
      gameGrid.unshift(filledRow.fill(0));
    } else {
      consecutive = 0;
    }
  }
  player["score"] += 10 * Math.floor(consecutive / 2);
}

function updateLevel(player) {
  if (player["lines"] - 15 * player["level"] >= 0) {
    player["level"] += 1;
  }
}

function updateGravity(player) {
  if (maxStopTime > 200) {
    maxStopTime = 1000 - player["level"] * 100;
  }
}

function updateData(player) {
  document.getElementById("score").innerText = "Score: " + player["score"];
  document.getElementById("lines").innerText = player["lines"];
  document.getElementById("level").innerText = "Level: " + player["level"];
}

//function to draw grid and current block
function update() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  updateGrid(player, gameGrid);
  updateData(player);
  updateLevel(player);
  updateGravity(player);
  drawMatrix(gameGrid, [0, 0]);
  drawShadow(getBlock(), player["curPos"]);
  drawMatrix(getBlock(), player["curPos"]);
  if (player["holdBlockNum"] >= 0) {
    undrawHold();
    drawHold(getHoldBlock());
  }
}

//get next 7 pieces
function getSeven() {
  let nextSeven = [0, 1, 2, 3, 4, 5, 6];

  //shuffle
  let ranNum;
  for (let i = 0; i < 7; i++) {
    ranNum = Math.floor(Math.random() * 7);
    [nextSeven[i], nextSeven[ranNum]] = [nextSeven[ranNum], nextSeven[i]];
  }
  return nextSeven;
}

function nextPiece() {
  player["curPos"] = [3, -1]; //go back to row 0, col 3
  if (player["nextSeven"].length > 0) {
    //del leading piece
    player["nextSeven"].shift();
  }
  if (player["nextSeven"].length === 0) {
    player["nextSeven"] = getSeven();
  }
  player["blockNum"] = player["nextSeven"][0];
  player["rotNum"] = 0;
}

//player hard drop
function playerHardDown() {
  while (!collisionExists(player, gameGrid)) {
    player["curPos"][1]++; //move down one
  }
  player["curPos"][1]--; //move back up one
  blockToGrid(player, gameGrid); //block can't move down, mark this in gameGrid
  if (!lose(gameGrid)) {
    nextPiece();
  } else {
    stopTime = 0; //nextPiece time elapsed before auto moving down
    return; //bool athat we lost
  }
  player["hasHold"] = false;
  stopTime = 0;
}

function playerMoveDown() {
  player["curPos"][1]++; //move down one
  if (collisionExists(player, gameGrid)) {
    player["curPos"][1]--; //move back up one
    blockToGrid(player, gameGrid); //block can't move down, mark this in gameGrid
    if (!lose(gameGrid)) {
      player["hasHold"] = false;
      nextPiece();
    } else {
      return true; //bool athat we lost
    }
  }
  stopTime = 0; //nextPiece time elapsed before auto moving down
  return false; //bool that didn't lose yet
}

//move player left and right
function playerMoveLateral(dir) {
  player["curPos"][0] += dir;
  if (collisionExists(player, gameGrid)) {
    player["curPos"][0] -= dir;
  }
}

function rotate(dir) {
  player["rotNum"] = (player["rotNum"] + dir + 4) % 4;
}

function playerRotate(dir) {
  let oldPos = player["curPos"];
  let curBlockNum = player["blockNum"];
  let curRotNum = player["rotNum"];
  rotate(dir);
  let newRotNum = player["rotNum"];
  for (let i = 0; i < 5; i++) {
    let offset;
    if (curBlockNum <= 4) {
      //jlstz
      offset = jlstz_offset[curRotNum][i].map(
        (e, k) => e - jlstz_offset[newRotNum][i][k]
      );
    } else if (curBlockNum === 5) {
      //o
      offset = o_offset[curRotNum][i].map(
        (e, k) => e - o_offset[newRotNum][i][k]
      );
    } else {
      //i
      offset = i_offset[curRotNum][i].map(
        (e, k) => e - i_offset[newRotNum][i][k]
      );
    }
    player["curPos"] = player["curPos"].map((e, k) => e + offset[k]);
    if (!collisionExists(player, gameGrid)) {
      return;
    } else {
      player["curPos"] = oldPos;
    }
  }
  rotate(-dir);
}

function playerHold() {
  //if there is a piece in hold, insert it index 1 in next seven array
  if (player["holdBlockNum"] !== -1) {
    player["nextSeven"].splice(1, 0, player["holdBlockNum"]);
  }
  //hold block is the block at index 0
  player["holdBlockNum"] = player["nextSeven"][0];
  nextPiece();
  player["hasHold"] = true;
}

var stopTime = 0; //time elapsed before auto moving down
var maxStopTime = 1000; //max time before auto moving down
var prevTime = 0; //prev log time since page load
// maybe add a time before locking
function play(time = 0) {
  const deltaTime = time - prevTime; //diff time between updates
  prevTime = time; //updateprevious time since page load

  stopTime += deltaTime; // add to time elapsed since last auto down move
  if (stopTime > maxStopTime) {
    //time at cur pos is more than max allowed
    let lost = playerMoveDown(); //move block down
    if (lost) {
      document.getElementById("lost").innerHTML = "1";
      document.getElementById("hidden-score").value = player["score"];
      document.getElementById("hidden-lines").value = player["lines"];
      document.getElementById("hidden-level").value = player["level"];
      console.log("Game Over!");
      console.log("Final score: " + player["score"]);
      return;
    }
  }
  update();
  requestAnimationFrame(play);
}

document.addEventListener("keydown", (event) => {
  if (!lose(gameGrid)) {
    if (event["key"] === "ArrowRight") {
      playerMoveLateral(1);
    } else if (event["key"] === "ArrowLeft") {
      playerMoveLateral(-1);
    } else if (event["key"] === "ArrowDown") {
      playerMoveDown();
    } else if (event["key"] === "ArrowUp") {
      playerRotate(1);
    } else if (event["key"] === "z") {
      playerRotate(-1);
    } else if (event["key"] === " ") {
      playerHardDown();
    } else if (event["key"] === "Control" && !player["hasHold"]) {
      playerHold();
    }
  }
});

function game() {
  nextPiece();
  gameGrid = createGrid(20, 10);
  play();
}

function lose(gameGrid) {
  return (
    gameGrid[0][3] !== 0 ||
    gameGrid[0][4] !== 0 ||
    gameGrid[0][4] !== 0 ||
    gameGrid[0][6] !== 0
  );
}

game();
