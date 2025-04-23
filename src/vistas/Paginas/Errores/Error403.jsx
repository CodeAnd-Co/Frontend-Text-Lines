import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Imagen from '../../Componentes/Atomos/Imagen';
import Texto from '../../Componentes/Atomos/Texto';
import Boton from '../../componentes/atomos/Boton';

const estilosContenedor = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
  padding: 4,
};

const estilosTextoSecundario = {
  mt: 2,
};

const estilosTextoDescripcion = {
  mt: 1,
  maxWidth: 400,
};

const estilosBoton = {
  mt: 4,
};

const Error403 = () => {
  const navigate = useNavigate();

  return (
    <Box sx={estilosContenedor}>
      <Imagen src='/logoAltertexLogin.svg' alt='Logo de la aplicación' width='350px' />

      <Texto variant='h1' color='error'>
        403
      </Texto>

      <Texto variant='h5' sx={estilosTextoSecundario}>
        Acceso no autorizado
      </Texto>

      <Texto variant='body1' sx={estilosTextoDescripcion}>
        Lo sentimos, no tienes permisos para ver esta página. Por favor verifica tus credenciales o
        contacta al administrador.
      </Texto>

      <Boton
        variant='contained'
        color='primary'
        size='large'
        sx={estilosBoton}
        onClick={() => navigate('/iniciar-sesion')}
        label='Regresar al inicio'
      />
    </Box>
  );
};

export default Error403;
