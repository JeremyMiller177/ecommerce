const { Router } = require('express')

const {
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
  inicioSesion,
  registro,
  getSesion
} = require('../controllers')

const { verifyToken } = require('../middlewares/verifyToken')

const router = Router()

router.get('/', (req, res) => {
  res.send('¡Hola, mundo!')
})

router.get('/categorias', getCategorias)
router.get('/categorias/:id', getCategoria)
router.post('/categorias', verifyToken, createCategoria)
router.put('/categorias/:id', verifyToken, updateCategoria)

router.get('/descuentos', getDescuentos)
router.get('/descuentos/:id', getDescuento)
router.post('/descuentos', verifyToken, createDescuento)
router.put('/descuentos/:id', verifyToken, updateDescuento)

router.get('/detalles-pedido', verifyToken, getDetallesPedido)
router.get('/detalles-pedido/:id', verifyToken, getDetallePedido)
router.post('/detalles-pedido', createDetallePedido)
router.put('/detalles-pedido/:id', verifyToken, updateDetallePedido)

router.get('/pedidos', verifyToken, getPedidos)
router.get('/pedidos/:id', verifyToken, getPedido)
router.post('/pedidos', createPedido)
router.put('/pedidos/:id', verifyToken, updatePedido)

router.get('/productos', getProductos)
router.get('/productos/:id', getProducto)
router.post('/productos', verifyToken, createProducto)
router.put('/productos/:id', verifyToken, updateProducto)

router.get('/resenas', getResenas)
router.post('/resenas', verifyToken, createResena)
router.put('/resenas/:id', verifyToken, updateResena)

router.get('/tipos-pago', getTiposPago)
router.get('/tipos-pago/:id', getTipoPago)
router.post('/tipos-pago', verifyToken, createTipoPago)
router.put('/tipos-pago/:id', verifyToken, updateTipoPago)

router.get('/usuarios', verifyToken, getUsuarios)
router.get('/usuarios/:id', verifyToken, getUsuario)
router.post('/usuarios', verifyToken, createUsuario)
router.put('/usuarios/:id', verifyToken, updateUsuario)

router.get('/sesion', verifyToken, getSesion)

router.post('/auth/inicio-sesion', inicioSesion)
router.post('/auth/registro', registro)

module.exports = router
