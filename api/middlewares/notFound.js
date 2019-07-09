const logger = require('../../common/logger')();


module.exports = (req, res, next) => {
    const message = 'Sorry cant find that!';
    logger.debug(`url request ${req.url} response => ${message}`);

    res.status(404)
        .json({
            url: req.url,
            message,
            error: '404'
        });
};
