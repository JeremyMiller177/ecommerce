import { useEffect, useState } from "react";
import { getProductos, deleteProducto } from "../api/productos"; // Importar deleteProducto
import { Link } from "react-router-dom";
import { useSession } from "../hooks/useSession";

export const Productos = ({ title = "Productos" }) => {
  const { session } = useSession();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const [productoAEliminar, setProductoAEliminar] = useState(null); // Estado para el producto a eliminar

  useEffect(() => {
    getProductos()
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEliminar = (id) => {
    setProductoAEliminar(id); // Guardar el id del producto a eliminar
    setShowModal(true); // Mostrar el modal
  };

  const confirmarEliminacion = async () => {
    if (!productoAEliminar) return;

    try {
      await deleteProducto(productoAEliminar, session?.user?.id);
      alert("Producto eliminado con éxito.");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Hubo un error al eliminar el producto.");
    } finally {
      setShowModal(false);
      setProductoAEliminar(null);
    }
  };

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
      <div
        className="container d-flex justify-content-between rounded p-3"
        style={{ backgroundColor: "#564641" }}
      >
        <h1 className="text-left text-white">{title}</h1>
        <button className="btn btn-primary">
          <Link
            to="/admin/productos/crear"
            className="text-white text-decoration-none"
          >
            Nuevo Producto
          </Link>
        </button>
      </div>

      <div className="container mt-4">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark text-center">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>
                  {producto.precio
                    ? typeof producto.precio === "string"
                      ? `$${producto.precio}`
                      : `$${producto.precio.toFixed(2)}`
                    : "N/A"}
                </td>
                <td>{producto.stock}</td>
                <td>
                  <img
                    alt={producto.imagen_url}
                    src={producto.imagen_url}
                    height={50}
                    width={50}
                  />
                </td>
                <td>
                  <div className="container d-flex justify-content-center align-items-center gap-2">
                    <Link to={`/admin/productos/editar/${producto.id}`}>
                      <button className="btn btn-primary">Editar</button>
                    </Link>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleEliminar(producto.id)} //
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Confirmación */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar este producto?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmarEliminacion}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
