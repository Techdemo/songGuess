import { refreshTrack } from './refreshTrack.js';
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

socket.on('game-begin', (msg) => {
  console.log("game begin")
})

let newTrack;
socket.on('renew-trackUrl', (track) => {
  newTrack = track
  let aud = document.getElementById("audioPlayer");
  aud.src = track.url
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