const mainBoard = document.getElementById('mainBoard');
const failPopup = document.getElementById('failPopup');
const resetButton = document.getElementById('resetButton');
const failText = document.getElementById('failText');
const scoreText = document.getElementById('scoreText');
const highScoreText = document.getElementById('highScoreText');

if (localStorage.getItem("highScore") == 0) {
    localStorage.setItem("highScore","0")
}

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

for (let i = 0; i < 16; i++) {
    mainBoard.innerHTML += '<div class="tile" id="tile' + (i + 1) + '"><p class="number" id="number' + (i + 1) + '"></p></div>';
}

let score = 0;

let board = [
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0
];

let numbers = [number1,number2,number3,number4,number5,number6,number7,number8,number9,number10,number11,number12,number13,number14,number15,number16];
let tiles = [tile1,tile2,tile3,tile4,tile5,tile6,tile7,tile8,tile9,tile10,tile11,tile12,tile13,tile14,tile15,tile16];

let tileRoller;
let tileToSpawnOn;
let winTextIsDisplayed = false;

function checkIfZero(boardNumber,numberNumber,tileNumber) {
    if (board[boardNumber] === 0) {
        numberNumber.innerText = '';
        tileNumber.style.backgroundColor = "rgb(110, 110, 110)";
        tileNumber.style.boxShadow = ('none');
    }
    else {
        numberNumber.innerText = board[boardNumber];
        tileNumber.style.boxShadow = ('5px 5px 10px rgba(0, 0, 0, 0.33)');
        if (board[boardNumber] < 2048) {
            tileNumber.style.backgroundColor = "rgba(187, 145, 55, " + (board[boardNumber] * 0.1) + ")";
        }
        else {
            tileNumber.style.backgroundColor = "rgba(72, 189, 68";
            if (winTextIsDisplayed === false) {
                failText.innerText = ('You Win!!');
                failPopup.style.display = ('block');
                winTextIsDisplayed = true;
            }   
        }
    }
}


function checkAllZero() {
    for (let i = 0; i < 16; i++) {
        checkIfZero(i, numbers[i], tiles[i]);
    }
}

function whichTile() {
    return Math.floor(Math.random() * 15.9)
}

function whichTileNumber() {
    tileRoller = Math.ceil(Math.random() * 4);
    if (tileRoller === 4) {
        return 4;
    }
    else {
        return 2;
    }
}

function spawnTile() {
    tileToSpawnOn = whichTile();

    if (board[tileToSpawnOn] === 0) {
        board[tileToSpawnOn] = whichTileNumber();
        checkAllZero();
    } 
    else {
        spawnTile();
    }
}

spawnTile();
spawnTile();

let tileHasSpawned = false;
let has1Merged = false;
let has2Merged = false;
let has3Merged = false;
let has4Merged = false;

function checkColumn4(column4Tile,column4Check) {
    if (board[column4Check] !== 0) {
        if (board[column4Tile] === 0) {
            board[column4Tile] = board[column4Check];
            board[column4Check] = 0;
            tileHasSpawned = true;
        }
        else if (board[column4Tile] === board[column4Check] && has4Merged === false) {
            has4Merged = true;
            score += board[column4Check] * 2;
            board[column4Tile] *= 2;
            board[column4Check] = 0;
            tileHasSpawned = true;
        }
    }
}

function checkColumn3(column3Tile,column3Check,direction,whichRow) {
    if (board[column3Check] !== 0) {
        if (board[column3Tile] === 0) {
            board[column3Tile] = board[column3Check];
            board[column3Check] = 0;
            if (direction === 'right') {
                if (whichRow === '1') {
                    checkColumn4(3,2);
                }
                else if (whichRow === '2') {
                    checkColumn4(7,6);
                }
                else if (whichRow === '3') {
                    checkColumn4(11,10);
                }
                else if (whichRow === '4') {
                    checkColumn4(15,14);
                }
            }
            else if (direction === 'left') {
                if (whichRow === '1') {
                    checkColumn2(1,2,'left','1');
                }
                else if (whichRow === '2') {
                    checkColumn2(5,6,'left','2');
                }
                else if (whichRow === '3') {
                    checkColumn2(9,10,'left','3');
                }
                else if (whichRow === '4') {
                    checkColumn2(13,14,'left','4');
                }
            }
            else if (direction === 'down') {
                if (whichRow === '1') {
                    checkColumn4(12,8);
                }
                else if (whichRow === '2') {
                    checkColumn4(13,9);
                }
                else if (whichRow === '3') {
                    checkColumn4(14,10);
                }
                else if (whichRow === '4') {
                    checkColumn4(15,11);
                }
            }
            else if (direction === 'up') {
                if (whichRow === '1') {
                    checkColumn2(4,8,'up','1');
                }
                else if (whichRow === '2') {
                    checkColumn2(5,9,'up','2');
                }
                else if (whichRow === '3') {
                    checkColumn2(6,10,'up','3');
                }
                else if (whichRow === '4') {
                    checkColumn2(7,11,'up','4');
                }
            }
            tileHasSpawned = true;
        }
        else if (board[column3Tile] === board[column3Check] && has3Merged === false) {
            has3Merged = true;
            score += board[column3Check] * 2;
            board[column3Tile] *= 2;
            board[column3Check] = 0;
            tileHasSpawned = true;
        }
    }  
}

function checkColumn2(column2Tile,column2Check,direction,whichRow) {
    if (board[column2Check] !== 0) {
        if (board[column2Tile] === 0) {
            board[column2Tile] = board[column2Check];
            board[column2Check] = 0;
            if (direction === 'right') {
                if (whichRow === '1') {
                    checkColumn3(2,1,'right','1');
                }
                else if (whichRow === '2') {
                    checkColumn3(6,5,'right','2');
                }
                else if (whichRow === '3') {
                    checkColumn3(10,9,'right','3');
                }
                else if (whichRow === '4') {
                    checkColumn3(14,13,'right','4');
                }                
            }
            else if (direction === 'left') {
                if (whichRow === '1') {
                    checkColumn1(0,1);
                }
                else if (whichRow === '2') {
                    checkColumn1(4,5);
                }
                else if (whichRow === '3') {
                    checkColumn1(8,9);
                }
                else if (whichRow === '4') {
                    checkColumn1(12,13);
                }
            }
            else if (direction === 'down') {
                if (whichRow === '1') {
                    checkColumn3(8,4,'down','1');
                }
                else if (whichRow === '2') {
                    checkColumn3(9,5,'down','2');
                }
                else if (whichRow === '3') {
                    checkColumn3(10,6,'down','3');
                }
                else if (whichRow === '4') {
                    checkColumn3(11,7,'down','4');
                }                
            }
            else if (direction === 'up') {
                if (whichRow === '1') {
                    checkColumn1(0,4);
                }
                else if (whichRow === '2') {
                    checkColumn1(1,5);
                }
                else if (whichRow === '3') {
                    checkColumn1(2,6);
                }
                else if (whichRow === '4') {
                    checkColumn1(3,7);
                }
            }
            tileHasSpawned = true;
        }
        else if (board[column2Tile] === board[column2Check] && has2Merged === false) {
            has2Merged = true;
            score += board[column2Check] * 2;
            board[column2Tile] *= 2;
            board[column2Check] = 0;
            tileHasSpawned = true;
        }
    }  
}

function checkColumn1(column1Tile,column1Check) {
    if (board[column1Check] !== 0) {
        if (board[column1Tile] === 0) {
            board[column1Tile] = board[column1Check];
            board[column1Check] = 0;

            tileHasSpawned = true;
        }
        else if (board[column1Tile] === board[column1Check] && has1Merged === false) {
            has1Merged = true;
            score += board[column1Check] * 2;
            board[column1Tile] *= 2;
            board[column1Check] = 0;
            tileHasSpawned = true;
        }
    }  
}

function checkForTileSpawn() {
    if (tileHasSpawned === true) {
        spawnTile();
        tileHasSpawned = false;
    }
}

function arrowRight() {
    checkColumn4(3,2);
    checkColumn3(2,1,'right','1');
    checkColumn2(1,0,'right','1');
    has2Merged = false;
    has3Merged = false;
    has4Merged = false;
    checkColumn4(7,6);
    checkColumn3(6,5,'right','2');
    checkColumn2(5,4,'right','2');
    has2Merged = false;
    has3Merged = false;
    has4Merged = false;
    checkColumn4(11,10);
    checkColumn3(10,9,'right','3');
    checkColumn2(9,8,'right','3');
    has2Merged = false;
    has3Merged = false;
    has4Merged = false;
    checkColumn4(15,14);
    checkColumn3(14,13,'right','4');
    checkColumn2(13,12,'right','4');
    has2Merged = false;
    has3Merged = false;
    has4Merged = false;

    checkForTileSpawn();
}

function arrowLeft() {
    checkColumn1(0,1);
    checkColumn2(1,2,'left','1');
    checkColumn3(2,3,'left','1');
    has1Merged = false;
    has2Merged = false;
    has3Merged = false;
    checkColumn1(4,5);
    checkColumn2(5,6,'left','2');
    checkColumn3(6,7,'left','2');
    has1Merged = false;
    has2Merged = false;
    has3Merged = false;
    checkColumn1(8,9);
    checkColumn2(9,10,'left','3');
    checkColumn3(10,11,'left','3');
    has1Merged = false;
    has2Merged = false;
    has3Merged = false;
    checkColumn1(12,13);
    checkColumn2(13,14,'left','4');
    checkColumn3(14,15,'left','4');
    has1Merged = false;
    has2Merged = false;
    has3Merged = false;

    checkForTileSpawn();
}

function arrowDown() {
    checkColumn4(12,8);
    checkColumn3(8,4,'down','1');
    checkColumn2(4,0,'down','1');
    has2Merged = false;
    has3Merged = false;
    has4Merged = false;
    checkColumn4(13,9);
    checkColumn3(9,5,'down','2');
    checkColumn2(5,1,'down','2');
    has2Merged = false;
    has3Merged = false;
    has4Merged = false;
    checkColumn4(14,10);
    checkColumn3(10,6,'down','3');
    checkColumn2(6,2,'down','3');
    has2Merged = false;
    has3Merged = false;
    has4Merged = false;
    checkColumn4(15,11);
    checkColumn3(11,7,'down','4');
    checkColumn2(7,3,'down','4');
    has2Merged = false;
    has3Merged = false;
    has4Merged = false;

    checkForTileSpawn();
}

function arrowUp() {
    checkColumn1(0,4);
    checkColumn2(4,8,'up','1');
    checkColumn3(8,12,'up','1');
    has1Merged = false;
    has2Merged = false;
    has3Merged = false;
    checkColumn1(1,5);
    checkColumn2(5,9,'up','2');
    checkColumn3(9,13,'up','2');
    has1Merged = false;
    has2Merged = false;
    has3Merged = false;
    checkColumn1(2,6);
    checkColumn2(6,10,'up','3');
    checkColumn3(10,14,'up','3');
    has1Merged = false;
    has2Merged = false;
    has3Merged = false;
    checkColumn1(3,7);
    checkColumn2(7,11,'up','4');
    checkColumn3(11,15,'up','4');
    has1Merged = false;
    has2Merged = false;
    has3Merged = false;

    checkForTileSpawn();
}

function resetGame() {
    board = [
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0
    ]
    spawnTile();
    spawnTile();
    score = 0;
    updateScore();
    updateHighScore();
    failPopup.style.display = ('none');
    winTextIsDisplayed = false;
}

resetButton.addEventListener('click', function() {
    resetGame();
})

function checkForFail() {
    if (board.includes(0) === false) {
        if (board[0] !== board[1] && board[0] !== board[4] && board[2] !== board[1] && board[2] !== board[3] && board[2] !== board[6] && board[5] !== board[1] && board[5] !== board[4] && board[5] !== board[6] && board[5] !== board[9] && board[7] !== board[3] && board[7] !== board[6] && board[7] !== board[11] && board[8] !== board[4] && board[8] !== board[9] && board[8] !== board[12] && board[10] !== board[6] && board[10] !== board[9] && board[10] !== board[11] && board[10] !== board[14] && board[13] !== board[9] && board[13] !== board[12] && board[13] !== board[14] && board[15] !== board[11] && board[15] !== board[14]) {
            failPopup.style.display = ('block');
        }
    }
}

function updateScore() {
    scoreText.innerText = 'Score: ' + score;
}
function updateHighScore() {
    if (score > localStorage.getItem("highScore")) {
        localStorage.setItem("highScore",score);
    }
    highScoreText.innerText = 'High Score: ' + localStorage.getItem("highScore");
}

document.onkeydown = (e) => {
    e = e || window.event;

    if (e.key === 'ArrowUp') {
        arrowUp();
    } else if (e.key === 'ArrowDown') {
        arrowDown();
    } else if (e.key === 'ArrowLeft') {
        arrowLeft();
    } else if (e.key === 'ArrowRight') {
        arrowRight();
    }
    failPopup.style.display = ('none');
    checkAllZero();
    checkForFail();
    updateScore();
    updateHighScore();
  }


updateScore();
updateHighScore();