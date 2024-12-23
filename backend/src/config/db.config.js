// const mysql = require('mysql2');
const config = require('./server.config.js');

// const db = mysql.createConnection({
//     host: config.host,
//     user: config.user,
//     password: config.password,
//     database: config.database,
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL: ' + err.stack);
//         return;
//     }
//     console.log('Connected to MySQL as ID ' + db.threadId);
// });

// module.exports = db;



// const mysql = require('mysql2');
// const config = require('./server.config.js'); // Ensure correct path

// // Create a MySQL connection pool
// const db = mysql.createPool({
//     host: config.host,
//     user: config.user,
//     password: config.password,
//     database: config.database,
//     connectionLimit: 10, // Optional: Adjust as needed
// });

// db.getConnection((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL: ' + err.message);
//     } else {
//         console.log('Connected to MySQL database.');
//     }
// });

// module.exports = db;

// require('dotenv').config()
const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host: '127.0.0.1',
    user: 'wahaj',
    password: 'Hasnain@123',
    database: 'authentication'
})


module.exports = mysqlPool