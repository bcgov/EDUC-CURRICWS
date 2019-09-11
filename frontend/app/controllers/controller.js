const Node = require('../models/model');
//JWT
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

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
            message: err.body
        });
    });
};
//Gets nodes with specific Subjects and Grades and Type
exports.findBySubjectAndGradeAndType = (req, res) => {
    Node.find({'field_path_reference':req.params.subjectId,'field_grade':req.params.gradeId,'type':req.params.typeId})
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
            message: err.body
        });
    });
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
//JWT
// CREATES A NEW USER
router.post('/', function (req, res) {
    User.create({
            name : req.body.name,
            //email : req.body.email,
            //password : req.body.password
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;