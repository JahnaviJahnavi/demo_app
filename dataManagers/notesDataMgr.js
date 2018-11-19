const Notes = require('../models/notesModel');
const utils = require('../helpers/utils');
const consts = require('../helpers/consts');
const async = require('async');
const schedule = require('node-schedule');

/**
 * Function to create an instance of notes and saving it to the db
 */
module.exports.addNotes = (req, fields, files, callback) => {

    var note = new Notes.createNote();

    async.waterfall([
        // First callback
        function (callback) {
            note.title = fields.title
            note.description = fields.description

            callback(null, note);
        },
        function (note, callback) {
            if (fields.remainder) {
               
                var remainderParsed = JSON.parse(fields.remainder[0]);
                note.remainder = remainderParsed;

                if (remainderParsed.enabled = true) {
                    scheduleJob(remainderParsed.time, note._id);
                    callback(null, note);
                }
            }
            else {
                callback(null, note);
            }
        },
        // Second callback
        function (note, callback) {
            if (!utils.isEmpty(files)) {
                async.eachSeries(files, function (file, callback) {
                    utils.fileUpload(file[0], function (attachmentObj) {

                        var fileObj = {};
                        fileObj.name = attachmentObj.name;
                        fileObj.fileType = attachmentObj.extension;
                        fileObj.url = attachmentObj.url;

                        note.attachment.push(fileObj);

                        callback(null);
                    });
                },
                function (err) {
                    callback(null, note);
                });
            }
            else {
                callback(null, note);
            }
        },
        // Third callback
        function (note, callback) {
            // Save note object
            note.save(function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(err, note);
                }
            });
        }],
        function (err, note) {
            callback(err, note);
        })
}

//-----------------------------------------------------------------------------------

module.exports.getNotes = (filters, callback) => {

    var query = {};
    query['baseModel.crudType'] = { $ne: consts.crudType.delete };

    if (filters) {
        filterObj = JSON.parse(filters);

        if (filterObj.remainderSeen !== undefined) {
            if (filterObj.remainderSeen == "unseen") {
                query['remainder.seen'] = false
            }
            query['remainder.enabled'] = true
        }
    }

    // To find notes docs wrt given query
    Notes.find(query)
        .exec((err, notes) => {
            if (err) {
                callback(err);
            }
            else if (notes) {
                callback(err, notes);
            }
            else {
                callback();
            }
        });
}

//-----------------------------------------------------------------------------------

module.exports.getSearchedNotes = (searchStr, callback) => {

    var noteSearchQuery = { 'title': { '$regex': searchStr, '$options': 'i' } };
    noteSearchQuery['baseModel.crudType'] = { $ne: consts.crudType.delete };

    // To find notes docs wrt given query
    Notes.find(noteSearchQuery)
        .exec((err, notes) => {
            if (err) {
                callback(err);
            }
            else if (notes) {
                callback(err, notes);
            }
            else {
                callback();
            }
        });
}

//-----------------------------------------------------------------------------------

module.exports.editNotes = (noteId, fields, files, callback) => {

    // To find note wrt to given id
    Notes.findById(noteId, (err, note) => {
        if (err) {
            callback(err);
        }
        else if(note) {

            async.waterfall([
                // First callback
                function (callback) {
                    if (fields.title)
                        user.iue_firstName = fields.title;

                    if (fields.description)
                        note.iue_lastName = fields.description;

                    callback(null, note);
                },
                // Second callback
                function (note, callback) {
                    if (fields.remainder) {
                        var remainderParse = JSON.parse(fields.remainder);

                        if (remainderParse.enabled && remainderParse.enabled == false) {
                            cancelJob(note._id)
                            note.remainder.enabled = false
                            note.remainder.seen = false
                        }
                        else {
                            if (remainderParse.enabled && remainderParse.enabled == true) {
                                if (remainderParse.enabled == note.remainder.enabled) {
                                    if (remainderParse.time && note.remainder.time && note.remainder.time == remainderParse.time) {
                                        if (note.remainder.seen == remainderParse.seen) {
                                            console.log("No modification done")
                                        }
                                        else {
                                            if (note.remainder.seen == false && remainderParse.seen == true) {
                                                cancelJob(note._id)
                                                note.remainder.seen = true
                                            }
                                            else if (note.remainder.seen == true && remainderParse.seen == false) {
                                                scheduleJob(remainderParse.time, note._id)
                                                note.remainder.seen = false
                                            }
                                            else {
                                                console.log("Invalid/Unhandeled Case")
                                            }
                                        }
                                    }
                                    else {
                                        cancelJob(note._id)
                                        scheduleJob(remainderParse.time, note._id)
                                        note.remainder.time = remainderParse.time
                                        note.remainder.seen = false
                                    }
                                }
                                else {
                                    scheduleJob(remainderParse.time, note._id)
                                    note.remainder.enabled = true
                                    note.remainder.time = remainderParse.time
                                    note.remainder.seen = false
                                }
                            }
                        }
                    }

                    callback(null, note);
                },
                // Third callback
                function (note, callback) {
                    if (fields.removeAttachment) {
                        
                        fields.removeAttachment.forEach((attachment) => note.attachment.forEach((file) => {

                            if (attachment == file.name) {
                                var index = note.attachment.indexOf(file);
                                note.attachment.splice(index, 1);
                            }
                        }
                        ))
                        callback(null, note);
                    }
                    else {
                        callback(null, note);
                    }
                },
                function(note, callback) {
                    if (!utils.isEmpty(files)) {
                        async.eachSeries(files, function (file, callback) {
                            utils.fileUpload(file[0], function (attachmentObj) {
        
                                var fileObj = {};
                                fileObj.name = attachmentObj.name;
                                fileObj.fileType = attachmentObj.extension;
                                fileObj.url = attachmentObj.url;
                                
                                note.attachment.push(fileObj);
        
                                callback(null);
                            });
                        },
                        function (err) {
                            callback(null, note);
                        });
                    }
                },
                // Fifth callback
                function (note, callback) {

                    note.baseModel.crudType = consts.crudType.update;

                    // Save updated note object
                    note.save(function (err) {
                        if (err) {
                            callback(err);
                        }
                        else
                            callback(err, note);
                    });
                }],
                function (err, note) {
                    callback(err, note);
                })
        }
        else {
            callback("Note not found");
        }
    })
}

//-----------------------------------------------------------------------------------

module.exports.removeNotes = (noteId, body, callback) => {

    // To find note wrt to given query
    Notes.findById(noteId, (err, note) => {
        if (err) {
            callback(err);
        }
        else {
            if (body.hardDelete !== undefined) {
                Notes.remove({ _id: noteId }, function (err, res) {
                    cancelJob(note._id)

                    callback(err, res);
                })
            } else {
                note.baseModel.crudType = consts.crudType.delete;

                cancelJob(note._id)

                // Save updated note object
                note.save(function (err) {
                    if (err) {
                        callback(err);
                    }
                    else
                        callback(err, note);
                });
            }
        }
    });
}

//-----------------------------------------------------------------------------------

const scheduleJob = (remainderDate, noteId) => {
    utils.nodeScheduler(remainderDate, noteId, function () {
        console.log("Remainder Alert");
    })
}

//-----------------------------------------------------------------------------------

const cancelJob = (noteId) => {
    var noteStr = Object(noteId).toString();
    var job = schedule.scheduledJobs[noteStr];
    if (job !== undefined) {
        job.cancel();
    }
}

//-----------------------------------------------------------------------------------