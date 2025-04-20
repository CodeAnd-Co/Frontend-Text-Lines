import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@mui/material';
import Texto from '../atomos/Texto';
import CampoTexto from '../atomos/CampoTexto';
import CampoSelect from '../atomos/CampoSelect';

/** Molécula: Información del usuario en dos columnas, editable o no */
const InfoUsuario = ({
  modoEdicion = false,
  cliente,
  rol,
  datosContacto,
  datosAdicionales,
  onChange,
  opcionesRol = [],
}) => {
  return (
    <Box>
      {/* Cliente */}
      <Box mb={4}>
        <Texto gutterBottom>
          <strong>Cliente:</strong>{' '}
          <span style={{ color: '#1832A5', fontWeight: 500 }}>{cliente}</span>
        </Texto>
      </Box>

      {/* Rol */}
      <Box mb={4} sx={{ maxWidth: 220 }}>
        <CampoSelect
          label="Rol"
          name="rol"
          value={rol}
          onChange={onChange}
          options={opcionesRol}
          fullWidth
          required
          error={false}
          helperText=""
          disabled={!modoEdicion}
        />
      </Box>

      {/* Dos columnas */}
      <Grid container spacing={6}>
        {/* Columna izquierda: Información de contacto */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ maxWidth: 325 }}>

            {modoEdicion ? (
              <>
                <Texto variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2.5 }}>
                  INFORMACIÓN DE CONTACTO
                </Texto>
                <CampoTexto
                  label="Correo"
                  name="email"
                  value={datosContacto.email}
                  onChange={onChange}
                  type="email"
                  fullWidth
                  required
                  placeholder="correo@example.com"
                  helperText=""
                  error={false}
                  disabled={false}
                  sx={{ mb: 4 }}
                />
                <CampoTexto
                  label="Teléfono"
                  name="telefono"
                  value={datosContacto.telefono}
                  onChange={onChange}
                  type="tel"
                  fullWidth
                  required
                  placeholder="+52..."
                  helperText=""
                  error={false}
                  disabled={false}
                  sx={{ mb: 4 }}
                />
                <CampoTexto
                  label="Dirección"
                  name="direccion"
                  value={datosContacto.direccion}
                  onChange={onChange}
                  type="text"
                  fullWidth
                  required
                  placeholder="Calle, número, ciudad"
                  helperText=""
                  error={false}
                  disabled={false}
                  sx={{ mb: 4 }}
                />
              </>
            ) : (
              <>
                <Texto variant="subtitle1" sx={{ fontWeight: 'bold', mb: 4 }}>
                  INFORMACIÓN DE CONTACTO
                </Texto>
                <Texto gutterBottom sx={{ mb: 4 }}>
                  Email:{' '}
                  <a
                    href={`mailto:${datosContacto.email}`}
                    style={{ color: '#1832A5', textDecoration: 'none' }}
                  >
                    {datosContacto.email}
                  </a>
                </Texto>
                <Texto gutterBottom sx={{ mb: 4 }}>
                  Teléfono:{' '}
                  <a
                    href={`tel:${datosContacto.telefono}`}
                    style={{ color: '#1832A5', textDecoration: 'none' }}
                  >
                    {datosContacto.telefono}
                  </a>
                </Texto>
                <Texto gutterBottom sx={{ mb: 4 }}>
                  Dirección:{' '}
                  <span style={{ color: '#1832A5' }}>
                    {datosContacto.direccion}
                  </span>
                </Texto>
              </>
            )}
          </Box>
        </Grid>

        {/* Columna derecha: Información adicional */}
        <Grid item xs={12} sm={6}>
          <Texto variant="subtitle1" sx={{ fontWeight: 'bold', mb: 4 }}>
            INFORMACIÓN ADICIONAL
          </Texto>

          <Texto gutterBottom sx={{ mb: 4 }}>
            Nacimiento:{' '}
            <span style={{ color: '#1832A5' }}>
              {datosAdicionales.nacimiento}
            </span>
          </Texto>
          <Texto gutterBottom sx={{ mb: 4 }}>
            Género:{' '}
            <span style={{ color: '#1832A5' }}>
              {datosAdicionales.genero}
            </span>
          </Texto>
        </Grid>
      </Grid>
    </Box>
  );
};

InfoUsuario.propTypes = {
  modoEdicion: PropTypes.bool,
  cliente: PropTypes.string.isRequired,
  rol: PropTypes.string.isRequired,
  datosContacto: PropTypes.shape({
    email: PropTypes.string,
    telefono: PropTypes.string,
    direccion: PropTypes.string,
  }).isRequired,
  datosAdicionales: PropTypes.shape({
    nacimiento: PropTypes.string,
    genero: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
  opcionesRol: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default InfoUsuario;