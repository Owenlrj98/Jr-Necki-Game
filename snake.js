/*-------------------------------- Constants --------------------------------*/
const gameBoard = {
    width: 500,
    height: 500,
} // playing area size
const snakeSize = 25; //snake size
const snakeSpeed;


/*---------------------------- Variables (state) ----------------------------*/
let snakeBody = [];
//food
//direction
//
//array of all elements of snake
let snakeDirection = {
}
let food = {}
let score = 0;
let gameOver = false;
/*------------------------ Cached Element References ------------------------*/
const gameArea = document.getElementById("gameArea");
const snakeHead = document.getElementById("snake");
const currentScore = document.getElementById("score");
const highScore = document.getElementById()

/*-------------------------------  Render Functions --------------------------*/

/*-------------------------------- Functions --------------------------------*/
function startGame {
// start game
}
function showSnake() {//snake head
}

function moveUp() {
    //change direction up
}

function moveDown() {
//change direction down
}
function moveLeft() {
//change direction left
}
function moveRight() {
// change direction right
}

function moveSnake () {
    //loop snake
}

function firstFood () {}
//spawns first food when game starts
function eatFood () {
    //snake eats food
    //remove food
    //spawns food
}

function collision () {
 //game over prompt
}

const init = () => {
    gamePage.style.display = "block";
    scorePage.style.display = "none";
    startPage.style.display = "none";
    render();
  };

/*----------------------------- Event Listeners -----------------------------*/
snakeHead.addEventListener("keyup",  go up)
// direction listeners

// start button listener = spawn first food, snake starts moving

// menu button listener

// esc button = pause


//display grid within gameboard
// check if grid is empty"
