//播放音樂
let myMusic = document.getElementById("myMusic");

function playMusic() {
    myMusic.play();
}

function pauseMusic() {
    myMusic.pause();
}

function stopMusic() {
    //音樂要停下來且時間歸零
    myMusic.pause();
    myMusic.currentTime = 0;
}