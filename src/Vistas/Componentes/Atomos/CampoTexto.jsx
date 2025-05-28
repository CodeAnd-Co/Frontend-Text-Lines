import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

/**
 * Campo de texto personalizado usando Material UI.
 */
const CampoTexto = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  size = 'small',
  fullWidth = false,
  required = false,
  placeholder = '',
  helperText = '',
  error = false,
  disabled = false,
  margin = 'normal',
  maxLength,
  ...props
}) => {
  return (
    <TextField
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      size={size}
      fullWidth={fullWidth}
      required={required}
      placeholder={placeholder}
      helperText={helperText}
      error={error}
      disabled={disabled}
      margin={margin}
      inputProps={{ maxLength }}
      {...props}
    />
  );
};

CampoTexto.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  type: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  maxLength: PropTypes.number,
};

export default CampoTexto;
