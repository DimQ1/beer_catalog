const { userController } = require('./user');
const { loginController } = require('./login');
const { beerController } = require('./beer');
const { favoriteController } = require('./favorite');

const loginValidators = require('./validators/login');

module.exports = {
    userController,
    loginController,
    loginValidators,
    beerController,
    favoriteController
};
