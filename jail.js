var jail = module.exports = {};
var path = require('path');
var redis = require(path.join(__dirname, 'redis'));
var client = redis.createClient();
var twentyfour = 60 * 60 * 24 * 1000;

jail.strike = key => client.hincrbyAsync('strikes', key, 1);
jail.zero = key => client.hdelAsync('strikes', key);
jail.strikes = key => client.hgetAsync('strikes', key);
jail.lock = key => client.hsetnxAsync('jail', key, Date.now());
jail.relock = key => client.hsetAsync('jail', key, Date.now() + twentyfour);
jail.inspect = key => client.hgetAsync('jail', key);
jail.release = key => client.hdelAsync('jail', key);
jail.get = () => client.hgetallAsync('jail');
jail.close = () => client.quit();
