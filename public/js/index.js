import { refreshTrack } from './refreshTrack.js';
import { openRoundModal } from './next-round-modal.js';

const socket = io()
let aud = document.getElementById("audioPlayer");

aud.onended = () => {
  console.log("audio ended")
  let id = socket.id
  socket.emit('ready-player', {
    id
  })
}

socket.on('open-modal', (msg) => refreshTrack(socket, msg))

socket.on('game-begin', (count) => {
  if(count > 1){
    let x = document.getElementById("snackbar");
    x.innerHTML = 'a new player entered the room.'
    x.className = "show";
    setTimeout(() => { x.className = x.className.replace("show", ""); }, 3000);

    let noPlayer = document.getElementById('no-player')
    noPlayer.innerHTML = ''
    let id = socket.id

    socket.emit('new-player-begin', {
      id
    })
    // check on things
  }
})

// socket.on('game-end', count => {
//   let x = document.getElementById("snackbar");
//   x.innerHTML = 'player left the room'
//   x.className = "show";
//   setTimeout(() => { x.className = x.className.replace("show", ""); }, 3000);
//   if(count <= 1){
//     let noPlayer = document.getElementById('no-player')
//     noPlayer.innerHTML = 'Not enough players in this room. Please wait until new players enter'
//   }
//   const form = document.getElementById('track-form')
//   form.style.display = "none"
// })

let newTrack;
socket.on('renew-trackUrl', (track) => {
  newTrack = track
  let aud = document.getElementById("audioPlayer");
  aud.src = track.url
  aud.play()
  form.style.display = "block"
})

const form = document.getElementById('track-form')

form.addEventListener('submit', event => {
  event.preventDefault()
  let songInput = document.getElementById('song-input').value
  let artistInput = document.getElementById('artist-input').value

  socket.emit('answer-input', {
    song: songInput,
    artist: artistInput,
  }, socket.id)

  form.style.display = "none"
})

socket.on('score', (string) => {
  let x = document.getElementById("snackbar");
  x.innerHTML = string
  x.className = "show";
  setTimeout(() => { x.className = x.className.replace("show", ""); }, 3000);
})

socket.on('open-round-modal', () => {
  openRoundModal('joejoe')
})

socket.on('wait', (string) => {
  console.log("wordt wait uitgevoerd?")
  let x = document.getElementById("snackbar");
  x.innerHTML = string
  x.className = "show";
  setTimeout(() => { x.className = x.className.replace("show", ""); }, 3000);
})