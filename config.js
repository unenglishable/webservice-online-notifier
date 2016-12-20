require('dotenv').load({ silent: true });
var configJSON, envUrls, envEmailerList, _ = require('lodash'), path = require('path');
try { configJSON = require(path.join(__dirname, 'config.json')); }
catch (error) { configJSON = {}; }
if (process.env.URLS) { envUrls = process.env.URLS.split(' '); }
if (process.env.EMAILER_LIST) { envEmailerList = process.env.EMAILER_LIST.split(' '); }
module.exports = {
  postCheckHook: process.env.POST_CHECK_HOOK || configJSON.postCheckHook || '',
  keyword: process.env.KEYWORD || configJSON.keyword || '',
  maxStrikes: Number(process.env.MAX_STRIKES) || Number(configJSON.maxStrikes) || 5,
  urls: envUrls || configJSON.urls || [],
  emailer: {
    list: envEmailerList || _.get(configJSON, 'emailer.list') || [],
    sender: process.env.EMAILER_SENDER || _.get(configJSON, 'emailer.sender') || '',
    awsAccessKey: process.env.EMAILER_AWS_ACCESS_KEY || _.get(configJSON, 'emailer.awsAccessKey') || '',
    awsSecretKey: process.env.EMAILER_AWS_SECRET_KEY || _.get(configJSON, 'emailer.awsSecretKey') || '',
    awsHost: process.env.EMAILER_AWS_HOST || _.get(configJSON, 'emailer.awsHost') || ''
  },
  redis: {
    host: process.env.REDIS_PORT_6379_TCP_ADDR || process.env.REDIS_HOST,
    port: process.env.REDIS_PORT_6379_TCP_PORT || process.env.REDIS_PORT,
    url: process.env.REDIS_URL
  }
};
