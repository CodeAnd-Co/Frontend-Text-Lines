import React from 'react';
import PropTypes from 'prop-types';

const Imagen = ({
  src,
  alt,
  width = 'auto',
  height = 'auto',
  fit = 'cover',
  borderRadius = '0px',
  onClick,
  clickable = false,
  style = {},
  ...props
}) => {
  const cursorStyle = clickable ? 'pointer' : 'default';

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{
        objectFit: fit,
        borderRadius,
        cursor: cursorStyle,
        ...style,
      }}
      onClick={clickable ? onClick : null}
      {...props}
    />
  );
};

Imagen.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  fit: PropTypes.oneOf(['contain', 'cover', 'fill', 'none', 'scale-down']),
  borderRadius: PropTypes.string,
  onClick: PropTypes.func,
  clickable: PropTypes.bool,
  style: PropTypes.object,
};

export default Imagen;
