/**
 * Componente `PaginaInicioSesion`
 *
 * Este componente proporciona una interfaz de inicio de sesión para que los usuarios ingresen su correo electrónico
 * y contraseña para acceder a la aplicación. Realiza una solicitud a la API para autenticar al usuario y manejar la
 * sesión mediante cookies. También muestra un mensaje de error o éxito según el resultado de la autenticación.
 *
 * Dependencias:
 * - `axios`: Para realizar las solicitudes HTTP a la API.
 * - `js-cookie`: Para manejar cookies de manera eficiente.
 * - `@mui/material`: Para la UI con componentes como `TextField`, `Button`, `Card`, etc.
 * - `react-router-dom`: Para la navegación programática después del inicio de sesión.
 * - `useAuth`: Proporciona el contexto de autenticación para almacenar el usuario autenticado.
 *
 * @component
 * @returns {JSX.Element} El formulario de inicio de sesión.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthProvider";
import LogoImagen from "../componentes/moleculas/logoImagen";
import ContenedorFondo from "../plantillas/global/contenedorFondo";
import PlantillaTarjeta from "../plantillas/global/plantillaTarjeta";
import FormaLogin from "../componentes/organismos/formaLogin";

// Variables de configuración para la API
const API_URL = import.meta.env.VITE_API_URL; // URL base de la API
const API_KEY = import.meta.env.VITE_API_KEY; // Clave API para autenticación

/**
 * Componente de la página de inicio de sesión.
 * @returns {JSX.Element} Renderiza la interfaz de inicio de sesión con manejo de errores y redirección tras autenticación.
 */
export default function PaginaInicioSesion() {
  const [correo, setCorreo] = useState(""); // Estado para almacenar el correo electrónico
  const [contrasenia, setContrasenia] = useState(""); // Estado para almacenar la contraseña
  const [mensaje, setMensaje] = useState(""); // Estado para almacenar el mensaje de error o éxito
  const navegar = useNavigate(); // Hook para navegar programáticamente
  const { setUsuario } = useAuth(); // Hook de contexto para gestionar el usuario autenticado

  /**
   * Función que maneja el envío del formulario de inicio de sesión.
   * Realiza dos solicitudes HTTP: una para autenticar al usuario y otra para obtener los datos del usuario.
   * Si la autenticación es exitosa, redirige al usuario a la página de inicio.
   * Si ocurre un error, muestra un mensaje apropiado.
   *
   * @param {object} event - El evento de envío del formulario.
   */
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    const data = { correo, contrasenia }; // Datos del formulario

    setMensaje("");

    try {
      // Realiza la solicitud de inicio de sesión
      await axios.post(`${API_URL}/api/auth/login`, data, {
        withCredentials: true,
        headers: { "x-api-key": API_KEY }, // Agrega la clave API en los headers
      });

      // Si el login es exitoso, obtiene los datos del usuario
      const respuesta = await axios.get(`${API_URL}/api/auth/me`, {
        withCredentials: true,
        headers: { "x-api-key": API_KEY },
      });

      setUsuario(respuesta.data.user); // Almacena los datos del usuario en el contexto
      setMensaje("Inicio de sesión exitoso"); // Muestra un mensaje de éxito

      // Redirige después de 1 segundo
      setTimeout(() => navegar("/inicio"), 500);
    } catch (error) {
      // Maneja el error, mostrando un mensaje adecuado
      if (
        error.response
        && error.response.data
        && error.response.data.mensaje
      ) {
        setMensaje(error.response.data.mensaje); // Mensaje de error personalizado desde el backend
      } else {
        setMensaje("Credenciales incorrectas"); // Mensaje de error genérico
      }
    }
  };

  return (
    <ContenedorFondo>
      <PlantillaTarjeta title={"Iniciar Sesión"}>
        <LogoImagen
          logoSrc='/logo-altertex-inicio-sesion.png'
          altText='Logo de la app'
        />
        <FormaLogin
          correo={correo}
          setCorreo={setCorreo}
          contrasenia={contrasenia}
          setContrasenia={setContrasenia}
          mensaje={mensaje}
          handleSubmit={handleSubmit}
        ></FormaLogin>
      </PlantillaTarjeta>
    </ContenedorFondo>
  );
}
