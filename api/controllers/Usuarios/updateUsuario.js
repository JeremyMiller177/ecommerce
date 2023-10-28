const { sql } = require('../../utils/db')

const updateUsuario = async (req, res) => {
  const id = req.params.id

  const {
    rolId,
    nombre,
    contrasena,
    direccion,
    ciudad,
    pais,
    telefono,
    imagenUrl
  } = req.body

  try {
    const fields = {
      rol_id: rolId,
      nombre,
      contrasena,
      direccion,
      ciudad,
      pais,
      telefono,
      imagen_url: imagenUrl
    }

    const rows = await sql.update('Usuario', fields, { id })

    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en updateUsuario: ${error}`)
  }
}

module.exports = {
  updateUsuario
}
