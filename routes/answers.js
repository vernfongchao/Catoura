const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const { login, logout, requireAuth } = require('../auth');
const db = require('../db/models');
const { User, Question, Answer_Upvote, Answer_Downvote, Answer } = db;
const { csrfProtection, userValidators, loginValidators, asyncHandler } = require('./utils');
const bcrypt = require('bcryptjs');

const checkPermissions = (answer, currentUser) => {
    if (answer.userId !== currentUser.id) {
      const err = new Error('Illegal operation.');
      err.status = 403; // Forbidden
      throw err;
    }
  };


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


router.get('/delete/:id(\\d+)', requireAuth, csrfProtection, asyncHandler(async (req, res) => {

    const answerId = parseInt(req.params.id, 10);

    const answer = await db.Answer.findByPk(answerId);

    res.render('answer-delete', {
        title: 'Delete Answer',
        answer,
        csrfToken: req.csrfToken(),
    })
}));

router.get('/edit/:id(\\d+)', requireAuth, csrfProtection, asyncHandler(async (req, res) => {

    const answerId = parseInt(req.params.id, 10);

    const answer = await db.Answer.findByPk(answerId);

    res.render('answer-edit', {
        title: 'Edit Answer',
        answer,
        csrfToken: req.csrfToken(),
    })
}));

router.post('/edit/:id(\\d+)', csrfProtection, requireAuth, asyncHandler(async (req, res, next) => {


    const answerId = parseInt(req.params.id, 10);
    const answerToUpdate = await db.Answer.findByPk(answerId);
    checkPermissions(answer, res.locals.user);

    const {
        content
    } = req.body;

    let userId = res.locals.user.id

    const answer = {
        content,
        userId,
        questionId: answerToUpdate.questionId
    }

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await answerToUpdate.update(answer)
        res.redirect('/answers');
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);

        res.render('answer-edit', {
            title: 'Edit Answer',
            answer,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}));

router.post('/delete/:id(\\d+)', requireAuth, csrfProtection, asyncHandler(async (req, res) => {

    if (!res.locals.authenticated) return res.redirect('/');

    const answerId = parseInt(req.params.id, 10);
    const answer = await Answer.findByPk(answerId)

    await answer.destroy()

    res.redirect('/answers');

}));

router.get('/add', requireAuth, csrfProtection, (req, res) => {


    const answer = Answer.build();

    res.render('answer-form', {
        title: 'Add Answer',
        answer,
        csrfToken: req.csrfToken(),
    });

});

const answerValidator = [
    check('content')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Content')
      .isLength({ max: 5000 })
      .withMessage('Content must not be more than 5000 characters long'),]

router.post('/add', csrfProtection, requireAuth, answerValidator, asyncHandler(async (req, res, next) => {
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
