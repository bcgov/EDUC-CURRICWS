module.exports = (app) => {
    const curri = require('../controllers/controller.js');
    // Retrieve all Notes
    app.get('/all', curri.findAll);
    //Retrieve all Subjects
    app.get('/grade/:gradeId', curri.findByGrade);
    app.get('/grade/:subjectId/:gradeId', curri.findBySubjectAndGrade);
    app.get('/nodes/:nodeId', curri.findOne);
    //Create a Curriculum object
    app.post('/nodes',curri.create);
    //Delete a Curriculum object
    app.delete('/nodes/:nodeId', curri.delete);
    //Delete a Curriculum object
    app.delete('/nodes', curri.deleteMany);
};