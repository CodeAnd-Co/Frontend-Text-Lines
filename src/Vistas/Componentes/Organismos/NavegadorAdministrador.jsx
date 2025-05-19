import { Box, useTheme } from '@mui/material';
import Imagen from '@Atomos/Imagen';
import Icono from '@Atomos/Icono';
import Texto from '@Atomos/Texto';
import GrupoBotones from '@Moleculas/GrupoBotones';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { RUTAS } from '@Utilidades/Constantes/rutas';
import { useAuth } from '@Hooks/AuthProvider';

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
  estiloImagen = {},
  alClicIcono,
  informacionBotones = [],
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const redirigirAInicio = () => {
      navigate(RUTAS.SISTEMA_ADMINISTRATIVO.BASE, { replace: true });
    };

  return (
    <Box
      component='nav'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      padding='0.5rem 1rem'
      boxShadow={2}
      bgcolor={theme.palette.background.paper}
    >
      {/* Centro: Imagen y título */}
      <Box display='flex' alignItems='center' gap={2}>
        <Imagen
          src={src}
          alt={alt}
          height={alturaImagen}
          width={anchoImagen}
          fit={ajuste}
          clickable={true}
          onClick={redirigirAInicio}
          style={{ height: '40px', ...estiloImagen }}
        />
        {titulo && (
          <Texto variant='h6' color='text.secondary'>
            {titulo}
          </Texto>
        )}
      </Box>

      {/* Derecha: Icono y botones */}
      <Box display='flex' alignItems='center' gap={2}>
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
