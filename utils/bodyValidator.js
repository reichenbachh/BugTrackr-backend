const validator = require("express-validator")
const body = validator.body
const validationResult = validator.validationResult

const userValidationRules = () => {
  return [
    body("stringID")
      .notEmpty()
      .withMessage("Please enter a valid email or username"),
    // password must be at least 6 chars long
    body("password")
      .isLength({ min: 6, max: 12 })
      .withMessage("password has to be longer than 6 characters"),
  ]
}

const registrationValidationRules = () => {
  return [
    body("email").isEmail().withMessage("Please enter a valid eamil"),
    // password must be at least 6 chars long
    body("password")
      .isLength({ min: 6, max: 12 })
      .withMessage("password has to be longer than 6 characters"),

    body("username")
      .isAlphanumeric()
      .withMessage("Username connot contain special characters")
      .isLength({ min: 6, max: 20 })
      .withMessage("username has to be longer than 6 characters"),
  ]
}

const projectValidatorRules = () => {
  return [
    //project description cannot be more than 50 characters long
    body("projectDesc")
      .isLength({ max: 100 })
      .withMessage("Project description cannot be more than a 100 characters"),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push(err.msg))

  return res.status(401).json({
    success: false,
    errors: extractedErrors,
  })
}

// eslint-disable-next-line
module.exports = {
  registrationValidationRules,
  projectValidatorRules,
  userValidationRules,
  validate,
}
