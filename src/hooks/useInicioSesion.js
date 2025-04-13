import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthProvider"; // ajusta el path si es necesario
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function useInicioSesion() {
  const [mensaje, setMensaje] = useState("");
  const navegar = useNavigate();
  const { setUsuario } = useAuth();

  const iniciarSesion = async ({ correo, contrasenia }) => {
    const data = { correo, contrasenia };
    setMensaje("");

    try {
      await axios.post(`${API_URL}/api/autenticacion/iniciar-sesion`, data, {
        withCredentials: true,
        headers: { "x-api-key": API_KEY },
      });

      const respuesta = await axios.get(
        `${API_URL}/api/autenticacion/autenticar`,
        {
          withCredentials: true,
          headers: { "x-api-key": API_KEY },
        }
      );

      setUsuario(respuesta.data.user);
      setMensaje("Inicio de sesión exitoso");

      const clientesAsociadosArreglo = respuesta.data.user.clientesAsociados;

      if (clientesAsociadosArreglo.length > 0) {
        setTimeout(() => navegar("/inicio"), 500);
      } else {
        setTimeout(() => navegar("/tienda"), 500);
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.mensaje
      ) {
        setMensaje(error.response.data.mensaje);
      } else {
        setMensaje("Credenciales incorrectas");
      }
    }
  };

  return { iniciarSesion, mensaje };
}
