const shopController = require('../controllers/shop.js')
const isAuth = require('../middlewares/isAuth.js')
const express = require('express')
const router = express.Router()

router.get('/',shopController.getindex)
router.post('/',shopController.postindex)

router.get('/products',shopController.getproducts)
router.post('/products',shopController.postproducts)

router.get('/products/:productid',shopController.getproduct)

router.get('/cart',isAuth,shopController.getshopcart)
router.post('/cart',isAuth,shopController.postshopcart)

router.get('/cart/deleteItem/:prdId',isAuth,shopController.getDeleteCartItem)
// router.get('/cart/deleteItem',shopController.getDeleteCartItem)

router.post('/createOrder',shopController.getCreateOrder)
router.get('/orders',isAuth,shopController.getorders)




module.exports = router

