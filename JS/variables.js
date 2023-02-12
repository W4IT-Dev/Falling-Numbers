let canvas, ctx, newNumbers, updateInterval, hitNumber;
let background = new Image();

let player = {
    num: 0,
    x: 145,
    y: 127,
    height: 17,
    width: 33,
    src: "/img/0.png",
    img: new Image()
};

let score = highscore = timeGone = 0;
let left = right = ingame = paused = alreadyRespawned = haveRespwanPossibility = onGameOverScreen = false;

let spawnIntervalTime = 1800;

let mute = 'Mute';

let fallingNumbers = [];

// === Audio === 
let gamemusic = new Audio("sound/Komiku-Bicycle.mp3");

// === DOM Stuff ===
let scoreDisplay = [
    document.querySelector('#scoreDisplay'),
    document.querySelector('#gameOverDisplay #respawnPossibilityScreen p'),
    document.querySelector('#gameOverDisplay #gameOver p'),
];

let startScreen = document.querySelector('#startScreen');
let gameOverScreen = [
    document.querySelector('#gameOverDisplay'),
    document.querySelector('#gameOverDisplay #respawnPossibilityScreen'),
    document.querySelector('#gameOverDisplay #gameOver')
]
let pauseScreen = document.querySelector('#pauseDisplay');
let tutorialScreen = document.querySelector('#tutorialDisplay');
let tutorialText = document.querySelector('#tutorialDisplay p');
let footer = document.querySelector('footer');

window.addEventListener('error', e => {
    console.error(e);
})