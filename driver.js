
// --------------------------------------------------------------MY MODULES------------------------------------------------
const path = require('path')
const shoproutes = require('./routes/shop.js')
const adminroutes = require('./routes/admin.js')
const authRoutes = require('./routes/auth.js')

const controller404 = require('./controllers/404.js') 
const sequelize = require('./util/db_pool.js')


const Product = require('./models/product.js')
const User = require('./models/user.js')
const Cart = require('./models/cart.js')
const CartItem = require('./models/cart-item.js')
const Order = require('./models/order.js')
const OrderItem = require('./models/order-item.js')
const UserAuth = require('./models/user-auth.js')

const Session = require('./models/session.js')

// -------------------------------------------------------------Built-In Modules-----------------------------------------------
const express = require('express')
const app = express();
const body_parser = require('body-parser');
const csrf = require('csurf')
const Sequelize  = require('sequelize')

const expressSession = require('express-session')
const csurf = require('csurf')
const flash = require('connect-flash')

const MySQLStore = require('connect-session-sequelize')(expressSession.Store);
const port = process.env.port || 3000

const myStore = new MySQLStore({
    db: sequelize,
    table: 'session'
 })

//  ----------------------------------------------------------------RUN---------------------------------------------------------------------

const csrfProtection = csrf()
app.set('view engine','pug')
app.set('views','views')


app.use(body_parser.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname,'public')))

// ------------------------------------------------------------Realations-------------------------------------------------------
Product.belongsTo(User,{constraints:true , onDelete:'CASCADE'})
User.hasMany(Product)

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Product,{through:CartItem })
Product.belongsToMany(Cart,{through: CartItem})

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Product,{through:OrderItem})
User.hasOne(Session)



// -------------------------------------------------------------Middle-Wares----------------------------------------------------    

app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req,res,next)=>{
    User.findByPk(1).then(
        (user) =>{
            req.user=user;
            next()
        }
    ).catch(err=> console.log(err))
})  

app.use(expressSession({
    secret:'my secret' , 
    resave: false ,
    saveUninitialized:false,
    store: myStore,
    
    //  cookie: {
    //         maxAge: 86400000, // Cookie expiration time in milliseconds (1 day)
    //       }
    }))


    app.use(csrfProtection)
    
    app.use((req,res,next) => {
        res.locals.isAuthenticated = req.session.isLoggedIn
        res.locals.csrfToken = req.csrfToken()
        next()
    })
    app.use(flash())
    
    app.use('/admin',adminroutes ) 
    app.use('/shop',shoproutes )
    app.use(authRoutes)
    app.use(controller404.get404)


// ------------------------------------------------------------SYncing Sequelize Tables------------------------------------------------

// sequelize.sync({force:true}) // It OverWrite all tables(only use this for first time)

// sequelize.sync().then(
//     () => {
//         app.listen(port)
//     }
// )
sequelize.sync().then(
    (result)=>{
        return User.findByPk(1)
    }
).then(
    user => {
        if(!user){
            return User.create({userName:'Huzaifa',email:'test@me.com'})
    }
    return user
}).then(
   user => {   
        Cart.findAll({where : {userId : user.Id}}).then(
            carts =>{
                if(!carts[0]){ 
                    return user.createCart()
                }
                return carts[0]
        })   

    }).then(
    cart => {
        
        app.listen(port)
    }
   )
.catch(err=> console.log(err))


