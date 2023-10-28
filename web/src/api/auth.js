import toast from "react-hot-toast";
import { API_URL } from "../utils/env";

export const iniciarSesion = async (params) => {
  try {
    const { email, contrasena } = params;

    if (!email || !contrasena) {
      toast.error("Debe ingresar un email y una contraseña");
    }

    const data = await fetch(`${API_URL}/auth/inicio-sesion`, {
      method: "POST",
      body: JSON.stringify({
        email,
        contrasena,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());

    return data;
  } catch (error) {
    console.error(`Error in iniciarSesion: ${error}`);
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

export const getSession = async (usuarioId) => {
  try {
    const response = await fetch(`${API_URL}/sesion`, {
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
    console.error(`Error in getSession: ${error}`);
    toast.error(
      "Ha ocurrido un error. Intente de nuevo o contacte un administrador."
    );
  }
};