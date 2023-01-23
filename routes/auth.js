const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    res.send('Get logged in user');
});

module.exports = router;
