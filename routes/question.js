const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { login, logout } = require('../auth');
const db = require('../db/models');
const { User, Question,Answer,Topic} = db;
const { csrfProtection, userValidators, loginValidators, asyncHandler } = require('./utils');

router.get('/:id(\\d+)',csrfProtection, asyncHandler(async(req,res)=>{
    const questionId = parseInt(req.params.id,10)
    const questions = await Question.findByPk(questionId,
        {
            include: [
                        {
                            model: Topic
                        },
                        {
                            model:Answer
                        }
            ]
        })
    console.log(questions)
    // res.render('question-details',{question})

    if(questions){
        res.render('question-details',{
            title: questions.title ,
            questions, 
            csrfToken: req.csrfToken()
        })
    } else {
        res.send('There is an error')
    }

}))









module.exports = router