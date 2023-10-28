const { sql } = require('../../utils/db')

const createProducto = async (req, res) => {
  const { categoriaId, nombre, descripcion, precio, stock } = req.body

  const fields = {
    categoria_id: categoriaId,
    nombre,
    descripcion,
    precio,
    stock
  }

  try {
    const result = await sql.insert('Producto', fields)

    res.json({ id: result.insertId })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en createProducto: ${error}}`)
  }
}

module.exports = {
  createProducto
}
