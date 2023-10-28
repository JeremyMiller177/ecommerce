const { sql } = require('../../utils/db')

const createPedido = async (req, res) => {
  const { usuarioId, tipoPagoId, nombre, email, telefono, direccion, total } =
    req.body

  try {
    const fields = {
      usuario_id: usuarioId,
      tipo_pago_id: tipoPagoId,
      nombre,
      email,
      telefono,
      direccion,
      total
    }

    const result = await sql.insert('Pedido', fields)

    res.json({ id: result.insertId })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en createPedido: ${error}`)
  }
}

module.exports = {
  createPedido
}
