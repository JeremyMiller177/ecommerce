import toast from "react-hot-toast";
import { API_URL } from "../utils/env";

export const getResenas = async (productoId) => {
  try {
    if (!productoId) throw new Error("No se ha especificado un producto.");

    const response = await fetch(
      `${API_URL}/resenas?producto_id=${productoId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(
        "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error in getResenas: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};

export const createResena = async (params) => {
  try {
    const { sessionUserId, productoId, usuarioId, calificacion, comentario } =
      params;

    if (!sessionUserId) {
      return toast.error("Debes iniciar sesión para poder crear una reseña");
    }

    const data = await fetch(`${API_URL}/resenas`, {
      method: "POST",
      body: JSON.stringify({
        productoId,
        usuarioId,
        calificacion,
        comentario,
      }),
      headers: {
        "Content-Type": "application/json",
        usuario_id: sessionUserId,
      },
    }).then((data) => data.json());

    return data;
  } catch (error) {
    console.error(`Error in crearResena: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};
