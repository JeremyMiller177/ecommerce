import { useEffect, useState } from "react";
import { getPedidos } from "../api/pedidos";
import { useSession } from "../hooks/useSession";

export const MisPedidos = () => {
  const { session } = useSession();
  const [pedidos, setPedidos] = useState([]);

  const sessionUserId = session?.user?.id;

  const parseDate = (date) => {
    const fecha = new Date(date);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear().toString();

    return `${dia}/${mes}/${anio}`;
  };

  useEffect(() => {
    getPedidos(sessionUserId).then((data) => setPedidos(data));
  }, [sessionUserId]);

  return (
    <div
      className="card shadow-lg p-5 m-3 border-0 mb-3"
      style={{ minHeight: "100vh" }}
    >
      <h3>Pedidos</h3>

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
                  {pedido?.estado?.charAt(0).toUpperCase() +
                    pedido?.estado?.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
