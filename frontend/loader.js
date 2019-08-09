const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');

// create express app
const app = express();

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

const Node = require('./app/models/model');


// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

const nodes = JSON.parse(fs.readFileSync('./data/curriculum_adst_all_grades.json', 'utf-8'));
async function loadMeetings() {
    try {
      await Node.insertMany(nodes);
      console.log('Done!');
      process.exit();
    } catch(e) {
      console.log(e);
      process.exit();
    }
}

loadMeetings();
