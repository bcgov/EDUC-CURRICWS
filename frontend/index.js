const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
//JWT    
var AuthController = require('./app/auth/AuthController');
var UserController = require('./app/controllers/UserController');
// create express app
const app = express();
//app.use(logger('dev'));


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// parse requests of content-type - application/json
app.use(bodyParser.json());
//Connect to Mongo V1
// Configuring the database

const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to the B.C Curriculum web api"});
});
app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//JWT
app.use('/users', UserController);
app.use('/api/auth', AuthController);
//app.use('/api/v1', router);
require('./app/routes/routes.js')(app);

// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});