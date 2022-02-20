const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router();


const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/public/img");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
})

const upload = multer({ storage: fileStorageEngine });

// router.use('/user/logup').get(userController.logup).post(userController.create);


router.get('/create', userController.create);
router.get('/:id', userController.delete);
router.post('/:id/update', userController.update);
router.get('/:id/edit', userController.edit);
router.post('/logup', userController.logup);
router.get('/', userController.index);

module.exports = router;
