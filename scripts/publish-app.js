#!/usr/bin/env node
const AWS = require('aws-sdk');
const s3 = require('s3');

AWS.config.update({
  credentials: new AWS.SharedIniFileCredentials()
});
const awsS3Client = new AWS.S3();
const options = {
  s3Client: awsS3Client
};
const client = s3.createClient(options);
const params = {
  localDir: "build",
  deleteRemoved: true,
  s3Params: {
    Bucket: "docker.meneguello.com"
  },
};
const uploader = client.uploadDir(params);
uploader.on('error', function(err) {
  console.error("unable to sync:", err.stack);
});
uploader.on('progress', function() {
  console.log("progress", uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
  console.log("done uploading");
});
