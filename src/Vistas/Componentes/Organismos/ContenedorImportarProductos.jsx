import { useDropzone } from 'react-dropzone';
import { Box, Typography, CircularProgress, useTheme } from '@mui/material';
import Icono from '@Atomos/Icono';
import Papa from 'papaparse';
import { tokens } from '@SRC/theme';

const transformarCSVaEstructuraProductos = (filas) => {
  const productosMap = new Map();

  for (const fila of filas) {
    const idProducto = fila.idProducto;

    if (!productosMap.has(idProducto)) {
      const {
        idProveedor,
        nombreProducto,
        nombreComercial,
        descripcionProducto,
        tipoProducto,
        marca,
        modelo,
        costo,
        precioVenta,
        precioCliente,
        precioPuntos,
        impuesto,
        descuento,
        estado,
        envio,
      } = fila;

      productosMap.set(idProducto, {
        productoRaw: {
          idProveedor: parseInt(idProveedor),
          nombreComun: nombreProducto,
          nombreComercial,
          descripcion: descripcionProducto,
          tipoProducto,
          marca,
          modelo,
          costo: parseFloat(costo),
          precioVenta: parseFloat(precioVenta),
          precioCliente: parseFloat(precioCliente),
          precioPuntos: parseFloat(precioPuntos),
          impuesto: parseFloat(impuesto),
          descuento: parseFloat(descuento),
          estado: parseInt(estado),
          envio: parseInt(envio),
        },
        variantesRaw: [],
      });
    }

    const producto = productosMap.get(idProducto);
    const {
      nombreVariante,
      descripcionVariante,
      valorOpcion,
      SKUautomatico,
      SKUcomercial,
      cantidad,
      costoAdicional,
      descuentoOpcion,
      estadoOpcion,
    } = fila;

    let variante = producto.variantesRaw.find(vb => vb.nombreVariante === nombreVariante);
    if (!variante) {
      variante = {
        identificador: `${producto.variantesRaw.length + 1}`,
        nombreVariante,
        descripcion: descripcionVariante,
        opciones: [],
      };
      producto.variantesRaw.push(variante);
    }

    variante.opciones.push({
      valorOpcion,
      SKUautomatico,
      SKUcomercial,
      cantidad: parseInt(cantidad),
      costoAdicional: parseFloat(costoAdicional),
      descuento: parseFloat(descuentoOpcion),
      estado: parseInt(estadoOpcion),
    });
  }

  return Array.from(productosMap.values());
};

const ContenedorImportarProductos = ({ onFileAccepted, onError, cargando = false }) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5 MB
    disabled: cargando,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles.length) return;
      const archivo = acceptedFiles[0];

      Papa.parse(archivo, {
        header: true,
        skipEmptyLines: true,
        complete: (resultado) => {
          try {
            const productosParseados = transformarCSVaEstructuraProductos(resultado.data);
            console.log('🧪 Productos Parseados con ID proveedor:', productosParseados);
            onFileAccepted(archivo, productosParseados);
          } catch (error) {
            onError?.('Error al transformar los datos del CSV. Verifica el formato.');
            console.error('Error al transformar CSV:', error);
          }
        },
        error: (error) => {
          console.error('Error al parsear CSV:', error.message);
          onError?.(`Error al leer el archivo: ${error.message}`);
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
      <input {...getInputProps()} disabled={cargando} />

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
            : 'Arrastra tu CSV o haz clic para seleccionarlo'}
      </Typography>
    </Box>
  );
};

export default ContenedorImportarProductos;
