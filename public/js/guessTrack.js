const guessTrack = (socket) => {
  const form = document.getElementById('track-form')

  form.addEventListener('submit', event => {
    event.preventDefault()
    let songInput = document.getElementById('song-input').value
    let artistInput = document.getElementById('artist-input').value

    socket.emit('answer-input', {
        song: songInput,
        artist: artistInput
    })

    alert(`${songInput} + ${artistInput}`)
  })
}

export { guessTrack }