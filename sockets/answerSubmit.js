const stringSimilarity = require('string-similarity');
const db = require("../controllers/database.js");

module.exports = answerSubmit = async (
	data,
	id,
  username,
  storage,
  io
) => {
  let trackFromStorage = await storage.getItem('track')

  let artist = await trackFromStorage.artist.replace(/ +/g, "").toLowerCase()
  let song = await trackFromStorage.name.replace(/ +/g, "").toLowerCase()

  let submittedArtist = await data.artist.replace(/ +/g, "").toLowerCase()
  let submittedSong = await data.song.replace(/ +/g, "").toLowerCase()

  let artistScore = stringSimilarity.compareTwoStrings(artist, submittedArtist)
  let songScore = stringSimilarity.compareTwoStrings(song, submittedSong)

  if(artistScore >= 0.8 && songScore >= 0.8){
    io.to(id).emit('score', `goedzo ${username}! Je hebt 2 punten verdiend`);
    let score = 2
    db.updateScore(username., score)
  } else if(artistScore >= 0.8){
    io.to(id).emit('score', `lekker ${username}! Alleen de artiest was goed. Je hebt 1 punt verdiend`);
    let score = 1
    db.updateScore(username, score)
  } else if(songScore >= 0.8) {
    io.to(id).emit('score', `lekker ${username}! Alleen het nummer titel was goed. Je hebt 1 punt verdiend`);
    let score = 1
    db.updateScore(username, score)
  } else {

    io.to(id).emit('score', `Jammer ${username}! Je hebt 0 punten verdiend`);
  }
}

