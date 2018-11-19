const uuid = require('node-uuid');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const schedule = require('node-schedule');
const consts = require('../helpers/consts');

// Checks for the presence of content in the object
module.exports.isEmpty = function (obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

//-----------------------------------------------------------------------------------

module.exports.fileUpload = function (files, callback) {
  var imageName = uuid.v4();

  // Load credentials and set region from JSON file
  AWS.config.loadFromPath('./config/s3Config.json');

  var BUCKET_NAME = consts.awsS3Config.bucketName;

  // Create S3 service object
  s3 = new AWS.S3({ apiVersion: '2006-03-01' });

  // Call S3 to retrieve upload file to specified bucket
  var uploadParams = { Bucket: BUCKET_NAME, Key: '', Body: '', ACL: 'public-read' };

  fs.readFile(files.path, function (err, data) {

    var bufferStream = new stream.PassThrough();
    bufferStream.end(data);

    uploadParams.Key = imageName + path.extname(files.originalFilename);

    uploadParams.Body = bufferStream;

    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        callback(err);
      }
      if (data) {
        let retObj = {};
        retObj.name = files.originalFilename;
        retObj.url = data.Location;
        retObj.extension = path.extname(files.originalFilename);

        callback(retObj);
      }
    });
  });
}

//-----------------------------------------------------------------------------------

// Gives alert at the scheduled time
module.exports.nodeScheduler = function (remainderDate, notificationId, callback) {

  let noteStr = Object(notificationId).toString();
  let date = new Date(remainderDate);
  console.log(date);
  var job = schedule.scheduleJob(noteStr, date, function (Id) {
    console.log('Inside Schedule');
    callback();
  });
}

//-----------------------------------------------------------------------------------
