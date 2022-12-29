// console.log("Hello i am here ")
cover = document.getElementsByClassName("cover");
Array.from(cover).forEach((element, i) => {
  element.src = `covers/${i + 1}.jpg`;
});
songs = document.getElementsByClassName("song-name");
mainSong = document.getElementById("main-song");
mainSong.innerText = songs[0].innerText;
console.log(songs);
aud = new Audio("songs/1.mp3");
mainPlaybtn = document.getElementById("main-play");
gif = document.getElementById("gif");
songIndex = 0;
prevBtn = document.getElementById("prev");
nextBtn = document.getElementById("next");
progBar = document.getElementById("progress");

subPlay = document.getElementsByClassName("sub-play");

changeAll = ()=>{
 Array.from(subPlay).forEach((element)=>{
  element.classList.remove("fa-pause-circle"); 
  element.classList.add("fa-play-circle"); 
 })
}
Array.from(subPlay).forEach((element)=>{
 element.addEventListener("click",(e)=>{
   changeAll(); 
   e.target.classList.remove("fa-play-circle");
   e.target.classList.add("fa-pause-circle");
   index = parseInt(e.target.id); 
   songIndex = index+1;
   aud.src = `songs/${songIndex}.mp3`;
   aud.currentTime = 0 ; 
   aud.play(); 
   console.log("index is ", e.target.id,index, songIndex);
   // songs[index].innerText)
   mainPlaybtn.classList.remove("fa-play-circle");
   mainPlaybtn.classList.add("fa-pause-circle");
   mainSong.innerText = songs[index-1].innerText;
  })
})


// console.log(prevBtn,nextBtn);
prevBtn.addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 6;
  } else {
    songIndex -= 1;
  }
  aud.src = `songs/${songIndex + 1}.mp3`;
  aud.currentTime = 0;
  aud.play();
  gif.style.opacity = "1";
  mainSong.innerText = songs[songIndex].innerText;
  mainPlaybtn.classList.remove("fa-play-circle");
  mainPlaybtn.classList.add("fa-pause-circle");
});




nextBtn.addEventListener("click", () => {
  if (songIndex >= 6) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  aud.src = `songs/${songIndex + 1}.mp3`;
  aud.currentTime = 0;
  aud.play();
  mainSong.innerText = songs[songIndex].innerText;
  gif.style.opacity = "1";
  mainPlaybtn.classList.remove("fa-play-circle");
  mainPlaybtn.classList.add("fa-pause-circle");
});
mainPlaybtn.addEventListener(
  "click",
  (playAudio = () => {
    console.log("Play Audio called");
    if (aud.paused || aud.currentTime <= 0) {
      mainPlaybtn.classList.remove("fa-play-circle");
      mainPlaybtn.classList.add("fa-pause-circle");
      console.log("Play");
      aud.play();
      gif.style.opacity = "1";
      mainSong.innerText = songs[songIndex].innerText;
    } else {
      mainPlaybtn.classList.remove("fa-pause-circle");
      mainPlaybtn.classList.add("fa-play-circle");
      aud.pause();
      console.log("pause");
      gif.style.opacity = "0";
    }
  })
);
// adding progress bar feature
aud.addEventListener("timeupdate", () => {
  prog = parseInt((aud.currentTime / aud.duration) * 100);
  progBar.value = prog;
  if (aud.currentTime >= aud.duration) {
    if (songIndex >= 6) {
      songIndex = 0;
    } else {
      songIndex += 1;
    }
    aud.src = `songs/${songIndex + 1}.mp3`;
    aud.currentTime = 0;
    aud.play();
    gif.style.opacity = "1";
    mainPlaybtn.classList.remove("fa-play-circle");
    mainPlaybtn.classList.add("fa-pause-circle");
  }
});
progBar.addEventListener("change", () => {
  aud.currentTime = parseInt((progBar.value * aud.duration) / 100);
});
