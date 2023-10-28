const { sql } = require('../../utils/db')

const getUsuarios = async (req, res) => {
  try {
    const rows = await sql.select('Usuario')

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getUsuarios: ${error}}`)
  }
}

module.exports = {
  getUsuarios
}
