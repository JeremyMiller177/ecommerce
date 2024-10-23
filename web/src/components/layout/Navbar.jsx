import { Link, useLocation, useNavigate } from "react-router-dom";
import shoppingCartIcon from "../../assets/img/shopping-cart-icon.png";
import avatar from "../../assets/img/default-avatar.svg";
import agrovelLogo from "../../assets/img/agrovel.png";
import { useSession } from "../../hooks/useSession";
import { useCart } from "../../hooks/useCart";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { session, clearSession } = useSession();
  const { items } = useCart();

  const handleClick = () => {
    clearSession();
    navigate("/productos");
  };

  const permisos = session?.user?.rol?.permisos?.split(",");

  return (
    <div
      style={{
        backgroundColor: "#564641",
      }}
    >
      <nav className="align-items-center justify-content-between nav d-flex p-2">
        <div className="d-flex align-items-center justify-content-center gap-3">
          <Link className="text-decoration-none" to="/">
            <div className="d-flex align-items-center gap-3 p-3">
              <img
                alt="logo"
                className="rounded-circle"
                src={agrovelLogo}
                width={60}
              />

              <h4 className="text-white">Agrovel</h4>
            </div>
          </Link>

          {permisos?.includes("VER_CATEGORIAS") && (
            <Link
              className={`nav-link rounded-5 text-center ${
                location.pathname === "/admin/categorias"
                  ? "bg-light text-dark"
                  : "text-white"
              }`}
              to="/admin/categorias"
            >
              Categorias
            </Link>
          )}

          {permisos?.includes("VER_PRODUCTOS") && (
            <Link
              className={`nav-link rounded-5 text-center ${
                location.pathname === "/admin/productos"
                  ? "bg-light text-dark"
                  : "text-white"
              }`}
              to="/admin/productos"
            >
              Productos
            </Link>
          )}

          {permisos?.includes("VER_USUARIOS") && (
            <Link
              className={`nav-link rounded-5 text-center ${
                location.pathname === "/admin/usuarios"
                  ? "bg-light text-dark"
                  : "text-white"
              }`}
              to="/admin/usuarios"
            >
              Usuarios
            </Link>
          )}

          {permisos?.includes("EDITAR_PEDIDO") && (
            <Link
              className={`nav-link rounded-5 text-center ${
                location.pathname === "/admin/administrar-pedidos"
                  ? "bg-light text-dark"
                  : "text-white"
              }`}
              to="/admin/administrar-pedidos"
            >
              Administrar Pedidos
            </Link>
          )}
        </div>

        <div className="d-flex justify-content-center align-items-center">
          {session ? (
            <div className="dropdown d-flex gap-4">
              <Link to="/carrito">
                <img
                  alt="shopping-cart-icon"
                  className="img-fluid"
                  src={shoppingCartIcon}
                  width={35}
                />
                <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                  {items.length}
                  <span className="visually-hidden">shopping cart items</span>
                </span>
              </Link>

              <img
                alt="avatar"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                className="dropdown-toggle img-fluid"
                src={avatar}
                width={35}
              />
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li onClick={(e) => e.stopPropagation()}>
                  <label className="dropdown-item disabled">
                    <span className="badge bg-dark rounded-pill bg-secondary">
                      Usuario: {session.user.email}
                    </span>
                  </label>
                </li>

                {session && (
                  <Link
                    className={`nav-link rounded-5 ${
                      location.pathname === "/mis-pedidos"
                        ? "bg-light text-dark"
                        : "text-black"
                    }`}
                    to="/mis-pedidos"
                  >
                    Mis pedidos
                  </Link>
                )}

                <li>
                  <button className="dropdown-item" onClick={handleClick}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex gap-4 justify-content-center align-items-center">
              <Link to="/carrito">
                <img
                  alt="shopping-cart-icon"
                  className="img-fluid"
                  src={shoppingCartIcon}
                  width={35}
                />
                <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                  {items.length}
                  <span className="visually-hidden">shopping cart items</span>
                </span>
              </Link>
              <Link
                className={`nav-link rounded-5 text-center ${
                  location.pathname === "/inicio-sesion"
                    ? "bg-light text-dark"
                    : "text-white"
                }`}
                to="/inicio-sesion"
              >
                Iniciar sesión
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
