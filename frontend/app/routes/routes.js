var VerifyToken = require('../auth/VerifyToken');
module.exports = (app) => {
    const curri = require('../controllers/controller.js');
    // Retrieve all Notes
    app.get('/all', VerifyToken, curri.findAll);
    //Retrieve all Subjects
    app.get('/nodes/:gradeId', curri.findByGrade);
    app.get('/nodes/:subjectId/:gradeId', curri.findBySubjectAndGrade);
    app.get('/nodes/:subjectId/:gradeId/:typeId', curri.findBySubjectAndGradeAndType);
    app.get('/node/:nodeId', curri.findOne);
    //Create a Curriculum object
    app.post('/nodes',curri.create);
    //Delete a Curriculum object
    app.delete('/nodes/:nodeId', curri.delete);
    //Delete a Curriculum object
    app.delete('/nodes', curri.deleteMany);
};