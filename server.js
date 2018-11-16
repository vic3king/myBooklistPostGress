//load in dependencies
const express = require('express')

//template veiw engine
const mustacheExpress = require('mustache-express')
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

//route
app.get('/list', (req, res) => {
  res.render('list')
})

app.get('/book-form', (req, res) => {
  res.render('book-form')
})


//port
app.listen(port, () => {
  console.log(`SERVER started on port ${port}`)
})