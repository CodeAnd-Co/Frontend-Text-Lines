import { useState } from 'react';
import Box from '@mui/material/Box';
import FormularioInicioSesion from '../Componentes/Organismos/Formularios/FormularioInicioSesion';
import useInicioSesion from '../../hooks/useInicioSesion';

const estilosContenedorIniciarSesion = {
  backgroundImage: 'url("/fondo-inicio-sesion.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const IniciarSesion = () => {
  const { iniciarSesion, mensaje } = useInicioSesion();
  const [cargando, setCargando] = useState(false);

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
