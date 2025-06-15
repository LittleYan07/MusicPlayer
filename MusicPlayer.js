

var myMusic = document.getElementById("myMusic");
var information = document.getElementById("information");
var MusicplayerButtons = document.getElementById("MusicplayerButtons");
var MusicplayerControls = document.getElementById("MusicplayerControls");
var MusicplayerVolume = document.getElementById("MusicplayerVolume");
var MusicplayerStatus = document.getElementById("MusicplayerStatus");
var ProgressBar = document.getElementById("ProgressBar");
var musicList = document.getElementById("musicList");




//MusicplayerFunctions
var infoSituation = MusicplayerStatus.children[1];


function musicSituation() {
    if (infoSituation.innerText == "｜單曲循環｜") {
        changeMusic(0);
    }

    else if (infoSituation.innerText == "｜隨機播放｜") {
        var n = Math.floor(Math.random() * musicList.length);    //隨機在musicList中選擇一首歌
        changeMusic(n - musicList.selectedIndex);
    }

    else if (infoSituation.innerText == "｜全歌單循環｜" && musicList.length == musicList.selectedIndex + 1) {
        changeMusic(0 - musicList.selectedIndex);
    }

    else if (musicList.length == musicList.selectedIndex + 1) {     //是否為最後一首歌
        stopMusic();
    }

    else
        changeMusic(1);   //不是最後一首歌就播下一首歌
}


function loopOne() {
    infoSituation.innerHTML = infoSituation.innerHTML == "｜單曲循環｜" ? "正常" : "｜單曲循環｜";
    event.target.innerHTML = "q";
    event.target.onclick = loopAll;
}

function setRandom() {
    infoSituation.innerHTML = infoSituation.innerHTML == "｜隨機播放｜" ? "正常" : "｜隨機播放｜";
}

function loopAll() {
    infoSituation.innerHTML = infoSituation.innerHTML == "｜全歌單循環｜" ? "正常" : "｜全歌單循環｜";
    event.target.innerHTML = "`";
    event.target.onclick = loopOne;
}



//MusicPlayerButtons
var buttonPlay = MusicplayerButtons.children[1];

function changeMusic(n) {
    var i = musicList.selectedIndex; //選擇音樂索引
    myMusic.src = musicList.children[i + n].value; //更改音樂來源
    myMusic.title = musicList.children[i + n].innerText;
    musicList.children[i + n].selected = true; //選擇新的音樂

    console.log(buttonPlay.innerText);

    if (buttonPlay.innerText == ";") {
        myMusic.onloadeddata = playMusic; //等歌曲載入完畢後再播放音樂
    }
}


//////////////////////////////////////////////////
//ProgressBar
function ProgressInitial() {
    ProgressBar.max = myMusic.duration * 10000;
    setInterval(setMusicDuraion, 10);
}


//////////////////////////////////////////////////
//MusicplayerStatus        
var musicDuraion = MusicplayerStatus.children[0];
var playStatus = MusicplayerStatus.children[1];

//音樂時間格式
function getTimeFormat(t) {
    var min = parseInt(t.toFixed(0) / 60);
    var sec = parseInt(t.toFixed(0) % 60);


    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    return min + ":" + sec;
}


function setProgress() {
    myMusic.currentTime = ProgressBar.value / 10000;
}

//設定音樂時間
function setMusicDuraion() {
    musicDuraion.innerHTML = getTimeFormat(myMusic.currentTime) + " / " + getTimeFormat(myMusic.duration);

    ProgressBar.value = myMusic.currentTime * 10000;
    console.log(ProgressBar.value);

    var w = myMusic.currentTime / myMusic.duration * 100; //計算進度條的百分比
    ProgressBar.style.backgroundImage = `linear-gradient(to right, rgba(178, 132, 190, 0.4) ${w}%, rgb(240,240,240) ${w}%)`;
}


//////////////////////////////////////////////////
//MusicplayerVolume 音量
var rangeVolume = MusicplayerVolume.children[1];
var textVolume = MusicplayerVolume.children[3];

setVolumeByRangeBar();

function changeVolume(v) {
    rangeVolume.value = parseInt(rangeVolume.value) + v;
    setVolumeByRangeBar();
}

function setVolumeByRangeBar() {
    textVolume.value = rangeVolume.value;
    myMusic.volume = textVolume.value / 100;   //真正寫入音量屬性值
    rangeVolume.style.backgroundImage = `linear-gradient(to right, rgba(48, 169, 222, 0.8) ${rangeVolume.value}%, rgba(240,240,240, 0.1) ${rangeVolume.value}%)`;
}


//////////////////////////////////////////////////
//MusicplayerControls
//快轉+倒轉時間
function changeTime(s) {
    myMusic.currentTime += s;
}

//靜音+取消靜音
function setMute() {
    myMusic.muted = !myMusic.muted;
    event.target.innerHTML = event.target.innerHTML == "U" ? "V" : "U";
    event.target.className = event.target.className == "setMute" ? "" : "setMute";
}


//////////////////////////////////////////////////
//Information 音樂資訊
var songInformation = information.children[0];


//////////////////////////////////////////////////
//MusicplayerButtons

//音樂資訊更新
function updateInfo(text) {
    songInformation.innerHTML = text;
}


//播放+暫停+停止
function playMusic() {
    myMusic.play();
    event.target.innerHTML = ";";
    event.target.onclick = pauseMusic;

    ProgressInitial();
    updateInfo("正在播放： " + myMusic.title);
}

function pauseMusic() {
    myMusic.pause();
    event.target.innerHTML = "4";
    event.target.onclick = playMusic;

    updateInfo("音樂暫停");
}

function stopMusic() {
    //音樂要停下來且時間歸零
    myMusic.pause();
    myMusic.currentTime = 0;
    buttonPlay.previousElementSibling.innerHTML = "4";
    buttonPlay.previousElementSibling.onclick = playMusic;

    updateInfo("音樂停止");
}