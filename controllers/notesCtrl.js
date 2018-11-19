const notesBiMgr = require('../biManagers/notesBiMgr');
const responseUtils = require('../helpers/responseUtils');
const multiparty = require('multiparty');

/**
* function to add notes
* @param {*} req 
* @returns returns the success message on successful creation of notes
*/
module.exports.addNotes = function (req, res, next) {

    // parse a file upload 
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {

        notesBiMgr.addNotes(req, fields, files, (err, data) => {
            if (err) {
                // Generate error response
                responseUtils.sendResponse(res, err.code, err.message, err.module, err.content);
            }
            else if (data) {
                // Generate formatted success response
                responseUtils.sendResponse(res, data.code, data.message, data.module, data.content);
            }
        });
    })
};

//-----------------------------------------------------------------------------------

/**
* function to retrieve notes
* @param {*} req 
* @returns returns the success message on successful retrieval of notes
*/
module.exports.getNotes = function (req, res, next) {

    notesBiMgr.getNotes(req, (err, data) => {
        if (err) {
            // Generate error response
            responseUtils.sendResponse(res, err.code, err.message, err.module, err.content);
        }
        else if (data) {
            // Generate formatted success response
            responseUtils.sendResponse(res, data.code, data.message, data.module, data.content);
        }
    });
};

//-----------------------------------------------------------------------------------

/**
* function to modify notes
* @param {*} req 
* @returns returns the success message on successful modification of notes
*/
module.exports.editNotes = function (req, res, next) {

    // parse a file upload 
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {

        notesBiMgr.editNotes(req, fields, files, (err, data) => {
            if (err) {
                // Generate error response
                responseUtils.sendResponse(res, err.code, err.message, err.module, err.content);
            }
            else if (data) {
                // Generate formatted success response
                responseUtils.sendResponse(res, data.code, data.message, data.module, data.content);
            }
        });
    });
};

//-----------------------------------------------------------------------------------

/**
* function to remove notes
* @param {*} req 
* @returns returns the success message on successful removal of notes
*/
module.exports.removeNotes = function (req, res, next) {

    notesBiMgr.removeNotes(req, (err, data) => {
        if (err) {
            // Generate error response
            responseUtils.sendResponse(res, err.code, err.message, err.module, err.content);
        }
        else if (data) {
            // Generate formatted success response
            responseUtils.sendResponse(res, data.code, data.message, data.module, data.content);
        }
    });
};

//-----------------------------------------------------------------------------------

