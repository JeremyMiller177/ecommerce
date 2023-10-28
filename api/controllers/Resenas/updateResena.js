const { sql } = require('../../utils/db')

const updateResena = async (req, res) => {
  const id = req.params.id
  const { productoId, usuarioId, calificacion, comentario } = req.body

  try {
    const fields = {
      producto_id: productoId,
      usuario_id: usuarioId,
      calificacion,
      comentario
    }

    const rows = await sql.update('ResenaProducto', fields, { id })

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en updateResena: ${error}`)
  }
}

module.exports = {
  updateResena
}
