import { Navbar } from "./components/layout/Navbar";
import { Productos } from "./pages/Productos";
import { Route, Routes } from "react-router-dom";
import { InicioSesion } from "./pages/public/InicioSesion";
import { ToasterProvider } from "./providers/toastProvider";
import { Registro } from "./pages/public/Registro";
import {
  SessionContextProvider,
  SessionConsumer,
} from "./context/SessionContext";
import { CartProvider } from "./context/CartContext";
import { Producto } from "./pages/Producto";
import { Checkout } from "./pages/Checkout";
import { Carrito } from "./pages/Carrito";
import { MisPedidos } from "./pages/MisPedidos";
import { CrearProducto } from "./pages/CrearProducto";
import { EditarProducto } from "./pages/EditarProducto";

function App() {
  return (
    <CartProvider>
      <SessionContextProvider>
        <SessionConsumer>
          {({ session }) => (
            <div
              className="d-flex flex-column"
              style={{
                margin: 0,
                padding: 0,
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
                    <Route path="crear-producto" element={<CrearProducto />} />
                  )}

                  {session && (
                    <Route
                      path="editar-producto/:id"
                      element={<EditarProducto />}
                    />
                  )}

                  <Route path="productos" element={<Productos />} />

                  <Route path="productos/:id" element={<Producto />} />

                  <Route path="*" element={<Productos />} />
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
