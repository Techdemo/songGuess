const express = require('express');
const router = express.Router();

const db = require('../controllers/database')

router.get('/:genre', function(req, res, next) {
  console.log("req genre", req.params.genre)

  res.render('room', {
    layout: 'default',
    roomTitle: req.params.genre
  })

})

module.exports = router;