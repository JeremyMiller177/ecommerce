import { Navbar } from "./components/layout/Navbar";
import { Productos } from "./pages/Productos";
import { Productos as PublicProductos } from "./pages/public/Productos";
import { Route, Routes } from "react-router-dom";
import { InicioSesion } from "./pages/public/InicioSesion";
import { ToasterProvider } from "./providers/toastProvider";
import { Registro } from "./pages/public/Registro";
import {
  SessionContextProvider,
  SessionConsumer,
} from "./context/SessionContext";
import { CartProvider } from "./context/CartContext";
import { Checkout } from "./pages/Checkout";
import { Carrito } from "./pages/Carrito";
import { MisPedidos } from "./pages/MisPedidos";
import { CrearProducto } from "./pages/CrearProducto";
import { EditarProducto } from "./pages/EditarProducto";
import { AdministrarPedidos } from "./pages/AdministrarPedidos";
import { Categorias } from "./pages/Categorias";
import { CrearCategoria } from "./pages/CrearCategoria";
import { EditarCategoria } from "./pages/EditarCategoria";
import { CrearUsuario } from "./pages/CrearUsuario";
import { Usuarios } from "./pages/Usuarios";
import { EditarUsuario } from "./pages/EditarUsuario";
import agrovelLogo from "./assets/img/agrovel.png";
import { Producto } from "./pages/public/Producto";

function App() {
  return (
    <CartProvider>
      <SessionContextProvider>
        <SessionConsumer>
          {({ session }) => (
            <div
              className="d-flex flex-column flex-grow-1"
              style={{
                margin: 0,
                padding: 0,
                backgroundImage: `url(${agrovelLogo})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Navbar />

              <div className="pt-5">
                <Routes>
                  {!session && (
                    <Route path="inicio-sesion" element={<InicioSesion />} />
                  )}

                  <Route path="registro" element={<Registro />} />

                  <Route path="carrito" element={<Carrito />} />

                  <Route path="checkout" element={<Checkout />} />

                  {session && (
                    <Route path="mis-pedidos" element={<MisPedidos />} />
                  )}

                  {session && (
                    <Route path="admin/productos" element={<Productos />} />
                  )}

                  {session && (
                    <Route
                      path="admin/productos/crear"
                      element={<CrearProducto />}
                    />
                  )}

                  {session && (
                    <Route
                      path="admin/productos/editar/:id"
                      element={<EditarProducto />}
                    />
                  )}

                  {session && (
                    <Route
                      path="editar-categoria/:id"
                      element={<EditarCategoria />}
                    />
                  )}

                  {session && (
                    <Route
                      path="admin/administrar-pedidos"
                      element={<AdministrarPedidos />}
                    />
                  )}

                  <Route path="admin/categorias" element={<Categorias />} />

                  <Route
                    path="admin/categorias/crear"
                    element={<CrearCategoria />}
                  />

                  <Route
                    path="admin/categorias/editar/:id"
                    element={<EditarCategoria />}
                  />

                  {session && (
                    <Route path="admin/usuarios" element={<Usuarios />} />
                  )}

                  {session && (
                    <Route
                      path="admin/usuarios/crear"
                      element={<CrearUsuario />}
                    />
                  )}

                  {session && (
                    <Route
                      path="admin/usuarios/editar/:id"
                      element={<EditarUsuario />}
                    />
                  )}

                  <Route path="productos/:id" element={<Producto />} />

                  <Route path="*" element={<PublicProductos />} />
                </Routes>
              </div>
            </div>
          )}
        </SessionConsumer>
        <ToasterProvider />
      </SessionContextProvider>
    </CartProvider>
  );
}

export default App;
