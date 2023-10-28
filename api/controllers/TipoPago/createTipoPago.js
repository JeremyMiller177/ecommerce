const { sql } = require('../../utils/db')

const createTipoPago = async (req, res) => {
  const { nombre } = req.body

  const fields = {
    nombre
  }

  try {
    const result = await sql.insert('TipoPago', fields)

    res.json({ id: result.insertId })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en createTipoPago: ${error}}`)
  }
}

module.exports = {
  createTipoPago
}
