// RF48 - Leer Categoría de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF48
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider } from '@mui/material';
import Texto from '@Atomos/Texto';

/**
 * Componente para mostrar la información detallada de una categoría.
 */
const CategoriaInfo = ({ descripcion, productos = [] }) => {
  const productosLista = Array.isArray(productos)
    ? productos
    : typeof productos === 'string'
      ? productos.split(',').map((produc) => produc.trim())
      : [];

  return (
    <Box>
      {descripcion && (
        <Texto variant='body2' sx={{ mb: 4, color: 'text.secondary' }}>
          {descripcion}
        </Texto>
      )}

      <Box sx={{ mb: 4 }}>
        <Texto variant='h6' gutterBottom sx={{ mb: 2 }}>
          <strong>Productos</strong>
        </Texto>

        {productosLista.length > 0 ? (
          <Box
            sx={{
              maxHeight: '300px',
              overflowY: 'auto',
              pr: 1 
            }}
          >
            {productosLista.map((producto, idx) => (
              <Box key={idx}>
                <Texto variant='body2' sx={{ py: 1 }}>
                  {producto}
                </Texto>
                <Divider />
              </Box>
            ))}
          </Box>
        ) : (
          <Texto variant='body2' sx={{ color: 'text.secondary' }}>
            Sin productos asociados
          </Texto>
        )}
      </Box>
    </Box>
  );
};

CategoriaInfo.propTypes = {
  nombre: PropTypes.string,
  descripcion: PropTypes.string,
  productos: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
};

CategoriaInfo.defaultProps = {
  nombre: '',
  descripcion: '',
  productos: [],
};

export default CategoriaInfo;