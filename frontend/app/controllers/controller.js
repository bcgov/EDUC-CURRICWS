const Node = require('../models/model');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Node content can not be empty"
        });
    }

    // Create a node
    const node = new Node({
        field_course_name_1: req.body.field_course_name_1,
        field_path_reference:req.body.field_path_reference,
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

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.nodeId)
    .then(node => {
        if(!node) {
            return res.status(404).send({
                message: "Node not found with id " + req.params.nodeId
            });
        }
        res.send({message: "Node deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Node not found with id " + req.params.nodeId
            });                
        }
        return res.status(500).send({
            message: "Node not delete note with id " + req.params.nodeId
        });
    });
};