gamemusic.loop = true;
gamemusic.volume = 0.6;
let paused = false;

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        if (ingame) pause();
        if (!paused) gamemusic.pause();
        return;
    } 
    if (!paused) gamemusic.play();
});

window.addEventListener('error', e => {
    console.error(e)
})