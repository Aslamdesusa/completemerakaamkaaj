const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../models/config');

aws.config.update({
  accessKeyId: 'config.secretAccessKey',
  secretAccessKey: 'config.accessKeyId',
  signatureVersion: 'v4',
  region: 'config.region',
})

const s3 = new aws.S3()
 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'post-jobs-image',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;
 