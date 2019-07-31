const mongoose = require('mongoose');

const NodeSchema = mongoose.Schema({
    field_course_name_1: String,
    field_path_reference:String,
    field_grade: String,
    type: String,
    Curriculum: String,
    Content:[{}],
    Elaborations:[{}]
});

module.exports = mongoose.model('Node', NodeSchema);