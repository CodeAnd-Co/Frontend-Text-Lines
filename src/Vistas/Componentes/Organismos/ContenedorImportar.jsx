import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import Icono from '@Atomos/Icono';
import Papa from 'papaparse';

const ContenedorImportar = ({ onFileAccepted }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
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
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #ccc',
        borderRadius: 2,
        padding: 4,
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
        mb: 2,
      }}
    >
      <input {...getInputProps()} />
      <Icono nombre="UploadFile" size="large" color="primary" clickable={false} />
      <Typography variant="body1">
        {isDragActive
          ? 'Suelta el archivo aquí…'
          : 'Arrastra tu CSV o haz clic para seleccionarlo'}
      </Typography>
    </Box>
  );
};

export default ContenedorImportar;
