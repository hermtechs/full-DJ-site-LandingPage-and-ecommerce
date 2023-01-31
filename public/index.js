const humburger = document.getElementById('nav-toggle-checkbox');
const navSpan = document.querySelector('.nav-span');
const fullScreenOverlay = document.querySelector('.full-screen-overlay');
const navigation = document.getElementsByTagName('nav')[0];

//audio player variables
const songContainers = document.querySelectorAll('.song-container');
const audioPlayer = document.querySelector('.audio-player-container');
const playPauseBtn = document.querySelector('.play-pause-btn');
const NextBtn = document.querySelector('.next-btn')
const prevBtn = document.querySelector('.prev-btn')
const audioElement = document.getElementsByTagName('audio')[0];
const playBtnIcon = document.querySelector('.playBtnIcon');
// console.log(playBtnIcon)
const songs = document.querySelector('.song-title');

// NAVIGATION MENU
//Rotating the humburger menu on  Click
humburger.addEventListener('click', ()=>{
 if(navSpan.style.transform === 'rotate(8deg)'){
  navSpan.style.transform = 'rotate(0deg)'
 }
 else{
  navSpan.style.transform = 'rotate(8deg)'
 }
 })


// const playClickedSong = (event)=>{
// //   audioElement.src = event.currentTarget.id; 
// const clickedSong = event.currentTarget;
// audioElement.src = clickedSong.id;
// audioElement.play();
// songContainers.forEach(container=>container.classList.remove('playingBarsParent'))
// clickedSong.classList.add('playingBarsParent');
// }
// function addFirstSong(event){
//     audioElement.src = songContainers[0].id;
//     songContainers[0].classList.add('playingBarsParent')
//     audioElement.play();
//     audioElement.addEventListener('timeupdate', checkPlayingStatus)
//     playBtnIcon.classList.replace('fa-circle-play', 'fa-circle-pause')
//     // event.currentTarget.removeEventListener();
//     playPauseBtn.removeEventListener('click', addFirstSong);
//     playPauseBtn.addEventListener('click', playPauseSong);
// }

// const  playPauseSong = ()=>{  
//  if (audioElement.paused){
//     audioElement.play()
//     playBtnIcon.classList.replace('fa-circle-play', 'fa-circle-pause')
//    }
//    else{
//     audioElement.pause();
//     playBtnIcon.classList.replace('fa-circle-pause','fa-circle-play')
//    } 
// }


// function checkPlayingStatus(){
// let updatedTime = audioElement.currentTime;
// const duration = audioElement.duration;
// // console.log(duration);  
// console.log(`updated time :${updatedTime}`)
// console.log(`duration : ${duration}`);

// if(updatedTime===duration){
//   playBtnIcon.classList.replace('fa-circle-pause','fa-circle-play')
//   songContainers.forEach(container=>container.classList.remove('playingBarsParent'))  
// }
// else{
 
//     let myArray = [...songContainers]
//    const currentlyPlayingSong = myArray.find(song=>song.id === audioElement.src);
//    currentlyPlayingSong.classList.add('playingBarsParent');
// }

// }

//  AUDIO PLAYER
document.addEventListener('DOMContentLoaded', ()=>{
    songContainers.forEach(song=>song.addEventListener('click',playSong)) 
    playPauseBtn.addEventListener('click', playPause);   
    NextBtn.addEventListener('click', playNextSong);
    prevBtn.addEventListener('click', playPreviousSong);
    })

const allSongs = [...songContainers];

    function playSong(event){
    const clickedSongNumber = event.currentTarget.dataset.songNum;
    let songToPlay = allSongs.find(song=>song.dataset.songNum===clickedSongNumber);
     audioElement.src = songToPlay.id;
     audioElement.play();   
     audioElement.addEventListener('timeupdate', checkSongStatus); 
    }

   function checkSongStatus(){
        const updatedTime = audioElement.currentTime;
        const songDuration = audioElement.duration;
        let  currentlyPlayingSong = allSongs.find(song=>song.id===audioElement.src);
        allSongs.forEach(song=>song.classList.remove('playingBarsParent'));
        // currentlyPlayingSong.classList.add('playingBarsParent');
        if(updatedTime!=songDuration){
            currentlyPlayingSong.classList.add('playingBarsParent'); 
            playBtnIcon.classList.replace('fa-circle-play','fa-circle-pause');
        }
        else{
            currentlyPlayingSong.classList.remove('playingBarsParent')
            playBtnIcon.classList.replace('fa-circle-pause','fa-circle-play');
            playNextSong();
        }
    }

    var counter = -1;
function playPause(){
    if(`${audioElement.src}` == `${window.location.protocol}//${window.location.host}/`){
        // console.log(`yes ${audioElement.src}`)
        audioElement.src = allSongs[0].id;
        audioElement.play();
        counter = 0;
        audioElement.addEventListener('timeupdate',checkSongStatus)
    }
    else{
        if(audioElement.paused){

        audioElement.play();
        console.log('playing')
        // audioElement.addEventListener('timeupdate',checkSongStatus)   
        }
        else{
         audioElement.pause(); 
        //  audioElement.addEventListener('timeupdate',checkSongStatus)
        console.log('not palying')

        }   
    }
}

function playNextSong(){
    counter++;
    if(`${audioElement.src}` == `${window.location.protocol}//${window.location.host}/`){
        // console.log(`yes ${audioElement.src}`)
        audioElement.src = allSongs[0].id;
        audioElement.play();
        counter = 0;
        audioElement.addEventListener('timeupdate',checkSongStatus)
    }
    else{
      
    //    var currentlyPlayingSong = allSongs.find(song=>song.id===audioElement.src);
    //    var currentlyPlayingSongNumber = currentlyPlayingSong.dataset.songNum;
       if(counter<allSongs.length){
        const nextSong = allSongs.find(song=>song.dataset.songNum==counter);
        //    console.log(nextSongSrc);
            nextSong.classList.add('playingBarsParent');
            audioElement.src = nextSong.id;
            audioElement.play();
            audioElement.addEventListener('timeupdate', checkSongStatus);
       } 
       else{
        counter=0;
        const nextSong = allSongs.find(song=>song.dataset.songNum==counter);
        //    console.log(nextSongSrc);
            nextSong.classList.add('playingBarsParent');
            audioElement.src = nextSong.id;
            audioElement.play();
            audioElement.addEventListener('timeupdate', checkSongStatus);
       }

    }
}

function playPreviousSong(){
    counter=0;
    if(`${audioElement.src}` == `${window.location.protocol}//${window.location.host}/`){
        // console.log(`yes ${audioElement.src}`)
        audioElement.src = allSongs[0].id;
        audioElement.play();
        audioElement.addEventListener('timeupdate',checkSongStatus)
    }
    else{
        if(counter>=1){
          counter--;  
          const prevSong = allSongs.find(song=>song.dataset.songNum==counter);
          //    console.log(nextSongSrc);
              prevSong.classList.add('playingBarsParent');
              audioElement.src = prevSong.id;
              audioElement.play();
              audioElement.addEventListener('timeupdate', checkSongStatus);
        }
        else{
            const prevSong = allSongs.find(song=>song.dataset.songNum==counter);
            //    console.log(nextSongSrc);
                prevSong.classList.add('playingBarsParent');
                audioElement.src = prevSong.id;
                audioElement.play();
                audioElement.addEventListener('timeupdate', checkSongStatus);
        }
    }
}