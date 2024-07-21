/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let gameStart = false;
let gameEnd = false;
let score = 0;
// let highScore = localStorage.getItem("highScore") || 0;
// highScoreEl.innerText = `High Score: ${highScore}`;
// snake x and y position
let snakeX = 5;
let snakeY = 5;
// food x and y position
let foodX = 15;
let foodY = 15;
// movement speed
let xMS = 0;
let yMS = 0;
let snakeBody = [];
let gameTime;
// /*------------------------ Cached Element References ------------------------*/
const gameAreaEl = document.querySelector('.gameArea');
console.log(gameAreaEl);
const arrowKeysEl = document.querySelector('.arrowKeys i');
console.log(arrowKeysEl);
const scoreEl = document.querySelector('.score');
console.log(scoreEl);
const highScoreEl = document.querySelector('.highScore');
console.log(highScoreEl);
// /*-------------------------------  Render Functions --------------------------*/
// /*-------------------------------- Functions --------------------------------*/
function createFood() {
    // since we have 20 x 20 space, give x and yrandom from 1 - 20
    foodX = Math.floor(Math.random() * 20) + 1;
    foodY = Math.floor(Math.random() * 20) + 1;
}
createFood();
function gameOver() {
    clearInterval(gameTime);
    alert("You died!")
    //reloads page
    location.reload();
}
function changeDirection(arrow) {
    if (arrow === "ArrowUp" && yMS !== 1) {
        xMS = 0;
        yMS = -1;
    // as long as snake is not facing down, snake will face up
    } else if (arrow === "ArrowDown" && yMS !== -1) {
        xMS = 0;
        yMS = 1;
    // as long as snake is not facing up, snake will face down

    } else if (arrow === "ArrowLeft" && xMS !== 1) {
        xMS = -1;
        yMS = 0;
    // as long as snake is not facing right, snake will face left
    
    } else if (arrow === "ArrowRight" && xMS !== -1) {
        xMS = 1;
        yMS = 0;
    // as long as snake is not facing left, snake will face right
    }

}

function init() {
    if (gameEnd === true) {
        return gameOver();
        // call gameOver if game ends var = true
    }
    //move snake according to x and y movement
    snakeX += xMS;
    snakeY += yMS;
    // adds new class=food in grid based on randomly generated x/y position
    let html = '<div class="food" style="grid-area: ' + foodY + ' / ' + foodX + '"></div>';
    // if snake eats food -> snake position = food position
    if (snakeX === foodX && snakeY === foodY) {
        // create new food whenever the current food is eaten
        createFood();
        // snake body increase in length at the location where food is eaten
        snakeBody.push([foodX, foodY]);
        // update score;
        score += 10;
        // check if highscore or score is higher
        highScore = Math.max(score, highScore);
        // if highscore higher -> save in highscore
        localStorage.setItem("highScore", highScore);
        scoreEl.innerText = `Score: ${score}`;
        highScoreEl.innerText = `High Score: ${highScore}`;
    }
    for (let i = snakeBody - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    } 
    for (let i = 0; i < snakeBody.length; i++) {
        // Adding a div for each part of the snake's body
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // Checking if the snake head hit the body, if so set gameOver to true
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    gameArea.innerHTML = html;
}

createFood();
setIntervalId = setInterval(init, 100);
document.addEventListener("keyup", changeDirection);


        
/*----------------------------- Event Listeners -----------------------------*/

for (let i = 0; i < arrowKeysEl.length; i++) {
    arrowKeys[i].addEventListener("click", () => changeDirection({ key: arrows[i].dataset.key }));
}

/*----------------------------- Executions -----------------------------*/


