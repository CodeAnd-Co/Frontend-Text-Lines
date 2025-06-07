import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

const TarjetaBasica = ({
  tituloSecundario,
  tituloPrincipal,
  subtitulo,
  descripcion,
  textoBoton,
  alClicBoton,
  sx = {},
  children,
}) => {
  return (
    <Card sx={{ minWidth: 275, ...sx }}>
      <CardContent>
        {tituloSecundario && (
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }} gutterBottom>
            {tituloSecundario}
          </Typography>
        )}
        {tituloPrincipal && (
          <Typography variant='h5' component='div'>
            {tituloPrincipal}
          </Typography>
        )}
        {subtitulo && (
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{subtitulo}</Typography>
        )}
        {descripcion && <Typography variant='body2'>{descripcion}</Typography>}
        {children}
      </CardContent>
      {textoBoton && (
        <CardActions>
          <Button size='small' onClick={alClicBoton}>
            {textoBoton}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

TarjetaBasica.propTypes = {
  tituloSecundario: PropTypes.string,
  tituloPrincipal: PropTypes.string,
  subtitulo: PropTypes.string,
  descripcion: PropTypes.string,
  textoBoton: PropTypes.string,
  alClicBoton: PropTypes.func,
  sx: PropTypes.object,
  children: PropTypes.node,
};

export default TarjetaBasica;
