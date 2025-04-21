import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Imagen from '../Atomos/Imagen';
import Icono from '../Atomos/Icono';
import Texto from '../Atomos/Texto';
import Contenedor from '../Atomos/Contenedor';

const TarjetaConImagen = ({
  src,
  alt,
  titulo,
  descripcion,
  nombreIcono,
  varianteIcono,
  tamanoIcono,
  colorIcono,
  iconoClickeable,
  tooltipIcono,
  alturaImagen = 'auto',
  anchoImagen = '200px',
  ajuste = 'cover',
  clickeableImagen = false,
  estiloImagen = {},
  colorFondo = 'white',
  elevacion = 2,
  bordeRedondeado = '10px',
  alClicImagen,
  alClicIcono,
}) => {
  return (
    <Contenedor
      elevation={elevacion}
      background={colorFondo}
      sx={{ borderRadius: bordeRedondeado }}
    >
      <Box
        position='relative'
        borderRadius={bordeRedondeado}
        padding='8px'
        display='flex'
        justifyContent='center'
        alignItems='center'
        height={alturaImagen}
        sx={{
          background: '#fff',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <Imagen
          src={src}
          alt={alt}
          width={anchoImagen}
          height={alturaImagen}
          fit={ajuste}
          onClick={alClicImagen}
          clickable={clickeableImagen}
          style={estiloImagen}
        />
      </Box>

      <Box padding={2}>
        <Box display='flex' alignItems='center'>
          {titulo && (
            <Texto variant='h6' gutterBottom sx={{ flexGrow: 1 }}>
              {titulo}
            </Texto>
          )}
          {nombreIcono && (
            <Icono
              nombre={nombreIcono}
              variant={varianteIcono}
              size={tamanoIcono}
              color={colorIcono}
              clickable={iconoClickeable}
              tooltip={tooltipIcono}
              onClick={alClicIcono}
            />
          )}
        </Box>
        {descripcion && <Texto variant='body1'>{descripcion}</Texto>}
      </Box>
    </Contenedor>
  );
};

TarjetaConImagen.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  titulo: PropTypes.string,
  descripcion: PropTypes.string,
  nombreIcono: PropTypes.string,
  varianteIcono: PropTypes.oneOf(['filled', 'outlined', 'rounded', 'sharp', 'twoTone']),
  tamanoIcono: PropTypes.oneOf(['small', 'medium', 'large']),
  colorIcono: PropTypes.string,
  iconoClickeable: PropTypes.bool,
  tooltipIcono: PropTypes.string,
  alturaImagen: PropTypes.string,
  anchoImagen: PropTypes.string,
  ajuste: PropTypes.oneOf(['contain', 'cover', 'fill', 'none', 'scale-down']),
  clickeableImagen: PropTypes.bool,
  estiloImagen: PropTypes.object,
  colorFondo: PropTypes.string,
  elevacion: PropTypes.number,
  bordeRedondeado: PropTypes.string,
  alClicImagen: PropTypes.func,
  alClicIcono: PropTypes.func,
};

export default TarjetaConImagen;
