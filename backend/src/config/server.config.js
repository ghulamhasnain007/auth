const dotenv = require('dotenv')

dotenv.config();

const config = {
    PORT : process.env.PORT || 3000,
    JWT_SECRET : process.env.JWT_SECRET,
    // host: process.env.HOST,
    // user: process.env.USER,
    // password: process.env.PASSWORD,
    // database: process.env.DATABASE
}

module.exports = config;
