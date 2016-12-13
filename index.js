var path = require('path');
var tester = require('webservice-online-check');
var request = require('request');
var config = require(path.join(__dirname, 'config.json'));
var storage = require(path.join(__dirname, 'storage'));

var urls = config.urls;
var keyword = config.keyword;
var postCheckHook = config.postCheckHook;

tester(urls, keyword)
.each(function(result) {
  if (result.status === 'online') {
    console.log(result.url, 'is online!');
    return storage.del(result.url);
  }
  else if (result.status === 'offline') {
    result.errors.forEach(function(error) {
      console.log(result.url, 'is offline:');
    });
    if (postCheckHook) {
      request.post({ url: postCheckHook, body: { text: result.url + ' is offline: ' + JSON.stringify(result.errors) }, json: true });
    }
  }
  else {
    console.log('¯\\_(ツ)_/¯');
  }
})
.then(function() {
  return storage.close();
});
