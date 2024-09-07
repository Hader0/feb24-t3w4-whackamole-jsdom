let gameTimeRemaining = 0;
let defaultGameDuration = 120;
let gameCountdownInterval = null;

function startGame(desiredGameTime = defaultGameDuration) {
    gameTimeRemaining = desiredGameTime;
    console.log("Started the game. Game time remaining is now: " + gameTimeRemaining);

    gameCountdownInterval = setInterval(() => {
        gameTimeRemaining -= 1;
        console.log("Game time remaining is: " + gameTimeRemaining);

        if (gameTimeRemaining <= 0){
            // If game has no time remaining, stop subtracting it
            clearInterval(gameCountdownInterval);
            console.log("Game has finished!");
        }
    }, 1000)
}

function stopGame() {
    gameTimeRemaining = 0;
    console.log("Stopped the game. Game time remaining is now: " + gameTimeRemaining);
}

let startGameButton = document.getElementById("startGameButton");
startGameButton.addEventListener("click", () => {
    startGame(5);
});

let stopGameButton = document.getElementById("stopGameButton");
stopGameButton.addEventListener("click", () => {
    stopGame();
});