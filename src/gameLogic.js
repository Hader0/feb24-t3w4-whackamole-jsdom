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
let spawnableAreas = document.getElementsByClassName("whackamoleSpawnArea");
let spawningInterval = null;
let fastSpawningInterval = null;
let despawnerInterval = null;

// Because of funtion hoisting, we can call these functions before they are declared
// These are called as soon as the page loads
toggleGameControlButtons();
toggleGameplayContent();
updateHighScore()

Array.from(spawnableAreas).forEach(area => {
    area.addEventListener("click", (event) => {
        whackamoleHandleClick(event);
    });
});

function toggleCursor() {
    let bodyElement = document.getElementsByTagName("body")[0];
    if (gameTimeRemaining > 0) {
        bodyElement.style.cursor = "url(./assets/hammer.png), auto";
    } else {
        bodyElement.style.cursor = "";
    }
    
}

// Game Score and Timer
function gameTimeStep() {
    // Update score displayed
    scoreDisplayText.innerText = "Score: " + currentGameScore;

    // Update time remaining displayed
    timerDisplayText.innerText = "Time Remaining: " + gameTimeRemaining;

    // Update the highscore based on score ASAP
    updateHighScore();
}

async function spawnMole() {
    // Handle the bug where a pokemon appears once the game is over
    if (gameTimeRemaining <=0) {
        return;
    }

    // Pick a random spawnable area
    let randomNumberWithinArrayRange = Math.floor(Math.random() * spawnableAreas.length);
    let chosenSpawnArea = spawnableAreas[randomNumberWithinArrayRange];

    // Grab an image from PokeAPI
    let randomPokemonNumber = Math.floor(Math.random() * 1025) + 1;
    let apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemonNumber);
    let apiData = await apiResponse.json();

    // Create img with src from PokeAPI
    // let whackamoleImage = document.createElement("img");
    // whackamoleImage.src = apiData.sprites.other.home.front_default;

    // Put img into spawnable area
    chosenSpawnArea.src = apiData.sprites.other.home.front_default;
}

function wipeImagesFromSpawningAreas(){
    // loop through spawnableAreas
    // set the src property of each thing to ""
    Array.from(spawnableAreas).forEach(area => {
        area.src = "";
    });
}

// Increase score when image is clicked
function whackamoleHandleClick(event) {
    if (event.target.src != "") {
        currentGameScore++;
        event.target.src = "";
        console.log("Clicked on a mole! Score increased, it's now: " + currentGameScore);
    }
}

function deleteRandomWhackamole() {
    // Pick one random spawnableArea
    let randomNumberWithinArrayRange = Math.floor(Math.random() * spawnableAreas.length);
    let chosenSpawnArea = spawnableAreas[randomNumberWithinArrayRange];

    // Set it's property to ""
    chosenSpawnArea.src = "";
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
    // Even if the value didn't change
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

    
    wipeImagesFromSpawningAreas();
    // Toggle game controls
    toggleGameControlButtons();
    // Toggle game content
    toggleGameplayContent();
    // Toggle the cursor
    toggleCursor();

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

    // Spawning and despawning intervals
    spawningInterval = setInterval(() => {
        spawnMole();
    }, 1000);
    fastSpawningInterval = setInterval(() => {
        spawnMole();
    }, 500);
    despawnerInterval = setInterval(() => {
        deleteRandomWhackamole();
    }, 500)
}

function stopGame() {
    gameTimeRemaining = 0;

    // Stop all intervals
    clearInterval(gameCountdownInterval);
    clearInterval(gameUpdateInterval);
    clearInterval(spawningInterval);
    clearInterval(fastSpawningInterval);
    clearInterval(despawnerInterval);
    gameTimeStep();

    // Toggle game controls
    toggleGameControlButtons();
    // Toggle game content
    // toggleGameplayContent();
    wipeImagesFromSpawnAreas();
    // Toggle the cursor
    toggleCursor();

    console.log("Stopped the game. Game time remaining is now: " + gameTimeRemaining);
}

startGameButton.addEventListener("click", () => {
    startGame(10);
});

stopGameButton.addEventListener("click", () => {
    stopGame();
});