document.addEventListener('keydown', e => {
    if(loadingAd.style.display == "block") return
    if (e.key.includes('Arrow')) e.preventDefault();

    if(e.key == "0") {
        gameOver();
    }

    if (e.key === "Enter" || e.key === "5") {
        if(tutorialScreen.style.display === "block") return
        if (paused) {
            pauseScreen.style.display = 'none';
            footer.innerHTML = `
                <div id="softleft">Pause</div>
            `
            paused = false;
            return
        }

        if (ingame) return increasePlayerNumber();

        if(creditsScreen.style.display == 'block') return
        if(respawnScreen.style.display == 'block') return respawnAd();
        startGame();
    }

    if (!ingame || paused) return

    if (e.key == 'ArrowLeft' || e.key == '4') left = true;
    if (e.key == 'ArrowRight' || e.key == '6') right = true;
});

document.addEventListener('keyup', e => {
    if (!ingame) return

    if (e.key == 'ArrowLeft' || e.key == '4') left = false;
    if (e.key == 'ArrowRight' || e.key == '6') right = false;
});