const log = require('../../common/log');


module.exports = (req, res, next) => {
    const message = 'Sorry cant find that!';
    log.debug(`url request ${req.url} response => ${message}`);

    res.status(404)
        .json({
            url: req.url,
            message,
            error: '404'
        });
};
