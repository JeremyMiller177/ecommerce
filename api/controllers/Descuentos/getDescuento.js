const { sql } = require('../../utils/db')

const getDescuento = async (req, res) => {
  const id = req.params.id

  try {
    const rows = await sql.select('DescuentoProducto', ['*'], { id })

    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getDescuento: ${error}}`)
  }
}

module.exports = {
  getDescuento
}
