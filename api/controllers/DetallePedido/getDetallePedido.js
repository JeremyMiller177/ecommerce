const { sql } = require('../../utils/db')

const getDetallePedido = async (req, res) => {
  const id = req.params.id

  try {
    const rows = await sql.select('DetallePedido', ['*'], { id })

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getDetallePedido: ${error}}`)
  }
}

module.exports = {
  getDetallePedido
}
