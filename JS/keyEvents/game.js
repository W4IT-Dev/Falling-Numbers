document.addEventListener('keydown', e => {
    // === PreventDefault ===
    if (e.key.includes('Arrow')) e.preventDefault();

    // === Enter/5 ===
    if (e.key === "Enter" || e.key === "5") {
        // === Watch ad to respawn ===
        if (haveRespwanPossibility) {

            getKaiAd({
                publisher: ' fe2d9134-74be-48d8-83b9-96f6d803efef',
                app: 'Falling Numbers',
                slot: 'RespawnAd',
                test: 1,
                onerror: () => alert('Error displaying the ad.\nTry again.'),
                onready: ad => {
                    if (gameOverScreen[0].style.display == 'block') return
                    alreadyRespawned = true;
                    fallingNumbers.forEach(number => {
                        number.y -= 50;
                    })
                    footer.innerHTML = '<div id="softleft">Pause</div>'
                    ad.call('display')

                    ad.on('display', () => {
                        gameOverScreen[1].style.display = 'none';

                    })
                    ad.on('close', () => {
                        haveRespwanPossibility = alreadyRespawned = false;
                        ingame = true;
                        newNumbers = setInterval(addNewNumbers, 100);
                        updateInterval = setInterval(update, 25);
                        gameOverScreen[0].style.display = 'none'
                    })
                    ad.on('open', () => {
                        haveRespwanPossibility = alreadyRespawned = false;
                        ingame = true;
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

        // === Start game ===
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