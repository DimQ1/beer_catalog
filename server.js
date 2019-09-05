const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const errorHandlerMiddelware = require('./api/middlewares/errorHandler');
const errorLoggerMiddelware = require('./api/middlewares/errorLogger');
const requestLoggerMiddelware = require('./api/middlewares/requestLogger');
const log = require('./common/log');
const routes = require('./api/routes');
const notFoundMiddelware = require('./api/middlewares/notFound');
const { secret } = require('./config');
const { port } = require('./config');
const source = require('./dataAccess/source');

const app = express();

source.connect();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt({ secret })
    .unless({ path: ['/login'] }));
app.use(requestLoggerMiddelware);
app.use('/', routes);
app.use(notFoundMiddelware);
app.use(errorLoggerMiddelware);
app.use(errorHandlerMiddelware);

app.listen(port, () => {
    log.info(`Server listening on port ${port}`);
});
