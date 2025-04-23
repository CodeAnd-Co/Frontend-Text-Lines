import React from 'react';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme';

export const NumeroInput = ({
  value,
  onChange,
  label = '',
  backgroundColor = null,
  width = 100,
  min = 0,
  ...rest
}) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

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
        backgroundColor: backgroundColor
          ? colores[backgroundColor]
            ? colores[backgroundColor][500] || colores[backgroundColor][0]
            : backgroundColor
          : 'transparent',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: colores.primario[1],
          },
          '&:hover fieldset': {
            borderColor: colores.primario[2],
          },
          '&.Mui-focused fieldset': {
            borderColor: colores.primario[3],
          },
        },
        '& .MuiInputLabel-root': {
          color: colores.texto[1],
        },
      }}
      inputProps={{
        min,
      }}
      {...rest}
    />
  );
};
