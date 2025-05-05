import { useState } from 'react';
import Box from '@mui/material/Box';
import FormularioInicioSesion from '../Componentes/Organismos/Formularios/FormularioInicioSesion';
import useInicioSesion from '../../hooks/useInicioSesion';

/**
 *
 * RF78 - Iniciar Sesion - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF78
 *
 * Estilos de fondo para la pantalla de inicio de sesión.
 * Se utiliza una imagen centrada y que cubre toda la pantalla.
 * @type {Object}
 */
const estilosContenedorIniciarSesion = {
  backgroundImage: 'url("/fondo-inicio-sesion.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

/**
 * Componente de página para iniciar sesión.
 * Muestra un formulario de inicio de sesión centrado vertical y horizontalmente.
 * Utiliza el hook `useInicioSesion` para manejar la lógica de autenticación.
 *
 * @component
 * @returns {JSX.Element} El componente de la pantalla de inicio de sesión.
 */
const IniciarSesion = () => {
  const { iniciarSesion, mensaje } = useInicioSesion(); // Hook personalizado para autenticación
  const [cargando, setCargando] = useState(false); // Estado para indicar si se está procesando el inicio de sesión

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * Llama al método de autenticación y gestiona el estado de carga.
   *
   * @async
   * @param {Object} formulario - Datos del formulario de inicio de sesión.
   */
  const manejarEnvio = async (formulario) => {
    setCargando(true);
    try {
      await iniciarSesion(formulario);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
      sx={estilosContenedorIniciarSesion}
    >
      <Box display='flex' flexDirection='column' alignItems='center' gap={3}>
        <FormularioInicioSesion alEnviar={manejarEnvio} cargando={cargando} mensaje={mensaje} />
      </Box>
    </Box>
  );
};

export default IniciarSesion;
