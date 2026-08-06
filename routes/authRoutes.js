const router = require('express').Router();

const { register, login, logout } = require('../controllers/authController');

const auth = require('../Middleware/auth');

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

module.exports = router;