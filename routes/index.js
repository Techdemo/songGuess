const express = require('express');
const router = express.Router();

const db = require('../controllers/database')

router.get('/', function (req, res, next) {
  res.render('home', {
    layout: 'default',
  });
});

router.get('/create-account', function(req, res, next) {
  res.render('createAccount', {
    layout: 'default'
  })
})

router.post('/create-account', async function(req, res, next){
  let add = await db.add(req.body.username)

  if(!add){
    res.render('home', {
      layout: 'default',
      message: 'failed to add username to database'
    })
    return
  }

  res.render('rooms', {
    layout: 'default',
  })
})

router.post('/submit-account', async function(req, res, next){
// TODO: inloggen moet op de home route. Hoeft geen aparte route te hebben.
  let login = await db.login(req.body.username)

  if(!login){
    res.render('home', {
      layout: 'default',
      message: 'Username does not exist'
    })
    return
  }

  res.render('rooms', {
    layout: 'default',
  })
})

module.exports = router;