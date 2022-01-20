const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { User, Question, Answer, Reply } = db;
const { asyncHandler } = require('./utils')

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {

  const users = await User.findAll()
  const questions = await Question.findAll()
  const answers = await Answer.findAll()
  const replies = await Reply.findAll()


  res.render('homepage', { title: 'a/A Express Skeleton Home', users, questions, answers, replies });



}));



module.exports = router;
