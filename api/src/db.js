const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: process.env.DB_HOST || process.env.POSTGRES_HOST || 'db',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'schoolapp',
})

async function init() {
  const client = await pool.connect()
  try {
    // create users table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );
    `)
  } finally {
    client.release()
  }
}

module.exports = { pool, init }
