const { sql } = require('../../utils/db')

const updatePedido = async (req, res) => {
  const id = req.params.id

  const {
    usuarioId,
    tipoPagoId,
    nombre,
    email,
    telefono,
    direccion,
    estado,
    total
  } = req.body

  const fields = {
    usuario_id: usuarioId,
    tipo_pago_id: tipoPagoId,
    nombre,
    email,
    telefono,
    direccion,
    estado,
    total
  }

  try {
    const result = await sql.update('Pedido', fields, { id })

    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en updatePedido: ${error}}`)
  }
}

module.exports = {
  updatePedido
}
