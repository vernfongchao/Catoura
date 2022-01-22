const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const { login, logout, requireAuth } = require('../auth');
const db = require('../db/models');
const { User, Question, Answer_Upvote, Answer_Downvote, Question_Topic, Answer, Topic } = db;
const { csrfProtection, userValidators, loginValidators, asyncHandler } = require('./utils');
const bcrypt = require('bcryptjs');

const checkPermissions = (topic, currentUser) => {
    if (topic.userId !== currentUser.id) {
        const err = new Error('Illegal operation.');
        err.status = 403; // Forbidden
        throw err;
    }
};

let topicValidator = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Title')
        .isLength({ max: 50 })
        .withMessage('Title must not be more than 5000 characters long'),]

router.get('/', asyncHandler(async (req, res) => {
    const topics = await Topic.findAll();

    res.render('topic-collection', {
        title: 'Topics',
        topics
    });
}));

router.get('/new', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const topics = await Topic.findAll({ where: { userId: res.locals.user.id } });

    res.render('topic-form', {
        title: 'Topics',
        topics,
        csrfToken: req.csrfToken()
    });
}));
router.post('/new', csrfProtection, requireAuth, topicValidator, asyncHandler(async (req, res, next) => {

    const {
        title
    } = req.body;

    const userId = res.locals.user.id

    const topic = await Topic.build({
        title,
        userId
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await topic.save();
        res.redirect('/topics/new');
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);

        res.render('topic-form', {
            title: 'Topics',
            topic,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {

    const topicId = parseInt(req.params.id, 10)
    const topic = await Topic.findByPk(topicId, { include: Question })
    //const questions = await Question.findAll();
    // console.log(topic.Questions)
    res.render('topic-join', {
        title: `${topic.title}`,
        //questions,
        topic
    });

}));

router.post('/:id(\\d+)/delete', requireAuth, csrfProtection, asyncHandler(async (req, res) => {

    const topicId = parseInt(req.params.id, 10);
    const topic = await Topic.findByPk(topicId);

    checkPermissions(topic, res.locals.user);

    await topic.destroy()

    res.redirect('/topics/new');

}));

router.post('/questions/add', requireAuth, csrfProtection, asyncHandler(async (req, res) => {

    const {
        topicId,
        questionId,
    } = req.body;

    const jointq = await Question_Topic.create({
        topicId,
        questionId
    });

    res.redirect('/');

}));

module.exports = router;
