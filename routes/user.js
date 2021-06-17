const express = require("express")
const {
  registerUser,
  loginUser,
  uploadProfileImage,
  deleteAccount,
  validateAndFetchUser,
} = require("../controllers/users")
const {
  validate,
  userValidationRules,
  registrationValidationRules,
} = require("../utils/bodyValidator")
const multer = require("multer")
const storage = multer.memoryStorage()
const multerUploads = multer({ storage }).single("profileImage")

//initialize router
const router = express.Router()

router.post("/register", registrationValidationRules(), validate, registerUser)
router.post("/login", userValidationRules(), validate, loginUser)
router.post("/uploadProfileImage", multerUploads, uploadProfileImage)
router.get("/validateUser", validateAndFetchUser)
router.delete("/deleteAccount", deleteAccount)

module.exports = router
