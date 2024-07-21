/*-------------------------------- Constants --------------------------------*/


/*------------------------ Cached Element References ------------------------*/
const gameAreaEl = document.querySelector(".gameArea");
console.log(gameAreaEl);
const arrowKeysEl = document.querySelectorAll('.arrowKeys i'); // Query all arrow key elements
console.log(arrowKeysEl);
const scoreEl = document.querySelector('.score');
console.log(scoreEl);
const highScoreEl = document.querySelector('.highScore');
console.log(highScoreEl);
// Important note to have querySelectors at the start of code -> affects the code
/*---------------------------- Variables (state) ----------------------------*/
let gameEnd = false;
// will be turned to true when there is collision in the future
let score = 0;
// current score 
let highScore = localStorage.getItem("highScore") || 0; 
// Retrieve the high score for the session, from localStorage or set to 0 if there is none
highScoreEl.innerText = `High Score: ${highScore}`; 
// Display the high score in the html format

let snakePosition = {
    x: 10,
    y: 10,
};
// give a snake starting position
let foodPosition = {
    x: 10,
    y: 10,
}
// give food position, x and y will not matter here due to later function

let xMS = 0;
let yMS = 0;
// movement speed variable
let snakeBody = [];
// snake body in array to push elements into it everytime food is consumed
let gameTime;
// to use for reset 
// /*-------------------------------  Render Functions --------------------------*/
function renderGame() {
    gameAreaEl.innerHTML = "";
    initialSnake();
    initialFood();
}
// clears html of the game area 
// show snake and food at starting position
// /*-------------------------------- Functions --------------------------------*/
function initialFood() {
    const foodEl = document.createElement("div");
    foodEl.classList.add("food");
    foodEl.style.gridArea = `${foodPosition.y} / ${foodPosition.x}`; // Set the food's position
    gameAreaEl.append(foodEl);
}
// create food

// Initialize Snake
function initialSnake() {
    for (const segment of snakeBody) {
        const snakeEl = document.createElement("div");
        snakeEl.classList.add("snake");
        snakeEl.style.gridArea = `${segment[1]} / ${segment[0]}`; // Set the snake's position
        gameAreaEl.append(snakeEl);
    }
    // Add the head of the snake
    const headEl = document.createElement("div");
    headEl.classList.add("head");
    headEl.style.gridArea = `${snakePosition.y} / ${snakePosition.x}`;
    gameAreaEl.append(headEl);
}

// Create New Food
function createFood() {
    foodPosition.x = Math.floor(Math.random() * 20) + 1;
    foodPosition.y = Math.floor(Math.random() * 20) + 1;
}

// Game Over
function gameOver() {
    clearInterval(gameTime);
    alert("You died!");
    location.reload(); // Reload the page
}

// Change Direction
function changeDirection(event) {
    const arrow = event.key || event.target.dataset.key;
    if (arrow === "ArrowUp" && yMS !== 1) {
        xMS = 0;
        yMS = -1;
    // if arrow up pressed && snake not facing down (yMS = 1)
    // snake will turn up
    } else if (arrow === "ArrowDown" && yMS !== -1) {
        xMS = 0;
        yMS = 1;
    // if arrow down pressed && snake not facing up (yMS = -1)
    // snake will turn down
    } else if (arrow === "ArrowLeft" && xMS !== 1) {
        xMS = -1;
        yMS = 0;
    // if arrow left pressed && snake not facing right (xMS = 1)
    // snake will turn left
    } else if (arrow === "ArrowRight" && xMS !== -1) {
        xMS = 1;
        yMS = 0;
    // if arrow right pressed && snake not facing left (xMS = -1)
    // snake will turn right
    }
}

// Initialize Game
function init() {
    if (gameEnd === true) {
        return gameOver();
    }
    // Move snake
    snakePosition.x += xMS;
    snakePosition.y += yMS;

    // Check if the snake has eaten the food
    if (snakePosition.x === foodPosition.x && snakePosition.y === foodPosition.y) {
        createFood();
        snakeBody.push([foodPosition.x, foodPosition.y]);
        score += 10;
        highScore = Math.max(score, highScore);
        localStorage.setItem("highScore", highScore);
        scoreEl.innerText = `Score: ${score}`;
        highScoreEl.innerText = `High Score: ${highScore}`;
    }

    // Move the snake's body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakePosition.x, snakePosition.y];

    // Check for collisions with walls
    if (snakePosition.x <= 0 || snakePosition.x > 20 || snakePosition.y <= 0 || snakePosition.y > 20) {
        gameEnd = true;
    }

    // Check for collisions with itself
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakePosition.x === snakeBody[i][0] && snakePosition.y === snakeBody[i][1]) {
            gameEnd = true;
        }
    }

    // Render the game
    renderGame();
}

// /*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("keydown", changeDirection); // Listen for keydown events for direction changes
arrowKeysEl.forEach(button => button.addEventListener("click", (event) => changeDirection(event)));

// Start Game
createFood();
gameTime = setInterval(init, 100); // Set the game update interval
