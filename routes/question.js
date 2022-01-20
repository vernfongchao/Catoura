const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { login, logout } = require('../auth');
const db = require('../db/models');
const { User, Question,Answer,Topic} = db;
const { csrfProtection, questionValidators,asyncHandler } = require('./utils');


router.get('/')



router.get('/new',csrfProtection,asyncHandler(async(req,res)=>{
    res.render('question-create',{title:'Question Form', csrfToken: req.csrfToken()})
}))

router.post('/', questionValidators, csrfProtection,asyncHandler(async(req,res)=>{
    const {userId} = req.session.auth
    const {
        title,
        content
    } = req.body;
    
    const question = Question.build({
        title,
        content,
        userId
    });
    console.log(question)
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        await question.save();
        res.redirect(`/questions/${question.id}`);
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('question-create', {
            title: 'Question Form',
            question,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}))



router.get('/:id(\\d+)',csrfProtection, asyncHandler(async(req,res)=>{
    const questionId = parseInt(req.params.id,10)
    const question = await Question.findByPk(questionId,
        {
            include: [
                        {
                            model: Topic
                        },
                        {
                            model: Answer,
                            include: User
                        },
                        {
                            model: User
                        }
            ]
        })
    console.log(question)
    // res.render('question-details',{question})

    if(question){
        res.render('question-details',{
            title: question.title,
            question, 
            csrfToken: req.csrfToken()
        })
    } else {
        res.send('There is an error')
    }
}));











module.exports = router