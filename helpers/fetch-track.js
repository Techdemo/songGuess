const axios = require('axios')
const artists = require('../utils/artists');

exports.fetch = async () => {
  let randomIndex = Math.floor(Math.random() * artists.festival.length);
  let randomArtist = artists.festival[randomIndex]

  let url = `https://itunes.apple.com/search?term=${randomArtist}&entity=song&limit=10`

  let results = await axios.get(url)
  .then(res => {
   let i = Math.floor(Math.random() * 10);
   let track = {
     url: res.data.results[i].previewUrl,
     artist: res.data.results[i].artistName,
     name: res.data.results[i].trackName
   }
    return track
  })
  .catch(err => {
    console.log("error", err)
  })
  return results
}