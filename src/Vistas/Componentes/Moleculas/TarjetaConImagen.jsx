import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Contenedor from '@Atomos/Contenedor';
import Imagen from '@Atomos/Imagen';
import Texto from '@Atomos/Texto';
import Icono from '@Atomos/Icono';

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
  colorFondo = 'transparent',
  elevacion = 2,
  bordeRedondeado = '10px',
  alClicImagen,
  alClicIcono,
  truncarTitulo = true,
  maxLineasTitulo = 2,
}) => (
  <Contenedor
    elevation={elevacion}
    background={colorFondo}
    sx={{
      borderRadius: bordeRedondeado,
      transition: 'transform 0.3s ease',
      transformOrigin: 'center center',
      '&:hover': {
        transform: 'scale(1.03)',
      },
    }}
  >
    <Box
      sx={{
        position: 'relative',
        borderRadius: bordeRedondeado,
        padding: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: alturaImagen,
        boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
      }}
    >
      <Imagen
        src={src}
        alt={alt}
        width={anchoImagen}
        height={alturaImagen}
        fit={ajuste}
        clickable={clickeableImagen}
        onClick={alClicImagen}
        style={estiloImagen}
      />
    </Box>

    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        {titulo && (
          <Texto
            variant='h6'
            gutterBottom
            sx={{
              flexGrow: 1,
              overflow: 'hidden',
              textOverflow: truncarTitulo ? 'ellipsis' : 'clip',
              display: '-webkit-box',
              WebkitLineClamp: maxLineasTitulo,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-word',
              lineHeight: '1.2em',
              maxHeight: `${1.2 * maxLineasTitulo}em`,
            }}
            tooltip={titulo} // Para mostrar el título completo al hacer hover
          >
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
            sx={{ flexShrink: 0, ml: 1 }}
          />
        )}
      </Box>
      {descripcion && <Texto variant='body1'>{descripcion}</Texto>}
    </Box>
  </Contenedor>
);

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
  truncarTitulo: PropTypes.bool,
  maxLineasTitulo: PropTypes.number,
};

TarjetaConImagen.defaultProps = {
  colorFondo: 'transparent',
  elevacion: 2,
  bordeRedondeado: '10px',
  alturaImagen: 'auto',
  anchoImagen: '200px',
  ajuste: 'cover',
  clickeableImagen: false,
  estiloImagen: {},
  truncarTitulo: true,
  maxLineasTitulo: 2,
};

export default TarjetaConImagen;
