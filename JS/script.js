gamemusic.loop = true;
gamemusic.volume = 0.6;

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState == 'visible' || !ingame) return gamemusic.play();
    pause();
    gamemusic.pause();
});

window.addEventListener('error', e => {
    console.error(e)
})