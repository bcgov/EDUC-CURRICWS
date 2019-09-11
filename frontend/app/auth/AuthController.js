// AuthController.js
var VerifyToken = require('./VerifyToken');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());
var User = require('../user/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

//Create a new user
router.post('/register', function (req, res) {

    //var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
            name: req.body.name,
            //email: req.body.email,
            //password: hashedPassword
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user.");
            // create a token
            var token = jwt.sign({
                id: user._id
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({
                auth: true,
                token: token
            });
        });
});

//Login 
router.post('/login', function (req, res) {
    var nameIsValid = false;
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        //var passwordIsValid = bcrypt.compareSync(req.body.name, user.name);
        if (req.body.name === user.name){
            nameIsValid = true;
        }
        if (nameIsValid == false) return res.status(401).send({
            auth: false,
            token: null
        });

        var token = jwt.sign({
            id: user._id
        }, config.secret, {
            expiresIn: 31536000000 // expires in 1 year
        });

        res.status(200).send({
            auth: true,
            token: token
        });
    });

});

router.get('/me', VerifyToken, function(req, res) {

    User.findById(req.userId, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      
      res.status(200).send(user);
    });
    
});

//logout
router.get('/logout', function (req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
});
module.exports = router;