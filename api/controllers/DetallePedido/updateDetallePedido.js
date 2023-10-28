const { sql } = require('../../utils/db')

const updateDetallePedido = async (req, res) => {
  const id = req.params.id
  const { pedidoId, productoId, cantidad, precio, subtotal } = req.body

  try {
    const fields = {
      pedido_id: pedidoId,
      producto_id: productoId,
      cantidad,
      precio,
      subtotal
    }

    const where = {
      id
    }

    const result = await sql.update('DetallePedido', fields, where)

    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en updateDetallePedido: ${error}}`)
  }
}

module.exports = {
  updateDetallePedido
}
