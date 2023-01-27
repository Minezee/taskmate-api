const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

router.get('/get', authMiddleware, userController.getNotes);
router.post('/add', authMiddleware, userController.addNote);
router.get('/view/:id', authMiddleware, userController.viewNote);
router.put('/update/:id', authMiddleware, userController.updateNote);
router.delete('/delete/:id', authMiddleware, userController.deleteNote);
router.patch('/favorite/:id', authMiddleware, userController.favoriteNote);
router.delete('/remove_favorite/:id', authMiddleware, userController.removeFromFavorite);

module.exports = router;