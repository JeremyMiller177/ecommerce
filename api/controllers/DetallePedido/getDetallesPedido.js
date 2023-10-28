const { sql } = require('../../utils/db')

const getDetallesPedido = async (req, res) => {
  try {
    const pedidoId = req.query.pedido_id

    const rows = await sql.select('DetallePedido', ['*'], {
      pedido_id: pedidoId
    })

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getDetallesPedido: ${error}}`)
  }
}

module.exports = {
  getDetallesPedido
}
