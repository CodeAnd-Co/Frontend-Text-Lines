import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@Hooks/AuthProvider'; // ajusta el path si es necesario

// Variables de entorno para la URL base de la API y la clave de autenticación
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Función para obtener el valor de una cookie específica.
 * 
 * @param {string} nombre - Nombre de la cookie a buscar.
 * @returns {string|null} - Valor de la cookie o null si no se encuentra.
 */
const obtenerCookie = (nombre) => {
  const cookies = document.cookie.split(';');
  for (let index = 0; index < cookies.length; index += 1) {
    const cookie = cookies[index].trim();
    if (cookie.startsWith(`${nombre}=`)) {
      return decodeURIComponent(cookie.substring(nombre.length + 1));
    }
  }
  return null;
};

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
  const [mensaje, setMensaje] = useState(''); // Mensaje de error o éxito
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
    setMensaje('');

    try {
      // Solicitud para autenticar al usuario
      await axios.post(`${API_URL}/api/autenticacion/iniciar-sesion`, data, {
        withCredentials: true,
        headers: { 'x-api-key': API_KEY },
      });

      // Intentamos leer el nombre de usuario desde la cookie
      const nombreUsuario = obtenerCookie('nombreUsuario');
      
      // Si fue exitoso, obtiene los datos del usuario autenticado
      const respuesta = await axios.get(`${API_URL}/api/autenticacion/autenticar`, {
        withCredentials: true,
        headers: { 'x-api-key': API_KEY },
      });

      // Actualiza el contexto con los datos del usuario
      // Agregamos el nombre desde la cookie si está disponible
      setUsuario({
        ...respuesta.data.user,
        nombre: nombreUsuario || respuesta.data.user.nombreCompleto 
      });
      
      setMensaje('Inicio de sesión exitoso');
    } catch (error) {
      // Manejo de errores personalizados o genéricos
      if (error.response && error.response.data && error.response.data.mensaje) {
        setMensaje(error.response.data.mensaje);
      } else {
        setMensaje('Credenciales incorrectas');
      }
    }
  };

  return { iniciarSesion, mensaje };
}