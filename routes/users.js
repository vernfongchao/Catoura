const express = require('express');
const router = express.Router();
const { login, logout } = require('../auth');
const db = require('../db/models');
const {User} = db;

/* GET users listing. */

router.get('/login', function(req, res, next) {
  res.render('user-login', { title: 'Hello From user Route' });
});

router.get('/signup', function(req, res, next) {
  const user = User.build();
  res.render('user-signup', { title: 'Hello From sign-up Route', user });
});

module.exports = router;
