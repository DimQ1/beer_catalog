const { Router } = require('express');

const router = Router();
const expressJoiValidator = require('express-joi-validator');
const userValidators = require('../controllers/validators/userValidators');
const role = require('../../common/role');
const authorize = require('../middlewares/authorize');
const { beerController } = require('../controllers');
const errorCatcher = require('../../common/errorCatcher');

router.get('/',
    errorCatcher(beerController.getAll));

router.get('/:id',
    errorCatcher(beerController.getById));
router.post('/',
    errorCatcher(authorize(role.Admin)),
    errorCatcher(beerController.create));
router.delete('/:id',
    errorCatcher(authorize(role.Admin)),
    errorCatcher(beerController.deleteById));

module.exports = router;
