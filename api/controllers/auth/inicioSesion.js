const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secretKey = process.env.SECRET_KEY

const { sql } = require('../../utils/db')

const inicioSesion = async (req, res) => {
  const { email, contrasena } = req.body

  try {
    const rows = await sql.select('Usuario', ['*'], { email })

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    const { contrasena: userPassword, ...user } = rows[0]

    const isPasswordValid = await bcrypt.compare(contrasena, userPassword)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    const expiresIn = Date.now() + 2 * 24 * 60 * 60 * 1000
    const token = jwt.sign({ user }, secretKey, { expiresIn }) // 2 días

    const session = await sql.select('Sesion', ['*'], { usuario_id: user.id })

    if (session.length === 0) {
      await sql.insert('Sesion', {
        usuario_id: user.id,
        token,
        expiracion: new Date(expiresIn)
      })
    } else {
      const sesion = rows[0]

      await sql.update(
        'Sesion',
        { token, expiracion: new Date(expiresIn) },
        { id: sesion.id }
      )
    }

    delete user.contrasena

    const rol = await sql.select('Rol', ['*'], { id: user.rol_id })
    user.rol = rol[0]

    res.json({ session: { user, token, expiresIn } })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en inicioSesion: ${error}}`)
  }
}

module.exports = {
  inicioSesion
}
