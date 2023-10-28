const { sql } = require('../../utils/db')

const getResenas = async (req, res) => {
  try {
    const productoId = req.query.producto_id

    const rows = await sql.select('ResenaProducto', ['*'], {
      producto_id: productoId
    })

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getResenas: ${error}}`)
  }
}

module.exports = {
  getResenas
}
