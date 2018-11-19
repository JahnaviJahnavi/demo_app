// Import the required packages
var express = require('express');
var app = express(); // Creates an instance of express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');

var router = require('./routes/router');
var dbConfig = require('./config/dbConfig');

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'models')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);

//cors
app.use(cors());

//connect to mongoose
mongoose.connect(dbConfig.atlasUrl, { useNewUrlParser: true });

allowCrossDomain = function (req, res, next) {

    console.log("Accessed API Method : ", req.method + "; Accessed API : ", req.path + "; Accessed Time : ", new Date(Date.now()));

    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);

// Define the port in which server is listening
app.listen(process.env.PORT || 3000);
console.log("App listening on port 3000");

router(app);
