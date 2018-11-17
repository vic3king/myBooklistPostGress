//load in dependencies
const express = require('express')
const bodyParser = require('body-parser')
const { Pool, Client } = require('pg')

//template veiw engine
const mustacheExpress = require('mustache-express')
//sets env dependencies
require('dotenv').config()
const port = process.env.PORT

const app = express()

//view engine config
const mustache = mustacheExpress()
mustache.cache = null
app.engine('mustache', mustache)
app.set('view engine', 'mustache')

//middleware
app.use(express.static('public'))
//include body parser to the app so express can read and understand our data
app.use(bodyParser.urlencoded({ extended: false }))

//route for list of all books
app.get('/list', (req, res) => {
  res.render('list')
})

//route for adding book
app.get('/book/add', (req, res) => {
  res.render('book-form')
})

//post a book to the db
app.post('/book/add', (req, res) => {
  //another way to connect just for learning sake
  const client = new Client
  client.connect()
    .then(() => {
      console.log('connection complete')
      const sql = 'INSERT INTO books (title, authors) VALUES($1, $2)'
      const params = [req.body.title, req.body.authors]
      return client.query(sql, params)
    })
    .then((result) => {
      console.log('result?', result)
      res.redirect('/list')
    }).catch(err => console.error(err));

})

//port
app.listen(port, () => {
  console.log(`SERVER started on port ${port}`)
})