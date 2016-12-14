require('dotenv').load({ silent: true });
var configJSON, envUrls, path = require('path');
try { configJSON = require(path.join(__dirname, 'config.json')); }
catch (error) { configJSON = {}; }
if (process.env.URLS) { envUrls = process.env.URLS.split(' '); }
module.exports = {
  postCheckHook: process.env.POST_CHECK_HOOK || configJSON.postCheckHook || '',
  keyword: process.env.KEYWORD || configJSON.keyword || '',
  maxStrikes: Number(process.env.MAX_STRIKES) || Number(configJSON.maxStrikes) || 5,
  urls: envUrls || configJSON.urls || []
};
