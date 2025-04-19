import CampoTexto from '../atomos/CampoTexto';
import MensajeStatus from '../moleculas/MensajeStatus';
import { CardContent } from '@mui/material';
import Boton from '../atomos/boton';

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
  setCorreoElectronico,
  contrasenia,
  setContrasenia,
  mensaje,
  handleSubmit,
}) => {
  return (
    <CardContent>
      <form onSubmit={handleSubmit}>
        <CampoTexto
          label={'Correo electronico'}
          value={correo}
          onChange={(event) => setCorreoElectronico(event.target.value)}
          type='email'
        />

        <CampoTexto
          label={'Contraseña'}
          type='password'
          value={contrasenia}
          onChange={(event) => setContrasenia(event.target.value)}
        />

        <MensajeStatus mensaje={mensaje} esExito={mensaje && mensaje.includes('exitoso')} />
        <Boton label={'Inicar sesión'} type='submit' fullWidth={true} />
      </form>
    </CardContent>
  );
};

export default FormaLogin;
