import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import CampoTexto from '../../atomos/CampoTexto';
import CampoSelect from '../../atomos/CampoSelect';
import ModalFlotante from '../../organismos/ModalFlotante';

const FormularioCrearProducto = ({ open, onClose }) => {
  const [step, setStep] = useState(0);
  const [proveedor, setProveedor] = useState({
    nombre: '',
    nombreCompania: '',
    telefonoContacto: '',
    direccion: '',
    codigoPostal: '',
    pais: '',
    estado: 1,
  });
  const [producto, setProducto] = useState({
    nombreComun: '',
    nombreComercial: '',
    descripcion: '',
    marca: '',
    modelo: '',
    tipoProducto: '',
    precioPuntos: 0,
    precioCliente: 0,
    precioVenta: 0,
    costo: 0,
    impuesto: 0,
    descuento: 0,
    estado: 1,
    envio: 1,
  });
  const [variantes, setVariantes] = useState([]);
  const [imagenes, setImagenes] = useState({
    imagenProducto: null,
    imagenesVariante: [],
  });

  const manejarSiguiente = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const manejarAtras = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const manejarConfirmacion = async () => {
    // Lógica para enviar los datos del formulario al backend
  };

  return (
    <ModalFlotante
      open={open}
      onClose={step > 0 ? manejarAtras : onClose}
      titulo={
        step === 0
          ? 'Datos del Proveedor'
          : step === 1
          ? 'Datos del Producto'
          : 'Variantes y Opciones'
      }
      onConfirm={step === 2 ? manejarConfirmacion : manejarSiguiente}
      confirmLabel={step === 2 ? 'Confirmar' : 'Siguiente'}
      cancelLabel={step > 0 ? 'Atrás' : 'Cerrar'}
    >
      <Box
        component='form'
        sx={{
          flexGrow: 1,
          '& .MuiTextField-root': { margin: 1, width: '30ch' },
          '& .MuiFormControl-root': { margin: 1, minWidth: '30ch' },
        }}
        noValidate
        autoComplete='off'
      >
        {step === 0 && (
          <Grid container columns={12}>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Nombre'
                name='nombre'
                value={proveedor.nombre}
                onChange={(e) => setProveedor({ ...proveedor, nombre: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Nombre de la Compañía'
                name='nombreCompania'
                value={proveedor.nombreCompania}
                onChange={(e) => setProveedor({ ...proveedor, nombreCompania: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Teléfono de Contacto'
                name='telefonoContacto'
                value={proveedor.telefonoContacto}
                onChange={(e) => setProveedor({ ...proveedor, telefonoContacto: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Dirección'
                name='direccion'
                value={proveedor.direccion}
                onChange={(e) => setProveedor({ ...proveedor, direccion: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Código Postal'
                name='codigoPostal'
                value={proveedor.codigoPostal}
                onChange={(e) => setProveedor({ ...proveedor, codigoPostal: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='País'
                name='pais'
                value={proveedor.pais}
                onChange={(e) => setProveedor({ ...proveedor, pais: e.target.value })}
                required
              />
            </Grid>
          </Grid>
        )}

        {step === 1 && (
          <Grid container columns={12}>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Nombre Común'
                name='nombreComun'
                value={producto.nombreComun}
                onChange={(e) => setProducto({ ...producto, nombreComun: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Nombre Comercial'
                name='nombreComercial'
                value={producto.nombreComercial}
                onChange={(e) => setProducto({ ...producto, nombreComercial: e.target.value })}
                required
              />
            </Grid>
            <Grid item width='100%'>
              <TextField
                label='Descripción'
                name='descripcion'
                value={producto.descripcion}
                onChange={(e) => setProducto({ ...producto, descripcion: e.target.value })}
                required
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Marca'
                name='marca'
                value={producto.marca}
                onChange={(e) => setProducto({ ...producto, marca: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Modelo'
                name='modelo'
                value={producto.modelo}
                onChange={(e) => setProducto({ ...producto, modelo: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Tipo de Producto'
                name='tipoProducto'
                value={producto.tipoProducto}
                onChange={(e) => setProducto({ ...producto, tipoProducto: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Precio en Puntos'
                name='precioPuntos'
                value={producto.precioPuntos}
                onChange={(e) => setProducto({ ...producto, precioPuntos: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Precio Cliente'
                name='precioCliente'
                value={producto.precioCliente}
                onChange={(e) => setProducto({ ...producto, precioCliente: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Precio Venta'
                name='precioVenta'
                value={producto.precioVenta}
                onChange={(e) => setProducto({ ...producto, precioVenta: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Precio Costo'
                name='costo'
                value={producto.costo}
                onChange={(e) => setProducto({ ...producto, costo: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Impuesto'
                name='impuesto'
                value={producto.impuesto}
                onChange={(e) => setProducto({ ...producto, impuesto: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Descuento'
                name='descuento'
                value={producto.descuento}
                onChange={(e) => setProducto({ ...producto, descuento: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Estado'
                name='estado'
                value={producto.estado}
                onChange={(e) => setProducto({ ...producto, estado: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampoTexto
                label='Envio'
                name='envio'
                value={producto.envio}
                onChange={(e) => setProducto({ ...producto, envio: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              {/* Campo para subir imagen */}
            </Grid>
          </Grid>
        )}

        {step === 2 && (
          <Grid container columns={12}>
            {/* Aquí irían los campos para las variantes y sus opciones */}
          </Grid>
        )}
      </Box>
    </ModalFlotante>
  );
};

export default FormularioCrearProducto;
