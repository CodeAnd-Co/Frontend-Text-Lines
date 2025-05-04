import { Box, useTheme } from '@mui/material';
import Imagen from '../atomos/Imagen';
import Icono from '../atomos/Icono';
import Texto from '../atomos/Texto';
import GrupoBotones from '../Moleculas/GrupoBotones';
import PropTypes from 'prop-types';

const NavegadorAdministrador = ({
  src,
  alt,
  titulo,
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
  alClicImagen,
  alClicIcono,
  informacionBotones = [],
}) => {
  const theme = useTheme();

  return (
    <Box
      component='nav'
      display='flex'
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems='center'
      justifyContent='space-between'
      padding='0.5rem 1rem'
      boxShadow={2}
      bgcolor={theme.palette.background.paper}
      gap={{ xs: 1, sm: 0 }}
    >
      <Box display='flex' alignItems='center' gap={2} width={{ xs: '100%', sm: 'auto' }}>
        <Imagen
          src={src}
          alt={alt}
          height={alturaImagen}
          width={anchoImagen}
          fit={ajuste}
          clickable={clickeableImagen}
          onClick={alClicImagen}
          style={{ height: '40px', ...estiloImagen }}
        />
        {titulo && (
          <Texto variant='h6' color='text.secondary'>
            {titulo}
          </Texto>
        )}
      </Box>

      <Box flexGrow={1} minWidth={{ xs: '100%', sm: 'auto' }} />

      <Box
        display='flex'
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems='center'
        gap={2}
        mt={{ xs: 1, sm: 0 }}
      >
        <Icono
          nombre={nombreIcono}
          variant={varianteIcono}
          size={tamanoIcono}
          color={colorIcono || theme.palette.text.primary}
          clickable={iconoClickeable}
          tooltip={tooltipIcono}
          onClick={alClicIcono}
        />
        <GrupoBotones buttons={informacionBotones} />
      </Box>
    </Box>
  );
};

NavegadorAdministrador.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  titulo: PropTypes.string,
  nombreIcono: PropTypes.string.isRequired,
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
  alClicImagen: PropTypes.func,
  alClicIcono: PropTypes.func,
  informacionBotones: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      variant: PropTypes.oneOf(['text', 'contained', 'outlined']),
      selected: PropTypes.bool,
      fullWidth: PropTypes.bool,
      color: PropTypes.string,
      size: PropTypes.oneOf(['small', 'medium', 'large']),
      backgroundColor: PropTypes.string,
      outlineColor: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
};

export default NavegadorAdministrador;
