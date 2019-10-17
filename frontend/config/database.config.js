var fs = require('fs');
// Connect to Mongodb


/* Local Database Settings - Requires openshift port forwarding*/
/* oc port-forward curriculum-2-fvrzk 8888:27017 */

/*curriculum-2-fvrzk is the pod name in Open shift */
const ENVIRONMENT = process.env.ENVIRONMENT || "prod"; 
if(ENVIRONMENT == "local"){
    var username = fs.readFileSync('../../opt/etc/secrets/username', 'utf8').trim();
    var password = fs.readFileSync('../../opt/etc/secrets/password', 'utf8').trim();
    var host = 'localhost';//process.env.MONGODB_SERVICE_HOST || '172.50.188.50';
    var port = '8888';//process.env.MONGODB_SERVICE_PORT || '27017';
    var database = fs.readFileSync('../../opt/etc/secrets/database_name', 'utf8').trim();
}else{
    /* Remote Database Settings*/
    var username = fs.readFileSync('/opt/etc/secrets/username', 'utf8').trim();
    var password = fs.readFileSync('/opt/etc/secrets/password', 'utf8').trim();
    var host = '172.50.188.50';//process.env.MONGODB_SERVICE_HOST || '172.50.188.50';
    var port = '27017';//process.env.MONGODB_SERVICE_PORT || '27017';
    var database = fs.readFileSync('/opt/etc/secrets/database_name', 'utf8').trim();
}




var connectionString = 'mongodb://' + username + ':' + password +'@' + host + ':' + port + '/' + database;
module.exports = {
    url: connectionString
};