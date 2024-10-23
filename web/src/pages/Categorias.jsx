import { useEffect, useState } from "react";
import { getCategorias, deleteCategoria } from "../api/categorias";
import { Link } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import toast from "react-hot-toast";

export const Categorias = ({ title = "Categorias" }) => {
  const { session } = useSession();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const [eliminarId, setEliminarId] = useState(null); // Estado para el producto a eliminar

  useEffect(() => {
    getCategorias()
      .then((data) => {
        setCategorias(data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const confirmarEliminacion = async () => {
    if (!eliminarId) return;

    try {
      await deleteCategoria(eliminarId, session?.user?.id);
      toast.success("Categoría eliminada con éxito.");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      toast.error("Hubo un error al eliminar la categoría.");
    } finally {
      setShowModal(false);
      setEliminarId(null);
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
            to="/admin/categorias/crear"
            className="text-white text-decoration-none"
          >
            Nueva Categoría
          </Link>
        </button>
      </div>

      <div className="container mt-4">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark text-center">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>

                <td>
                  <div className="container d-flex justify-content-center align-items-center gap-2">
                    <Link to={`/admin/categorias/editar/${categoria.id}`}>
                      <button className="btn btn-primary">Editar</button>
                    </Link>
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
                <p>¿Estás seguro de que deseas eliminar esta categoría?</p>
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
