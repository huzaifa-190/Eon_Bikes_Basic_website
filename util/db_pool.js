// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host : 'localhost',
//     user : 'root',
//     database : 'eon_bikes',
//     password : 'tahasqltaha'
// })

// module.exports  = pool.promise()

const Sequelize = require('sequelize')
const sequelize = new Sequelize('eon_bikes','root','tahasqltaha',{
    dialect: 'mysql',
    host:'localhost',
    logging: false
})


module.exports = sequelize