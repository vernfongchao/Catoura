const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { User, Question,Topic, Answer, Reply } = db;
const { asyncHandler } = require('./utils')

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const questions = await Question.findAll();
  const topics = await Topic.findAll();

  res.render('homepage', {
      title: 'Home',
      questions,
      topics
  });

}));



module.exports = router;
