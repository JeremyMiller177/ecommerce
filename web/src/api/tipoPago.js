import toast from "react-hot-toast";
import { API_URL } from "../utils/env";

export const getTiposPago = async () => {
  try {
    const response = await fetch(`${API_URL}/tipos-pago`, {
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
    console.error(`Error in getTiposPago: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};
