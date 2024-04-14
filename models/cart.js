const Sequelize = require('sequelize')
const sequelize = require('../util/db_pool')

const Cart= sequelize.define('cart',{
    id:{
        type:Sequelize.DataTypes.INTEGER ,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    }
    
})
module.exports = Cart