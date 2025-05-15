import { useDropzone } from 'react-dropzone';
import { Box, Typography, CircularProgress, useTheme } from '@mui/material';
import Icono from '@Atomos/Icono';
import { tokens } from '@SRC/theme';

const ContenedorImportarImagen = ({ onFileAccepted, cargando = false }) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/png': ['.png'], 'image/jpg':['.jpg'], 'image/jpeg':['.jpeg'] },
    multiple: false,
    maxSize: 5500000, // 3 MB
    disabled: cargando,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles.length) return;
      const archivo = acceptedFiles[0];

      Papa.parse(archivo, {
        header: true,
        skipEmptyLines: true,
        complete: (resultado) => {
          onFileAccepted(archivo, resultado.data);
        },
        error: (error) => {
          console.error('Error al parsear la imagen:', error.message);
        }
      });
    },

  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        position: 'relative',
        border: '2px dashed #ccc',
        borderRadius: 2,
        padding: 4,
        textAlign: 'center',
        cursor: cargando ? 'not-allowed' : 'pointer',
        backgroundColor: isDragActive && !cargando ? '#f0f0f0' : 'transparent',
        opacity: cargando ? 0.6 : 1,
        pointerEvents: cargando ? 'none' : 'auto',
        mb: 2,
      }}
    >
      {/* input también deshabilitado */}
      <input {...getInputProps()} disabled={cargando} />

      {/* Icono o spinner */}
      {cargando ? (
        <CircularProgress />
      ) : (
        <Icono nombre="UploadFile" size="large" color={colores.altertex[1]} clickable={false} />
      )}

      <Typography variant="body1" sx={{ mt: 1 }}>
        {cargando
          ? 'Cargando…'
          : isDragActive
            ? 'Suelta el archivo aquí…'
            : 'Arrastra tu imagen o haz clic para seleccionarla'}
      </Typography>
    </Box>
  );
};

export default ContenedorImportarImagen;
