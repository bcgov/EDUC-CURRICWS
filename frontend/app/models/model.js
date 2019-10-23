const mongoose = require('mongoose');
//var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var NodeSchema = new mongoose.Schema({

    node:[{
      
     /*
            subject_path: String,
            course_path: String,
            course_discipline: [{ "en": String}],
            grade_id: String,
            type: String,
            curriculum_title: [{"en": String}],
            content: [{
                "content_id": String,
                "en": {
                    "id": String,
                    "main_content": String,
                    "sub_content": [{"content": String, "id":String}]
                }
            }],
            curriculum_label: [{
                "en": String
            }],
            curriculum_area_label: [{
                "en": String
            }],
            node_id: String*/
      
       
    }]
});

/*
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const NodeSchema = Schema({
    
    "_id": ObjectId,
    Test:[{
        node: [{
     
            subject_path: String,
            course_path: String,
            course_discipline: [{ "en": String}],
            grade_id: String,
            type: String,
            curriculum_title: [{"en": String}],
            content: [{
                "content_id": String,
                "en": {
                    "id": String,
                    "main_content": String,
                    "sub_content": [{"content": String, "id":String}]
                }
            }],
            curriculum_label: [{
                "en": String
            }],
            curriculum_area_label: [{
                "en": String
            }],
            node_id: String
        }]
    }]
});
*/
module.exports = mongoose.model('Node', NodeSchema);