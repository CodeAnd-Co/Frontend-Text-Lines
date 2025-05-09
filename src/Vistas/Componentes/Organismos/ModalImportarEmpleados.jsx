import { useState, useCallback, useEffect } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, CircularProgress, } from '@mui/material';
import Icono from '@Atomos/Icono';
import ModalFlotante from '@Organismos/ModalFlotante';
import ContenedorImportar from '@Organismos/ContenedorImportar';
import Alerta from '@Moleculas/Alerta';
import Cargador from '@Atomos/Cargador';

const ModalImportarEmpleados = ({ abierto, onCerrar, onConfirm, cargando, errores, exito, recargar }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); 
  const [empleadosJson, setEmpleadosJson] = useState([]);
  const [alerta, setAlerta] = useState(null); 
  const [importacionExitosa, setImportacionExitosa] = useState(false);

  // Manejo de errores en la importación
  useEffect(() => {
    if (errores && errores.length > 0) {
      const mensaje = errores
        .map(elemento => `Fila ${elemento.fila}: ${elemento.error}`)
        .join('\n');
      setAlerta({
        tipo: 'error',
        mensaje,
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    }
  }, [errores]);

  // Manejo de éxito en la importación
  useEffect(() => {
    if (exito && !importacionExitosa) {
      setAlerta({
        tipo: 'success',
        mensaje: 'Importación completada con éxito.',
        icono: true,
        cerrable: true,
        duracion: 2500,
        centradoInferior: true,
      });
      recargar();
      setImportacionExitosa(true);
      setTimeout(() => onCerrar(false), 2500);
    }
  }, [exito, onCerrar, recargar, importacionExitosa]);

  // Manejo de cierre del modal de importar
  const handleCerrar = useCallback(() => {
    onCerrar(false);
    setEmpleadosJson([]);
    setFile(null);
    setStatus('idle');
    setAlerta(null);
    setImportacionExitosa(false);
  }, [onCerrar]);

  // Manejo de archivo aceptados
  const handleFileAccepted = (archivo, data) => {
    setFile(archivo);
    setStatus('Uploaded');
    setEmpleadosJson(data);
  };

  // Manejo de eliminación de archivo
  const handleEliminar = () => {
    setFile(null);
    setStatus('idle');
    setEmpleadosJson([]);
  };

  // Manejo de confirmación de importación
  const handleConfirmar = () => {
    if (!empleadosJson.length) {
      setAlerta({
        tipo: 'error',
        mensaje: 'Primero agrega un archivo CSV.',
        duracion: 2500,
        cerrable: true,
        centradoInferior: true,
      });
      return;
    }
    onConfirm(empleadosJson);
    setFile(null);
    setStatus('idle');
    setAlerta(null);
    setEmpleadosJson([]);

  };

  return (
    <>
    <ModalFlotante
      open={abierto}
      onClose={handleCerrar}
      onConfirm={handleConfirmar}
      titulo="Importar Empleados con CSV"
    >
        {cargando && (
          <Box display="flex" justifyContent="center" my={2}>
            <Cargador size={48} thickness={5} color="primary" />
          </Box>
        )}

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
                  status === 'uploaded' ? 'Completo' : 'Cargando…'
              }`}
            />
          </ListItem>
        </List>
      )}

      <Box mt={2}>
        <a href="/plantilla_importar_empleados.csv" download="plantilla_importar_empleados.csv">
          Descargar CSV de ejemplo
        </a>
      </Box>
    </ModalFlotante>

    {alerta && (
            <Alerta
              tipo={alerta.tipo}
              mensaje={alerta.mensaje}
              icono={alerta.icono}
              cerrable={alerta.cerrable}
              duracion={alerta.duracion}
              centradoInferior={alerta.centradoInferior}
              onClose={() => setAlerta(null)}
            />
          )}
      
    </>
  );
};

export default ModalImportarEmpleados;
