const { userController } = require('./userController');
const { loginController } = require('./loginController');
const { beerController } = require('./beerController');

const loginValidators = require('./validators/loginValidators');

module.exports = {
    userController,
    loginController,
    loginValidators,
    beerController
};
