import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import * as MuiIcons from '@mui/icons-material';

const Icono = ({
  nombre,
  variant = 'filled',
  color = 'inherit',
  size = 'medium',
  clickable = false,
  tooltip = '',
  onClick,
  ...props
}) => {
  const iconKey = `${nombre}${variant[0].toUpperCase()}${variant.slice(1)}`;
  const IconComponent = MuiIcons[iconKey] || MuiIcons[nombre];

  if (!IconComponent) {
    return null;
  }

  const isCustomColor = ![
    'inherit',
    'primary',
    'secondary',
    'action',
    'error',
    'disabled',
    'info',
    'success',
    'warning',
  ].includes(color);

  const icon = (
    <IconComponent
      fontSize={size}
      color={isCustomColor ? 'inherit' : color}
      style={isCustomColor ? { color } : undefined}
      {...props}
    />
  );

  const wrappedIcon = clickable ? (
    <IconButton
      onClick={onClick}
      size={size}
      style={isCustomColor ? { color } : undefined}
      color={isCustomColor ? 'inherit' : color}
    >
      {icon}
    </IconButton>
  ) : (
    icon
  );

  return tooltip ? (
    <Tooltip title={tooltip}>
      <span>{wrappedIcon}</span>
    </Tooltip>
  ) : (
    wrappedIcon
  );
};

Icono.propTypes = {
  nombre: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['filled', 'outlined', 'rounded', 'sharp', 'twoTone']),
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  clickable: PropTypes.bool,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
};

export default Icono;
