const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { login, logout, requireAuth } = require('../auth');
const db = require('../db/models');
const { User, Question, Answer_Upvote, Answer_Downvote, Answer, Comment } = db;
const { csrfProtection, userValidators, loginValidators, asyncHandler } = require('./utils');
const bcrypt = require('bcryptjs');
const comment = require('../db/models/comment');

router.get('/demo', asyncHandler(async (req, res) => {

  const user = await User.findOne({
    where: { email: 'demo@demo.com' }
  })
  login(req, res, user);
  return res.redirect('/');

}))


router.get('/login', csrfProtection, asyncHandler(async (req, res) => {
  res.render('user-login', { title: 'Hello From user Route', csrfToken: req.csrfToken() });
}));

router.post('/login', csrfProtection, loginValidators,
  asyncHandler(async (req, res) => {
    const {
      email,
      password,
    } = req.body;

    let errors = []
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await User.findOne({ where: { email } });
      if (user !== null) {
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
        if (passwordMatch) {
          login(req, res, user);
          //reroute to questions
          return res.redirect('/');
        }
      }
      errors.push('Login failed for the email address and/or password given');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render('user-login', {
      title: 'Login',
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  }));

router.get('/signup', csrfProtection, asyncHandler(async (req, res) => {
  const user = User.build();
  res.render('user-signup', { title: 'Hello From sign-up Route', user, csrfToken: req.csrfToken() });
}));

router.post('/signup', userValidators, csrfProtection, asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    favFood,
    password,
    confirmPassword,
  } = req.body;
  console.log(password)
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = User.build({
    firstName,
    lastName,
    userName,
    email,
    favFood,
    hashedPassword,
  });

  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()) {
    await user.save();
    login(req, res, user);
    //re-route to questions
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('user-signup', {
      title: 'Signup',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

router.post('/logout', (req, res) => {
  logout(req, res);
  res.redirect('/users/login');
});

router.get('/answers', asyncHandler(async (req, res) => {

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

router.get('/answers/:id(\\d+)', requireAuth, csrfProtection, asyncHandler(async (req, res) => {

  const answerId = parseInt(req.params.id, 10);

  const answer = await db.Answer.findByPk(answerId);

  res.render('answer-delete', {
    title: 'Delete Answer',
    answer,
    csrfToken: req.csrfToken(),
  })


}));

router.post('/answers/delete/:id(\\d+)', requireAuth, csrfProtection, asyncHandler(async (req, res) => {

  const answerId = parseInt(req.params.id, 10);
  const answer = await Answer.findByPk(answerId)

  await answer.destroy()

  res.redirect('/users/answers');

}));

module.exports = router;

//comments upvote downtvotes
