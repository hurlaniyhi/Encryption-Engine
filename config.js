const dotenv = require('dotenv').config()

module.exports = {
    key1: process.env.FIRST_KEY,
    key2: process.env.SECOND_KEY,
    key3: process.env.THIRD_KEY
}