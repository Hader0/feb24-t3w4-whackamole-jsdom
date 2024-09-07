// Variables
let gameTimeRemaining = 0;
let defaultGameDuration = 120;
let gameCountdownInterval = null;
let startGameButton = document.getElementById("startGameButton");
let stopGameButton = document.getElementById("stopGameButton");
let gameUpdateInterval = null;
let currentGameScore = 0;
let highestGameScore = 0;
let scoreDisplayText = document.getElementById("currentGameScore");
let highscoreDisplayText = document.getElementById("highScoreDisplay");
let timerDisplayText = document.getElementById("currentTimeRemaining");
let gameRunningInfoContainer = document.getElementById("gameRunningInfo");
let gamePlayContainer = document.getElementById("gameplayArea");

// Because of funtion hoisting, we can call these functions before they are declared
// These are called as soon as the page loads
toggleGameControlButtons();
toggleGameplayContent();
updateHighScore()

// Game Score and Timer
function gameTimeStep() {
    // Update score displayed
    scoreDisplayText.innerText = "Score: " + currentGameScore;

    // Update time remaining displayed
    timerDisplayText.innerText = "Time Remaining: " + gameTimeRemaining;

    // Update the highscore based on score ASAP
    updateHighScore();
}

function toggleGameplayContent(){
    // toggle the score, timer text, and game area elements
    if (gameTimeRemaining > 0){
        gameRunningInfoContainer.style.display = "inherit";
        gamePlayContainer.style.display = "inherit";
    } else {
        gameRunningInfoContainer.style.display = "none";
        gamePlayContainer.style.display = "none";
    }
}

function updateHighScore() {
    // Check localstorage for a highscore
    highestGameScore = localStorage.getItem("highScore") || 0;

    // Compare highscore to current highscore
    // If current score is high than highscore
    if (currentGameScore > highestGameScore) {
        // Write to local storage
        localStorage.setItem("highScore", currentGameScore);

        // Update highscore text
        highestGameScore = currentGameScore;
    }
    
    // Make sure the text is always reflecting the value
    // Even if the valuye didn't change
    highscoreDisplayText.innerText = "High Score: " + highestGameScore;
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

function startGame(desiredGameTime = defaultGameDuration) {
    gameTimeRemaining = desiredGameTime;
    console.log("Started the game. Game time remaining is now: " + gameTimeRemaining);

    // Toggle game controls
    toggleGameControlButtons();
    // Toggle game content
    toggleGameplayContent();

    gameCountdownInterval = setInterval(() => {
        gameTimeRemaining -= 1;
        console.log("Game time remaining is: " + gameTimeRemaining);

        if (gameTimeRemaining <= 0){
            // If game has no time remaining, stop subtracting it
            console.log("Game has finished!");
            stopGame();
        }
    }, 1000);

    gameUpdateInterval = setInterval(gameTimeStep, 100);
}

function stopGame() {
    gameTimeRemaining = 0;

    // Stop all intervals
    clearInterval(gameCountdownInterval);
    clearInterval(gameUpdateInterval);
    gameTimeStep();

    // Toggle game controls
    toggleGameControlButtons();
    // Toggle game content
    toggleGameplayContent();

    console.log("Stopped the game. Game time remaining is now: " + gameTimeRemaining);
}

startGameButton.addEventListener("click", () => {
    startGame(5);
});

stopGameButton.addEventListener("click", () => {
    stopGame();
});