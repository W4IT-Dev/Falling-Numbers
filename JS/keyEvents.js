document.addEventListener('keydown', e => {
    // === PreventDefault ===
    if (e.key.includes('Arrow')) e.preventDefault();

    // === ADD 1 TO PLAYER ===
    if (e.key == 'Enter' || e.key == 5) {
        if (ingame) return changePlayerNumber();
        fallingNumbers = [];
        player.x = 150;
        player.num = 0;
        player.src = "img/0.png";
        player.img.src = player.src;
        startGame();
    }

    if (e.key == 'SoftLeft') {
        if (ingame) return pause();
        if (gameOverDisplay.style.display == 'block') return tutorial();
        un$mute();
    }

    if (e.key == 'SoftRight') {
        if (ingame) return
        if (gameOverDisplay.style.display == 'block') return home();
        tutorial();
    }

    if (!ingame) return;
    // === Move Player === 
    if (e.key == 'ArrowLeft' || e.key == '4') left = true;
    if (e.key == 'ArrowRight' || e.key == '6') right = true;
});

document.addEventListener('keyup', e => {
    if (!ingame) return;

    if (e.key == 'ArrowLeft' || e.key == '4') left = false;
    if (e.key == 'ArrowRight' || e.key == '6') right = false;
});