var mongoose = require('mongoose'); // Package to model the data
var BaseModel = require('../models/entityBaseModel');
var BaseModelSchema = require('../models/entityBaseModel').schema;

// Create a notes schema
var Schema = mongoose.Schema;
var notesSchema = new Schema({

    baseModel: BaseModelSchema,
    title: { type: String, unique: true }, // Title for the note
    description: { type: String, required: false }, // Content of the specific note
    attachment: [{
        name: { type: String, required: false }, // Name of the attachment
        fileType: { type: String, required: false }, // File type of the attachment
        url: { type: String, required: false } // Url for upload attachment
    }],
    remainder: {
        enabled: { type: Boolean, default: false },
        time: { type: Date, required: false },
        seen: { type: Boolean, default: false }
    }
});

// Method to create a new instance of a note document
notesSchema.statics.createNote = function () {

    var notes = new Notes();
    notes.baseModel = new BaseModel();

    notes.baseModel.entityId = notes.id;

    return notes;
};

// Create a Model
var Notes = mongoose.model('Notes', notesSchema);

// Make Notes available everywhere in the app
module.exports = Notes;
