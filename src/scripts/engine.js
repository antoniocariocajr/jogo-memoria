const persons = [
    "capitanMarvel", "capitanMarvel",
    "capitaoAmerica", "capitaoAmerica",
    "homemAranha", "homemAranha",
    "homemDeFerro", "homemDeFerro",
    "hulk", "hulk",
    "logan", "logan",
    "phoenix", "phoenix",
    "thor", "thor"
];
let openCard = [];
let moves = 0;
let matches = 0;
const totalPairs = persons.length / 2;

// Elements
const gameContainer = document.querySelector(".game");
const movesElement = document.getElementById("moves-count");
const pairsElement = document.getElementById("pairs-count");
const startScreen = document.getElementById("start-screen");
const victoryScreen = document.getElementById("victory-screen");
const finalMovesElement = document.getElementById("final-moves");
const gameContainerDiv = document.getElementById("game-container");

// Buttons link
document.getElementById("start-btn").onclick = startGame;
document.getElementById("restart-btn").onclick = startGame;
document.getElementById("reset").onclick = startGame;

function startGame() {
    // Reset State
    openCard = [];
    moves = 0;
    matches = 0;
    movesElement.textContent = moves;
    pairsElement.textContent = `${matches}/${totalPairs}`;

    // UI Reset
    startScreen.classList.add("hidden");
    victoryScreen.classList.add("hidden");
    gameContainerDiv.classList.remove("hidden");
    gameContainer.innerHTML = ""; // Clear board

    // Shuffle
    let shuffledPersons = [...persons];
    for (let i = shuffledPersons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPersons[i], shuffledPersons[j]] = [shuffledPersons[j], shuffledPersons[i]];
    }

    // Create Cards
    for (let i = 0; i < shuffledPersons.length; i++) {
        let box = document.createElement("div");
        box.className = "item";
        box.classList.add(shuffledPersons[i]);
        box.dataset.value = shuffledPersons[i];
        box.onclick = handleClick;
        gameContainer.appendChild(box);
    }
}

function handleClick() {
    if (openCard.length < 2 && !this.classList.contains("boxOpen") && !this.classList.contains("boxMatch")) {
        this.classList.add("boxOpen");
        openCard.push(this);
    }

    if (openCard.length === 2) {
        moves++; // Increment moves on every pair attempt
        movesElement.textContent = moves;
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (openCard[0].dataset.value === openCard[1].dataset.value) {
        openCard[0].classList.add("boxMatch");
        openCard[1].classList.add("boxMatch");

        matches++;
        pairsElement.textContent = `${matches}/${totalPairs}`;
    } else {
        openCard[0].classList.remove("boxOpen");
        openCard[1].classList.remove("boxOpen");
    }

    openCard = [];

    // Check Victory
    if (matches === totalPairs) {
        showVictory();
    }
}

function showVictory() {
    finalMovesElement.textContent = moves;
    victoryScreen.classList.remove("hidden");
    // Confetti or sound could be added here
}