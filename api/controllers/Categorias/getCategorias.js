const { sql } = require('../../utils/db')

const getCategorias = async (req, res) => {
  try {
    const rows = await sql.select('CategoriaProducto') ?? []

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getCategorias: ${error}}`)
  }
}

module.exports = {
  getCategorias
}
