import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiSwitch from '@mui/material/Switch';

/**
 * Componente Switch personalizado usando Material UI.
 */
const CustomSwitch = ({
  label,
  required = false,
  labelPlacement = 'end',
  checked,
  onChange,
  size = 'medium',
  color = 'primary',
  ...props
}) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MuiSwitch
            checked={checked}
            onChange={onChange}
            size={size}
            color={color}
            {...props}
          />
        }
        label={`${label}${required ? ' *' : ''}`}
        labelPlacement={labelPlacement}
      />
    </FormGroup>
  );
};

CustomSwitch.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  labelPlacement: PropTypes.oneOf(['end', 'start', 'top', 'bottom']),
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'info',
    'success',
    'warning',
  ]),
};

export default CustomSwitch;