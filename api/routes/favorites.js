const { Router } = require('express');

const router = Router();
const expressJoiValidator = require('express-joi-validator');
const userValidators = require('../controllers/validators/userValidators');
const role = require('../../common/role');
const authorize = require('../middlewares/authorize');
const { favoriteController } = require('../controllers');
const errorCatcher = require('../../common/errorCatcher');

router.get('/',
    errorCatcher(favoriteController.getAll));

router.patch('/addbeer/:id',
    errorCatcher(favoriteController.addFavorite));
router.patch('/removebeer/:id',
    errorCatcher(favoriteController.removeFavorite));

module.exports = router;
