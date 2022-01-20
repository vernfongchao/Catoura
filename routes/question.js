const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { login, logout } = require('../auth');
const db = require('../db/models');
const { User, Question,Comment,Topic} = db;
const { csrfProtection, userValidators, loginValidators, asyncHandler } = require('./utils');

router.get('/:id(\\d+)', asyncHandler(async(req,res)=>{
    const questionId = parseInt(req.params.id,10)
    const question = await Question.findbyPk(questionId)
        // {
        //     include: [
        //         {
        //             model: Topic
        //         },
        //         {
        //             model: Comment,
        //             include: {
        //                 model: User
        //             }
        //         }

        //     ]
        // })
    console.log(question)
    res.render('question-details',{question})
    // if(question){
    //     res.render('question-details',{
    //         title: question.title ,
    //         question, 
    //         csrfToken: req.csrfToken()
    //     })
    // } else {
    //     res.send('There is an error')
    // }
}))









module.exports = router