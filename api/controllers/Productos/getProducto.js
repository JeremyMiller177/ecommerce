const { sql } = require('../../utils/db')

const getProducto = async (req, res) => {
  const id = req.params.id

  try {
    const rows = await sql.select('Producto', ['*'], { id })

    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getProducto: ${error}}`)
  }
}

module.exports = {
  getProducto
}
