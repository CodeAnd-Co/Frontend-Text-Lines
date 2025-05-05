import React from 'react';
import PropTypes from 'prop-types';
import MUIChip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

/** Chip personalizado usando Material UI */
const StyledChip = styled(MUIChip, {
  shouldForwardProp: (prop) =>
    prop !== 'shape' && prop !== 'backgroundColor' && prop !== 'textColor',
})(({ shape, backgroundColor, textColor }) => ({
  borderRadius: shape === 'circular' ? '16px' : '4px',
  backgroundColor: backgroundColor || undefined,
  color: textColor || undefined,
}));

const Chip = ({
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  label,
  shape = 'cuadrada',
  backgroundColor = null,
  textColor = null,
  ...props
}) => {
  return (
    <StyledChip
      label={label}
      variant={variant}
      color={color}
      size={size}
      shape={shape}
      backgroundColor={backgroundColor}
      textColor={textColor}
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
  textColor: PropTypes.string,
};

export default Chip;
