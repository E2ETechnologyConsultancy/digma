const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/digma'

async function connect() {
  await mongoose.connect(MONGO_URI, { autoIndex: true })
  console.log('Connected to MongoDB')
}

module.exports = { connect, mongoose }
