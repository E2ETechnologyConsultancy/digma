import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/digma'

export async function connect(): Promise<void> {
  await mongoose.connect(MONGO_URI, { autoIndex: true })
  console.log('Connected to MongoDB')
}

export { mongoose }
