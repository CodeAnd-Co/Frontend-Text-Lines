import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, useTheme, CircularProgress } from '@mui/material';
import Texto from '@Atomos/Texto';
import Icono from '@Atomos/Icono';
import CampoTexto from '@Atomos/CampoTexto';
import { tokens } from '@SRC/theme';

// Importa tu componente Boton aquí
import Boton from '@Atomos/Boton';

const InfoCliente = ({
  modoEdicion = false,
  idCliente,
  nombreLegal,
  nombreVisible,
  empleados,
  usuariosAsignados,
  urlImagen,
  onChange,
  onImageChange,
  imagenSubiendo = false,
}) => {
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);
  const inputArchivoRef = useRef(null);
  const LONGITUD_MAXIMA = 100;

  const handleSeleccionArchivo = () => {
    inputArchivoRef.current.click();
  };
  const handleCambioArchivo = (evento) => {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    // Verificar que sea un archivo JPG o JPEG
    const tipoJpgValido = ['image/jpeg', 'image/jpg'];
    if (!tipoJpgValido.includes(archivo.type.toLowerCase())) {
      if (onImageChange) {
        onImageChange({
          error: 'Solo se permiten imágenes en formato JPG o JPEG.',
        });
      }
      evento.target.value = ''; // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
      return;
    }

    // Verificar el tamaño del archivo
    const tamanoMaximo = 4 * 1024 * 1024;
    if (archivo.size > tamanoMaximo) {
      if (onImageChange) {
        onImageChange({
          error: 'La imagen es demasiado grande. El tamaño máximo permitido es 5MB.',
        });
      }
      evento.target.value = ''; // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
      return;
    }

    if (onImageChange) {
      const preview = URL.createObjectURL(archivo);

      onImageChange({
        file: archivo,
        preview,
        name: archivo.name,
        type: archivo.type,
        size: archivo.size,
      });
    }
  };
  return (
    <Box>
      <Grid container spacing={6} mb={4}>
        {/* Información principal */}
        <Grid>
          <Texto gutterBottom mb={2.5}>
            <strong>INFORMACIÓN</strong>{' '}
          </Texto>

          {modoEdicion ? (
            <Box sx={{ maxWidth: 325 }}>
              <CampoTexto
                label='ID de Cliente'
                name='idCliente'
                value={idCliente}
                onChange={onChange}
                type='text'
                fullWidth
                required
                disabled={true}
                sx={{ mb: 4 }}
              />
              <CampoTexto
                label='Nombre Legal'
                name='nombreLegal'
                value={nombreLegal || ''}
                onChange={onChange}
                type='text'
                fullWidth
                required
                inputProps={{ maxLength: LONGITUD_MAXIMA }}
                helperText={`${(nombreLegal || '').length}/${LONGITUD_MAXIMA} caracteres`}
                sx={{ mb: 4 }}
              />
              <CampoTexto
                label='Nombre Visible'
                name='nombreVisible'
                value={nombreVisible || ''}
                onChange={onChange}
                type='text'
                fullWidth
                required
                inputProps={{ maxLength: LONGITUD_MAXIMA }}
                helperText={`${(nombreVisible || '').length}/${LONGITUD_MAXIMA} caracteres`}
                sx={{ mb: 4 }}
              />
            </Box>
          ) : (
            <>
              <Texto gutterBottom mb={4}>
                ID de Cliente:{' '}
                <a style={{ color: colores.texto[4], fontWeight: 500, textDecoration: 'none' }}>
                  {idCliente}
                </a>
              </Texto>
              <Texto gutterBottom mb={4}>
                Nombre Legal:{' '}
                <a style={{ color: colores.texto[4], textDecoration: 'none' }}>{nombreLegal}</a>
              </Texto>
              <Texto gutterBottom>
                Nombre visible: <span style={{ color: colores.texto[4] }}>{nombreVisible}</span>
              </Texto>
            </>
          )}
        </Grid>

        {/* Información adicional (siempre no editable) */}
        <Grid>
          <Texto gutterBottom mb={2.5}>
            <strong>INFORMACIÓN ADICIONAL</strong>{' '}
          </Texto>

          <Texto gutterBottom mb={4}>
            Usuarios asignados:{' '}
            <a style={{ color: colores.texto[4], textDecoration: 'none' }}>{usuariosAsignados}</a>
          </Texto>
          <Texto gutterBottom mb={4}>
            Empleados:{' '}
            <a style={{ color: colores.texto[4], textDecoration: 'none' }}>{empleados}</a>
          </Texto>
        </Grid>
      </Grid>

      {/* Previsualización imagen */}
      <Texto variant='subtitle1' sx={{ fontWeight: 'bold', mb: 2 }}>
        PREVISUALIZAR IMAGEN
      </Texto>
      <Box
        sx={{
          maxWidth: '240px',
          height: '120px',
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
          position: 'relative',
        }}
      >
        <img
          src={urlImagen}
          alt='Previsualización'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: urlImagen ? 'block' : 'none',
          }}
        />
        {imagenSubiendo && (
          <CircularProgress
            size={40}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          />
        )}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: !urlImagen ? colores.acciones[3] : 'transparent',
          }}
        />
        {!urlImagen && (
          <Icono
            nombre='ImageOutlined'
            size='large'
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
            }}
          />
        )}
      </Box>

      {modoEdicion && (
        <>
          <input
            type='file'
            ref={inputArchivoRef}
            onChange={handleCambioArchivo}
            accept='image/jpeg,image/jpg'
            style={{ display: 'none' }}
          />
          <Boton
            variant='outlined'
            size='small'
            onClick={handleSeleccionArchivo}
            startIcon={<Icono nombre='Upload' />}
            disabled={imagenSubiendo}
            sx={{ mb: 4 }}
            label={imagenSubiendo ? 'Subiendo...' : 'Subir imagen JPG'}
          />
          <Texto
            variant='caption'
            display='block'
            sx={{ mb: 4, color: tema.palette.text.secondary }}
          >
            Solo se permiten imágenes en formato JPG/JPEG, máximo 5MB.
          </Texto>
        </>
      )}

      {/* {imagenError && (
        <Alerta tipo='error' mensaje={imagenError} cerrable sx={{ mb: 2 }} duracion={2500}></Alerta>
      )} */}
    </Box>
  );
};

InfoCliente.propTypes = {
  modoEdicion: PropTypes.bool,
  idCliente: PropTypes.string.isRequired,
  nombreLegal: PropTypes.string.isRequired,
  nombreVisible: PropTypes.string.isRequired,
  empleados: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  usuariosAsignados: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  urlImagen: PropTypes.string,
  onChange: PropTypes.func,
  onImageChange: PropTypes.func,
  imagenSubiendo: PropTypes.bool,
  imagenError: PropTypes.string,
};

export default InfoCliente;
