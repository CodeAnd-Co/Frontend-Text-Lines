// DropzoneContainer.js
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import Icono from '../Atomos/Icono';

const ContenedorImportar = ({ onFileAccepted }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]); // solo el primer archivo
      }
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
        marginBottom: 2,
      }}
    >
      <input {...getInputProps()} />
      <Icono
        nombre="UploadFile"
        size="large"
        color="primary"
        clickable={false}
/>
      <Typography variant="body1">
        {isDragActive ? 'Suelta el archivo aquí...' : 'Agregar archivo CSV'}
      </Typography>
    </Box>
  );
};

export default ContenedorImportar;
