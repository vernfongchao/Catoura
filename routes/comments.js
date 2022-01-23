const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const { login, logout, requireAuth } = require('../auth');
const db = require('../db/models');
const { User, Question, Answer_Upvote, Answer_Downvote, Answer, Comment, Topic} = db;
const { csrfProtection, userValidators, loginValidators, asyncHandler } = require('./utils');
const bcrypt = require('bcryptjs');



router.post('/:id(\\d+)/delete',csrfProtection,asyncHandler(async(req,res)=>{
    
    const commentId = parseInt(req.params.id,10)
    const comment = await Comment.findByPk(commentId)
    console.log(comment)
    await comment.destroy()
    res.json({message: "Success"})
}))

router.use((req,res,next)=>{
    console.log("incoming router")
    next()
})

router.post('/',csrfProtection,asyncHandler(async(req,res)=>{
    console.log("hello from test @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    let userId = res.locals.user.id
    const {content,answerId} = req.body
    const comment = await Comment.build({
        content,
        userId,
        answerId
    })
    await comment.save()
    res.json({comment,message:"Success"})
}))


router.put= 


module.exports = router;
