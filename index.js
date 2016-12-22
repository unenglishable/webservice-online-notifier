var _ = require('lodash');
var path = require('path');
var tester = require('webservice-online-check');
var request = require('request');
var config = require(path.join(__dirname, 'config.js'));
var storage = require(path.join(__dirname, 'storage'));
var emailer = require(path.join(__dirname, 'emailer'));

var urls = config.urls;
var keyword = config.keyword;
var postCheckHook = config.postCheckHook;
var maxStrikes = config.maxStrikes;

module.exports = function() {
  return tester(urls, keyword)
  .each(function(result) {
    if (result.status === 'online') {
      console.log(result.url, 'is online!');
      return storage.del(result.url)
      .then(function(wasOffline) {
        if (wasOffline) {
            if (postCheckHook) {
              request.post({ url: postCheckHook, body: { text: result.url + ' is back online! :tada:'}, json: true });
            }
            if (_.get(config, 'emailer.list.length', 0) > 0) {
              emailer.send({
                url: result.url,
                status: 'back online!',
                body: 'Nothing to see here :)'
              });
            }
        }
      });
    }
    else if (result.status === 'offline') {
      console.log(result.url, 'is offline!');
      return storage.put({ url: result.url, maxStrikes })
      .then(function(jailtime) {
        if (jailtime > maxStrikes && jailtime <= Date.now()) {
          // notify and relock
          return storage.put({ url: result.url, maxStrikes, relock: true})
          .then(function() {
            if (postCheckHook) {
              request.post({ url: postCheckHook, body: { text: result.url + ' is offline: ' + JSON.stringify(result.errors) }, json: true });
            }
            if (_.get(config, 'emailer.list.length', 0) > 0) {
              emailer.send({
                url: result.url,
                status: 'offline',
                body: JSON.stringify(result.errors)
              });
            }
          });
        }
      });
    }
    else {
      console.log('¯\\_(ツ)_/¯');
    }
  });
};
