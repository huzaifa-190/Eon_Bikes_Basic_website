const Sequelize = require('sequelize')
const sequelize = require('../util/db_pool')

const CartItem= sequelize.define('cartItem',{
    id:{
        type:Sequelize.DataTypes.INTEGER ,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    },
    qty: Sequelize.INTEGER
})

module.exports = CartItem