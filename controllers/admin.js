const Product = require('../models/product')
const Cart = require('../models/cart')
const db_pool = require('../util/db_pool')

const { connected, constrainedMemory } = require('process')
const sequelize = require('../util/db_pool')
const { constants } = require('buffer')

// *********************************** ADMINS CONTROLLERS ****************************************
exports.getaddproduct = (req,res,next) => {


        res.render('admin/addproducts.pug' , {path:"/admin/addproduct" , pagetitle: "addProduct",
    })

}

exports.postaddproduct = (req,res,next) => {

//    console.log("hereeeeee inside post add product")

    req.user.createProduct({
        title : req.body.title,
        price : parseFloat(req.body.price),  // convert string to float
        description: req.body.description,
        imageURL: req.body.imageURL, 
       
    }).then(
        (result) =>{
            console.log("PRoduct addeddddddd")
            console.log(result)
        }
    ).catch( (err) => console.log(err))

    res.redirect('/admin/Products')

}

exports.getadminProducts = (req,res,next) => {
        
        Product.findAll().then(
            products => {
                res.render("admin/adminProducts",
                {
                    prods:products ,
                    deftitle : "This",
                    defprice : 12000,
                    defurl : "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" ,
                    defdes : "Great one",
                    path:'/admin/Products',
                    pagetitle:'Displayed Products',
                    
                } )
            }
            ).catch(err => console.log(err))
            
        }


exports.geteditproduct = (req,res,next) => {

    const id = req.params.productId


        Product.findByPk(id).then( product => {
    res.render('admin/edit_products',
    { 
        product :product,
        path:'/admin/Products',
        pagetitle:'Edit_Product',
    })
})

}

exports.posteditproduct = (req,res,next) => {

    const prdid = req.params.productId
    const newTitle = req.body.title
    const newDescription = req.body.description
    const newPrice = req.body.price
    const newImageurl = req.body.imageurl

    Product.update({title:newTitle,price:newPrice,description:newDescription,imageURL:newImageurl}, {
        where: {
          id: prdid
        }
    }).then(

        res.redirect('/admin/Products')
    )

}

exports.getdeleteproduct = (req,res,next) => {
    
    const prdid = req.params.productId

        Product.destroy({where : {id:prdid}}).then(
            
            res.redirect('/admin/Products')
            
            ).catch( err => console.log(err))
        }
//    db_pool.execute('DELETE FROM products WHERE id=?',[id]).then().catch()

