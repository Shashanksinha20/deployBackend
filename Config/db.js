const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const url = process.env.url
const connection = mongoose.connect(url)

module.exports = connection