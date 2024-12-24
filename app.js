

const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const timestamps = [];
let score = 0;
let startTime = null;

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomKey() {
    return keys[getRandomNumber(0, keys.length-1)];
}

function targetRandomKey() {
    const key = document.getElementById(getRandomKey());
    key.classList.add("selected");
    if (!startTime) startTime = Date.now();
}

function updateScore() {
    score++;
    document.getElementById('score').textContent = score;
    
    // Calculate CPM
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    const cpm = Math.round(score / elapsedMinutes);
    document.getElementById('cpm').textContent = cpm;
}

function resetGame() {
    score = 0;
    startTime = null;
    timestamps.length = 0;
    document.getElementById('score').textContent = '0';
    document.getElementById('cpm').textContent = '0';
    const selected = document.querySelector(".selected");
    if (selected) selected.classList.remove("selected");
    targetRandomKey();
}

document.addEventListener("keyup", event => {
    const keyPressed = String.fromCharCode(event.keyCode);
    const keyElement = document.getElementById(keyPressed);
    const highlightedKey = document.querySelector(".selected");
    
    if (!keyElement || !highlightedKey) return;
    
    keyElement.classList.add("hit");
    keyElement.addEventListener('animationend', () => {
        keyElement.classList.remove("hit");
    });
    
    if (keyPressed === highlightedKey.innerHTML) {
        updateScore();
        highlightedKey.classList.remove("selected");
        targetRandomKey();
    }
});

document.getElementById('resetBtn').addEventListener('click', resetGame);

targetRandomKey();