// require('dotenv').config()

// const config = require('./server.config.js');

const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host: '127.0.0.1',
    user: 'hasnain',
    password: 'Hasnain@123',
    database: 'authentication'
})

// const mysqlPool = mysql.createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// })


module.exports = mysqlPool