var fs = require('fs');
// Connect to Mongodb

var pathToSecret = '/var/lib/mongodb/data/';
/*
function returnSecret(input) {
    fs.readFile(input, (err, data) => {
        if (err) throw err;
        console.log(data);
        return data;
    });
}


var username = returnSecret(pathToSecret + 'username');//process.env.MONGO_DB_USERNAME || 'curricws';
var password = returnSecret(pathToSecret + 'password');//process.env.MONGO_DB_PASSWORD || 'w3bt3am!';
var host = '172.50.188.50';//process.env.MONGODB_SERVICE_HOST || '172.50.188.50';
var port = '27017';//process.env.MONGODB_SERVICE_PORT || '27017';
var database = returnSecret(pathToSecret + 'database_name');
*/
var username;
var password;
var host;
var port;
var database;
fs.readFile('/var/lib/mongodb/data/username', (err, data) => {
    if (err) throw err;
    username = data;
});

var connectionString = 'mongodb://' + username + ':' + password +'@' + host + ':' + port + '/' + database;

console.log(connectionString);

/*fs.readFile('/etc/passwd', (err, data) => {
    if (err) throw err;
    console.log(data);
});
*/
module.exports = {
    url: connectionString//'mongodb://curricws:w3bt3am!@172.50.188.50:27017/curriculum'
};

//'mongodb://' + username + ':' + password +'@' + host + ':' + port + '/' + database;