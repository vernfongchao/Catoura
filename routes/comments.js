const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const { login, logout, requireAuth } = require('../auth');
const db = require('../db/models');
const { User, Question, Answer_Upvote, Answer_Downvote, Answer, Comment, Topic} = db;
const { csrfProtection, commentValidators, asyncHandler } = require('./utils');
const bcrypt = require('bcryptjs');



router.delete('/:id(\\d+)/delete',asyncHandler(async(req,res)=>{
    
    const commentId = parseInt(req.params.id,10)
    const comment = await Comment.findByPk(commentId)
    console.log(comment)
    await comment.destroy()
    res.json({message: "Success"})
}))


router.post('/', commentValidators,csrfProtection,asyncHandler(async(req,res)=>{
    let userId = res.locals.user.id
    const {content,answerId} = req.body
    const comment = await Comment.build({
        content,
        userId,
        answerId
    })
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        await comment.save()
        res.json({message:"Success"})
    }
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    let userId;
    const answerId = req.params.id;
    const comments = await Comment.findAll({ where: { answerId }, include: User });
    if(res.locals.user) {
        userId = res.locals.user.id
        res.json({userId,comments, message: "Success" });
    } else {
        res.json({userId,comments, message: "Success" });
    }


}));

module.exports = router;
