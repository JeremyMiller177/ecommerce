import toast from "react-hot-toast";
import { API_URL } from "../utils/env";

export const getCategorias = async () => {
  try {
    const response = await fetch(`${API_URL}/categorias`, {
      headers: {
        "Content-Type": "application/json",
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
    console.error(`Error in getCategorias: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};

export const getCategoria = async (id) => {
  try {
    const response = await fetch(`${API_URL}/categorias/${id}`, {
      headers: {
        "Content-Type": "application/json",
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
    console.error(`Error in getCategoria: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};

export const createCategoria = async (params, usuarioId) => {
  try {
    const { nombre } = params;

    const data = await fetch(`${API_URL}/categorias`, {
      method: "POST",
      body: JSON.stringify({
        nombre,
      }),
      headers: {
        "Content-Type": "application/json",
        usuario_id: usuarioId,
      },
    }).then((data) => data.json());

    return data;
  } catch (error) {
    console.error(`Error in createCategoria: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};

export const deleteCategoria = async (categoriaId, usuarioId) => {
  try {
    const data = await fetch(`${API_URL}/categorias/${categoriaId}`, {
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
    console.error(`Error in deleteCategoria: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};

export const updateCategoria = async (categoriaId, params, usuarioId) => {
  try {
    const { nombre } = params;

    const data = await fetch(`${API_URL}/categorias/${categoriaId}`, {
      method: "PUT",
      body: JSON.stringify({
        nombre,
      }),
      headers: {
        "Content-Type": "application/json",
        usuario_id: usuarioId,
      },
    }).then((data) => data.json());

    return data;
  } catch (error) {
    console.error(`Error in updateProducto: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};
