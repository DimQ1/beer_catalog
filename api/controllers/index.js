const { userController } = require('./userController');
const { loginController } = require('./loginController');
const { beerController } = require('./beerController');
const { favoriteController } = require('./favoriteController');

const loginValidators = require('./validators/loginValidators');

module.exports = {
    userController,
    loginController,
    loginValidators,
    beerController,
    favoriteController
};
