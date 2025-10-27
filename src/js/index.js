const image = document.getElementById("cover"),
    title = document.getElementById("music-title"),
    artist = document.getElementById("music-artist"),
    currentTimeEl = document.getElementById("current-time"),
    durationEl = document.getElementById("duration"),
    progress = document.getElementById("progress"),
    playerProgress = document.getElementById("player-progress"),
    prevBtn = document.getElementById("prev"),
    nextBtn = document.getElementById("next"),
    playBtn = document.getElementById("play"),
    background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
    {
        path: "./src/assets/music/repsaj - MONTAGEM CONTIGO (Super Slowed).mp3",
        displayName: "Montagem Contigo",
        cover: "./src/assets/images/img5.jfif",
        artist: "repsaj",
    },
    {
        path: "./src/assets/music/LUMIX   KXRSED - MONTAGEM NOCHE (Official Audio).mp3",
        displayName: "Montagem Noche (Official Audio)",
        cover: "./src/assets/images/img3.jfif",
        artist: "Lumix Rxrsed",
    },
    {
        path: "./src/assets/music/veki-veki.mp3",
        displayName: "Veki Veki (music)",
        cover: "./src/assets/images/img4.jfif",
        artist: "DJZRX",
    },
    {
        path: "./src/assets/music/Phonky Town - AKAI (Slowed).mp3",
        displayName: "AKAI",
        cover: "./src/assets/images/img6.jfif",
        artist: "Phonky Town",
    },
    {
        path: "./src/assets/music/bxkq - TE CONOCÍ.mp3",
        displayName: "TE CONOCÍ", 
        cover: "./src/assets/images/img2.jfif",
        artist: "bxkq",
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace("fa-play", "fa-pause");
    // Set button hover title
    playBtn.setAttribute("title", "Pause");
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace("fa-pause", "fa-play");
    // Set button hover title
    playBtn.setAttribute("title", "Play");
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
