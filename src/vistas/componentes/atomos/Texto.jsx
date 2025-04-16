import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const Texto = ({
  variant = 'body1',
  color = 'text.primary',
  align = 'inherit',
  gutterBottom = false,
  noWrap = false,
  children,
  ...props
}) => {
  return (
    <Typography
      variant={variant}
      color={color}
      align={align}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      {...props}
    >
      {children}
    </Typography>
  );
};

Texto.propTypes = {
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'overline',
    'button',
    'inherit',
  ]),
  color: PropTypes.string,
  align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
  gutterBottom: PropTypes.bool,
  noWrap: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Texto;
