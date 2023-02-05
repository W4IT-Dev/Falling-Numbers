document.addEventListener('keydown', e => {
    if (e.key == 'SoftLeft') {
        if (paused) return restart();
        if (ingame) return pause();
        if (gameOverScreen.style.display == 'block') return tutorial();
        if (tutorialScreen.style.display == 'block') return handleTutorialText('left');
        un$mute();
    }

    if (e.key == 'SoftRight') {
        if (gameOverScreen.style.display == 'block' || paused) return home();
        if (ingame) return
        if (tutorialScreen.style.display == 'block') return handleTutorialText('right');
        tutorial();
    }

    if (e.key == 'Enter' && tutorialScreen.style.display == 'block') endTutorial();
});