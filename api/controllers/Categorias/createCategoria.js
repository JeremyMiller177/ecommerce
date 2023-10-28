const { sql } = require('../../utils/db')

const createCategoria = async (req, res) => {
  const { nombre } = req.body

  const fields = {
    nombre
  }

  try {
    const result = await sql.insert('CategoriaProducto', fields)

    res.json({ id: result.insertId })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en createCategoria: ${error}}`)
  }
}

module.exports = {
  createCategoria
}
