const { sql } = require('../../utils/db')

const updateDescuento = async (req, res) => {
  const id = req.params.id

  const { productoId, nombre, descripcion, porcentaje, activo } = req.body

  const fields = {
    producto_id: productoId,
    nombre,
    descripcion,
    porcentaje,
    activo
  }

  try {
    const result = await sql.update('DescuentoProducto', fields, { id })

    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en updateDescuento: ${error}}`)
  }
}

module.exports = {
  updateDescuento
}
