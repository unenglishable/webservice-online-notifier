var emailer = module.exports = {};

var path = require('path');
var _ = require('lodash');
var nodemailer = require('nodemailer');
var config = require(path.join(__dirname, 'config'));
var transporter = nodemailer.createTransport({
  host: _.get(config, 'emailer.awsHost'),
  auth: {
    user: _.get(config, 'emailer.awsAccessKey'),
    pass: _.get(config, 'emailer.awsSecretKey')
  }
});

emailer.send =(options)=> {
  return new Promise(function(resolve, reject) {
    transporter.sendMail(instanceStatus(options), function(error) {
      if (error) { return reject(error); }
      else { return resolve(); }
    });
  });
};

// url, status, body
var instanceStatus = function(options) {
  return {
    from: _.get(config, 'emailer.sender'),
    to: config.emailer.list,
    subject: `${options.url} is ${options.status}`,
    text: options.body
  };
};
