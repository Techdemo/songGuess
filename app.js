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
io.on('connection', socket => {
  count++
  io.sockets.emit('broadcast', count + ' people online!')
  socket.on('disconnect', socket => {
    count--
    io.sockets.emit('broadcast', count + ' people online!');
  })

  socket.on('answer-input', data => {
    answerSubmit(data)

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

