import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { tokens } from '@SRC/theme';

export const NumeroInput = ({
  value,
  onChange,
  label = '',
  backgroundColor = null,
  width = 100,
  min = 1,
  ...rest
}) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const [helper, setHelper] = useState('');

  const handleChange = (evento) => {
    const nuevoValor = evento.target.value;

    if (nuevoValor === '') {
      setHelper('');
      onChange(evento);
      return;
    }

    // Solo números enteros positivos, sin ceros a la izquierda
    const esEnteroPositivo = /^[1-9]\d*$/.test(nuevoValor);

    if (esEnteroPositivo) {
      setHelper('');
      onChange(evento);
    } else {
      setHelper('Número inválido');
    }
  };

  return (
    <TextField
      label={label}
      type='number'
      value={value}
      onChange={handleChange}
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
          '&.Mui-error fieldset': {
            borderColor: '#f44336',
          },
        },
        '& .MuiInputLabel-root': {
          color: colores.texto[1],
        },
        '& .MuiInputLabel-root.Mui-error': {
          color: '#f44336',
        },
      }}
      inputProps={{
        min, // <-- ahora sí se usa min
        ...rest.inputProps,
      }}
      helperText={helper}
      error={!!helper}
      {...rest}
    />
  );
};
