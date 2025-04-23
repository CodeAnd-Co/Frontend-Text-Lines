import React from 'react';

const iconoMenuEstilo = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const IconoMenu = ({ icono }) => {
  return <span style={iconoMenuEstilo}>{icono}</span>;
};

export default IconoMenu;
