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

socket.on('game-begin', (string) => {
  let aud = document.getElementById("audioPlayer");
  aud.play()

  let x = document.getElementById("snackbar");
  x.innerHTML = string
  x.className = "show";
  setTimeout(() => { x.className = x.className.replace("show", ""); }, 3000);

})

let newTrack;
socket.on('renew-trackUrl', (track) => {
  newTrack = track
  let aud = document.getElementById("audioPlayer");
  aud.src = track.url
  aud.play()
  // hier moet een play method komen

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