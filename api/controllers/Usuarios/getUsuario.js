const { sql } = require('../../utils/db')

const getUsuario = async (req, res) => {
  const id = req.params.id

  try {
    const rows = await sql.select('Usuario', ['*'], { id })

    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getUsuario: ${error}}`)
  }
}

module.exports = {
  getUsuario
}
