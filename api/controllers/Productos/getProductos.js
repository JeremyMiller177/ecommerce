const { sql } = require('../../utils/db')

const getProductos = async (req, res) => {
  try {
    const categoriaId = req.query.categoria_id

    const rows = await sql.select('Producto', ['*'], {
      categoria_id: categoriaId,
      is_disabled: false
    })

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getProductos: ${error}}`)
  }
}

module.exports = {
  getProductos
}
