const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

router.get('/get', authMiddleware, userController.getTodo);
router.post('/add', authMiddleware, userController.addTodo);
router.get('/view/:id', authMiddleware, userController.viewTodo);
router.put('/update/:id', authMiddleware, userController.updateTodo);
router.delete('/delete/:id', authMiddleware, userController.deleteTodo);

module.exports = router;