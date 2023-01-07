let canvas, ctx, newNumbers, updateInterval;
let background = new Image();

let player = {
    num: 0,
    x: 150,
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

let fallingNumbers = [];

// === Audio === 
let gamemusic = new Audio("sound/Komiku-Bicycle.mp3");

// === DOM Stuff ===
let scoreDisplay = document.querySelector('#scoreDisplay');
let scoreDisplay2 = document.querySelector('#score');
let startScreen = document.querySelector('#startScreen');
let gameOverDisplay = document.querySelector('#gameOverDisplay');
let footer = document.querySelector('footer');
let sl = document.querySelector('#softleft');
let sr = document.querySelector('#softright');

window.addEventListener('error', e => {
    console.log(e);
})