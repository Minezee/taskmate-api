const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

router.get('/data', authMiddleware, userController.getUser);
router.get('/get_notes', authMiddleware, userController.getNotes);
router.post('/add_notes', authMiddleware, userController.addNote);
router.get('/view_notes/:id', authMiddleware, userController.viewNote);
router.put('/update_notes/:id', authMiddleware, userController.updateNote);
router.delete('/delete_notes/:id', authMiddleware, userController.deleteNote);
router.patch('/favorite_notes/:id', authMiddleware, userController.favoriteNote);
router.delete('/remove_favnotes/:id')

module.exports = router;