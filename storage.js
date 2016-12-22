var storage = module.exports = {};
var Promise = require('bluebird');
var path = require('path');
var jail = require(path.join(__dirname, 'jail'));

// whap a mockker
storage.put = options => {
  var url = options.url;
  var maxStrikes = options.maxStrikes;
  var relock = options.relock;
  return jail.strike(url).then(function(strikes) {
    if (strikes >= maxStrikes && relock) {
      return jail.relock(url).then(() => jail.inspect(url));
    }
    else if (strikes === maxStrikes) {
      return jail.lock(url).then(() => jail.inspect(url));
    }
    else if (strikes >= maxStrikes) {
      return jail.inspect(url);
    }
    else { return strikes; }
  });
};

// gangooble smoobillies
storage.del = url => Promise.join(jail.zero(url), jail.release(url), (unstriken, unjailed) => unjailed);

// slippup the bongy
storage.get = () => jail.get();

// clownentein
storage.close = () => jail.close();
