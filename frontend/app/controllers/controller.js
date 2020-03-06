const Node = require('../models/model');
var _ = require('lodash');

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

// Find nodes with text
exports.find = (req, res) => {

    Node.find({'content.main_content.en': { $regex: req.params.keyword, $options: 'i' } })
    .then(node => {
       
        if(!node) {
            return res.status(404).send({
                message: "Node not found with id " + req.params.nodeId
            });            
        }
        console.log("nodes" + node)
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
       var content = [];

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
    .then(nodes => {
        if(!nodes) {
            return res.status(404).send({
                message: "Node not found with id " + req.params.nodeId
            });            
        }
        var index = 0;
        var main_content = new Array();
       
        var content = new Array();
        var x = [];
        nodes.forEach(function(element){
    
            //console.log(element.content.main_content.en);

            //result.push(element.content.main_content.en);  
            //result.push(element.content.sub_content);
            //result.push(element.content.sub_content);  
            //console.log(element.content.sub_content);
            try{
                var sub_content = new Array();
                main_content = element.content.main_content.en;
                if(element.content.sub_content != null){
                    subContentClone = _.cloneDeep(element.content.sub_content);
        
                    subContentClone.map(function(elem){
                        try{
                            sub_content.push(elem.en);  
                                    
                        }catch(e){

                        } 
                    });
                    content.push({"main_content":main_content, "sub_content":sub_content});
    
                }else{
                    content.push({"main_content":main_content});
                }
            }catch(e){
                console.log("EXCEPTIONS" + e);
            } 
              

              

             //console.log(sub_content_array[0]);
             //console.log(sub_content_array[1]);
            
            //result.push(element.content.main_content.en);
            //result.push({"sub_content":element.content.sub_content[0].en});
            //var x = element.content.sub_content[0].en;
            //res.json("hello world");
            
            //remap the sub_content data

            //
        });
        //console.log(result);
        //console.log(nodes[0]);
        //console.log(nodes[1]);
        //console.log(nodes[2]);

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