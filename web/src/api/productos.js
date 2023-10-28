import toast from "react-hot-toast";
import { API_URL } from "../utils/env";

export const getProductos = async (categoriaId) => {
  try {
    const url = categoriaId
      ? `${API_URL}/productos?categoria_id=${categoriaId}`
      : `${API_URL}/productos`;

    const response = await fetch(url, {
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
    console.error(`Error in getProductos: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};

export const getProducto = async (id) => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
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
    console.error(`Error in getProducto: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};
