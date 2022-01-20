const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { login, logout, requireAuth } = require('../auth');
const db = require('../db/models');
const { User, Question, Answer_Upvote, Answer_Downvote, Answer } = db;
const { csrfProtection, userValidators, loginValidators, asyncHandler } = require('./utils');
const bcrypt = require('bcryptjs');


router.get('/', asyncHandler(async (req, res) => {

    if (res.locals.authenticated) {
        const answers = await db.Answer.findAll({ where: { userId: res.locals.user.id } });
        const user = await User.findByPk(res.locals.user.id);
        const questions = {};
        const upvotes = {};
        const downvotes = {};

        // adding questions to questions object with id from answers
        for (let i = 0; i < answers.length; i++) {
            let id = answers[i].dataValues.questionId;
            let question = await Question.findByPk(id)
            let title = question.title
            questions[id] = title
        }

        //console.log('My Questions ---> ', questions)

        // adding upvotes/downvotes to upvotes/downvotes object
        for (let i = 0; i < answers.length; i++) {
            let id = answers[i].dataValues.id;
            let upvote = await Answer_Upvote.findAll({ where: { answerId: id } })
            let downvote = await Answer_Downvote.findAll({ where: { answerId: id } })
            upvotes[id] = upvote.length
            downvotes[id] = downvote.length
        }

        res.render('answers', { title: 'Answers', answers, user, questions, upvotes, downvotes });

    } else {
        res.redirect('/');
    }
}));


router.get('/:id(\\d+)', requireAuth, csrfProtection, asyncHandler(async (req, res) => {

    const answerId = parseInt(req.params.id, 10);

    const answer = await db.Answer.findByPk(answerId);

    res.render('answer-delete', {
        title: 'Delete Answer',
        answer,
        csrfToken: req.csrfToken(),
    })


}));
router.post('/delete/:id(\\d+)', requireAuth, csrfProtection, asyncHandler(async (req, res) => {


    if (!res.locals.authenticated) return res.redirect('/');

    const answerId = parseInt(req.params.id, 10);
    const answer = await Answer.findByPk(answerId)

    await answer.destroy()

    res.redirect('/answers');

}));

router.get('/add', csrfProtection, (req, res) => {


    if (!res.locals.authenticated) return res.redirect('/');


    const answer = Answer.build();

    res.render('answer-form', {
        title: 'Add Answer',
        answer,
        csrfToken: req.csrfToken(),
    });

});
router.post('/add', csrfProtection, requireAuth, asyncHandler(async (req, res, next) => {
    if (!res.locals.authenticated) return res.redirect('/');
    const {
        content,
        questionId
    } = req.body;

    let userId = res.locals.user.id

    const answer = Answer.create({
        content,
        userId,
        questionId
    });


    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {

        res.redirect('/answers');
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);

        res.render('answer-form', {
            title: 'Add Answer',
            answer,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}));

module.exports = router;
