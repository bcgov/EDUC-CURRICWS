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
        course_path: req.body.course_path,
        subject_path:req.body.subject_path,
        grade_id: String,
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
        
        //console.log( typeof nodes);
        //console.log(typeof nodes[1]);
        //console.log(nodes[0].'7'.subject_path);
        //console.log(nodes[0]);
        //console.log(nodes[0]._id);
        //console.log(nodes[0].test);
        

        


        
    
      
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
    Node.find({'grade_id':req.params.gradeId})
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
    console.log(req.params.subjectId + " " + req.params.gradeId);
    Node.find({'subject_path':req.params.subjectId,'grade_id':req.params.gradeId})
    .then(node => {
        if(!node) {
            return res.status(404).send({
                message: "Nodes not found for " + req.params.subjectId + "and" + req.params.gradeId
            });            
        }
        //console.log(node[0].content[0].en.main_content);
        var content = [];
        var index = 0;
        var count = 0;
        
        node.forEach(function(element){
            
            content.push({"main_content":element.content.main_content.en.trim()});
        
         
        });

        console.log(content);
        
        res.json(content);
        //res.send(node);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Nodes not found for " + req.params.subjectId + "and" + req.params.gradeId
            });                
        }
        return res.status(500).send({
            message: err.body
        });
    });
};
//Gets nodes with specific Subjects and Grades and Type
exports.findBySubjectAndGradeAndType = (req, res) => {
    Node.find({'subject_path':req.params.subjectId,'grade_id':req.params.gradeId,'type':req.params.typeId})
    .then(node => {
        if(!node) {
            return res.status(404).send({
                message: "Node not found with id " + req.params.nodeId
            });            
        }
        var content = [];
        var index = 0;
        var count = 0;
        console.log(req.params.typeId);
       
            node.forEach(function(element){ 
                content.push(element.content.main_content.en.trim());
            });

        if(req.params.typeId == "Big Ideas"){
            res.json({"big_ideas":content});
        }else if(req.params.typeId == "Content"){
            res.json({"content":content});
        }else if(req.params.typeId == "Curricular Competency"){
            res.json({"curricular_competencies":content});
        }
        
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
const groupByType= (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue.type] = result[currentValue.type] || []).push(
      currentValue
    );
    console.log(result);
    return result;
  }, {});
};