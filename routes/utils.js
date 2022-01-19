const csurf = require('csurf');
const csrfProtection = csurf({ cookies: true });

const { check, validationResults } = require('express-validator');
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const db = require('../db/models');
const { User } = db;

const userValidators = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your first name")
    .isLength({ max: 25 })
    .withMessage(`Please shorten your first name to 25 characters`),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your last name")
    .isLength({ max: 25 })
    .withMessage(`Please shorten your last name to 25 characters.`),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage('Please provide an email')
    .isEmail()
    .withMessage("Please provide a valid email.")
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .custom((value) => {
      return User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check('hashedPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
]


module.exports = {
  csrfProtection,
  userValidators,
  asyncHandler
}
