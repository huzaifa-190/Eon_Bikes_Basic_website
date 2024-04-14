const Sequelize = require('sequelize')
const sequelize = require('../util/db_pool')


const Product = sequelize.define('product',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false,        
    },
    price:{
        type:Sequelize.DataTypes.DOUBLE,
        allowNull:false
    },
    description:Sequelize.DataTypes.TEXT,
    imageURL:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Product; 