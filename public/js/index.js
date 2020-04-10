import { guessTrack } from './guessTrack.js';

window.addEventListener('load', event => {
  const socket = io()

    socket.on('broadcast', function (data) {
      let countTag = document.getElementById("Count");
      countTag.innerHTML = data

      guessTrack(socket)
    })
})