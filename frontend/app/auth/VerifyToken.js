var jwt = require('jsonwebtoken');
var config = require('../config');

function verifyToken(req, res, next) {
  //check for token in the request header
  var token = req.headers['x-access-token'];
  
  //If the token is not in the req header, then it may be supplied through the url
  if(!token){ 
    token = req.query.token;
  }
  
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;