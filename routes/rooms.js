const express = require('express');
const router = express.Router();

const api = require('../helpers/fetch-track');
const artists = require('../utils/artists');

router.get('/:genre', async function(req, res, next) {

  // TODO: find array based on req.params.genre
  const randomArtist = Math.floor(Math.random() * artists.festival.length);

  // for (const key in object) {
  //   if (object.hasOwnProperty(key)) {
  //     const element = object[key];
  //     //TODO: Hier moet ik blijkbaar nog iets doen, geen idee wat. Onderzoek dit.
  //   }
  // }

  let url = `https://itunes.apple.com/search?term=${artists.festival[randomArtist]}&entity=song&limit=5`
  let fetchTrack = await api.fetch(url)

  if(!fetchTrack){
    res.render('room', {
      layout: 'default',
      message: 'Something went wrong in fetching the next track'
    })
    return
  }

  res.render('room', {
    layout: 'default',
    roomTitle: req.params.genre,
    track: fetchTrack
  })

})

module.exports = router;