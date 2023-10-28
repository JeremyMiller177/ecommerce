const jwt = require('jsonwebtoken')
const { sql } = require('../utils/db')

const secretKey = process.env.SECRET_KEY

const verifyToken = async (req, res, next) => {
  const userId = req.headers.usuario_id

  if (!userId) {
    return res.status(401).json({ message: 'No se proporcionó un usuario' })
  }

  try {
    const session = await sql.select('Sesion', ['*'], { usuario_id: userId })

    if (session.length === 0 || !session[0].token) {
      return res.status(401).json({ message: 'No autorizado' })
    }

    const { token } = session[0]

    const decoded = jwt.verify(token, secretKey)

    if (Date.now() > decoded.exp) {
      return res.status(401).json({ message: 'Token expirado' })
    }

    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' })
  }
}

module.exports = {
  verifyToken
}
