import { obtenerUsuarioPorId } from "../../dominio/repositorios/repositorioUsuarios";

export const ejecutarObtenerUsuario = async (idUsuario) => {
  try {
    const usuario = await obtenerUsuarioPorId(idUsuario);
    return usuario;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};