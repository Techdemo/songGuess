const express = require('express');
const router = express.Router();

const api = require('../helpers/fetch-track');
const artists = require('../utils/artists');

router.get('/:genre', async function(req, res, next) {

  // TODO: find array based on req.params.genre
  // const randomArtist = Math.floor(Math.random() * artists.festival.length);

  // for (const key in object) {
  //   if (object.hasOwnProperty(key)) {
  //     const element = object[key];
  //     //TODO: Hier moet ik blijkbaar nog iets doen, geen idee wat. Onderzoek dit.
  //   }
  // }

  // let url = `https://itunes.apple.com/search?term=${artists.festival[randomArtist]}&entity=song&limit=5`
  // let fetchTrack = await api.fetch(url)

  // if(!fetchTrack){
  //   res.render('room', {
  //     layout: 'default',
  //     message: 'Something went wrong in fetching the next track'
  //   })
  //   return
  // }

  res.render('room', {
    layout: 'default',
    roomTitle: req.params.genre,
    track: "https://audio-ssl.itunes.apple.com/itunes-assets/Music/v4/55/fb/af/55fbaf4e-6605-0c6f-0200-9c40715fedf5/mzaf_3698229113958683232.plus.aac.p.m4a"
  })

})

module.exports = router;