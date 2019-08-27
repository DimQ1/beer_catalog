const { Router } = require('express');

const router = Router();
const { favoriteController } = require('../controllers');
const errorCatcher = require('../../common/errorCatcher');

router.get('/',
    errorCatcher(favoriteController.getAll));
router.patch('/addbeer/:id',
    errorCatcher(favoriteController.addFavorite));
router.patch('/removebeer/:id',
    errorCatcher(favoriteController.removeFavorite));

module.exports = router;
