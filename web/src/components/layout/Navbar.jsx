import { Link, useLocation, useNavigate } from "react-router-dom";
import shoppingCart from "../../assets/img/shopping-cart.png";
import shoppingCartIcon from "../../assets/img/shopping-cart-icon.png";
import avatar from "../../assets/img/default-avatar.svg";
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

  return (
    <div
      style={{
        backgroundColor: "#4b32a8",
      }}
    >
      <nav className="align-items-center justify-content-between nav d-flex p-2">
        <div className="d-flex align-items-center justify-content-center gap-3">
          <Link className="text-decoration-none" to="/productos">
            <div className="d-flex">
              <img
                alt="shopping-cart"
                className="img-fluid"
                src={shoppingCart}
              />
              <h3 className="text-white pt-3">MillerShop</h3>
            </div>
          </Link>

          <Link
            className={`nav-link rounded-5 text-center ${
              location.pathname === "/productos"
                ? "bg-light text-dark"
                : "text-white"
            }`}
            to="/productos"
          >
            Productos
          </Link>

          {session && (
            <Link
              className={`nav-link rounded-5 text-center ${
                location.pathname === "/mis-pedidos"
                  ? "bg-light text-dark"
                  : "text-white"
              }`}
              to="/mis-pedidos"
            >
              Mis pedidos
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
