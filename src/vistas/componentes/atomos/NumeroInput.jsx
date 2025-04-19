import React from 'react';
import TextField from '@mui/material/TextField';

export const NumeroInput = ({
  value,
  onChange,
  label = '',
  backgroundColor = null,
  width = 100,
  min = 0, // Se puede ajustar desde Storybook también si quieres
  ...rest
}) => {
  return (
    <TextField
      label={label}
      type='number'
      value={value}
      onChange={onChange}
      InputLabelProps={{ shrink: true }}
      variant='outlined'
      sx={{
        width,
        backgroundColor: backgroundColor || 'transparent',
      }}
      inputProps={{
        min,
      }}
      {...rest}
    />
  );
};
