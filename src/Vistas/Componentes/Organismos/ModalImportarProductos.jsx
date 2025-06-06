import { useState, useCallback, useEffect } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, CircularProgress, useTheme } from '@mui/material';
import Icono from '@Atomos/Icono';
import ModalFlotante from '@Organismos/ModalFlotante';
import Alerta from '@Moleculas/Alerta';
import { tokens } from '@SRC/theme';
import InfoImportar from '@Organismos/InfoImportar';
import CajaDesplazable from '@Organismos/CajaDesplazable';
import ContenedorImportarProductos from './ContenedorImportarProductos';
import Boton from '../Atomos/Boton';

const ModalImportarProductos = ({ abierto, onCerrar, onConfirm, cargando, errores, exito, recargar }) => {
  const [archivo, setArchivo] = useState(null);
  const [estado, setEstado] = useState('idle'); 
  const [infoJson, setInfoJson] = useState([]);
  const [alerta, setAlerta] = useState(null); 
  const [abririnfo, setAbrirInfo] = useState(false);
  const [mensajeErrores, setMensajeErrores] = useState('');
  const [descargarCSV, setDescargarCSV] = useState(false);
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  // Manejo de errores en la importación
  useEffect(() => {
    if (errores && errores.length > 0) {
      const mensaje = errores
        .map(elemento => `Producto ${elemento.fila}: ${elemento.error}`)
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
      setArchivo(null);
      setEstado('idle');
      onCerrar(false);
      setMensajeErrores('');
    }
  }, [exito, onCerrar, recargar]);

  const handleDescargarPlantilla = useCallback(() => {
    setDescargarCSV(true);
    const enlace = document.createElement('a');
    enlace.href = '/ejemplo_importar_productos.csv';
    enlace.download = 'ejemplo_importar_productos.csv';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    setTimeout(() => {
      setDescargarCSV(false);
    }, 2000);
  }, []);

  // Manejo de cierre del modal de importar
  const handleCerrar = useCallback(() => {
    onCerrar(false);
    setInfoJson([]);
    setArchivo(null);
    setEstado('idle');
    setAlerta(null);
    setMensajeErrores('');
  }, [onCerrar]);

  // Manejo de archivo aceptados
  const handleFileAccepted = (archivo, data) => {
    setArchivo(archivo);
    setEstado('loading');
    setInfoJson(data);
    setEstado('complete');
  };

  // Manejo de eliminación de archivo
  const handleEliminar = () => {
    setArchivo(null);
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
    setArchivo(null);
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

      <ContenedorImportarProductos 
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
        <Boton style={{border: "none", textDecoration: 'underline', color: colores.altertex[1]}} onClick={handleDescargarPlantilla} label="Descargar plantilla de ejemplo CSV" variant="outlined" deshabilitado={descargarCSV} />
        <InfoImportar 
          open={abririnfo}
          onClose={() => setAbrirInfo(false)}> 
                <>
                  <strong>¿Cómo funciona la estructura del archivo CSV?</strong>
                  <br /><br />
                  Cada fila del archivo representa una opción específica de un producto. El sistema necesita saber qué filas pertenecen al mismo producto. Para eso sirve el campo <strong>idProducto</strong>.
                  <br /><br />
                  Dentro de ese producto, se organizan las <strong>variantes</strong> usando el campo <strong>nombreVariante</strong>.
                  Y dentro de cada variante, se agrupan las <strong>opciones</strong> como "Rojo", "M", "32GB", etc. Consulta el siguente archivo de ejemplo: <a href="/ejemplo_importar_productos.csv" download="ejemplo_importar_productos.csv">
                  Descargar ejemplo de plantilla CSV.
                  </a>
                  <br /><br />
                  Así se puede importar correctamente todo: producto, variantes y sus opciones.
                  <br /><br />
                  
                  <strong>Asegúrate de lo sigiente:</strong>
                  <ul>
                    <li>
                      El <strong>idProducto</strong> sea único para cada producto dentro del archivo. Puede ser cualquier número, pero debe coincidir en todas las filas relacionadas con ese producto. Por cada campo vacío de idProducto, el sistema podría generar varios productos con el mismo nombre.
                    </li>
                    <li>
                      La primera fila de cada producto no debe tener campos vacíos, ya que el sistema la usa para identificar el producto principal. 
                    </li>
                    <li>
                      El csv tenga formato UTF-8 para evitar problemas con caracteres especiales.
                    </li>
                    <li>
                      El idProveedor exista en el sistema. El campo puede estar vacío si no se usa.
                    </li>
                  </ul>

                  <h3>Producto</h3>
                  <strong>idProducto</strong> permite al sistema saber qué filas pertenecen al mismo producto, aunque estén en diferentes líneas del CSV. Es necesario para poder agruparlo.<br />
                  <strong>idProveedor (opcional): </strong>Identificador del proveedor del producto. Puede ser un campo vacío <br />
                  <strong>nombreProducto, nombreComercial:</strong> Nombres básicos<br />
                  <strong>descripcionProducto:</strong> Descripción del producto<br />
                  <strong>marca, modelo, tipoProducto:</strong> Datos básicos del producto<br />
                  <strong>costo, precioVenta, precioCliente:</strong> Valores numéricos (usa punto decimal)<br />
                  <strong>precioPuntos:</strong> Número entero<br />
                  <strong>impuesto, descuento:</strong> Valor numérico del porcentaje. Ejemplo: 16 (para 16%)<br />
                  <strong>estado:</strong> 1 = activo, 0 = inactivo<br />
                  <strong>envio:</strong> 1 = disponible, 0 = no disponible<br /><br />
                  <h3>Variante</h3>
                  <strong>nombreVariante:</strong> Ej. "Color", "Tamaño"<br />
                  <strong>descripcionVariante:</strong> Descripción de la variante <br /><br />
                  <h3>Opción</h3>
                  <strong>valorOpcion:</strong> Ej. "Rojo", "XL"<br />
                  <strong>SKUautomatico:</strong> Obligatorio<br />
                  <strong>SKUcomercial:</strong> Código visible al cliente<br />
                  <strong>cantidad:</strong> Entero<br />
                  <strong>costoAdicional:</strong> Número positivo<br />
                  <strong>descuentoOpcion:</strong> Valor numérico del porcentaje. Ejemplo: 50 (para 50%)<br />
                  <strong>estadoOpcion:</strong> 1 = activa, 0 = inactiva<br /><br />
                
                </>
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
