
const adminController = require('../controllers/admin.js')
const isAuth = require('../middlewares/isAuth.js')
const express = require('express')
const router = express.Router()

// -----------------------------------


router.get('/addproduct',isAuth,adminController.getaddproduct) 
router.post('/addproduct',isAuth,adminController.postaddproduct)
router.get('/Products',isAuth,adminController.getadminProducts)
router.get('/product/edit/:productId',isAuth,adminController.geteditproduct)
router.post('/product/edit/:productId',isAuth,adminController.posteditproduct)

router.get('/product/delete/:productId',isAuth,adminController.getdeleteproduct)

module.exports = router
// exports.products = products