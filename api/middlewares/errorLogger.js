const LoggerFactory = require('./loggerFactory');
const log = require('../../common/log');

const loggerFactory = new LoggerFactory(log);

module.exports = loggerFactory.create('errorLogger');
