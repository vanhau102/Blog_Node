const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router();

// router.use('/user/logup').get(userController.logup).post(userController.create);

router.get('/create', userController.create);
router.get('/:id', userController.delete);
router.post('/:id/update', userController.update);
router.get('/:id/edit', userController.edit);
router.post('/logup', userController.logup);
router.get('/', userController.index);

module.exports = router;
