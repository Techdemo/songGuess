const express = require('express')
const browserSync = require('browser-sync');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser')
const compression = require('compression')
const path = require('path')
const socket = require('socket.io');

const app = express()
const port = 3000

// import routes
const indexRouter = require('./routes/index');
const roomRouter = require('./routes/rooms');

const server = app.listen(port, listening())

function listening() {
  console.log(`Demo server available on http://localhost:${port}`);
    // https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
  browserSync({
    files: ['views/**/*.{html,js,css,hbs}'],
    online: false,
    open: false,
    port: port + 1,
    proxy: 'localhost:' + port,
    ui: false
  });
}

const io = socket(server)

// socket functions
const answerSubmit = require('./sockets/answerSubmit');

let count = 0
let playerReady = []
io.on('connection', socket => {
  count++

  if(count > 1 ) {
    socket.emit('game-begin', 'enough players are present, the game can begin.')
  }
  console.log('number of people online', count)

  socket.on('answer-input', data => {
    answerSubmit(data)
  })

  socket.on('ready-player', id => {
    playerReady.push(id)
    console.log(playerReady)
    if(playerReady.length == count){
      // hier de functie die de modal laat aftellen bij iedereen.
      io.emit('open-modal', 'everyone is ready, start a new game')
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

