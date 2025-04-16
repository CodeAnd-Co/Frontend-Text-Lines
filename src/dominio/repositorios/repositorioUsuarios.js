// src/dominio/repositorios/repositorioUsuarios.jsx
import axios from "axios";
import { RUTAS_API } from "../../utilidades/constantes/rutasAPI";
import { UsuarioModelo } from "../modelos/Usuario/modeloUsuario";

export const obtenerUsuarioPorId = async (idUsuario) => {
  try {
    const respuesta = await axios.get(RUTAS_API.USUARIOS.CONSULTAR_USUARIO(idUsuario), {
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const datosUsuario = respuesta.data.usuario;
    return new UsuarioModelo(datosUsuario);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};