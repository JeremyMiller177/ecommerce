import { getSession } from "../api/auth";

export const can = async (usuarioId, permission) => {
  if (!usuarioId) return false
  
  const data = await getSession(usuarioId);
  
  if (data?.user?.rol?.permisos) {    
    const permisos = data?.user?.rol?.permisos?.split(',');
    return permisos.includes(permission);
  }

  return false;
};
