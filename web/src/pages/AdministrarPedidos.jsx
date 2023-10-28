import { useEffect, useState } from "react";
import { getPedidos, updateEstadoPedido } from "../api/pedidos";
import { useSession } from "../hooks/useSession";
import { getSession } from "../api/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { can } from "../utils/can";

export const AdministrarPedidos = () => {
  const { session } = useSession();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sessionUserId = session?.user?.id;

  const handleChange = async (pedidoId, estado) => {
    setLoading(true);

    if (!estado || estado === "Selecciona un estado") {
      setLoading(false);
      return toast.error("Selecciona un estado");
    }

    const pedido = pedidos.find((x) => x.id === pedidoId);

    await updateEstadoPedido({ pedidoId: pedido.id, estado }, sessionUserId);

    const rol = await getSession(sessionUserId);
    const nuevosPedidos = await getPedidos(
      sessionUserId,
      rol?.user?.rol?.nombre
    );

    setPedidos(nuevosPedidos);

    toast.success("El estado del pedido ha sido actualizado correctamente.");
    navigate("/administrar-pedidos");
    setLoading(false);
  };

  const parseDate = (date) => {
    const fecha = new Date(date);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear().toString();

    return `${dia}/${mes}/${anio}`;
  };

  const estados = [
    {
      id: "pendiente",
      nombre: "Pendiente",
    },
    {
      id: "enviado",
      nombre: "Enviado",
    },
    {
      id: "entregado",
      nombre: "Entregado",
    },
  ];

  useEffect(() => {
    can(sessionUserId, "EDITAR_PEDIDO").then((value) => {
      if (!value) {
        toast.error("El usuario no tiene permisos para realizar esta acción.");

        return navigate("/productos");
      }
    });

    getSession(sessionUserId).then((rol) => {
      getPedidos(sessionUserId, rol?.user?.rol?.nombre).then((data) =>
        setPedidos(data)
      );
    });
  }, [sessionUserId, navigate]);

  return (
    <div className="container bg-white">
      <div className="card shadow-lg p-5 m-3 border-0 mb-3">
        <h3>Administrar pedidos</h3>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre de quien recibe</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Correo electrónico</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidos?.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{parseDate(pedido.fecha)}</td>
                  <td>{pedido.nombre}</td>
                  <td>{pedido.telefono}</td>
                  <td>{pedido.direccion}</td>
                  <td>{pedido.email}</td>
                  <td>{pedido.total}</td>
                  <td>
                    <select
                      className="form-select mb-4"
                      aria-label="Estado"
                      id="estado"
                      name="estado"
                      value={pedido?.estado}
                      onChange={(e) => handleChange(pedido.id, e.target.value)}
                      disabled={loading}
                    >
                      <option selected>Selecciona un estado</option>
                      {estados.map((estado) => (
                        <option key={estado.id} value={estado.id}>
                          {estado.nombre.charAt(0).toUpperCase() +
                            estado.nombre.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
