const express = require('express');
const courseController = require('../app/controllers/CourseController');
const router = express.Router();

router.post('/store', courseController.store);
router.get('/create', courseController.create);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.delete);
router.get('/:slug', courseController.show);

module.exports = router;
