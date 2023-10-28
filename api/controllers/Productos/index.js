const { getProductos } = require('./getProductos')
const { getProducto } = require('./getProducto')
const { createProducto } = require('./createProducto')
const { updateProducto } = require('./updateProducto')

module.exports = {
  getProductos,
  getProducto,
  createProducto,
  updateProducto
}
