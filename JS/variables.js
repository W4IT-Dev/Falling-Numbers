let canvas, ctx, newNumbers, updateInterval, hitNumber, adCapCounter, gameOverScreenTimeout; 
let background = new Image();

let player = {
    num: 0,
    x: 145,
    y: 127,
    height: 17,
    width: 33,
    src: "/img/game/0.png",
    img: new Image()
};

let score = highscore = timeGone = deathCount = 0;
let left = right = ingame = paused = alreadyRespawned = onGameOverScreen = alreadyRespawned = clickedOnAd = false;
let ableToShowAD = true;

let spawnIntervalTime = 1800;
let mute = 'Mute';

let fallingNumbers = [];

let gamemusic = new Audio("sounds/Komiku-Bicycle.mp3");

let scoreDisplay = [
    document.querySelector('#scoreDisplay'),
    document.querySelector('#gameOverDisplay #respawnScreen p'),
    document.querySelector('#gameOverDisplay #gameOver p')
];

let startScreen = document.querySelector('#startScreen');
let gameOverScreen = document.querySelector('#gameOverDisplay');
let respawnScreen = document.querySelector('#respawnScreen');
let gameScreen = document.querySelector('#gameOver');
let pauseScreen = document.querySelector('#pauseDisplay');
let creditsScreen = document.querySelector('#informationDisplay');
let tutorialScreen = document.querySelector('#tutorialDisplay');
let tutorialText = document.querySelector('#tutorialDisplay p');
let progressbar = document.querySelector('#progressbar');
let loadingAd = document.querySelector('#loadingAd');
let credits = document.querySelector('#credits');
let footer = document.querySelector('footer');