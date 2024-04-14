const Sequelize = require('sequelize')
const sequelize = require('../util/db_pool')

const User = sequelize.define('user',{
    Id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement:true
    },
    userName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:Sequelize.STRING

})

module.exports = User