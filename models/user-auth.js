const Sequelize = require('sequelize')
const sequelize = require('../util/db_pool')

const UserAuth = sequelize.define('userAuth',{
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement:true
    },
    userName:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },

    useremail:{
        type:Sequelize.STRING,
        allowNull:false
    },
    

})

module.exports = UserAuth