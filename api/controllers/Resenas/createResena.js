const { sql } = require('../../utils/db')

const createResena = async (req, res) => {
  const { productoId, usuarioId, calificacion, comentario } = req.body

  const fields = {
    producto_id: productoId,
    usuario_id: usuarioId,
    calificacion,
    comentario
  }

  try {
    const result = await sql.insert('ResenaProducto', fields)

    res.json({ id: result.insertId })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en createResena: ${error}}`)
  }
}

module.exports = {
  createResena
}
