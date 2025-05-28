import { useState, useCallback, useEffect } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, CircularProgress, useTheme } from '@mui/material';
import Icono from '@Atomos/Icono';
import ModalFlotante from '@Organismos/ModalFlotante';
import Alerta from '@Moleculas/Alerta';
import { tokens } from '@SRC/theme';
import InfoImportar from '@Organismos/InfoImportar';
import CajaDesplazable from '@Organismos/CajaDesplazable';
import ContenedorImportarProductos from './ContenedorImportarProductos';

const ModalImportarProductos = ({ abierto, onCerrar, onConfirm, cargando, errores, exito, recargar }) => {
  const [archivo, setFile] = useState(null);
  const [estado, setEstado] = useState('idle'); 
  const [infoJson, setInfoJson] = useState([]);
  const [alerta, setAlerta] = useState(null); 
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const [abririnfo, setAbrirInfo] = useState(false);
  const [mensajeErrores, setMensajeErrores] = useState('');

  // Manejo de errores en la importación
  useEffect(() => {
    if (errores && errores.length > 0) {
      const mensaje = errores
        .map(elemento => `Fila ${elemento.fila}: ${elemento.error}`)
        .join('\n');
      setMensajeErrores(mensaje);
    } else {
      setMensajeErrores('');
    }
  }, [errores]);

  // Manejo de éxito en la importación
  useEffect(() => {
    if (exito) {
      setAlerta({
        tipo: 'success',
        mensaje: 'Importación completada con éxito.',
        icono: true,
        cerrable: true,
        duracion: 2500,
        centradoInferior: true,
      });
      recargar();
      setInfoJson([]);
      setFile(null);
      setEstado('idle');
      onCerrar(false);
      setMensajeErrores('');
    }
  }, [exito, onCerrar, recargar]);

  // Manejo de cierre del modal de importar
  const handleCerrar = useCallback(() => {
    onCerrar(false);
    setInfoJson([]);
    setFile(null);
    setEstado('idle');
    setAlerta(null);
    setMensajeErrores('');
  }, [onCerrar]);

  // Manejo de archivo aceptados
  const handleFileAccepted = (archivo, data) => {
    setFile(archivo);
    setEstado('loading');
    setInfoJson(data);
    setEstado('complete');
  };

  // Manejo de eliminación de archivo
  const handleEliminar = () => {
    setFile(null);
    setEstado('idle');
    setInfoJson([]);
  };

  // Manejo de confirmación de importación
  const handleConfirmar = () => {
    if (!infoJson.length) {
      setAlerta({
        tipo: 'error',
        mensaje: 'Agrega un archivo CSV válido.',
        duracion: 2500,
        cerrable: true,
        centradoInferior: true,
      });
      return;
    }
    onConfirm(infoJson);
    setFile(null);
    setEstado('idle');
    setAlerta(null);
    setInfoJson([]);

  };

  return (
    <>
    <ModalFlotante
      open={abierto}
      titulo="Importar Productos con CSV"
      onClose={handleCerrar}
      botones={[
    {
      label: 'Cancelar',
      variant: 'outlined',
      onClick: handleCerrar,
      disabled: cargando,    
      outlineColor: colores.altertex[1],       
    },
    {
      label: 'Guardar',
      variant: 'contained',
      onClick: handleConfirmar,
      disabled: cargando,   
      backgroundColor: colores.altertex[1],        
    },
  ]}
    >

      <ContenedorImportarProductos onFileAccepted={handleFileAccepted} cargando={cargando} />

      {archivo && (
        <List disablePadding>
          <ListItem
            secondaryAction={

              <Icono nombre="Delete" color='grey' clickable={true} onClick={handleEliminar}/>
            }
          >
            <ListItemIcon>
              {estado === 'Cargando...' ? (
                <CircularProgress size={24} />
              ) : (
                <Icono nombre="CheckCircle" color='success'/>
              )}
            </ListItemIcon>
            <ListItemText
              primary={archivo.name}
                secondary={`${(archivo.size / 1024).toFixed(1)} KB · ${
                  estado === 'complete' ? 'Cargado' : 'Cargando…'
              }`}
            />
          </ListItem>
        </List>
      )}

      <Box mt={2} display="inline-flex" alignItems="center" gap={1}>
        <a href="/plantilla_importar_productos.csv" download="plantilla_importar_productos.csv">
          Descargar CSV de ejemplo 
        </a>
        <InfoImportar 
          open={abririnfo}
          onClose={() => setAbrirInfo(false)}> 
              Under Construction
           </InfoImportar>
            </Box><br/>
                {mensajeErrores && (
                <Box mb={2} width="100%">
                  <CajaDesplazable maxHeight={150}>
                    <Box sx={{ whiteSpace: 'pre-line' }}>
                      {mensajeErrores}
                    </Box>
                  </CajaDesplazable>
                </Box>
              )}
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

export default ModalImportarProductos;
