const { sql } = require('../../utils/db')

const updateProducto = async (req, res) => {
  const id = req.params.id
  const { categoriaId, nombre, descripcion, precio, stock, isDisabled } =
    req.body

  try {
    const fields = {
      categoria_id: categoriaId,
      nombre,
      descripcion,
      precio,
      stock,
      is_disabled: isDisabled
    }

    const where = {
      id
    }

    const rows = await sql.update('Producto', fields, where)

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en updateProducto: ${error}}`)
  }
}

module.exports = {
  updateProducto
}
