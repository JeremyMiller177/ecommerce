const {
  getCategorias,
  getCategoria,
  createCategoria,
  updateCategoria
} = require('./Categorias')

const {
  getDescuentos,
  getDescuento,
  createDescuento,
  updateDescuento
} = require('./Descuentos')

const {
  getDetallesPedido,
  getDetallePedido,
  createDetallePedido,
  updateDetallePedido
} = require('./DetallePedido')

const {
  getPedidos,
  getPedido,
  createPedido,
  updatePedido
} = require('./Pedidos')

const {
  getProductos,
  getProducto,
  createProducto,
  updateProducto
} = require('./Productos')

const { getResenas, createResena, updateResena } = require('./Resenas')

const {
  getTiposPago,
  getTipoPago,
  createTipoPago,
  updateTipoPago
} = require('./TipoPago')

const {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario
} = require('./Usuarios')

const { getSesion } = require('./Sesion')

const { inicioSesion, registro } = require('./auth')

module.exports = {
  getCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  getDescuentos,
  getDescuento,
  createDescuento,
  updateDescuento,
  getDetallesPedido,
  getDetallePedido,
  createDetallePedido,
  updateDetallePedido,
  getPedidos,
  getPedido,
  createPedido,
  updatePedido,
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  getResenas,
  createResena,
  updateResena,
  getTiposPago,
  getTipoPago,
  createTipoPago,
  updateTipoPago,
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  getSesion,
  inicioSesion,
  registro
}
