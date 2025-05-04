import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../../theme';
import Icono from '../atomos/Icono';

const TemaIcono = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Icono
      nombre={isDarkMode ? 'LightMode' : 'DarkMode'}
      variant='outlined'
      size='medium'
      color={isDarkMode ? 'warning' : '#fff'}
      clickable={true}
      tooltip={isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
      onClick={colorMode.toggleColorMode}
    />
  );
};

export default TemaIcono;
