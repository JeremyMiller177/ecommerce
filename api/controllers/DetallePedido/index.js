const { getDetallesPedido } = require('./getDetallesPedido')
const { getDetallePedido } = require('./getDetallePedido')
const { createDetallePedido } = require('./createDetallePedido')
const { updateDetallePedido } = require('./updateDetallePedido')

module.exports = {
  getDetallesPedido,
  getDetallePedido,
  createDetallePedido,
  updateDetallePedido
}
