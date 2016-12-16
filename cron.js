var Promise = require('bluebird');
var path = require('path');
var cron = require('cron-scheduler');
var webserviceOnlineNotifier = require(path.join(__dirname));

cron({ on: '* * * * *' }, function() { return webserviceOnlineNotifier(); });
