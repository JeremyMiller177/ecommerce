const { sql } = require('../../utils/db')
const bcrypt = require('bcrypt')

const createUsuario = async (req, res) => {
  const {
    rolId,
    nombre,
    email,
    contrasena,
    direccion,
    ciudad,
    pais,
    telefono,
    imagenUrl
  } = req.body

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10)

    const fields = {
      rol_id: rolId,
      nombre,
      email,
      contrasena: hashedPassword,
      direccion,
      ciudad,
      pais,
      telefono,
      imagen_url: imagenUrl
    }

    const result = await sql.insert('Usuario', fields)

    res.json({ id: result.insertId })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en createUsuario: ${error}}`)
  }
}

module.exports = {
  createUsuario
}
