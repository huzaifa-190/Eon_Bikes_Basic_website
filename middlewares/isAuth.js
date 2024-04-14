
module.exports = (req,res,next) =>{
    if(!req.session.isLoggedIn){
        console.log('NOT Authenticated user !')

        return res.redirect('/login')
    }
    else{

        console.log('yess It is an authenticated user !')
        next()
    }
    
}