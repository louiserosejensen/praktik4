const express = require('express');
const app = express();
const formidable = require('express-formidable');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');

require ('./config/index')(app)
require ('./routes/index')(app)

const db = require('./config/mysql')();

app.set('view engine', 'ejs');
app.use(express.static('./public'))

app.listen(3000, err => {
    if (err) return console.error(error);
    console.info('Din app kører på port 3000');
});