function appStart() {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    loadImages();
    if (localStorage.highscore) highscore = localStorage.highscore, scoreDisplay.innerText = `High Score: ${highscore}`;
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
    background.src = "img/background.png";
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
    footer.innerHTML = '<div id="softleft">Pause</div>';
    startScreen.style.display = 'none';
    gameOverDisplay.style.display = 'none';
    scoreDisplay.innerText = 'Score: 0';
    scoreDisplay.style.display = 'block';
    ingame = true;
    draw();
    newNumbers = setInterval(addNewNumbers, 100);
    updateInterval = setInterval(update, 25);
}

function gameOver() {
    footer.innerHTML = `
        <div id="softleft">Tutorial</div>
        <div id="softright">Home</div>
    `
    spawnIntervalTime = 1800;
    timeGone = score = 0;
    left = right = ingame = false;
    clearInterval(newNumbers);
    clearInterval(updateInterval);
    gameOverDisplay.style.display = 'block';
    scoreDisplay.style.display = 'none';
    if (score > highscore) return newHighScore();
    scoreDisplay2.innerHTML = `Score:${score}`;
}

function restart() {
    fallingNumbers = [];
    pauseDisplay.style.display = 'none';
    spawnIntervalTime = 1800;
    timeGone = score = 0;
    left = right = paused = false;
    footer.innerHTML = `
        <div id="softleft">Pause</div>
    `
    player.x = 145;
    player.num = 0;
    player.src = "img/0.png";
    player.img.src = player.src;
    scoreDisplay.innerText = `Score: ${score}`;
}

function pause() {
    paused = true;
    pauseDisplay.style.display = 'block';
    footer.innerHTML = `
        <div id="softleft">Restart</div>
        <div id="softright">Home</div>
    `
}

function tutorial() {
    console.log('tutorial');
}

function home() {
    gameOverDisplay.style.display = 'none';
    pauseDisplay.style.display = 'none';
    scoreDisplay.innerText = `High Score: ${highscore}`
    scoreDisplay.style.display = 'block';
    startScreen.style.display = 'block';
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

function newHighScore() {
    localStorage.highscore = highscore = score;
    scoreDisplay2.innerHTML = `New High Score!<br>Score:${score}`;
}

function update() {
    if (paused) return
    if (left && player.x > 3) player.x -= 2.9;
    if (right && player.x + player.width <= 297) player.x += 2.9;
    fallingNumbers.forEach(number => {
        number.y += number.speed;
        if (number.x + number.width > player.x && number.y + number.height > player.y && number.x < player.x + player.width && number.y < player.y + player.height) {
            if (player.num === number.num) {
                fallingNumbers = fallingNumbers.filter(i => i != number);
                score += number.num + 1;
                scoreDisplay.innerText = `Score: ${score}`;
                if (spawnIntervalTime > 550) {
                    spawnIntervalTime = 1800 - score / 1.55;
                }
                return;
            }
            return gameOver();
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
    player.img.src = "img/" + player.num + ".png";
}

function addNewNumbers() {
    if (paused) return
    if (!(spawnIntervalTime - timeGone <= 0)) return timeGone += 100;
    timeGone = 0;
    number = parseInt(Math.random() * 10);
    let newNumber = {
        num: number,
        x: Math.random() * 260,
        y: Math.random() * -50,
        height: 17,
        width: 33,
        src: "img/" + number + ".png",
        img: new Image(),
        speed: 0.9 + score / 300
    }
    newNumber.img.src = newNumber.src;
    fallingNumbers.push(newNumber);

}

function un$mute() {
    if (gamemusic.paused) {
        gamemusic.play();
        mute = 'Mute';
        footer.innerHTML = `
            <div id="softleft">${mute}</div>
            <div id="softright">Tutorial</div>
        `
        localStorage.mute = mute;
        return;
    }
    gamemusic.pause();
    localStorage.mute = mute = 'Unmute';
    footer.innerHTML = `
        <div id="softleft">${mute}</div>
        <div id="softright">Tutorial</div>
    `
}