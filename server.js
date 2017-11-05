var mongoose = require('mongoose');
var express = require('express');
var functionModel = require('./controller/functionController');
var route = require('./router');
var ARcollection = require('./Collection/ARCollection');

var app = express();
var bodyparser = require('body-parser');

var cors = require('cors');
app.use(bodyparser.json());


// use it before all route definitions
app.use(cors({ credentials: true, origin: 'http://localhost:8081' }));
app.use(bodyparser.urlencoded({ extended: true }));


app.use(route);

app.use(express.static("public"));

app.use(express.static('E:\BioHome\src\Syngenta.DWS.Web.Presentation'))
mongoose.connect('mongodb://localhost:27017/DWS');

app.listen(8095, console.log('start')) 
