const { getUsuarios } = require('./getUsuarios')
const { getUsuario } = require('./getUsuario')
const { createUsuario } = require('./createUsuario')
const { updateUsuario } = require('./updateUsuario')

module.exports = {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario
}
