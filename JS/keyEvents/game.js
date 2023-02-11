document.addEventListener('keydown', e => {
    // === PreventDefault ===
    if (e.key.includes('Arrow')) e.preventDefault();

    // === Enter/5 ===
    if (e.key === "Enter" || e.key === "5") {
        // === Watch ad to respawn ===
        if (haveRespwanPossibility) {

            getKaiAd({
                publisher: ' fe2d9134-74be-48d8-83b9-96f6d803efef',
                app: 'Rubik\'s Cube Timer',
                slot: 'yourSlotName',
                test: 1,
                onerror: err => alert('Error displaying the ad ' + err + '\nTry again.'),
                onready: ad => {
                    alreadyRespawned = true;
                    fallingNumbers.forEach(number => {
                        number.y -= 50;
                    })
                    // fallingNumbers = [];
                    footer.innerHTML = '<div id="softleft">Pause</div>'
                    ad.call('display')

                    ad.on('display', () => {
                        gameOverScreen[1].style.display = 'none';

                    })
                    ad.on('close', () => {
                        haveRespwanPossibility = false;
                        alreadyRespawned = ingame = true;
                        newNumbers = setInterval(addNewNumbers, 100);
                        updateInterval = setInterval(update, 25);
                        gameOverScreen[0].style.display = 'none'
                    })
                    ad.on('open', () => {
                        haveRespwanPossibility = false;
                        alreadyRespawned = ingame = true;
                        newNumbers = setInterval(addNewNumbers, 100);
                        updateInterval = setInterval(update, 25);
                        gameOverScreen[0].style.display = 'none'

                    })
                }
            })
            return
        }
        // === Continue game ===
        if (paused) {
            pauseScreen.style.display = 'none';
            footer.innerHTML = `
                <div id="softleft">Pause</div>
            `
            paused = false;
            return
        }

        // === Increase player's number === 
        if (ingame) return changePlayerNumber();

        if (gameOverScreen[0].style.display == 'block') return

        // === Start game ===
        fallingNumbers = [];
        player.x = 145;
        player.num = 0;
        player.src = "img/0.png";
        player.img.src = player.src;
        startGame();
    }

    if (!ingame || paused) return

    // === Move Player === 
    if (e.key == 'ArrowLeft' || e.key == '4') left = true;
    if (e.key == 'ArrowRight' || e.key == '6') right = true;
});

document.addEventListener('keyup', e => {

    if (!ingame) return

    if (e.key == 'ArrowLeft' || e.key == '4') left = false;
    if (e.key == 'ArrowRight' || e.key == '6') right = false;
});