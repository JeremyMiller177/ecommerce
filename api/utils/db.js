const mysql = require('mysql2')

const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbName = process.env.DB_NAME
const dbPassword = process.env.DB_PASSWORD
const dbPort = process.env.DB_PORT

const pool = mysql
  .createPool({
    host: dbHost,
    user: dbUser,
    database: dbName,
    password: dbPassword,
    port: dbPort
  })
  .promise()

const select = async (table, fields, where = {}) => {
  const selectedFields = fields ? fields.join(', ') : '*'

  const whereFields = Object.entries(where)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${key} = ?`)
    .join(' AND ')

  const query = `SELECT ${selectedFields} FROM ${table} ${
    whereFields ? `WHERE ${whereFields}` : ''
  }`

  const values = Object.values(where).filter((value) => value !== undefined)

  const [rows] = await pool.query(query, values)

  return rows
}

const insert = async (table, fields) => {
  const keys = Object.keys(fields)
  const values = Object.values(fields)
  const placeholders = values.map(() => '?').join(', ')

  const query = `INSERT INTO ${table} (${keys.join(
    ', '
  )}) VALUES (${placeholders})`

  const [rows] = await pool.query(query, values)

  return rows
}

const update = async (table, fields, where) => {
  const setFields = Object.entries(fields)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${key} = ?`)
    .join(', ')

  const whereFields = Object.entries(where)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${key} = ?`)
    .join(' AND ')

  const query = `UPDATE ${table} SET ${setFields} WHERE ${whereFields}`

  const values = [...Object.values(fields), ...Object.values(where)].filter(
    (value) => value !== undefined
  )

  const [rows] = await pool.query(query, values)

  return rows
}

module.exports = {
  pool,
  sql: {
    select,
    insert,
    update
  }
}
