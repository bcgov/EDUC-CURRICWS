const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
// create express app
const app = express();
app.use(logger('dev'));
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

/*
//Connect to Mongo V2
var mongoose = require('mongoose');

// Connect to Mongodb
var username = process.env.MONGO_DB_USERNAME || 'curricws';
var password = process.env.MONGO_DB_PASSWORD || 'w3bt3am!';

var host = process.env.MONGODB_SERVICE_HOST || '172.50.188.50';
var port = process.env.MONGODB_SERVICE_PORT || '27017';

var database = process.env.MONGO_DB_DATABASE || 'curriculum';
console.log('---DATABASE PARAMETERS---');
console.log('Host: ' + host);
console.log('Port: ' + port);
console.log('Username: ' + username);
console.log('Password: ' + password); 
console.log('Database: ' + database);

var connectionString = 'mongodb://' + username + ':' + password +'@' + host + ':' + port + '/' + database;
console.log('---CONNECTING TO---');
console.log(connectionString);
mongoose.connect(connectionString);

mongoose.connection.once('open', (data) => {
    console.log('Connection has been made');
    console.log(data);
});
*/

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to the B.C Curriculum web api"});
});
app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//app.use('/api/v1', router);
require('./app/routes/routes.js')(app);

// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});