const userModel = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { query } = require('express');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.b);
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

exports.uploadProfileImage = async (req, res) => {
  try {
    const userId = req.query.userId;
    const imageData = await persistImageFromMemoryStream(req);

    let profileImage = imageData.url;

    await userModel.update(
      { profileImage },
      {
        where: {
          id: userId,
        },
      }
    );
    responseCreator(200, 'profile saved', res, true, '');
    console.log(imageData);
  } catch (error) {
    console.log(error.original);
    responseCreator(401, 'failed to save profile image', res, false, '');
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
      return responseCreator(401, 'Invalid credentials', res, false, '');
    }
    //compare paswords
    const passwordisMatch = await compareHashedPassword(
      password,
      userExist.dataValues.password
    );
    console.log(passwordisMatch);
    if (!passwordisMatch) {
      return responseCreator(401, 'Invalide credentials', res, false, '');
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

exports.deleteAccount = (req, res) => {
  try {
    const userId = req.query.userId;
    userModel.destroy({
      where: {
        id: userId,
      },
    });
    responseCreator(200, 'user deleted', res, true, '');
  } catch (error) {
    responseCreator(401, 'unable to delete account', res, true, '');
  }
};

//helper functions
const persistImageFromMemoryStream = (req) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};

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
