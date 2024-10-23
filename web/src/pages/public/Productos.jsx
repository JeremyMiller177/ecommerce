import { useEffect, useState } from "react";
import { getProductos } from "../../api/productos";
import noImage from "../../assets/img/no-image.png";
import shoppingCartIcon from "../../assets/img/shopping-cart-icon.png";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { getCategorias } from "../../api/categorias";

export const Productos = ({ title = "Productos" }) => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categoriaId, setCategoriaId] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { addItem } = useCart();

  const handleCardHover = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
  };

  const handleCardLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  const handleClick = (e, item) => {
    e.stopPropagation();
    addItem({ data: item });
  };

  const handleNavigate = (id) => {
    navigate(`/productos/${id}`);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (value && value !== "Selecciona una categoría") {
      setCategoriaId(value);
      return getProductos(value).then((data) => setProductos(data));
    }

    setCategoriaId(value);
    getProductos().then((data) => setProductos(data));
  };

  useEffect(() => {
    getCategorias().then((data) => setCategorias(data));
    getProductos().then((data) => setProductos(data));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container d-flex flex-column gap-3"
      style={{ minHeight: "100vh" }}
    >
      <h1
        className="text-left text-white rounded p-3"
        style={{ backgroundColor: "#564641" }}
      >
        {title}
      </h1>

      {loading && (
        <div style={{ minHeight: "100vh" }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      <label className="text-white">Filtrar por categoría</label>
      <select
        className="form-select mb-4"
        aria-label="Categorías"
        id="categoriaId"
        name="categoriaId"
        value={categoriaId}
        style={{ width: 250 }}
        onChange={handleChange}
      >
        <option selected>Selecciona una categoría</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombre.charAt(0).toUpperCase() +
              categoria.nombre.slice(1)}
          </option>
        ))}
      </select>

      {productos && productos?.length === 0 && (
        <h3>No hay productos disponibles</h3>
      )}

      <div className="row">
        {productos?.map((producto) => (
          <div key={producto.id} className="col-12 col-md-6 col-lg-4">
            <div
              className="card shadow-lg border-0 mb-5"
              style={{
                transform: "scale(1)",
                transition: "transform 0.2s ease-in-out",
                cursor: "pointer",
              }}
              onMouseOver={handleCardHover}
              onMouseOut={handleCardLeave}
              onClick={() => handleNavigate(producto.id)}
            >
              <div
                style={{
                  alignItems: "center",
                  width: "100%",
                  height: "250px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={producto.imagen_url ?? noImage}
                  alt={producto.nombre}
                  className="card-img-top img-fluid"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="card-body shadow-lg">
                <h5
                  className="card-title"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {producto.nombre}
                </h5>
                <p
                  className="card-text"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {producto.descripcion}
                </p>
                <p className="card-text">GTQ {producto.precio}</p>
                <button
                  onClick={(e) => handleClick(e, producto)}
                  className="btn btn-primary d-flex justify-content-center align-items-center gap-1 w-100"
                  style={{
                    backgroundColor: "#564641",
                  }}
                >
                  Agregar al carrito{" "}
                  <img
                    src={shoppingCartIcon}
                    alt={producto?.nombre}
                    style={{ width: 20 }}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
