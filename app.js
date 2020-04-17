const express = require('express')
const browserSync = require('browser-sync');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser')
const compression = require('compression')
const path = require('path')
const socket = require('socket.io');
const storage = require('node-persist');
const sharedsession = require("express-socket.io-session");
const session = require("express-session")({
  secret: "my-secret",
  resave: true,
  saveUninitialized: true
})
const app = express()
const port = process.env.PORT || 3000

require('dotenv').config()

// import routes
const indexRouter = require('./routes/index');
const roomRouter = require('./routes/rooms');

// modules
const newTrack = require('./helpers/fetch-track')

const server = app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
});

// function listening() {
//   console.log(`Demo server available on http://localhost:${port}`);
//     // https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
//   browserSync({
//     files: ['views/**/*.{html,js,css,hbs}'],
//     online: false,
//     open: false,
//     port: port + 1,
//     proxy: 'localhost:' + port,
//     ui: false
//   });
// }

const io = socket(server)
storage.init();

// socket functions
const answerSubmit = require('./sockets/answerSubmit');

let count = 0
let playerReady = []

io.on('connection', socket => {

  count++
  if (count > 1) {
    io.emit('game-begin', 'a new player entered the room.')
  }

  socket.on('answer-input', async (data, id) => {
    let username = socket.handshake.session.username
    // console.log("answerinput in de socket server",
    //   data, id, username)
    answerSubmit(data, id, username, storage, io)
  })

  socket.on('ready-player', async id => {
    playerReady.push(id)
    if (playerReady.length == count) {
      playerReady.length = 0

      io.emit('open-round-modal', 'everyone is ready, start a new game')
      let track = await newTrack.fetch()
      await storage.setItem('track', track)

      io.emit('renew-trackUrl', track)
    }
  })

  socket.on('disconnect', () => {
    count--
    console.log('number of people online', count)
  })
})

app
  .use(compression())
  .use(express.static(path.join(__dirname, '/public')))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(session)

io.use(sharedsession(session, {
  autoSave: true
}));

app
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'hbs')
  .engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname +
      '/views/layouts/',
    partialsDir: __dirname +
      '/views/partials/'
  }))

app.get('/', indexRouter)
app.get('/create-account', indexRouter)
app.post('/create-account', indexRouter)
app.post('/submit-account', indexRouter)

app.get('/:genre', roomRouter);
