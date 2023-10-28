const { sql } = require('../../utils/db')

const getPedidos = async (req, res) => {
  try {
    const usuarioId = req.query.usuario_id

    const rows = await sql.select('Pedido', ['*'], {
      usuario_id: usuarioId
    })

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getPedidos: ${error}}`)
  }
}

module.exports = {
  getPedidos
}
