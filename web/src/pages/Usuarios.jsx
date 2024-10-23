import { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario } from "../api/usuarios";
import { Link } from "react-router-dom";
import { useSession } from "../hooks/useSession";

export const Usuarios = ({ title = "Usuarios" }) => {
  const { session } = useSession();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    getUsuarios(userId)
      .then((data) => setUsuarios(data))
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  const handleEliminar = (id) => {
    setUsuarioAEliminar(id);
    setShowModal(true); // Mostrar el modal
  };

  const confirmarEliminacion = async () => {
    if (!usuarioAEliminar) return;

    try {
      await deleteUsuario(usuarioAEliminar, session?.user?.id);
      alert("Producto eliminado con éxito.");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Hubo un error al eliminar el producto.");
    } finally {
      setShowModal(false);
      setUsuarioAEliminar(null);
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
            to="/Admin/Usuarios/crear"
            className="text-white text-decoration-none"
          >
            Nuevo Usuario
          </Link>
        </button>
      </div>

      <div className="container mt-4">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark text-center">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Ciudad</th>
              <th>Pais</th>
              <th>Telefono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.direccion}</td>
                <td>{usuario.ciudad}</td>
                <td>{usuario.pais}</td>
                <td>{usuario.telefono}</td>

                <td>
                  <div className="container d-flex justify-content-center align-items-center gap-2">
                    <Link to={`/admin/usuarios/editar/${usuario.id}`}>
                      <button className="btn btn-primary">Editar</button>
                    </Link>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleEliminar(usuario.id)} //
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
