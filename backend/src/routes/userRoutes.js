const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/multer');

router.route('/')
    .get(userController.getUsers)
    .post(upload.single('profileImage'), userController.createUser);

router.get('/search', userController.searchUsers);
router.get('/export-csv', userController.exportCsv);

router.route('/:id')
    .get(userController.getUserById)
    .put(upload.single('profileImage'), userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
