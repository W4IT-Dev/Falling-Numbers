function appStart() {
    if (!window.navigator.onLine) console.log('User is offline');
    else {
        getKaiAd({
            publisher: ' fe2d9134-74be-48d8-83b9-96f6d803efef',
            app: 'Rubik\'s Cube Timer',
            slot: 'yourSlotName',
            test: 1,
            onerror: err => console.error('Error:', err),
            onready: ad => {
                ad.call('display')

                ad.on('display', () => {
                    if (ingame) pause();
                })
            }
        })
    }

    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    loadImages();
    if (localStorage.highscore) highscore = localStorage.highscore, scoreDisplay[0].innerText = `High Score: ${highscore}`;
    if (localStorage.mute) {
        mute = localStorage.mute;
        if (mute === "Mute") return gamemusic.play();
        gamemusic.pause();
        footer.innerHTML = `
            <div id="softleft">${mute}</div>
            <div id="softright">Tutorial</div>
        `
    }
}

function loadImages() {
    background.src = "img/game/background.png";
    player.img.src = player.src;
}

function draw() {
    ctx.drawImage(background, 0, 0, 300, 250);
    ctx.drawImage(player.img, player.x, player.y, player.width, player.height);
    fallingNumbers.forEach(number => {
        ctx.drawImage(number.img, number.x, number.y, number.width, number.height)
    });
    requestAnimationFrame(draw);
}

function startGame() {
    fallingNumbers = [];
    player.x = 145;
    player.num = 0;
    player.src = "img/game/0.png";
    player.img.src = player.src;
    footer.innerHTML = '<div id="softleft">Pause</div>';
    startScreen.style.display = gameOverScreen[0].style.display = credits.style.display = 'none';
    scoreDisplay[0].innerText = 'Score: 0';
    scoreDisplay[0].style.display = 'block';
    ingame = true;
    draw();
    newNumbers = setInterval(addNewNumbers, 100);
    updateInterval = setInterval(update, 25);
}

function gameOver() {
    left = right = ingame = false;
    clearInterval(newNumbers);
    clearInterval(updateInterval);
    gameOverScreen[0].style.display = 'block';
    scoreDisplay[0].style.display = 'none';
    footer.innerHTML = `
        <div id="softleft">Tutorial</div>
        <div id="softright">Home</div>
        `
    if (!alreadyRespawned && window.navigator.onLine) {

        document.querySelector('#progressbar').classList.add('animate');
        haveRespwanPossibility = true;
        scoreDisplay[1].innerText = `Score: ${score}`;
        gameOverScreen[2].style.display = 'none'
        gameOverScreen[1].style.display = 'block';

        setTimeout(() => {
            if (gameOverScreen[0].style.display == 'block') {
                haveRespwanPossibility = false;
                spawnIntervalTime = 1800;
                gameOverScreen[1].style.display = 'none';
                gameOverScreen[2].style.display = 'block';
                timeGone = 0;
                if (score > highscore) return isNewHighScore();
                scoreDisplay[2].innerText = `Score:${score}`;
            }
            document.querySelector('#progressbar').classList.remove('animate');

        }, 4000)
        return
    }
    haveRespwanPossibility = false;
    spawnIntervalTime = 1800;
    gameOverScreen[2].style.display = 'block';
    timeGone = 0;
    if (score > highscore) return isNewHighScore();
    scoreDisplay[2].innerText = `Score:${score}`;
}

function restart() {
    fallingNumbers = [];
    pauseScreen.style.display = 'none';
    spawnIntervalTime = 1800;
    timeGone = score = 0;
    left = right = paused = false;
    footer.innerHTML = `
        <div id="softleft">Pause</div>
    `
    player.x = 145;
    player.num = 0;
    player.src = "img/game/0.png";
    player.img.src = player.src;
    scoreDisplay[0].innerText = `Score: ${score}`;
}

function pause() {
    paused = true;
    pauseScreen.style.display = 'block';
    footer.innerHTML = `
        <div id="softleft">Restart</div>
        <div id="softright">Home</div>
    `
}

function tutorial() {
    startScreen.style.display = gameOverScreen[0].style.display = scoreDisplay[0].style.display = credits.style.display = 'none'
    tutorialScreen.style.display = 'block'

    footer.innerHTML = `
        <div id="softleft" style="color: #444">Last</div>
        <div style="font-size: 25px;font-weight: 700; position: absolute; left: 50%; transform: translate(-50%, -50%)">SKIP</div>
        <div id="softright">Next</div>
    `
}

function handleTutorialText(move) {
    if (move === 'left') {
        if (tutorialText.innerText.includes('5')) return
        if (tutorialText.innerText.includes('4')) return footer.children[0].style.color = '#444', tutorialText.innerText = "Press Enter/5 to increase the player's number.";
        if (tutorialText.innerText.includes('6')) return tutorialText.innerText = "Press Left/4 to move to the left.";
        if (tutorialText.innerText.includes('Match')) return footer.children[2].innerText = 'Next', tutorialText.innerText = "Press Right/6 to move to the right.";
        return
    }
    if (tutorialText.innerText.includes('5')) return footer.children[0].style.color = '#000', tutorialText.innerHTML = "Press Left/4 to move to the left.";
    if (tutorialText.innerText.includes('4')) return tutorialText.innerText = "Press Right/6 to move to the right.";
    if (tutorialText.innerText.includes('6')) return footer.children[2].innerText = 'Finish', tutorialText.innerText = "Match the player's number to the falling number and collect it to score points.";
    if (tutorialText.innerText.includes('Match')) return endTutorial();
}

function endTutorial() {
    tutorialText.innerText = "Press Enter/5 to increase the player's number.";
    if (onGameOverScreen) {
        tutorialScreen.style.display = 'none';
        gameOverScreen[0].style.display = 'block';
        footer.innerHTML = `
            <div id="softleft">Tutorial</div>
            <div id="softright">Home</div>
        `
        onGameOverScreen = false;
        return
    }
    home();
}

function home() {
    gameOverScreen[0].style.display = pauseScreen.style.display = tutorialScreen.style.display = creditsScreen.style.display = 'none';
    scoreDisplay[0].style.display = startScreen.style.display = credits.style.display = 'block'
    scoreDisplay[0].innerText = `High Score: ${highscore}`
    fallingNumbers = [];
    player.x = 3000;
    clearInterval(newNumbers);
    clearInterval(updateInterval);
    footer.innerHTML = `
        <div id="softleft">${mute}</div>
        <div id="softright">Tutorial</div>
    `
    paused = ingame = false;

}

function isNewHighScore() {
    localStorage.highscore = highscore = score;
    scoreDisplay[2].innerText = `New High Score!<br>Score:${score}`;
    score = 0;
}

function update() {
    if (paused) return

    let speed = 0;
    if (score / 600 > 0.96) {
        speed = 0.96
    } else {
        speed = score / 550;
    };
    if (left && player.x > 3) player.x -= (2.9 + speed);
    if (right && player.x + player.width <= 297) player.x += (2.9 + speed);
    fallingNumbers.forEach(number => {
        number.y += number.speed;
        if (number.x + number.width > player.x && number.y + number.height > player.y && number.x < player.x + player.width && number.y < player.y + player.height) {
            if (player.num === number.num) {
                fallingNumbers = fallingNumbers.filter(i => i != number);
                score += number.num + 1;
                scoreDisplay[0].innerText = `Score: ${score}`;
                if (spawnIntervalTime >= 850) {
                    spawnIntervalTime = 1800 - (score / .2);
                }
                return;
            }
            return gameOver(), hitNumber = number;
        }
        if (number.y > 130) {
            fallingNumbers = fallingNumbers.filter(i => i != number);
            // if (score > 0) score -= parseInt(number.num / 2);
            // scoreDisplay.innerText = `Score: ${score}`;
        }
    });
}

function changePlayerNumber() {
    if (player.num !== 9) {
        player.num++;
    } else {
        player.num = 0;
    }
    player.img.src = "img/game/" + player.num + ".png";
}

function addNewNumbers() {
    if (paused) return
    if (!(spawnIntervalTime - timeGone <= 0)) return timeGone += 100;
    timeGone = 0;
    number = parseInt(Math.random() * 10);
    if (score / 300 > 1.05) {
        speed = 1.05
    } else {
        speed = score / 300
    }
    let newNumber = {
        num: number,
        x: Math.random() * 260,
        y: Math.random() * -30,
        height: 17,
        width: 33,
        src: "img/game/" + number + ".png",
        img: new Image(),
        speed: 0.9 + speed
    }
    newNumber.img.src = newNumber.src;
    fallingNumbers.push(newNumber);
}

function un$mute() {
    if (gamemusic.paused) {
        paused = false;

        gamemusic.play();
        mute = 'Mute';
        footer.innerHTML = `
            <div id="softleft">${mute}</div>
            <div id="softright">Tutorial</div>
        `
        localStorage.mute = mute;
        return;
    }
    paused = true;
    gamemusic.pause();
    localStorage.mute = mute = 'Unmute';
    footer.innerHTML = `
        <div id="softleft">${mute}</div>
        <div id="softright">Tutorial</div>
    `
}