import toast from "react-hot-toast";
import { API_URL } from "../utils/env";

export const createPedido = async (params) => {
  try {
    const { usuarioId, tipoPagoId, nombre, email, telefono, direccion, total } =
      params;

    const data = await fetch(`${API_URL}/pedidos`, {
      method: "POST",
      body: JSON.stringify({
        usuarioId,
        tipoPagoId,
        nombre,
        email,
        telefono,
        direccion,
        total,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());

    return data;
  } catch (error) {
    console.error(`Error in createPedido: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};

export const updateEstadoPedido = async (params, usuarioId) => {
  try {
    const { pedidoId, estado } = params;

    const data = await fetch(`${API_URL}/pedidos/${pedidoId}`, {
      method: "PUT",
      body: JSON.stringify({
        estado,
      }),
      headers: {
        "Content-Type": "application/json",
        usuario_id: usuarioId,
      },
    }).then((data) => data.json());

    return data;
  } catch (error) {
    console.error(`Error in updateEstadoPedido: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};

export const createDetallePedido = async (params) => {
  try {
    const { pedidoId, productoId, cantidad, precioUnitario, subtotal } = params;

    const data = await fetch(`${API_URL}/detalles-pedido`, {
      method: "POST",
      body: JSON.stringify({
        pedidoId,
        productoId,
        cantidad,
        precioUnitario,
        subtotal,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());

    return data;
  } catch (error) {
    console.error(`Error in crearDetallePedido: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};

export const getPedidos = async (usuarioId, rol) => {
  try {
    const url =
      usuarioId && rol !== "admin"
        ? `${API_URL}/pedidos?usuario_id=${usuarioId}`
        : `${API_URL}/pedidos`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        usuario_id: usuarioId,
      },
    });

    if (response.status !== 200) {
      throw new Error(
        "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error in getPedidos: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};

export const getDetallesPedido = async (pedidoId, usuarioId) => {
  try {
    if (!pedidoId) throw new Error("No se ha especificado el pedido.");
    if (!usuarioId) throw new Error("No se ha especificado el usuario.");

    const url = `${API_URL}/detalles-pedido?pedido_id=${pedidoId}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        usuario_id: usuarioId,
      },
    });

    if (response.status !== 200) {
      throw new Error(
        "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error in getPedidos: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};
