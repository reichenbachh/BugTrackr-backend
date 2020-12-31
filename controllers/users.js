const userModel = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if email already exists
    const emailExists = await userModel.findOne({
      where: {
        email: email,
      },
    });
    //return duplicate email error if email already exists
    if (emailExists) {
      return responseCreator(401, 'This user already exists', res, false, '');
    }

    //hash password and save user to database
    let hashedPasswordString = await hashPassword(password);
    const newUser = await userModel.create({
      email,
      password: hashedPasswordString,
    });

    //generate JWT
    const token = genToken(newUser.dataValues.id);

    res.status(200).set('authorisation', token).json({
      success: true,
      msg: 'user registered',
      data: '',
      token,
    });
  } catch (error) {
    console.log(error);
    responseCreator(400, 'failed to register user', res, false, '');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);

    //check if user exists
    const userExist = await userModel.findOne({
      where: {
        email: email,
      },
    });
    if (userExist === null) {
      return responseCreator(401, 'Invalid credentials E', res, false, '');
    }
    //compare paswords
    const passwordisMatch = await compareHashedPassword(
      password,
      userExist.dataValues.password
    );
    console.log(passwordisMatch);
    if (!passwordisMatch) {
      return responseCreator(401, 'Invalide credentials P', res, false, '');
    }

    //generate JWT
    const token = genToken(userExist.dataValues.id);

    //if login is a sucess
    res.status(200).set('authorisation', token).json({
      success: true,
      msg: 'user authorised',
      data: '',
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      msg: 'Login failed',
    });
  }
};

//helper functions

//return response
const responseCreator = (statusCode, message, res, success, data) => {
  return res.status(statusCode).json({
    success: success,
    msg: message,
    data: data,
  });
};

//hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const compareHashedPassword = async (reqPassword, dbPassword) => {
  return await bcrypt.compare(reqPassword, dbPassword);
};

//generate json web token
const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
