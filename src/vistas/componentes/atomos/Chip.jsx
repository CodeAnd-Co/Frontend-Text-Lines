import React from 'react';
import PropTypes from 'prop-types';
import MUIChip from '@mui/material/Chip';
import { styled, useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme';

const StyledChip = styled(MUIChip)(({ shape, backgroundColor, theme }) => {
  const colores = tokens(theme.palette.mode);
  return {
    borderRadius: shape === 'circular' ? '16px' : '4px',
    backgroundColor: backgroundColor
      ? colores[backgroundColor]
        ? colores[backgroundColor][500] || colores[backgroundColor][0]
        : backgroundColor
      : undefined,
  };
});

const Chip = ({
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  label,
  shape = 'cuadrada',
  backgroundColor = null,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledChip
      label={label}
      variant={variant}
      color={color}
      size={size}
      shape={shape}
      backgroundColor={backgroundColor}
      theme={theme}
      {...props}
    />
  );
};

Chip.propTypes = {
  variant: PropTypes.oneOf(['filled', 'outlined']),
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  label: PropTypes.string.isRequired,
  shape: PropTypes.oneOf(['cuadrada', 'circular']),
  backgroundColor: PropTypes.string,
};

export default Chip;
