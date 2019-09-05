const logger = require('./logger')();

const log = {
    info: info => logger.info(info),
    warning: warning => logger.warning(warning),
    debug: debag => logger.debug(debag),
    error: error => logger.error(error)
};

module.exports = log;
