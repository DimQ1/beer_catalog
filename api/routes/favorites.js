const { Router } = require('express');

const router = Router();
const expressJoiValidator = require('express-joi-validator');
const favoriteValidators = require('../controllers/validators/favoriteValidators');
const { favoriteController } = require('../controllers');
const errorCatcher = require('../../common/errorCatcher');

router.get('/',
    errorCatcher(favoriteController.getAll));
router.patch('/addbeer/:id',
    expressJoiValidator(favoriteValidators.paramsBeerId),
    errorCatcher(favoriteController.addFavorite));
router.patch('/removebeer/:id',
    expressJoiValidator(favoriteValidators.paramsBeerId),
    errorCatcher(favoriteController.removeFavorite));

module.exports = router;
