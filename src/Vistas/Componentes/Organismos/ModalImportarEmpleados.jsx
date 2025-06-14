import { useState, useCallback, useEffect } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, CircularProgress, useTheme } from '@mui/material';
import Icono from '@Atomos/Icono';
import ModalFlotante from '@Organismos/ModalFlotante';
import ContenedorImportar from '@Organismos/ContenedorImportar';
import Alerta from '@Moleculas/Alerta';
import { tokens } from '@SRC/theme';
import InfoImportar from '@Organismos/InfoImportar';
import CajaDesplazable from '@Organismos/CajaDesplazable';
import Boton from '@Atomos/Boton';

const ModalImportarEmpleados = ({ abierto, onCerrar, onConfirm, cargando, errores, exito, recargar }) => {
  const [archivo, setFile] = useState(null);
  const [estado, setEstado] = useState('idle'); 
  const [empleadosJson, setEmpleadosJson] = useState([]);
  const [alerta, setAlerta] = useState(null); 
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const [abririnfo, setAbrirInfo] = useState(false);
  const [mensajeErrores, setMensajeErrores] = useState('');
  const [descargarCSV, setDescargarCSV] = useState(false);

  // Manejo de errores en la importación
  useEffect(() => {
    if (errores && errores.length > 0) {
      const mensaje = errores
        .map(elemento => `${elemento.fila}: ${elemento.error}`)
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
        duracion: 3000,
        centradoInferior: true,
      });
      recargar();
      setEmpleadosJson([]);
      setFile(null);
      setEstado('idle');
      onCerrar(false);
      setMensajeErrores('');
    }
  }, [exito, onCerrar, recargar]);

  const handleDescargarPlantilla = useCallback(() => {
    setDescargarCSV(true);
    const link = document.createElement('a');
    link.href = '/plantilla_importar_empleados.csv';
    link.download = 'plantilla_importar_empleados.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      setDescargarCSV(false);
    }, 2000);
  }, []);

  // Manejo de cierre del modal de importar
  const handleCerrar = useCallback(() => {
    onCerrar(false);
    setEmpleadosJson([]);
    setFile(null);
    setEstado('idle');
    setAlerta(null);
    setMensajeErrores('');
  }, [onCerrar]);

  // Manejo de archivo aceptados
  const handleFileAccepted = (archivo, data) => {
    setFile(archivo);
    setEstado('loading');
    setEmpleadosJson(data);
    setEstado('complete');
  };

  // Manejo de eliminación de archivo
  const handleEliminar = () => {
    setFile(null);
    setEstado('idle');
    setEmpleadosJson([]);
  };

  // Manejo de confirmación de importación
  const handleConfirmar = () => {
    if (!empleadosJson.length) {
      setAlerta({
        tipo: 'error',
        mensaje: 'Agrega un archivo CSV válido.',
        duracion: 3000,
        cerrable: true,
        centradoInferior: true,
      });
      return;
    }
    onConfirm(empleadosJson);
    setFile(null);
    setEstado('idle');
    setAlerta(null);
    setEmpleadosJson([]);

  };

  return (
    <>
    <ModalFlotante
      open={abierto}
      titulo="Importar Empleados con CSV"
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

      <ContenedorImportar
          onFileAccepted={handleFileAccepted}
          cargando={cargando}
          onError={(mensaje) =>
            setAlerta({
              tipo: 'error',
              mensaje,
              duracion: 3000,
              cerrable: true,
              centradoInferior: true,
            })
          }
        />

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
          <Boton style={{border: "none", textDecoration: 'underline', color: colores.altertex[1]}} onClick={handleDescargarPlantilla} label="Descargar plantilla CSV" variant="outlined" deshabilitado={descargarCSV} />
        <InfoImportar 
          open={abririnfo}
          onClose={() => setAbrirInfo(false)}> 
              <strong>Consideraciones para tu CSV:</strong><br /><br />
              <strong>Campos obligatorios:</strong> no dejes celdas vacías en ninguna columna.<br/>
              <strong>Correo electrónico:</strong> formato válido (usuario@dominio.com).<br/>
              <strong>Contraseñas: </strong>{`mínimo 8 caracteres, al menos una mayúscula y un carácter especial (!@#$%^&*(),.?":{}|<>)`}<br/>
              <strong>Teléfonos:</strong> exactamente 10 dígitos, sin espacios ni guiones.<br/>
              <strong>Textos largos:</strong> máximo 75 caracteres por campo.<br/>
              <strong>Fecha Nacimiento:</strong> formato DD/MM/AAAA (p. ej. 05/08/1998).<br/>
              <strong>Estado:</strong> 1 → activo, 0 → inactivo.<br/>
              <strong>Antiguedad:</strong> formato DD/MM/AAAA (p. ej. 05/08/1998).<br/>
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

export default ModalImportarEmpleados;
