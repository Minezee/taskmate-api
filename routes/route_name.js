const auth = require('../middleware/auth');
router.get('/private', auth, (req, res) => {
    res.send('Welcome to private route');
});