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
import Cookies from "js-cookie";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useAuth } from "../../AuthProvider";

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
      setTimeout(() => navegar("/inicio"), 1000);
    } catch (error) {
      console.error("Error:", error);
      // Maneja el error, mostrando un mensaje adecuado
      if (
        error.response &&
        error.response.data &&
        error.response.data.mensaje
      ) {
        setMensaje(error.response.data.mensaje); // Mensaje de error personalizado desde el backend
      } else {
        setMensaje("Ocurrió un error inesperado"); // Mensaje de error genérico
      }
    }
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='90vh'
    >
      <Card sx={{ width: 631, height: 503, padding: 3, boxShadow: 3 }}>
        {/* Logo de la aplicación */}
        <Box display='flex' justifyContent='center' mb={1}>
          <img
            src='/logo-altertex-inicio-sesion.png' // Ruta del logo
            alt='Logo de la app'
            style={{ width: "345px", height: "80px" }}
          />
        </Box>

        {/* Título del formulario */}
        <CardHeader
          title='Iniciar Sesión'
          titleTypographyProps={{
            variant: "h6",
          }}
          sx={{
            textAlign: "center",
            padding: 1,
          }}
        />

        {/* Contenido del formulario */}
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Campo de correo electrónico */}
            <TextField
              fullWidth
              label='Correo electronico'
              type='email'
              variant='outlined'
              margin='normal'
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
            />
            {/* Campo de contraseña */}
            <TextField
              fullWidth
              label='Contraseña'
              type='password'
              variant='outlined'
              margin='normal'
              value={contrasenia}
              onChange={(event) => setContrasenia(event.target.value)}
            />
            {/* Mensaje de error o éxito */}
            {mensaje && (
              <Typography
                color={mensaje.includes("exitoso") ? "green" : "red"}
                textAlign='center'
                mt={1}
              >
                {mensaje}
              </Typography>
            )}
            {/* Botón de envío */}
            <CardActions sx={{ mt: 3 }}>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={{ mt: 2 }}
              >
                Iniciar Sesión
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
