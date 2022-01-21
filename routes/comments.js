const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const { login, logout, requireAuth } = require('../auth');
const db = require('../db/models');
const { User, Question, Answer_Upvote, Answer_Downvote, Answer, Comment, Topic} = db;
const { csrfProtection, userValidators, loginValidators, asyncHandler } = require('./utils');
const bcrypt = require('bcryptjs');


// router.get('/', asyncHandler(async(req, res) => {
//     req.params.id
//     // question find by pk questionId
//     // include answers
//     // nested include comments
//     // question = {answer:[{comment:[]}]}



//     // const answerId = 
//     const comments = await Comment.findAll({
//         include : [
//             {
//                 model: User
//             },
//             {
//                 model: Answer
//             }

//         ]
//     })

//     const answers = await Answer.findAll();
//     const comments = await Comment.findAll({where: {answerId}});
//     // const questions = await Question.findByPk(2);
    
//     const questionId = parseInt(req.params.id, 10)
//     const {question} = await Question.findByPk(questionId,
//         {
//             include: [
//                 {
//                     model: User
//                 },
//                 {
//                     model: Topic
//                 },
//                 {
//                     model: Answer,
//                     include: {
//                         model: Comment,
//                         include : User
//                     }
//                 }
//             ]
//         })
//         res.json({question});
//     }))
    
// router.post('/comments', requireAuth, commentsValidator, csrfProtection, asyncHandler(async(req, res) => {
//     const { content } = req.body;
//     const comment = await Comment.build(content);
//     const questionId = parseInt( req.params.id, 10);
//     const question = await Question.findByPk(questions.id);

//     const validatorErrors = validationResult(req);

//     if (validatorErrors.isEmpty()) {
//         await comment.save()
//         res.redirect(`/question/${question.id}`);
//     } else {
//         const errors = validatorErrors.array().map((error) => error.msg)
//     }
    
// }))






module.exports = router;
