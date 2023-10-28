const { sql } = require('../../utils/db')

const updateCategoria = async (req, res) => {
  const id = req.params.id
  const { nombre } = req.body

  try {
    const rows = await sql.update('CategoriaProducto', { nombre }, { id })

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en updateCategoria: ${error}}`)
  }
}

module.exports = {
  updateCategoria
}
