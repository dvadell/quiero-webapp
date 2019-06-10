var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/quieros')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error:'))
db.once('open', () => console.log('MongoDB Connected'))

var Quiero = require('./model/quieros')
var q_route = require('./routes/q')
var api = require('./routes/api')


var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, () => {
    console.log('Connected!')
})

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/q', q_route);
app.use('/api/v1', api);


app.get('/', (req, res, next) => {
    Quiero.getQuieros( (err, results) => {
        if (err) { res.send(err) }
        res.render('index', { results }) 
    }, 10)
})