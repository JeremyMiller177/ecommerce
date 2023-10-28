const { sql } = require('../../utils/db')

const getDescuentos = async (req, res) => {
  try {
    const rows = await sql.select('DescuentoProducto')

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getDescuentos: ${error}}`)
  }
}

module.exports = {
  getDescuentos
}
