// Variables
let gameTimeRemaining = 0;
let defaultGameDuration = 120;
let gameCountdownInterval = null;
let startGameButton = document.getElementById("startGameButton");
let stopGameButton = document.getElementById("stopGameButton");
let gameUpdateInterval = null;
let currentGameScore = 0;
let highestGameScore = 0;
let scoreDisplayText = document.getElementsById("currentGameScore");
let highscoreDisplayText = document.getElementById("highScoreDisplay");
let timerDisplayText = document.getElementById("currentTimeRemaining");

// Game Score and Timer
function gameTimeStep() {
    // Update score displayed
    scoreDisplayText.innerText = "Score: " + currentGameScore;

    // Update time remaining displayed
    timerDisplayText.innerText = "Time Remaining: " + gameTimeRemaining;
}








































function toggleGameControlButtons(){
    // check gameTimeRemaining
    // reveal or hide startGameButton
    // hide or reveal stopGameButton
    
    if (gameTimeRemaining > 0){
        // game has started
        startGameButton.style.display = "none";
        stopGameButton.style.display = "inherit";
    } else {
        // game has finished
        startGameButton.style.display = "inherit";
        stopGameButton.style.display = "none";
    }
}

// Toggle game controls
toggleGameControlButtons();

function startGame(desiredGameTime = defaultGameDuration) {
    gameTimeRemaining = desiredGameTime;
    console.log("Started the game. Game time remaining is now: " + gameTimeRemaining);

    // Toggle game controls
    toggleGameControlButtons();

    gameCountdownInterval = setInterval(() => {
        gameTimeRemaining -= 1;
        console.log("Game time remaining is: " + gameTimeRemaining);

        if (gameTimeRemaining <= 0){
            // If game has no time remaining, stop subtracting it
            clearInterval(gameCountdownInterval);
            console.log("Game has finished!");
            stopGame();
        }
    }, 1000);

    gameUpdateInterval = setInterval(gameTimeStep, 100);
}

function stopGame() {
    gameTimeRemaining = 0;

    // Toggle game controls
    toggleGameControlButtons();

    console.log("Stopped the game. Game time remaining is now: " + gameTimeRemaining);
}

startGameButton.addEventListener("click", () => {
    startGame(5);
});

stopGameButton.addEventListener("click", () => {
    stopGame();
});