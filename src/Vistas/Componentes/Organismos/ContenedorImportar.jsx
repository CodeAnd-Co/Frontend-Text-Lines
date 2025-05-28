import { useDropzone } from 'react-dropzone';
import { Box, Typography, CircularProgress, useTheme } from '@mui/material';
import Icono from '@Atomos/Icono';
import Papa from 'papaparse';
import { tokens } from '@SRC/theme';

const ContenedorImportar = ({ onFileAccepted, onError, cargando = false }) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
    maxSize: 5242880, // 5 MB
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
          console.error('Error al parsear CSV:', error.message);
        }
      });
    },
    onDropRejected: (fileRejections) => {
  const error = fileRejections[0]?.errors[0];
  const file = fileRejections[0]?.file;

  if (error?.code === 'file-too-large') {
      const sizeMB = (file?.size || 0) / (1024 * 1024);
      const mensaje = `El archivo "${file.name}" es muy grande (${sizeMB.toFixed(2)} MB).`;
      onError?.(mensaje);
    } else if (error?.code === 'file-invalid-type') {
      onError?.(`El archivo debe ser de tipo .csv`);
    } else {
      onError?.(`${error?.message || 'Archivo no aceptado.'}`);
    }
  }

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
            : 'Arrastra tu CSV o haz clic para seleccionarlo (5 MB máximo)'}
      </Typography>
    </Box>
  );
};

export default ContenedorImportar;
