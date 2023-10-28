const { sql } = require('../../utils/db')

const getTipoPago = async (req, res) => {
  const id = req.params.id

  try {
    const rows = await sql.select('TipoPago', ['*'], { id })

    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getTipoPago: ${error}}`)
  }
}

module.exports = {
  getTipoPago
}
