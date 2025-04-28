import { useState } from 'react';
import { Box, Grid, TextField } from '@mui/material';
import Icono from '../../Atomos/Icono';
import Texto from '../../Atomos/Texto';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import CampoTexto from '../../atomos/CampoTexto';
import CampoSelect from '../../atomos/CampoSelect';
import ModalFlotante from '../../organismos/ModalFlotante';

const estiloTarjetaAgregar = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px dashed rgba(15, 140, 241, 0.18)',
  backgroundColor: 'rgba(15, 140, 241, 0.18)',
  color: '#1976D2',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(15, 139, 241, 0.38)',
    transform: 'scale(1.03)',
  },
};

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
    precioPuntos: null,
    precioCliente: null,
    precioVenta: null,
    costo: null,
    impuesto: null,
    descuento: null,
    estado: 1,
    envio: 1,
  });
  const [variantes, setVariantes] = useState([]);
  const [imagenes, setImagenes] = useState({
    imagenProducto: null,
    imagenesVariante: [],
  });

  const estados = [
    { value: 1, label: 'Activo' },
    { value: 0, label: 'Inactivo' },
  ];

  const envios = [
    { value: 1, label: 'Sí' },
    { value: 0, label: 'No' },
  ];

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
          <Grid container spacing={2}>
            <Grid item size={6}>
              <CampoTexto
                label='Nombre'
                name='nombre'
                value={proveedor.nombre}
                onChange={(e) => setProveedor({ ...proveedor, nombre: e.target.value })}
                required
                placeholder='Ingresa el nombre del proveedor'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='Nombre de la Compañía'
                name='nombreCompania'
                value={proveedor.nombreCompania}
                onChange={(e) => setProveedor({ ...proveedor, nombreCompania: e.target.value })}
                required
                placeholder='Ingresa el nombre de la compañía'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='Teléfono de Contacto'
                name='telefonoContacto'
                value={proveedor.telefonoContacto}
                onChange={(e) => setProveedor({ ...proveedor, telefonoContacto: e.target.value })}
                required
                placeholder='Ingresa el teléfono de contacto'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='Dirección'
                name='direccion'
                value={proveedor.direccion}
                onChange={(e) => setProveedor({ ...proveedor, direccion: e.target.value })}
                required
                placeholder='Ingresa la dirección del proveedor'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='Código Postal'
                name='codigoPostal'
                value={proveedor.codigoPostal}
                onChange={(e) => setProveedor({ ...proveedor, codigoPostal: e.target.value })}
                required
                placeholder='Ingresa el código postal'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='País'
                name='pais'
                value={proveedor.pais}
                onChange={(e) => setProveedor({ ...proveedor, pais: e.target.value })}
                required
                placeholder='Ingresa el país'
              />
            </Grid>
          </Grid>
        )}

        {step === 1 && (
          <Grid container spacing={2}>
            <Grid item size={6}>
              <CampoTexto
                label='Nombre Común'
                name='nombreComun'
                value={producto.nombreComun}
                onChange={(e) => setProducto({ ...producto, nombreComun: e.target.value })}
                required
                placeholder='Ingresa el nombre común del producto'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='Nombre Comercial'
                name='nombreComercial'
                value={producto.nombreComercial}
                onChange={(e) => setProducto({ ...producto, nombreComercial: e.target.value })}
                required
                placeholder='Ingresa el nombre comercial del producto'
              />
            </Grid>
            <Grid item size={6}>
              <TextField
                label='Descripción'
                name='descripcion'
                value={producto.descripcion}
                onChange={(e) => setProducto({ ...producto, descripcion: e.target.value })}
                required
                multiline
                rows={4}
                placeholder='Ingresa una breve descripción del producto'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='Marca'
                name='marca'
                value={producto.marca}
                onChange={(e) => setProducto({ ...producto, marca: e.target.value })}
                required
                placeholder='Ingresa la marca del producto'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='Modelo'
                name='modelo'
                value={producto.modelo}
                onChange={(e) => setProducto({ ...producto, modelo: e.target.value })}
                required
                placeholder='Ingresa el modelo del producto'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='Tipo de Producto'
                name='tipoProducto'
                value={producto.tipoProducto}
                onChange={(e) => setProducto({ ...producto, tipoProducto: e.target.value })}
                required
                placeholder='Ingresa el tipo de producto'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='Precio en Puntos'
                name='precioPuntos'
                value={producto.precioPuntos}
                onChange={(e) => setProducto({ ...producto, precioPuntos: e.target.value })}
                required
                placeholder='Ingresa el precio en puntos'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='Precio Cliente'
                name='precioCliente'
                value={producto.precioCliente}
                onChange={(e) => setProducto({ ...producto, precioCliente: e.target.value })}
                required
                placeholder='Ingresa el precio para el cliente'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='Precio Venta'
                name='precioVenta'
                value={producto.precioVenta}
                onChange={(e) => setProducto({ ...producto, precioVenta: e.target.value })}
                required
                placeholder='Ingresa el precio de venta'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='Precio Costo'
                name='costo'
                value={producto.costo}
                onChange={(e) => setProducto({ ...producto, costo: e.target.value })}
                required
                placeholder='Ingresa el costo del producto'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='Impuesto (%)'
                name='impuesto'
                value={producto.impuesto}
                onChange={(e) => setProducto({ ...producto, impuesto: e.target.value })}
                required
                placeholder='Ej: 16'
              />
            </Grid>
            <Grid item size={6}>
              <CampoTexto
                label='Descuento (%)'
                name='descuento'
                value={producto.descuento}
                onChange={(e) => setProducto({ ...producto, descuento: e.target.value })}
                required
                placeholder='Ej: 10'
              />
            </Grid>
            <Grid item size={6}>
              <CampoSelect
                label='Estado'
                name='estado'
                value={producto.estado}
                onChange={(e) => setProducto({ ...producto, estado: e.target.value })}
                options={estados}
                required
              />
            </Grid>
            <Grid item size={6}>
              <CampoSelect
                label='Envio'
                name='envio'
                value={producto.envio}
                onChange={(e) => setProducto({ ...producto, envio: e.target.value })}
                options={envios}
                required
              />
            </Grid>
            <Grid
              item
              onClick={() => console.log('Agregar Imagen')}
              sx={{
                ...estiloTarjetaAgregar,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              size={12}
              role='button'
              tabIndex={0}
            >
              <Icono nombre='Image' size='large' />
              <Texto variant='button' sx={{ mt: 1 }}>
                Agregar imagen
              </Texto>
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
