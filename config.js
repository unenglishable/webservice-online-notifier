require('dotenv').load({ silent: true });
var configJSON = require('config.json');
module.exports = {
  postCheckHook: process.env.POST_CHECK_HOOK || configJSON.postCheckHook,
  keyword: process.env.KEYWORD || configJSON.keyword,
  maxStrikes: process.env.MAX_STRIKES || configJSON.maxStrikes,
  urls: configJSON.urls
};
