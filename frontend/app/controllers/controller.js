const Node = require('../models/model');

exports.findAll = (req, res) => {
    Node.find()
    .then(nodes => {
        res.send(nodes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving nodes."
        });
    });
};

exports.findSubjects = (req, res) => {
    var nodeReturn = Node.find();
    console.log(nodeReturn);
    //.then(nodes => {
    //    res.send(nodes);


};