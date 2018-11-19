var express = require('express');
var notesCtrl = require('../controllers/notesCtrl');
var swaggerUi = require('swagger-ui-express');
    swaggerDocument = require('../dist/api-doc.json');

module.exports = function (app) {

    var apiRoutes = express.Router(),
        notesRoutes = express.Router(),
        versionRoutes = express.Router()

    apiRoutes.use('/notes', notesRoutes);

    // Note Route
    notesRoutes.post('/', notesCtrl.addNotes);
    notesRoutes.get('/', notesCtrl.getNotes);
    notesRoutes.put('/:noteId', notesCtrl.editNotes);
    notesRoutes.delete('/:noteId', notesCtrl.removeNotes);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Set up routes
    app.use('/api', apiRoutes);
}