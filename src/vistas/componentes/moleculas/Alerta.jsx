import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Contenedor from '../Atomos/Contenedor';
import Icono from '../Atomos/Icono';
import Texto from '../Atomos/Texto';
import { IconButton } from '@mui/material';

const Alerta = ({
  tipo = 'info',
  mensaje,
  icono = true,
  iconoNombre,
  textoVariant = 'body1',
  textoColor,
  cerrable = false,
  duracion,
  posicionAbsoluta = false,
  onClose,
  ...props
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duracion) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duracion);
      return () => clearTimeout(timer);
    }
  }, [duracion, onClose]);

  const coloresPorTipo = {
    info: '#2196f3',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  };

  const iconosPorTipo = {
    info: 'Info',
    success: 'CheckCircle',
    warning: 'Warning',
    error: 'Error',
  };

  if (!visible) return null;

  const colorFondo = `${coloresPorTipo[tipo]}20`;
  const colorPrincipal = coloresPorTipo[tipo];
  const iconoMostrar = iconoNombre || iconosPorTipo[tipo];

  return (
    <Contenedor
      elevation={1}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        padding: 2,
        backgroundColor: colorFondo,
        borderLeft: `6px solid ${colorPrincipal}`,
        position: posicionAbsoluta ? 'absolute' : 'relative',
        ...props.sx,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {icono && (
          <Icono nombre={iconoMostrar} color={colorPrincipal} size='medium' variant='filled' />
        )}
        <Texto variant={textoVariant} color={textoColor || colorPrincipal}>
          {mensaje}
        </Texto>
      </div>
      {cerrable && (
        <IconButton
          size='small'
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
        >
          <Icono nombre='Close' color={colorPrincipal} size='small' />
        </IconButton>
      )}
    </Contenedor>
  );
};

Alerta.propTypes = {
  tipo: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  mensaje: PropTypes.string.isRequired,
  icono: PropTypes.bool,
  iconoNombre: PropTypes.string,
  textoVariant: PropTypes.string,
  textoColor: PropTypes.string,
  cerrable: PropTypes.bool,
  duracion: PropTypes.number,
  posicionAbsoluta: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Alerta;
