document.addEventListener("keydown",e=>{if("block"!=loadingAd.style.display){if(e.key.includes("Arrow")&&e.preventDefault(),"0"==e.key&&gameOver(),"Enter"===e.key||"5"===e.key){if("block"===tutorialScreen.style.display)return;if(paused){pauseScreen.style.display="none",footer.innerHTML=`
                <div id="softleft">Pause</div>
            `,paused=!1;return}if(ingame)return increasePlayerNumber();if("block"==creditsScreen.style.display)return;if("block"==respawnScreen.style.display)return respawnAd();startGame()}!ingame||paused||(("ArrowLeft"==e.key||"4"==e.key)&&(left=!0),"ArrowRight"!=e.key&&"6"!=e.key||(right=!0))}}),document.addEventListener("keyup",e=>{ingame&&(("ArrowLeft"==e.key||"4"==e.key)&&(left=!1),("ArrowRight"==e.key||"6"==e.key)&&(right=!1))});