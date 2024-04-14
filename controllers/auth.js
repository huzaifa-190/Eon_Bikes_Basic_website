// const User = require('../models/user.js')
const UserAuth = require('../models/user-auth.js')
const Bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const { validationResult} = require('express-validator')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const User = require('../models/user.js')
const { options } = require('../routes/auth.js')

exports.getLogin = (req,res,next) =>{

//    const isLoggedIn = req.get('Cookie').trim().split('=')[1] ==='true'

            //  console.log("yayaayyayayyaayya b"+req.flash('errors'))
            // console.log(req.get('isLoggedIn'))
            
            res.render("auth/login.pug",{
                path:'/login' ,
                pagetitle:'Log In',
                errorMessage : req.flash('errors')       
            })

    
}
exports.getsignup = (req,res,next) =>{

//    const isLoggedIn = req.get('Cookie').trim().split('=')[1] ==='true'

            //  console.log("yayaayyayayyaayya"+req.session.isLoggedIn)
            // console.log(req.get('isLoggedIn'))
            const flashFirstarr = req.flash('alreadyRegistered')
            const flashFirstmsg = flashFirstarr[0]
            res.render("auth/signup.pug",{
                path:'/signup' ,
                pagetitle:'signup',
                errorMessage: flashFirstmsg ,
               
            })

    
}
exports.postLogin = (req,res,next) =>{
    
    
    // req.isLoggedIn = true
    // res.setHeader    ('Set-Cookie','loggedIn=true')

    const username = req.body.username
    const userpassword =req.body.password
    // console.log("User CREDENTIALS SIGN INNNNNNN:ING:::::::"+username+userpassword)

    UserAuth.findOne({where:{userName:username}}).then(
        user => {
            if(!user){
                req.session.isLoggedIn= false 
                req.flash('errors','Invalid username!')
                return res.redirect('/login')
            }
            else{
                console.log("User found in our DATABASE : "+user.userName)
                Bcrypt.compare(userpassword,user.password).then(
                        doMatch =>{
                            if(!doMatch){
                                req.session.isLoggedIn= false 
                                req.flash('errors','Invalid password!')
                                return res.redirect('/login')
                            }
                            else{

                                

                                req.session.isLoggedIn= true 
                                return res.redirect('/shop/')
                            }
                        }
                    ).catch(err => console.log(err))
            }
        }
    ).catch(err => console.log(err))

        
}


exports.postLogout = ( req,res,next) =>{

//    const isLoggedIn = req.get('Cookie').trim().split('=')[1] ==='true'

        // await sessionStore.destroy(req.sessionID);
            req.session.destroy( 
                err => {
                    console.log("session is destroyed successfully!")
                    console.log(err)
                    res.redirect('/login')

            })

}
exports.postsignup = ( req,res,next) =>{


        const useremail =req.body.useremail
        const username = req.body.username 
        const userpassword =req.body.userpassword
        const valerros = validationResult(req)
        const { Op } = require("sequelize");
        // console.log("User CREDENTIALS:::::::"+useremail+username+userpassword)
        
        if(!valerros.isEmpty()){
            const valerrosarr = valerros.array()
            const firstErrorobj = valerrosarr[0]
             

            // console.log(firstErrorobj)
            // console.log(firstErrorobj)

            res.status(422).render('auth/signup.pug',{
                path:'/signup' ,
                pagetitle:'signup',
                errorMessage: firstErrorobj.msg,
            })
        }
        UserAuth.findAll({where:{ 
            [Op.or]: [
                { userName:username },
                { useremail:useremail }
              ]
        }}).then(
            user =>{
                if(user[0]){
                    console.log("ALREADY REGISTERED USER : "+user[0].userName)
                    req.flash('alreadyRegistered','This email OR userName is already registered!')
                    return res.redirect('/signup')
                }
                else{
                    Bcrypt.hash(userpassword,12).then(
                        hashedPassword => {

                            UserAuth.create({userName:username,password:hashedPassword,useremail:useremail,}).then(
                                result => {
                                    console.log('User Created ')
                                   return res.redirect('/login')
                                }
                            ).catch(err => console.log(err))
                        }
                    ).catch(err => console.log(err))
                }
            }
            
        ).catch(err => console.log(err))

}


exports.getResetPassword = (req,res,next) => {
    res.render('auth/resetPassword.pug',{
        path:'/resetPassword',
        pagetitle:'Reset Password',
        errorMessage:req.flash('errors')
    })
}

exports.postResetPassword = (req,res,next) => {
    
    crypto.randomBytes(32,(err,Buffer) => {

        if(err) {
            console.log(err)
            return res.redirect('/resetPassword')
        }
        else{
            const token = buffer.toString('hex')
             
        }
    })
}