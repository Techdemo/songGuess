import { guessTrack } from './guessTrack.js';
import { refreshTrack } from './refreshTrack.js';

let aud = document.getElementById("audioPlayer");
aud.onended = () => refreshTrack()

window.addEventListener('load', event => {

  const socket = io()
  guessTrack(socket)
})