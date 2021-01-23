const express = require('express');
const {
  registerUser,
  loginUser,
  uploadProfileImage,
  deleteAccount,
} = require('../controllers/users');
const { validate, userValidationRules } = require('../utils/bodyValidator');
const multer = require('multer');
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('profileImage');

//initialize router
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', userValidationRules(), validate, loginUser);
router.post('/uploadProfileImage', multerUploads, uploadProfileImage);
router.delete('/deleteAccount', deleteAccount);

module.exports = router;
