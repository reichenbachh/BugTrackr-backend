const validator = require('express-validator');
const body = validator.body;
const validationResult = validator.validationResult;

const userValidationRules = () => {
  return [
    // username must be an email
    body('email').isEmail().withMessage('This is not a valid email'),
    // password must be at least 6 chars long
    body('password')
      .isLength({ min: 6, max: 12 })
      .withMessage('password has to be longer than 6 characters'),
  ];
};

const projectValidatorRules = () => {
  return [
    //project description cannot be more than 50 characters long
    body('projectDesc')
      .isLength({ max: 100 })
      .withMessage('Project description cannot be more than a 100 characters'),

    body,
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(401).json({
    success: false,
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
