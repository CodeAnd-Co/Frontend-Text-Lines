import { useState, useCallback } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, CircularProgress, } from '@mui/material';
import Icono from '@Atomos/Icono';
import ModalFlotante from '@Organismos/ModalFlotante';
import ContenedorImportar from '@Organismos/ContenedorImportar';

const ModalImportarEmpleados = ({ abierto, onCerrar, onConfirm }) => {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState('idle'); 

  const handleCerrar = useCallback(() => {
    onCerrar(false);
    setFile(null);
    setRows([]);
    setStatus('idle');
  }, [onCerrar]);

  const handleFileAccepted = (archivo, data) => {
    setFile(archivo);
    setStatus('Cargando...');
    setRows(data);
    setStatus('Listo');
  };

  const handleEliminar = () => {
    setFile(null);
    setRows([]);
    setStatus('idle');
  };

  const handleConfirmar = () => {
    if (status !== 'Listo') return;
    onConfirm(rows);
  };

  return (
    <ModalFlotante
      open={abierto}
      onClose={handleCerrar}
      onConfirm={handleConfirmar}
      titulo="Importar Empleados con CSV"
    >

      <ContenedorImportar onFileAccepted={handleFileAccepted} />

      {file && (
        <List disablePadding>
          <ListItem
            secondaryAction={

              <Icono nombre="Delete" color='grey' clickable={true} onClick={handleEliminar}/>
            }
          >
            <ListItemIcon>
              {status === 'Cargando...' ? (
                <CircularProgress size={24} />
              ) : (
                <Icono nombre="CheckCircle" color='success'/>
              )}
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              secondary={`${(file.size / 1024).toFixed(1)} KB · ${
                status === 'Cargando...' ? 'Cargando…' : 'Completo'
              }`}
            />
          </ListItem>
        </List>
      )}

      <Box mt={2}>
        <a href="/plantilla_empleados.csv" download="plantilla_empleados.csv">
          Descargar CSV de ejemplo
        </a>
      </Box>
    </ModalFlotante>
  );
};

export default ModalImportarEmpleados;
