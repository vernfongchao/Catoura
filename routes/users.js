const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { login, logout } = require('../auth');
const db = require('../db/models');
const { User } = db;
const { csrfProtection, userValidators, asyncHandler } = require('./utils');
const bcrypt = require('bcryptjs')

/* GET users listing. */

// router.get('/login', function (req, res, next) {
//   res.render('user-login', { title: 'Hello From user Route' });
// });

router.get('/login', csrfProtection, asyncHandler(async (req, res) => {

  res.render('user-login', { title: 'Hello From user Route', csrfToken: req.csrfToken() });
}));

router.get('/signup', csrfProtection, asyncHandler(async (req, res) => {
  const user = User.build();
  res.render('user-signup', { title: 'Hello From sign-up Route', user, csrfToken: req.csrfToken() });
}));

router.post('/signup', userValidators, csrfProtection, asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    favFood,
    password,
    confirmPassword,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = User.build({
    firstName,
    lastName,
    userName,
    favFood,
    email,
    hashedPassword,
  });

  user.save();
  // const validationErrors = validationResult(req);
  // if (!validationErrors.isEmpty()) {
  //   const errors = validationErrors.array().map((error) => error.msg);
  //   res.render('user-signup', {
  //     title: 'Sign Up',
  //     user,
  //     errors,
  //     csrfToken: req.csrfToken(),
  //   });
  // } else {
  //   next();
  // }
}));


module.exports = router;
