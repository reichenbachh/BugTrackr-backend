const userModel = require("../models").User
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cloudinary = require("cloudinary").v2
const streamifier = require("streamifier")
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

class UserService {
  //Login Service
  async registerUser(registerDetailsObject) {
    try {
      const { username, email, password } = registerDetailsObject

      //check if email already exists
      const emailExists = await userModel.findOne({
        where: {
          email: email,
        },
      })
      const usernameExists = await userModel.findOne({
        where: {
          username: username,
        },
      })
      //return duplicate email error if email already exists
      if (emailExists || usernameExists) {
        return {
          success: false,
          msg: "This account already exists",
          data: "",
        }
      }

      let hashedPasswordString = await this.hashPassword(password)
      //save user data to database and has password
      const newUser = await userModel.create({
        username,
        email,
        password: hashedPasswordString,
      })

      //generate JWT
      const token = this.genToken(newUser.dataValues.id)
      return {
        success: true,
        msg: "user registered",
        data: newUser.dataValues,
        token,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async loginUser(detailsObject) {
    try {
      const { stringID, password } = detailsObject

      const isEmail = this.validateEmail(stringID)

      let userExists = false
      let userPassword

      if (isEmail) {
        //check if user exists
        const emailExists = await userModel.findOne({
          where: {
            email: stringID,
          },
        })

        if (!emailExists) {
          return {
            success: false,
            msg: "invalid credentials",
            data: "",
          }
        }

        userExists = true
        userPassword = emailExists.dataValues.password
      }

      if (!isEmail) {
        //check if user exists
        const usernameExists = await userModel.findOne({
          where: {
            username: stringID,
          },
        })

        if (!usernameExists) {
          return {
            success: false,
            msg: "invalid credentials",
            data: "",
          }
        }

        //eslint-disable-next-line
        userExists = true
        userPassword = usernameExists.dataValues.password
      }

      //compare paswords
      const passwordisMatch = await this.compareHashedPassword(
        password,
        userPassword
      )
      if (!passwordisMatch) {
        return {
          success: false,
          msg: "invalid credentials",
          data: "",
        }
      }

      //generate JWT
      const token = this.genToken(userPassword)
      return {
        success: true,
        msg: "user logged in",
        data: "",
        token,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAccount(userId) {
    try {
      userModel.destroy({
        where: {
          id: userId,
        },
      })
      return {
        success: true,
        msg: "account deleted",
      }
    } catch (error) {
      console.log(error)
    }
  }

  async updateProfileImage(id, buffer) {
    try {
      const userId = id
      const imageData = await this.persistImageFromMemoryStream(buffer)

      let profileImage = imageData.url

      await userModel.update(
        { profileImage },
        {
          where: {
            id: userId,
          },
        }
      )

      return {
        success: true,
        msg: "account details updated",
      }
    } catch (error) {
      console.log(error)
    }
  }

  //helper functions
  //generate json web token
  genToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    })
  }
  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  async compareHashedPassword(reqPassword, dbPassword) {
    return await bcrypt.compare(reqPassword, dbPassword)
  }

  persistImageFromMemoryStream(buffer) {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result)
        } else {
          reject(error)
        }
      })

      streamifier.createReadStream(buffer).pipe(stream)
    })
  }

  //hash password
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  }
}

module.exports = UserService
