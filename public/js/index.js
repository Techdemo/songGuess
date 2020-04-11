import { guessTrack } from './guessTrack.js';
import { refreshTrack } from './refreshTrack.js';

window.addEventListener('load', event => {
  const socket = io()
  let aud = document.getElementById("audioPlayer");

  aud.onended = () => {
    // refreshTrack(socket)

    let id = socket.id
    socket.emit('ready-player', {
      id
    })
  }

  socket.on('open-modal', (msg) => refreshTrack(socket, msg))

  socket.on('game-begin', (msg) => {
    console.log("msg", msg)
    guessTrack(socket)
  })
})