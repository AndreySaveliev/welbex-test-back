const router = require('express').Router();
const { checkUser } = require('../controllers/user');

router.get('/', checkUser);

module.exports = router;
