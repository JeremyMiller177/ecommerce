const { sql } = require('../../utils/db')

const getTiposPago = async (req, res) => {
  try {
    const rows = await sql.select('TipoPago')

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getTiposPago: ${error}}`)
  }
}

module.exports = {
  getTiposPago
}
