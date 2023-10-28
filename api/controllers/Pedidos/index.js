const { getPedidos } = require('./getPedidos')
const { getPedido } = require('./getPedido')
const { createPedido } = require('./createPedido')
const { updatePedido } = require('./updatePedido')

module.exports = {
  getPedidos,
  getPedido,
  createPedido,
  updatePedido
}
