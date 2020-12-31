const express = require('express');
const { registerUser, loginUser } = require('../controllers/users');
const { validate, userValidationRules } = require('../utils/bodyValidator');

//initialize router
const router = express.Router();

router.post('/register', userValidationRules(), validate, registerUser);
router.post('/login', userValidationRules(), validate, loginUser);

module.exports = router;
