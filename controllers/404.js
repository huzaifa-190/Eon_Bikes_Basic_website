

exports.get404 = (req,res,next) =>{

    res.status(404).render("404",{pagetitle:'404 PageNotFound' , path:'/404' , isAuthenticated:req.session.isLoggedIn})
}