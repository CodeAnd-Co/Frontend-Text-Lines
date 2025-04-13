import CampoFormulario from "../moleculas/campoFormulario";
import MensajeStatus from "../moleculas/mensajeStatus";
import BotonForma from "../moleculas/botonForma";
import { CardContent } from "@mui/material";

const FormaLogin = ({
  correo,
  setCorreo,
  contrasenia,
  setContrasenia,
  mensaje,
  handleInicioSesion,
}) => {
  return (
    <CardContent>
      <form onSubmit={handleInicioSesion}>
        <CampoFormulario
          label='Correo electronico'
          type='email'
          value={correo}
          onChange={(event) => setCorreo(event.target.value)}
        />
        <CampoFormulario
          label='Contraseña'
          type='password'
          value={contrasenia}
          onChange={(event) => setContrasenia(event.target.value)}
        />
        <MensajeStatus
          mensaje={mensaje}
          esExito={mensaje && mensaje.includes("exitoso")}
        />
        <BotonForma>Iniciar Sesión</BotonForma>
      </form>
    </CardContent>
  );
};

export default FormaLogin;
