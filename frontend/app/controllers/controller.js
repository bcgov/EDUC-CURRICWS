const Node = require('../models/model');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.Content) {
        return res.status(400).send({
            message: "Node content can not be empty"
        });
    }

    // Create a node
    const node = new Node({
        field_course_name_1: String,
        field_path_reference:String,
        field_grade: String,
        type: String,
        Curriculum: String,
        Content:[{}],
        Elaborations:[{}]
    });

    // Save Note in the database
    node.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};
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