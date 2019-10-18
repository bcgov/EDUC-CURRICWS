const mongoose = require('mongoose');

const NodeSchema = mongoose.Schema({
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
                "main_content": String
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
    
    
    /*
    field_course_name_1: String,
    field_path_reference: String,
    field_grade: String,
    type: String,
    Curriculum: String,
    Content:[{"id":String,"main content":String,"sub-content":[]}],
    */
    //Elaborations:[{}]


});

module.exports = mongoose.model('Node', NodeSchema);