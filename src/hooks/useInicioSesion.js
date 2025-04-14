import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthProvider"; // ajusta el path si es necesario

// Variables de entorno para la URL base de la API y la clave de autenticación
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 *
 * RF78 - Iniciar Sesion - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF78
 *
 * Hook personalizado `useInicioSesion`
 *
 * Maneja la lógica de inicio de sesión para la aplicación. Este hook realiza:
 * - Envío de las credenciales a la API.
 * - Manejo del estado del mensaje (error o éxito).
 * - Obtención de datos del usuario autenticado.
 * - Redirección condicional según el resultado.
 *
 * @returns {{
 *   iniciarSesion: (credenciales: {correo: string, contrasenia: string}) => Promise<void>,
 *   mensaje: string
 * }}
 * Retorna una función `iniciarSesion` que realiza la autenticación, y un `mensaje` para mostrar al usuario.
 */
export default function useInicioSesion() {
  const [mensaje, setMensaje] = useState(""); // Mensaje de error o éxito
  const navegar = useNavigate(); // Navegación programática con React Router
  const { setUsuario } = useAuth(); // Contexto de autenticación para almacenar el usuario

  /**
   * Función para autenticar al usuario.
   *
   * @async
   * @function
   * @param {{correo: string, contrasenia: string}} credenciales - Las credenciales del usuario.
   * @returns {Promise<void>} No retorna nada explícitamente, pero actualiza el estado global del usuario y redirige.
   */
  const iniciarSesion = async ({ correo, contrasenia }) => {
    const data = { correo, contrasenia };
    setMensaje("");

    try {
      // Solicitud para autenticar al usuario
      await axios.post(`${API_URL}/api/autenticacion/iniciar-sesion`, data, {
        withCredentials: true,
        headers: { "x-api-key": API_KEY },
      });

      // Si fue exitoso, obtiene los datos del usuario autenticado
      const respuesta = await axios.get(
        `${API_URL}/api/autenticacion/autenticar`,
        {
          withCredentials: true,
          headers: { "x-api-key": API_KEY },
        }
      );

      // Actualiza el contexto con los datos del usuario
      setUsuario(respuesta.data.user);
      setMensaje("Inicio de sesión exitoso");

      const clientesAsociadosArreglo = respuesta.data.user.clientesAsociados;

      // Redirige dependiendo de si el usuario tiene clientes asociados
      if (clientesAsociadosArreglo.length > 0) {
        setTimeout(() => navegar("/inicio"), 500);
      } else {
        setTimeout(() => navegar("/tienda"), 500);
      }
    } catch (error) {
      console.log(error);

      // Manejo de errores personalizados o genéricos
      if (
        error.response
        && error.response.data
        && error.response.data.mensaje
      ) {
        setMensaje(error.response.data.mensaje);
      } else {
        setMensaje("Credenciales incorrectas");
      }
    }
  };

  return { iniciarSesion, mensaje };
}
