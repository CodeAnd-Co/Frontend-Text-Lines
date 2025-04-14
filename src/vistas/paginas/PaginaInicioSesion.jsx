import { useState } from 'react';
import LogoImagen from '../componentes/moleculas/LogoImagen';
import ContenedorFondo from '../plantillas/global/ContenedorFondo';
import PlantillaTarjeta from '../plantillas/global/PlantillaTarjeta';
import FormaLogin from '../componentes/organismos/FormaLogin';
import useInicioSesion from '../../hooks/useInicioSesion';

/**
 * RF78 - Iniciar Sesión - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF78
 * `PaginaInicioSesion` - Componente de página para el inicio de sesión de usuarios.
 *
 * Este componente renderiza un formulario de inicio de sesión dentro de una plantilla de tarjeta,
 * permitiendo al usuario ingresar su correo y contraseña. Utiliza un hook personalizado para manejar
 * la lógica de autenticación y mostrar mensajes de error o éxito.
 *
 * @component
 * @returns {JSX.Element} La interfaz completa de inicio de sesión con fondo, tarjeta y formulario.
 */
export default function PaginaInicioSesion() {
  // Estado para almacenar el correo electrónico ingresado por el usuario
  const [correoElectronico, setCorreoElectronico] = useState('');

  // Estado para almacenar la contraseña ingresada por el usuario
  const [contrasenia, setContrasenia] = useState('');

  // Hook personalizado que contiene la función para iniciar sesión y el mensaje de estado
  const { iniciarSesion, mensaje } = useInicioSesion();

  /**
   * Manejador del envío del formulario.
   * Previene el comportamiento por defecto del formulario y ejecuta la lógica de inicio de sesión.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - El evento del formulario.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await iniciarSesion({ correo: correoElectronico, contrasenia });
    } catch (error) {
      console.error('Error en funcion iniciar sesion: ', error);
    }
  };

  return (
    <ContenedorFondo>
      <PlantillaTarjeta title='Iniciar Sesión'>
        <LogoImagen logoSrc='/logoAltertexLogin.svg' altText='Logo de la app' />
        <FormaLogin
          correo={correoElectronico}
          setCorreoElectronico={setCorreoElectronico}
          contrasenia={contrasenia}
          setContrasenia={setContrasenia}
          mensaje={mensaje}
          handleSubmit={handleSubmit}
        />
      </PlantillaTarjeta>
    </ContenedorFondo>
  );
}
