let canvas, ctx, newNumbers, updateInterval;
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

let score = highscore = 0;
let left = right = ingame = false;

let spawnIntervalTime = 1800;
let timeGone = 0;

let mute = 'Mute';
let paused = false;

let fallingNumbers = [];

// === Audio === 
let gamemusic = new Audio("sound/Komiku-Bicycle.mp3");

// === DOM Stuff ===
let scoreDisplay = document.querySelector('#scoreDisplay');
let scoreDisplay2 = document.querySelector('#score');
let startScreen = document.querySelector('#startScreen');
let gameOverScreen = document.querySelector('#gameOverDisplay');
let pauseScreen = document.querySelector('#pauseDisplay');
let tutorialScreen = document.querySelector('#tutorialDisplay');
let tutorialText = document.querySelector('#tutorialDisplay p');
let footer = document.querySelector('footer');

window.addEventListener('error', e => {
    console.error(e);
})