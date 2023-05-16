gamemusic.loop = true;
gamemusic.volume = 0.6;

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && ingame) pause();
});