document.addEventListener('keydown', e => {
    if (e.key == 'SoftLeft') {
        if (paused) return restart();
        if (ingame) return pause();
        if (gameOverDisplay.style.display == 'block') return tutorial();
        un$mute();
    }

    if (e.key == 'SoftRight') {
        if (gameOverDisplay.style.display == 'block' || paused) return home();
        if (ingame) return
        
        tutorial();
    }
});