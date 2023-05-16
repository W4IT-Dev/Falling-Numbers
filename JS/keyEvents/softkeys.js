document.addEventListener('keydown', e => {
    if (e.key == 'SoftLeft') {
        if (paused) return restart();
        if (ingame) return pause();
        if (gameOverScreen.style.display == 'block') return tutorial(), onGameOverScreen = true;
        if (tutorialScreen.style.display == 'block') return handleTutorialText('left');
        un$mute();
    }

    if (e.key == 'SoftRight') {
        if (gameOverScreen.style.display == 'block' || paused) return home();
        if (ingame) return
        if (tutorialScreen.style.display == 'block') return handleTutorialText('right');
        if (creditsScreen.style.display == 'block') return home();
        tutorial();
    }

    if (e.key == 'Enter') {
        if (tutorialScreen.style.display == 'block') return endTutorial();
    }

    if (e.key == '*' && startScreen.style.display == 'block') {
        creditsScreen.style.display = 'block';
        document.querySelector('a').focus();
        footer.innerHTML = `
                <div id="softleft"></div>
                <div style="font-size: 23px;font-weight: 600; position: absolute; left: 50%; transform: translate(-50%, -50%)">OPEN</div>
                <div id="softright">Close</div>
            `
        credits.style.display = 'none';
    }
    if (creditsScreen.style.display == "block") {
        if (e.key === "ArrowDown") return document.querySelectorAll('a')[1].focus();
        if (e.key === "ArrowUp") return document.querySelector('a').focus();
    }
});