var fs = require('fs');
// Connect to Mongodb

var pathToSecret = '/opt/etc/secrets/';
/*
function returnSecret(input) {
    fs.readFileSync(input, (err, data) => {
        if (err) throw err;
        console.log(data);
        return data;
    });
}
*/
var username = fs.readFileSync('/opt/etc/secrets/username', 'utf8').trim();
var password = fs.readFileSync('/opt/etc/secrets/password', 'utf8').trim();
var host = '172.50.188.50';//process.env.MONGODB_SERVICE_HOST || '172.50.188.50';
var port = '27017';//process.env.MONGODB_SERVICE_PORT || '27017';
var database = fs.readFileSync('/opt/etc/secrets/database_name', 'utf8').trim();

var connectionString = 'mongodb://' + username + ':' + password +'@' + host + ':' + port + '/' + database;
//var connectionString = 'mongodb://curricws:w3bt3am!@172.50.188.50:27017/curriculum';
console.log(connectionString);


module.exports = {
    url: connectionString
};