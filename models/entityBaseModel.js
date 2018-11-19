const mongoose = require('mongoose');
const consts = require('../helpers/consts');

// Create a entity base schema
var Schema = mongoose.Schema;
var baseSchema = new Schema({

  entityId: String,  // Unique id for each entity (string representation of _id)

  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },

  crudType: { type: String, default: consts.crudType.create },

  keyValue: { type: Object, required: false },

});

// on every save, update the modified date
baseSchema.pre('save', function (next) {
  // get the current date
  var currentDate = new Date();

  // change the modified field to current date
  this.modifiedDate = currentDate;

  // if createdDate doesn't exist, add to that field
  if (!this.creationDate)
    this.creationDate = currentDate;

  next();
});

// Create a Model
var EntityBase = mongoose.model('EntityBase', baseSchema);

// Make EntityBase available everywhere in the app
module.exports = EntityBase;
