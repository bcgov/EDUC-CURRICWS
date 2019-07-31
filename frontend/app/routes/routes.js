module.exports = (app) => {
    const curri = require('../controllers/controller.js');
    // Retrieve all Notes
    app.get('/all', curri.findAll);
     //Retrieve all Subjects
     app.get('/subjects', curri.findSubjects);
};