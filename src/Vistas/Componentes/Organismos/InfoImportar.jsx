// src/Vistas/Componentes/Organismos/PopOver.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Popover, Typography } from '@mui/material';
import Icono from '@Atomos/Icono';
import { tokens } from '@SRC/theme';
import { useTheme } from '@mui/material/styles';

/**
 * Componente Popover que despliega contenido al hacer click en un icono.
 * Ahora acepta children para renderizar JSX dentro del popover.
 */
const InfoImportar = ({
  iconName = 'Info',
  iconSize = 'large',
  children,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const handleClick = (elemento) => {
    setAnchorEl(elemento.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <Icono
          nombre={iconName}
          color={colores.texto[3]}
          size={iconSize}
          clickable={false}
        />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        disableScrollLock
      >
        <Typography sx={{ padding: 2, maxWidth: 600 }}>
          {children}
        </Typography>
      </Popover>
    </>
  );
};

InfoImportar.propTypes = {
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
};

export default InfoImportar;
