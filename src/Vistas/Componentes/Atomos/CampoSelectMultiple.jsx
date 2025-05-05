import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
  ListItemText, 
  OutlinedInput,
  Box,
  Chip,
} from '@mui/material';

/**
 * Select múltiple personalizado con checkboxes, utilizando Material UI.
 */
const CampoSelectMultiple = ({
  label,
  name,
  value,
  onChange,
  options = [],
  fullWidth = false,
  required = false,
  error = false,
  helperText = '',
  disabled = false,
  size = 'small',
  ...props
}) => {
  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      error={error}
      size={size}
      disabled={disabled}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) =>
          selected
            .map((val) => {
              const found = options.find((opt) => opt.value === val);
              return found ? found.label : val;
            })
            .join(', ')
        }
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={value.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

CampoSelectMultiple.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
};

export default CampoSelectMultiple;
