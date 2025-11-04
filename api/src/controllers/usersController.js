const { pool } = require('../db')

async function listUsers(req, res) {
  try {
    const { rows } = await pool.query('SELECT id, name FROM users ORDER BY id')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

async function createUser(req, res) {
  const { name } = req.body || {}
  if (!name) return res.status(400).json({ error: 'name is required' })
  try {
    const { rows } = await pool.query('INSERT INTO users(name) VALUES($1) RETURNING id, name', [name])
    res.status(201).json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

async function deleteUser(req, res) {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) return res.status(400).json({ error: 'invalid id' })
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id])
    res.status(204).end()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

module.exports = { listUsers, createUser, deleteUser }
