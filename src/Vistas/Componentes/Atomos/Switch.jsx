import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiSwitch from '@mui/material/Switch';
import { useTheme } from '@mui/material/styles';
import { tokens } from '@SRC/theme';

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
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MuiSwitch
            checked={checked}
            onChange={onChange}
            size={size}
            color={color}
            sx={{
              '& .MuiSwitch-thumb': {
                backgroundColor: checked ? colores.primario[3] : colores.primario[4],
              },
              '& .MuiSwitch-track': {
                backgroundColor: checked ? colores.primario[3] : colores.texto[3],
              },
            }}
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
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
};

export default CustomSwitch;
