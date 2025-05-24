import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@Hooks/AuthProvider';
import Imagen from '@Atomos/Imagen';
import Texto from '@Atomos/Texto';
import GrupoBotones from '@Moleculas/GrupoBotones';

const estilosContenedor = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  textAlign: 'center',
  padding: 4,
};

const estilosTextoSecundario = {
  mt: 2,
};

const estilosTextoDescripcion = {
  mt: 1,
  maxWidth: 400,
  mb: 4, 
};

const Tienda = () => {
  const navigate = useNavigate();
  const { cerrarSesion } = useAuth();

  const manejarCerrarSesion = async () => {
    await cerrarSesion();
    navigate('/iniciar-sesion');
  };

  return (
    <Box sx={estilosContenedor}>
      <Imagen src='/sitio-de-construccion.png' alt='Logo de la aplicación' width='300px' />
      <Imagen src='/logoAltertexLight.svg' alt='Logo de la aplicación' width='350px' />

      <Texto variant='h5' sx={estilosTextoSecundario}>
        ¡Tienda en construcción!
      </Texto>

      <Texto variant='body1' sx={estilosTextoDescripcion}>
        Estamos trabajando para brindarte una experiencia increíble. Muy pronto podrás acceder a esta sección.
      </Texto>

      <Box>
        <GrupoBotones
          spacing={2}
          direction='row'
          align='center'
          buttons={[
            {
              label: 'Regresar al inicio',
              variant: 'contained',
              color: 'primary',
              size: 'large',
              onClick: () => navigate('/iniciar-sesion'),
            },
            {
              label: 'Cerrar sesión',
              variant: 'contained',
              color: 'error',
              size: 'large',
              onClick: manejarCerrarSesion,
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Tienda;