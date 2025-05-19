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
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);
  const [ayuda, setAyuda] = useState('');

  const manejarCambio = (evento) => {
    const nuevoValor = evento.target.value;

    if (nuevoValor === '') {
      setAyuda('');
      onChange(evento);
      return;
    }

    // Solo números enteros positivos, sin ceros a la izquierda
    const esEnteroPositivo = /^[1-9]\d*$/.test(nuevoValor);

    if (esEnteroPositivo) {
      setAyuda('');
      onChange(evento);
    } else {
      setAyuda('Número inválido');
    }
  };

  return (
    <TextField
      label={label}
      type='number'
      value={value}
      onChange={manejarCambio}
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
        min,
        ...rest.inputProps,
      }}
      helperText={ayuda}
      error={!!ayuda}
      {...rest}
    />
  );
};
