import toast from "react-hot-toast";
import { API_URL } from "../utils/env";

export const getUsuarios = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      headers: {
        "Content-Type": "application/json",
        usuario_id: userId,
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
    console.error(`Error in getUsuarios: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};

export const getUsuario = async (id, userId) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      headers: {
        "Content-Type": "application/json",
        usuario_id: userId,
      },
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(
        "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
      );
    }

    return data;
  } catch (error) {
    console.error(`Error in getUsuario: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};

export const crearUsuario = async (params) => {
  try {
    const { nombre, email, contrasena, direccion, ciudad, telefono } = params;

    const data = await fetch(`${API_URL}/auth/registro`, {
      method: "POST",
      body: JSON.stringify({
        nombre,
        email,
        contrasena,
        direccion,
        ciudad,
        telefono,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());

    return data;
  } catch (error) {
    console.error(`Error in crearUsuario: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};

export const updateUsuario = async (id, params, usuarioId) => {
  try {
    const { nombre, email, direccion, ciudad, pais, telefono } = params;

    await fetch(`${API_URL}/usuarios/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        nombre,
        email,
        direccion,
        ciudad,
        pais,
        telefono,
      }),
      headers: {
        "Content-Type": "application/json",
        usuario_id: usuarioId,
      },
    });

    return "Exito";
  } catch (error) {
    console.error(`Error in updateUsuario: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};

export const deleteUsuario = async (productoId, usuarioId) => {
  try {
    const data = await fetch(`${API_URL}/usuarios/${productoId}`, {
      method: "PUT",
      body: JSON.stringify({
        isDisabled: true,
      }),
      headers: {
        "Content-Type": "application/json",
        usuario_id: usuarioId,
      },
    }).then((data) => data.json());

    return data;
  } catch (error) {
    console.error(`Error in deleteProducto: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};
