const Sequelize = require('sequelize')
const sequelize = require('../util/db_pool')

const Order= sequelize.define('Order',{
    id:{
        type:Sequelize.DataTypes.INTEGER ,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    }
})
module.exports = Order