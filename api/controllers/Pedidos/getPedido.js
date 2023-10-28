const { sql } = require('../../utils/db')

const getPedido = async (req, res) => {
  const id = req.params.id

  try {
    const rows = await sql.select('Pedido', ['*'], { id })

    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getPedido: ${error}}`)
  }
}

module.exports = {
  getPedido
}
