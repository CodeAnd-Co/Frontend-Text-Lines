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

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function PaginaInicioSesion() {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navegar = useNavigate();
  const { setUsuario } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { correo, contrasenia };

    try {
      // Realiza la solicitud de inicio de sesión
      await axios.post(`${API_URL}/api/auth/login`, data, {
        withCredentials: true,
        headers: { "x-api-key": API_KEY },
      });

      // Si el login es exitoso, realiza la solicitud para obtener los datos del usuario
      const respuesta = await axios.get(`${API_URL}/api/auth/me`, {
        withCredentials: true,
        headers: { "x-api-key": API_KEY },
      });

      setUsuario(respuesta.data.user);
      setMensaje("Inicio de sesión exitoso");

      // Redirige después de 1 segundo
      setTimeout(() => navegar("/inicio"), 1000);
    } catch (error) {
      console.error("Error:", error);
      // Verifica si hay un mensaje de error en la respuesta
      if (
        error.response &&
        error.response.data &&
        error.response.data.mensaje
      ) {
        setMensaje(error.response.data.mensaje); // Usa el mensaje de error específico
      } else {
        setMensaje("Ocurrió un error inesperado"); // Mensaje genérico si no hay respuesta del backend
      }
    }
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='90vh'
      //   sx={{
      //     backgroundImage: 'url("/fondo-login.png")',
      //     backgroundSize: "cover",
      //     backgroundPosition: "center",
      //     backgroundRepeat: "no-repeat",
      //   }}
    >
      <Card sx={{ width: 631, height: 503, padding: 3, boxShadow: 3 }}>
        {/* Imagen arriba del CardHeader */}
        <Box display='flex' justifyContent='center' mb={1}>
          <img
            src='/logo-altertex-inicio-sesion.png' // cambia esto por la ruta de tu imagen
            alt='Logo de la app'
            style={{ width: "345px", height: "80px" }}
          />
        </Box>

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

        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label='Correo electronico'
              type='email'
              variant='outlined'
              margin='normal'
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
            />
            <TextField
              fullWidth
              label='Contraseña'
              type='password'
              variant='outlined'
              margin='normal'
              value={contrasenia}
              onChange={(event) => setContrasenia(event.target.value)}
            />
            {mensaje && (
              <Typography
                color={mensaje.includes("exitoso") ? "green" : "red"}
                textAlign='center'
                mt={1}
              >
                {mensaje}
              </Typography>
            )}
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
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            mt={2}
          ></Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
