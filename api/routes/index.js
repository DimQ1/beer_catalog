const { Router } = require('express');

const router = Router();
const users = require('./users');
const login = require('./login');
const beers = require('./beers');


router.use('/users', users);
router.use('/login', login);
router.use('/beers', beers);

module.exports = router;
