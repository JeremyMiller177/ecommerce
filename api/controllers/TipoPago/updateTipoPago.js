const { sql } = require('../../utils/db')

const updateTipoPago = async (req, res) => {
  const id = req.params.id
  const { nombre } = req.body

  try {
    const rows = await sql.update('TipoPago', { nombre }, { id })

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en updateTipoPago: ${error}`)
  }
}

module.exports = {
  updateTipoPago
}
