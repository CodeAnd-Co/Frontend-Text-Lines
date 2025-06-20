import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider } from '@mui/material';
import Texto from '@Atomos/Texto';

/**
 * Componente para mostrar información de un set de productos
 */
const InfoSetProductos = ({ nombre, descripcion, productos, grupos, mostrarGrupos = true }) => {
  const productosLista
    = typeof productos === 'string'
      ? productos.split(',').map((prod) => prod.trim())
      : productos || [];

  const gruposList
    = typeof grupos === 'string' ? grupos.split(',').map((grp) => grp.trim()) : grupos || [];

  return (
    <Box>
      <Texto variant='h6' sx={{ fontWeight: 'bold', mb: 1 }}>
        {nombre || ''}
      </Texto>

      {descripcion && (
        <Texto variant='body2' sx={{ mb: 4, color: 'text.secondary' }}>
          {descripcion}
        </Texto>
      )}

      <Box sx={{ mb: 4 }}>
        <Texto variant='h6' gutterBottom sx={{ mb: 2 }}>
          <strong>Productos</strong>
        </Texto>

        <Box
          sx={{
            maxHeight: '300px',
            overflowY: 'auto',
            pr: 1,
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
      </Box>

      {mostrarGrupos && (
        <Box sx={{ mb: 6 }}>
          <Texto variant='h6' gutterBottom sx={{ mb: 2 }}>
            <strong>Grupos de empleados asignados</strong>
          </Texto>
          {gruposList.map((grupo, idx) => (
            <Box key={idx}>
              <Texto variant='body2' sx={{ py: 1 }}>
                {grupo}
              </Texto>
              <Divider />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

InfoSetProductos.propTypes = {
  nombre: PropTypes.string,
  descripcion: PropTypes.string,
  productos: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  grupos: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  mostrarGrupos: PropTypes.bool,
};

InfoSetProductos.defaultProps = {
  nombre: '',
  descripcion: '',
  productos: [],
  grupos: [],
};

export default InfoSetProductos;