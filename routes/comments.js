const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const { login, logout, requireAuth } = require('../auth');
const db = require('../db/models');
const { User, Question, Answer_Upvote, Answer_Downvote, Answer, Comment, Topic} = db;
const { csrfProtection, userValidators, loginValidators, asyncHandler } = require('./utils');
const bcrypt = require('bcryptjs');

// router.delete('/:id',asyncHandler(async(req,res)=>{
//     const post = await Post.findByPk(req.params.id)
//     await post.destroy()
//     res.json({message: "Success"})
// }))

router.delete('/:id(\\d+)/',csrfProtection,asyncHandler(async(req,res)=>{
    const commentId = parseInt(req.params.id,10)
    const comment = await Comment.findByPk(commentId)
    await comment.destroy()
    res.json({message: "Success"})
}))

router.post('/answers/:answerId',csrfProtection,asyncHandler(async(req,res)=>{
    
    const answerId = parseInt(req.params.answerId, 10)
    let userId = res.locals.user.id
    const {content} = req.body
    const comment = await Comment.build({
        content,
        userId,
        answerId
    })
    
    await comment.save()
}))


router.put= 


module.exports = router;
