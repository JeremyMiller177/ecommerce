const { sql } = require('../../utils/db')

const createDetallePedido = async (req, res) => {
  const { pedidoId, productoId, cantidad, precioUnitario, subtotal } = req.body

  const fields = {
    pedido_id: pedidoId,
    producto_id: productoId,
    cantidad,
    precio_unitario: precioUnitario,
    subtotal
  }

  try {
    const result = await sql.insert('DetallePedido', fields)

    res.json({ id: result.insertId })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en createDetallePedido: ${error}}`)
  }
}

module.exports = {
  createDetallePedido
}
