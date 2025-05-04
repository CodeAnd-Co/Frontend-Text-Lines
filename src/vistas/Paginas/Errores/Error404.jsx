import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Imagen from '../../componentes/atomos/Imagen';
import Texto from '../../componentes/atomos/Texto';
import Boton from '../../componentes/atomos/Boton';

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
};

const estilosBoton = {
  mt: 4,
};

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <Box sx={estilosContenedor}>
      <Imagen src='/logoAltertexLight.svg' alt='Logo de la aplicación' width='350px' />

      <Texto variant='h1' color='error'>
        404
      </Texto>

      <Texto variant='h5' sx={estilosTextoSecundario}>
        Página no encontrada
      </Texto>

      <Texto variant='body1' sx={estilosTextoDescripcion}>
        Lo sentimos, la página que estás buscando no existe. Puede que la dirección esté mal escrita
        o que la página haya sido eliminada.
      </Texto>

      <Boton
        variant='contained'
        color='primary'
        size='large'
        sx={estilosBoton}
        onClick={() => navigate('/iniciar-sesion')}
        label='Volver al inicio'
      />
    </Box>
  );
};

export default Error404;
