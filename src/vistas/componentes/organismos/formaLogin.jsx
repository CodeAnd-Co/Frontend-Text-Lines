import CampoFormulario from "../moleculas/campoFormulario";
import MensajeStatus from "../moleculas/mensajeStatus";
import BotonForma from "../moleculas/botonForma";
import { CardContent } from "@mui/material";

/**
 * Componente de formulario de inicio de sesión.
 *
 * Contiene los campos de correo electrónico y contraseña, muestra un mensaje de estado
 * (éxito o error) y un botón para enviar el formulario.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.correo - Valor del campo de correo electrónico.
 * @param {Function} props.setCorreo - Función para actualizar el valor del correo.
 * @param {string} props.contrasenia - Valor del campo de contraseña.
 * @param {Function} props.setContrasenia - Función para actualizar la contraseña.
 * @param {string} props.mensaje - Mensaje de estado para mostrar (éxito o error).
 * @param {Function} props.handleInicioSesion - Función que maneja el envío del formulario.
 *
 * @returns {JSX.Element} Formulario interactivo de inicio de sesión.
 */
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
