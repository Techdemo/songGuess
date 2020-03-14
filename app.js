const express = require('express')
const hbs = require('express-handlebars');
const bodyParser = require('body-parser')
const compression = require('compression')
const path = require('path')

const app = express()
const port = 3000

// import routes
const indexRouter = require('./routes/index');

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

const server = app.listen(process.env.PORT || 3000, _ => {
  console.log("listening on port 3000")
})