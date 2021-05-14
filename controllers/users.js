const UserService = require("../services/UserSevice")

// Instace of user service class
const userService = new UserService()

exports.registerUser = async (req, res) => {
  try {
    const userDetailsObject = req.body
    //Register user service
    const serviceValue = await userService.registerUser(userDetailsObject)

    if (serviceValue.success == false) {
      return res.status(401).json(serviceValue)
    }

    const jwtString = serviceValue.token
    //remove token from json
    delete serviceValue.token

    res.status(200).set("authorisation", jwtString).json(serviceValue)
  } catch (error) {
    console.log(error)
    res.status(401).json({
      error,
      msg: "failed to register user",
      data: null,
      token: null,
    })
  }
}

exports.uploadProfileImage = async (req, res) => {
  try {
    const serviceValue = await userService.updateProfileImage(
      req.query.id,
      req.file.buffer
    )

    res.status(200).json(serviceValue)
  } catch (error) {
    console.log(error.original)
    res.status(404).json({
      error,
      msg: "failed to register user",
      data: null,
      token: null,
    })
  }
}

exports.loginUser = async (req, res) => {
  try {
    console.log(req.body)
    const serviceValue = await userService.loginUser(req.body)

    if (serviceValue.success == false) {
      return res.status(401).json(serviceValue)
    }

    const jwtString = serviceValue.token
    //remove token from json
    delete serviceValue.token

    res.status(200).set("authorisation", jwtString).json(serviceValue)
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      msg: "Login failed",
    })
  }
}

exports.deleteAccount = async (req, res) => {
  try {
    const serviceValue = await userService.deleteAccount(req.query.id)
    res.status(200).json(serviceValue)
  } catch (error) {
    res.status(200).json({
      success: false,
      msg: "failed to delete account",
    })
  }
}
