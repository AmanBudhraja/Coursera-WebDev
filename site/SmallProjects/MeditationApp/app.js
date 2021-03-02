const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  const sounds = document.querySelectorAll(".sound-picker button");
  const timedisplay = document.querySelector(".time-display");
  const outlinelength = outline.getTotalLength();
  const timeselect = document.querySelectorAll(".time-select button");
  let fakeduration = 600;

  outline.style.strokeDasharray = outlinelength;
  outline.style.strokeDashoffset = outlinelength;

  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkplay(song);
    });
  });

  play.addEventListener("click", () => {
    checkplay(song);
  });

  timeselect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeduration = this.getAttribute("data-time");
      timedisplay.textContent = `${Math.floor(fakeduration / 60)}:${Math.floor(
        fakeduration % 60
      )}`;
    });
  });

  const checkplay = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  song.ontimeupdate = () => {
    let currenttime = song.currentTime;
    let elapsed = fakeduration - currenttime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlinelength - (currenttime / fakeduration) * outlinelength;
    outline.style.strokeDashoffset = progress;

    timedisplay.textContent = `${minutes}:${seconds}`;
    if (currenttime >= fakeduration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();
