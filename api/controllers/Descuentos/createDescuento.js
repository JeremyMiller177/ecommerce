const { sql } = require('../../utils/db')

const createDescuento = async (req, res) => {
  const { productoId, nombre, descripcion, porcentaje, activo } = req.body

  const fields = {
    producto_id: productoId,
    nombre,
    descripcion,
    porcentaje,
    activo
  }

  try {
    const result = await sql.insert('DescuentoProducto', fields)

    res.json({ id: result.insertId })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en createDescuento: ${error}}`)
  }
}

module.exports = {
  createDescuento
}
