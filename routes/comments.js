const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { login, logout, requireAuth } = require('../auth');
const db = require('../db/models');
const { User, Question, Answer, Topic, Comment } = db;
const { csrfProtection, questionValidators, asyncHandler } = require('./utils');

router.get("/", asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10)
    console.log(questionId)
    const answers = await Answer.findAll({
        include: {
            model: Question,
            where:{
                questionId,
            }
        }
    })
    const comments = await Comment.findAll({
        include: [
            {
                model: User
            },
            {
                model : Answer,
                include: Question
            },
        ]
    })
    res.json({ comments,answers })
  }));

module.exports = router