const { Router } = require('express');

const router = Router();
const expressJoiValidator = require('express-joi-validator');
const { loginController } = require('../controllers');
const { loginValidators } = require('../controllers');
const errorCatcher = require('../../common/errorCatcher');

router.post('/',
    expressJoiValidator(loginValidators.login),
    errorCatcher(loginController.login));
module.exports = router;
