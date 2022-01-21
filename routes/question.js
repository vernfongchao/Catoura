const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { login, logout, requireAuth } = require('../auth');
const db = require('../db/models');
const { User, Question, Answer, Topic,Comment } = db;
const { csrfProtection, questionValidators, asyncHandler } = require('./utils');


router.get('/', asyncHandler(async (req, res) => {
    const questions = await Question.findAll();
    const topics = await Topic.findAll();

    res.render('question-collection', {
        title: 'Home',
        questions,
        topics
    });
}));


router.get('/myquestions', requireAuth, asyncHandler(async (req, res) => {
    //const userId = res.locals.user.id
    const questions = await Question.findAll({ where: { userId: res.locals.user.id } });
    //const topics = await Topic.findAll();

    res.render('questions-mine', {
        title: 'Home',
        questions,
        //topics
    });
}));


router.get('/new', requireAuth, csrfProtection, asyncHandler(async (req, res) => {

    res.render('question-create', { title: 'Question Form', csrfToken: req.csrfToken() })
}))

router.post('/', requireAuth, questionValidators, csrfProtection, asyncHandler(async (req, res) => {

    const { userId } = req.session.auth
    const {
        title,
        content
    } = req.body;

    const question = Question.build({
        title,
        content,
        userId
    });

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



router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10)
    const question = await Question.findByPk(questionId,
        {
            include: [
                {
                    model: Topic
                },
                {
                    model: Answer,
                    include: [
                        {
                            model : User
                        },
                        {
                            model: Comment,
                            include: User
                        }
                    ]
                },
                {
                    model: User
                }
            ]
        })
    const answers = []
    const comments = []
    const users = []
    question.Answers.forEach((answer)=>{
        answers.push(answer)
    })
    answers.forEach((answer) =>{
        comments.push(answer.Comments)
    })
    console.log(comments)
    comments.forEach((comment)=>{
        users.push(comment)
    })
    console.log(comments[0])
    if (question) {
        res.render('question-details', {
            title: question.title,
            question,
            comments,
            csrfToken: req.csrfToken()
        })
    } else {
        res.send('There is an error')
    }
}));

router.get('/:id(\\d+)/edit', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10)
    const question = await Question.findByPk(questionId)
    console.log(question)
    res.render('question-edit', {
        title: question.title,
        question,
        csrfToken: req.csrfToken()
    })
}))

router.post('/:id(\\d+)', requireAuth, questionValidators, csrfProtection, asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const questionId = parseInt(req.params.id, 10);

    const {
        id,
        title,
        content
    } = req.body;

    const question = await Question.findByPk(questionId);
    console.log(question);
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        await question.update({ title, content, userId });
        res.redirect(`/questions/${question.id}`);
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('question-edit.pug', {
            title: question.title,
            errors,
            question,
            csrfToken: req.csrfToken()
        })
    }
}));

router.post(`/:id(\\d+)/delete`, requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findByPk(questionId);
    await question.destroy();
    res.redirect('/questions');
}));











module.exports = router
