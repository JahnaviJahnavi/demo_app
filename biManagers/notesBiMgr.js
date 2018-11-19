const msg = require('../helpers/messages');
const httpStatus = require('../helpers/httpStatusCodes');
const modules = require('../helpers/modules');
const notesDataMgr = require('../dataManagers/notesDataMgr');

/**
 * Function for implementing business logic while creating a note
 */
module.exports.addNotes = function (req, fields, files, callback) {

    // parameters
    // request headers -> must be all small case letters
    var headers = req.headers;

    notesDataMgr.addNotes(req, fields, files, (err, note) => {
        if (err) {
            var error = {
                message: msg.messages.client.UnableToCreate,
                code: httpStatus.codes.clientErrorCodes.badRequest,
                module: modules.components.notes,
                content: err
            }
            callback(error);
        }
        else if (note) {
            var result = {
                message: msg.messages.notes.notesCreated,
                code: httpStatus.codes.successCodes.created,
                module: modules.components.notes,
                content: note
            }
            callback(err, result);
        }
    })
}

//-----------------------------------------------------------------------------------

/**
 * Function for implementing business logic while retrieving notes
 */
module.exports.getNotes = function (req, callback) {

    // parameters
    // request headers -> must be all small case letters
    var headers = req.headers;
    var filters = headers['filters'];
    var flag    = headers['flag'];
    var searchStr = headers['searchstr']

    if(flag == "search") {
        notesDataMgr.getSearchedNotes(searchStr, (err, notes) => {
            if (err) {
                var error = {
                    message: msg.messages.client.UnableToCreate,
                    code: httpStatus.codes.clientErrorCodes.badRequest,
                    module: modules.components.notes,
                    content: err
                }
                callback(error);
            }
            else if (notes) {
                var result = {
                    message: msg.messages.notes.notesRetrieved,
                    code: httpStatus.codes.successCodes.created,
                    module: modules.components.notes,
                    content: notes
                }
                callback(err, result);
            }
        })
    }
    else {
        notesDataMgr.getNotes(filters, (err, notes) => {
            if (err) {
                var error = {
                    message: msg.messages.client.UnableToCreate,
                    code: httpStatus.codes.clientErrorCodes.badRequest,
                    module: modules.components.notes,
                    content: err
                }
                callback(error);
            }
            else if (notes) {
                var result = {
                    message: msg.messages.notes.notesRetrieved,
                    code: httpStatus.codes.successCodes.created,
                    module: modules.components.notes,
                    content: notes
                }
                callback(err, result);
            }
        })
    }
}

//-----------------------------------------------------------------------------------

/**
 * Function for implementing business logic while modifying notes
 */
module.exports.editNotes = function (req, fields, files, callback) {

    var noteId = req.params.noteId;

    // parameters
    // request headers -> must be all small case letters
    var headers = req.headers;

    notesDataMgr.editNotes(noteId, fields, files, (err, notes) => {
        if (err) {
            var error = {
                message: msg.messages.client.UnableToModify,
                code: httpStatus.codes.clientErrorCodes.badRequest,
                module: modules.components.notes,
                content: err
            }
            callback(error);
        }
        else if (notes) {
            var result = {
                message: msg.messages.notes.notesModified,
                code: httpStatus.codes.successCodes.created,
                module: modules.components.notes,
                content: notes
            }
            callback(err, result);
        }
    })
}

//-----------------------------------------------------------------------------------

/**
 * Function for implementing business logic while removing notes
 */
module.exports.removeNotes = function (req, callback) {

    var noteId = req.params.noteId;

    // parameters
    // request headers -> must be all small case letters
    var headers = req.headers;

    notesDataMgr.removeNotes(noteId, req.body, (err, note) => {
        if (err) {
            var error = {
                message: msg.messages.client.UnableToDelete,
                code: httpStatus.codes.clientErrorCodes.badRequest,
                module: modules.components.notes,
                content: err
            }
            callback(error);
        }
        else if (note) {
            var result = {
                message: msg.messages.notes.notesDeleted,
                code: httpStatus.codes.successCodes.created,
                module: modules.components.note,
                content: note
            }
            callback(err, result);
        }
    })
}

//-----------------------------------------------------------------------------------