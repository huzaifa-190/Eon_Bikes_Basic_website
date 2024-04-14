
const express = require('express')
const router = express.Router()

const { check } = require('express-validator')
// import { check } from 'express-validator';
const authController =require('../controllers/auth.js')





router.get('/login',authController.getLogin)
router.get('/signup',authController.getsignup)
router.get('/resetPassword',authController.getResetPassword)

router.post('/signup', [ check('useremail').isEmail().withMessage('Please enter a valid email'),check('username').notEmpty().withMessage('Please enter a username !'), check('userpassword').isLength({min:6}).withMessage('Password must be at least 6 characters long').isAlphanumeric().withMessage('Password must be alphanumeric , can only contain A-Z , a-z and 0-9'), check('confuserpassword').custom(( value , {req}) =>{
    if(value !== req.body.userpassword){
        throw new Error('Confirmed password did not match !')
    }
     return true;
} ) ] , authController.postsignup)
router.post('/login',authController.postLogin)
router.post('/logout',authController.postLogout)


module.exports = router