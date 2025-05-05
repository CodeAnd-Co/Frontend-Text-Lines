import { Box } from '@mui/material';
import GrupoBotones from '../Moleculas/GrupoBotones';
import Texto from '../Atomos/Texto';
import PropTypes from 'prop-types';

const estiloTitulo = {
  fontSize: { xs: '1.5rem', sm: '3.5rem' },
  marginBottom: '0.5rem',
  marginTop: '4rem',
};
const estiloDescripcion = {
  color: 'text.secondary',
  fontSize: { xs: '0.6rem', sm: '1.2rem' },
  marginBottom: '2rem',
};

const ContenedorLista = ({ titulo, descripcion, informacionBotones = [], children }) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={2}
      width='90%'
      margin='auto'
      paddingX={{ xs: 1, sm: 1 }}
      paddingY={{ xs: 3, sm: 5 }}
    >
      <Box>
        <Texto variant='h2' sx={estiloTitulo}>
          {titulo}
        </Texto>
        {descripcion && (
          <Texto variant='body2' sx={estiloDescripcion}>
            {descripcion}
          </Texto>
        )}
      </Box>

      <Box display='flex' justifyContent={{ xs: 'center', sm: 'flex-end' }} flexWrap='wrap' gap={1}>
        <GrupoBotones buttons={informacionBotones} />
      </Box>

      <Box flexGrow={1}>{children}</Box>
    </Box>
  );
};

ContenedorLista.propTypes = {
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string,
  informacionBotones: PropTypes.array,
  children: PropTypes.node,
};

export default ContenedorLista;
