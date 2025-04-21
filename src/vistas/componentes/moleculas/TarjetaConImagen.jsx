import React from 'react';
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
  anchoImagen = '100%',
  ajuste = 'cover',
  clickeableImagen = false,
  estiloImagen = {},
  colorFondo = 'white',
  elevacion = 2,
  bordeRedondeado = '8px',
  alClicImagen,
  alClicIcono,
}) => {
  return (
    <Contenedor
      elevation={elevacion}
      background={colorFondo}
      sx={{ borderRadius: bordeRedondeado }}
    >
      <div style={{ position: 'relative', borderRadius: bordeRedondeado }}>
        <Imagen
          src={src}
          alt={alt}
          width={anchoImagen}
          height={alturaImagen}
          fit={ajuste}
          borderRadius={`${bordeRedondeado} ${bordeRedondeado} 0 0`}
          onClick={alClicImagen}
          clickable={clickeableImagen}
          style={estiloImagen}
        />
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {titulo && (
            <Texto variant='h5' gutterBottom style={{ flexGrow: 1 }}>
              {titulo}
            </Texto>
          )}
          {nombreIcono && (
            <div style={{ marginLeft: '8px', cursor: iconoClickeable ? 'pointer' : 'default' }}>
              <Icono
                nombre={nombreIcono}
                variant={varianteIcono}
                size={tamanoIcono}
                color={colorIcono}
                clickable={iconoClickeable}
                tooltip={tooltipIcono}
                onClick={alClicIcono}
              />
            </div>
          )}
        </div>
        {descripcion && <Texto variant='body1'>{descripcion}</Texto>}
      </div>
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
