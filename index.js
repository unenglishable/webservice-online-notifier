var path = require('path');
var tester = require('webservice-online-check');
var request = require('request');
var config = require(path.join(__dirname, 'config.json'));
var storage = require(path.join(__dirname, 'storage'));

var urls = config.urls;
var keyword = config.keyword;
var postCheckHook = config.postCheckHook;
var maxStrikes = config.maxStrikes;

tester(urls, keyword)
.each(function(result) {
  if (result.status === 'online') {
    console.log(result.url, 'is online!');
    return storage.del(result.url);
  }
  else if (result.status === 'offline') {
    console.log(result.url, 'is offline!');
    return storage.put({ url: result.url, maxStrikes })
    .then(function(jailtime) {
      console.log(jailtime, '<?', Date.now());
      if (jailtime < Date.now()) {
        // notify and relock
        return storage.put({ url: result.url, maxStrikes, relock: true})
        .then(function() {
          if (postCheckHook) {
            request.post({ url: postCheckHook, body: { text: result.url + ' is offline: ' + JSON.stringify(result.errors) }, json: true });
          }
        });
      }
    });
  }
  else {
    console.log('¯\\_(ツ)_/¯');
  }
})
.then(function() {
  return storage.close();
});
