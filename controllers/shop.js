const Product = require('../models/product')
const Cart = require('../models/cart')
const Order = require('../models/order')



//************************************ SHOP CONTROLLERS ********************************************

exports.getshopcart = (req,res,next) => {

        req.user.getCart().then(
            cart =>{
           
                return cart.getProducts().then(
                    products =>{
                        
                        res.render('shop/cart' , {prods:products ,path:'/shop/cart',pagetitle:'Your Cart',
                    })
                    })
                    
                }
                ).catch( err => console.log(err))
            }



exports.postshopcart = (req,res,next) => {

    const prodId = req.body.productId
    let fetchedCart

    req.user.getCart().then(
        cart => {
            fetchedCart=cart
            return cart.getProducts({ where:{ id:prodId}})
        }).then(
            products =>{
                let product
                if(products.length >0){
                    product = products[0]
                }
                let newQty =1
                if(product){
                    const oldQty = product.cartItem.qty
                    newQty=oldQty+1
                    return fetchedCart.addProduct(product,{through :{ qty:newQty}})

                }

                return Product.findByPk(prodId).then(
                    product =>{
                        return fetchedCart.addProduct(product,{through :{ qty:newQty}})
                    }).catch(err => console.log(err))
                    
            }).then(

                res.redirect('/shop/products')
            )
        .catch( err => console.log(err))
    

}

exports.getDeleteCartItem=(req,res,next) =>{
    const prdId = req.params.prdId
    // const prodId = req.body.productId
    console.log("HEre FROM GETDELETE CART ITEM ==> id IS :"+prdId)


    req.user.getCart().then(

        cart => {
            return cart.getProducts({ where : {id:prdId}} )
         })
        .then(
            products =>{
                const product = products[0]
                return product.cartItem.destroy()
        }).
        then(
                result => {
                    res.redirect('/shop/cart') 

        })
    .catch( err => console.log(err))



}


exports.getproducts = (req,res,next) => {
    
    Product.findAll()
    .then( products =>{ 
        
        res.render("shop/productsList",
        {
            prods: products ,
             deftitle : "This",
             defprice : 80,
             defurl : "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" ,
             defdes : "Outstanding !",
             path:"/shop/products" , 
             pagetitle:'Products',
            })
             
    } )
    .catch( err =>console.log(err ))

       
}


exports.postproducts = (req,res,next) => {
    
    const productid = req.body.productId 
    res.redirect('/shop/products')

   
}

exports.getproduct = (req,res,next) => {

    const prdid = req.params.productid
    console.log("this is prdid inside getprodyuct with where clause"+prdid)
    Product.findAll({where : {id:prdid}})
    .then( 
        products => {

            //   console.log(product)
                res.render('shop/productDetail',{
                product : products[0] , 
                pagetitle:products[0].title,
                deftitle : "Bike",
                defprice : 80000,
                defurl : "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" ,
                defdes : "Outstanding",
                path:"/shop/products" ,
            })
            
        }
    ).catch( err => console.log(err))
   

}


exports.getCreateOrder  = (req,res,next) => {
    
    let fetchedCart
    req.user.getCart().then(
        cart =>{
            fetchedCart = cart
            return cart.getProducts()
        })
        .then(
            products =>{
                return req.user.createOrder().then(
                    order =>{
                       return order.addProducts(products.map(product =>{
                           product.orderItem = {qty :  product.cartItem.qty}
                           console.log("thsssssssssssssssssssssssssss "+product.orderItem.qty)
                           return product
                        }))
                    }).catch(err => console.log(err))
            }).then(
                result =>{
                    fetchedCart.setProducts(null)
                }).then(
                    result =>{

                        res.redirect("/shop/orders")
                    }
                )
                .catch( err => console.log(err))            
    }


exports.getindex = (req,res,next) => {
    
    // console.log("herereerererererererererere"+req.isLoggedIn)
    Product.findAll()
    .then( products =>{ 
        
        res.render("shop/home",
        {
            prods: products ,
             deftitle : "This",
             defprice : 80,
             defurl : "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" ,
             defdes : "Outstanding !",
             path:"/shop/home" , 
             pagetitle:'Shop_Home',
            
            })
             
    } )
    .catch( err =>console.log(err ))
   

}


exports.postindex = (req,res,next) => {
    
    Product.findAll()
    .then( products =>{ 
        
        res.render("shop/home",
        {
            prods: products ,
             deftitle : "This",
             defprice : 80,
             defurl : "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" ,
             defdes : "Outstanding !",
             path:"/shop/home" , 
             pagetitle:'Shop_Home',
            
            })
             
    } )
    .catch( err =>console.log(err ))
   

} 


    exports.getorders = (req,res,next) =>{

      

            req.user.getOrders({include:['products']}).then(
                orders =>{
                    res.render("shop/orders.pug",{
                        path:'/shop/orders' ,
                        pagetitle:'Shop Orders',
                        orders:orders,
                    })
                        
                    }
                    ).catch(err => console.log(err))
                }
               
