const humburger = document.getElementById('nav-toggle-checkbox');
const navSpan = document.querySelector('.nav-span');
const fullScreenOverlay = document.querySelector('.full-screen-overlay');
const navigation = document.getElementsByTagName('nav')[0];
const closePlayer = document.querySelector('#close-player');
const audioPlayer = document.querySelector('.audio-player');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');
const albumsContainer = document.querySelector('.music-audios')
const eachAudioAlbum = document.querySelectorAll('.music-card');
//variables for the Audio player
const audioElement = document.querySelector('#audio-element')
const audioPlayBtn = document.querySelector('.audio-play-btn')
const audioSlider = document.querySelector('#audio-slider')
//variables for music albums/cards
const albumPlayBtn = document.querySelectorAll('.play-btn-card');

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


