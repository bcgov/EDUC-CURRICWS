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

// Get all nodes
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


// Find a single note with a noteId
exports.findOne = (req, res) => {
    Node.findById(req.params.nodeId)
    .then(node => {
        if(!node) {
            return res.status(404).send({
                message: "Node not found with id " + req.params.nodeId
            });            
        }
        console.log(node);
        res.send(node);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Node not found with id " + req.params.nodeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving node with id " + req.params.nodeId
        });
    });
};

//Gets nodes with specific Grades 
exports.findByGrade = (req, res) => {
    Node.find({'field_grade':req.params.gradeId})
    .then(node => {
        if(!node) {
            return res.status(404).send({
                message: "Node not found with id " + req.params.nodeId
            });            
        }
        res.send(node);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Node not found with id " + req.params.nodeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.nodeId
        });
    });
};
//Gets nodes with specific Subjects and Grades 
exports.findBySubjectAndGrade = (req, res) => {
    Node.find({'field_path_reference':req.params.subjectId,'field_grade':req.params.gradeId})
    .then(node => {
        if(!node) {
            return res.status(404).send({
                message: "Node not found with id " + req.params.nodeId
            });            
        }
        res.send(node);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Node not found with id " + req.params.nodeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.nodeId
        });
    });
};
//Gets nodes with specific Subjects and Grades 
exports.findBySubjectAndGradeTidy = (req, res) => {
    var nodeToSend;
    Node.find({'field_path_reference':req.params.subjectId,'field_grade':req.params.gradeId})
    .then(node => {
        if(!node) {
            return res.status(404).send({
                message: "Node not found with id " + req.params.nodeId
            });            
        }
        var splitNode = JSON.parse(node);
        nodeToSend = JSON.stringify(splitNode.field_path_reference, splitNode.field_grade, splitNode.Content);
        console.log(nodeToSend);
        return nodeToSend;
    });/*
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Node not found with id " + req.params.nodeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.nodeId
        });
        
    });*/
    res.send(nodeToSend);
};
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Node.findByIdAndRemove(req.params.nodeId)
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

exports.deleteMany = () => {
        Node.deleteMany( { "__v" : 0 }, function(err) {} );
        /*.then(
            res.send({message: "Nodes deleted successfully!"});
        ).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Nodes not deleted"
                });                
            }
            return res.status(500).send({
                message: "Nodes not deleted"
            });
        });*/

};