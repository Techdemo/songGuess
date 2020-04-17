import { openModal } from "./modal.js"

const guessTrack = (socket) => {
  const form = document.getElementById('track-form')

  form.style.display = "block"

  form.addEventListener('submit', event => {
    event.preventDefault()
    openModal('Een nieuwe ronde start')
    let songInput = document.getElementById('song-input').value
    let artistInput = document.getElementById('artist-input').value
    console.log("form wordt gesubmitted", songInput, artistInput)
    socket.emit('answer-input', {
        song: songInput,
        artist: artistInput
    })
  })
}

export { guessTrack }