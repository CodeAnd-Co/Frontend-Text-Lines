import React from 'react';
import PropTypes from 'prop-types';
import Imagen from '../Atomos/Imagen';
import Icono from '../Atomos/Icono';
import Texto from '../Atomos/Texto';
import Contenedor from '../Atomos/Contenedor';

const TarjetaConImagen = ({
  src,
  alt,
  title,
  description,
  iconName,
  iconVariant,
  iconSize,
  iconColor,
  iconClickable,
  imageHeight = 'auto',
  imageWidth = '100%',
  background = 'white',
  elevation = 2,
  borderRadius = '8px',
  onClickImagen,
  onClickIcono,
}) => {
  return (
    <Contenedor elevation={elevation} background={background} sx={{ borderRadius: borderRadius }}>
      <div style={{ position: 'relative', borderRadius: borderRadius }}>
        <Imagen
          src={src}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          fit='cover'
          borderRadius={`${borderRadius} ${borderRadius} 0 0`}
          onClick={onClickImagen}
        />
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {title && (
            <Texto variant='h5' gutterBottom style={{ flexGrow: 1 }}>
              {title}
            </Texto>
          )}
          {iconName && (
            <div style={{ marginLeft: '8px', cursor: iconClickable ? 'pointer' : 'default' }}>
              <Icono
                nombre={iconName}
                variant={iconVariant}
                size={iconSize}
                color={iconColor}
                clickable={iconClickable}
                onClick={onClickIcono}
              />
            </div>
          )}
        </div>
        {description && <Texto variant='body1'>{description}</Texto>}
      </div>
    </Contenedor>
  );
};

TarjetaConImagen.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  iconName: PropTypes.string,
  iconVariant: PropTypes.oneOf(['filled', 'outlined', 'rounded', 'sharp', 'twoTone']),
  iconSize: PropTypes.oneOf(['small', 'medium', 'large']),
  iconColor: PropTypes.string,
  iconClickable: PropTypes.bool,
  imageHeight: PropTypes.string,
  imageWidth: PropTypes.string,
  background: PropTypes.string,
  elevation: PropTypes.number,
  borderRadius: PropTypes.string,
  onClickImagen: PropTypes.func,
  onClickIcono: PropTypes.func,
};

export default TarjetaConImagen;
