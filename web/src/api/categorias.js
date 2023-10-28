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
