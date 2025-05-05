import { memo, useRef, useMemo, useCallback, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Texto from '../../Atomos/Texto';
import Boton from '../../Atomos/Boton';
import CampoTexto from '../../Atomos/CampoTexto';
import CampoSelect from '../../Atomos/CampoSelect';
import TarjetaAccion from '../../moleculas/TarjetaAccion';
import TarjetaElementoAccion from '../../Moleculas/TarjetaElementoAccion';
import ModalFlotante from '../ModalFlotante';
import { useConsultarProveedores } from '../../../../hooks/Proveedores/useConsultarProveedores';

const CampoTextoForm = memo(
  ({ label, name, value, onChange, placeholder, type = 'text', multiline = false, rows = 1 }) => (
    <Grid size={6}>
      <CampoTexto
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        size='medium'
        required
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
      />
    </Grid>
  )
);

const CampoSelectForm = memo(
  ({ label, name, options, value, onChange, placeholder, helperText }) => (
    <Grid item size={12}>
      <CampoSelect
        label={label}
        name={name}
        value={value}
        options={options}
        onChange={onChange}
        size='medium'
        required
        autoWidth
        placeholder={placeholder}
        helperText={helperText}
      />
    </Grid>
  )
);

const BotonForm = memo(({ selected, fullWidth, backgroundColor, outlineColor, label, onClick }) => (
  <Grid item size={6} display='flex' alignItems='center' justifyContent='end'>
    <Boton
      variant='contained'
      selected={selected}
      fullWidth={fullWidth}
      color='primary'
      size='medium'
      backgroundColor={backgroundColor}
      outlineColor={outlineColor}
      label={label}
      onClick={onClick}
    />
  </Grid>
));

const TituloProveedorForm = memo(({ titulo, tituloVariant }) => (
  <Grid item size={6}>
    <Texto variant={tituloVariant} gutterBottom >
      {titulo}
    </Texto>
  </Grid>
));

const TituloForm = memo(({ titulo, tituloVariant }) => (
  <Grid item size={12}>
    <Texto variant={tituloVariant} gutterBottom >
      {titulo}
    </Texto>
  </Grid>
));

const CampoImagenProducto = memo(
  ({ imagenProducto, setImagenes, fileInputRef, handleFileSelect }) => (
    <>
      {imagenProducto ? (
        <Grid item size={12}>
          <TarjetaElementoAccion
            icono='Image'
            texto={imagenProducto.name}
            onEliminar={() => setImagenes((prev) => ({ ...prev, imagenProducto: null }))}
            tooltipEliminar='Eliminar'
            borderColor='primary.light'
            backgroundColor='primary.lighter'
            iconColor='primary'
            iconSize='large'
            textoVariant='caption'
            tabIndex={0}
            disabled={false}
          />
        </Grid>
      ) : (
        <>
          <Grid item size={12}>
            <Texto variant='h6'>Sube la Imagen Principal del Producto Aquí</Texto>
          </Grid>
          <Grid item size={12}>
            <TarjetaAccion
              icono='AddPhotoAlternate'
              texto='Agregar imagen'
              onClick={() => fileInputRef.current.click()}
              hoverScale={false}
            />
            <input
              type='file'
              accept='image/*'
              ref={fileInputRef}
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </Grid>
        </>
      )}
    </>
  )
);

const FormularioProducto = memo(
  ({ open, onMostrarFormularioProveedor, onCerrarFormularioProducto }) => {
    const fileInputRef = useRef();

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
      impuesto: 16,
      descuento: 0,
      estado: 1,
      envio: 1,
      proveedorId: '',
    });

    const [imagenes, setImagenes] = useState({
      imagenProducto: null,
    });

    const { proveedores } = useConsultarProveedores();

    const handleChange = useCallback((evento) => {
      const { name, value } = evento.target;
      setProducto((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleFileSelect = useCallback((evento) => {
      const file = evento.target.files[0];
      if (!file) return;
      setImagenes((prev) => ({ ...prev, imagenProducto: file }));
    }, []);

    const listaProveedores = useMemo(
      () =>
        proveedores?.map((proveedor) => ({
          value: proveedor.idProveedor,
          label: `${proveedor.nombreCompania} - ${proveedor.nombre}`,
        })) || [],
      [proveedores]
    );

    return (
      <ModalFlotante
        open={open}
        onClose={onCerrarFormularioProducto}
        onConfirm={() => {}}
        titulo='Crear Producto'
        confirmLabel='Siguiente'
        cancelLabel='Cerrar'
      >
        <Box
          component='form'
          method='POST'
          noValidate
          autoComplete='off'
          sx={{
            flexGrow: 1,
            '& .MuiTextField-root': { margin: 1, width: '30ch' },
            '& .MuiFormControl-root': { margin: 1, minWidth: '30ch' },
            mt: 3,
            mb: 3,
          }}
        >
          <Grid container spacing={2}>
            <TituloProveedorForm titulo='Datos del Proveedor' tituloVariant='h6' />
            <BotonForm label='Agregar nuevo proveedor' onClick={onMostrarFormularioProveedor} />
            <CampoSelectForm
              label='Proveedor'
              name='proveedorId'
              value={producto.proveedorId}
              onChange={handleChange}
              options={listaProveedores}
              placeholder='Selecciona un proveedor'
            />
            <TituloForm titulo='Datos del Producto' tituloVariant='h6' />
            <CampoTextoForm
              label='Nombre Común'
              name='nombreComun'
              value={producto.nombreComun}
              onChange={handleChange}
              placeholder='Ingresa el nombre común del producto'
            />
            <CampoTextoForm
              label='Nombre Comercial'
              name='nombreComercial'
              value={producto.nombreComercial}
              onChange={handleChange}
              placeholder='Ingresa el nombre comercial del producto'
            />
            <CampoTextoForm
              label='Descripción'
              name='descripcion'
              value={producto.descripcion}
              onChange={handleChange}
              placeholder='Ingresa una breve descripción del producto'
              multiline
              rows={4}
            />
            <CampoTextoForm
              label='Marca'
              name='marca'
              value={producto.marca}
              onChange={handleChange}
              placeholder='Ingresa la marca del producto'
            />
            <CampoTextoForm
              label='Modelo'
              name='modelo'
              value={producto.modelo}
              onChange={handleChange}
              placeholder='Ingresa el modelo del producto'
            />
            <CampoTextoForm
              label='Tipo de Producto'
              name='tipoProducto'
              value={producto.tipoProducto}
              onChange={handleChange}
              placeholder='Ingresa el tipo de producto'
            />
            <CampoTextoForm
              label='Precio en Puntos'
              name='precioPuntos'
              value={producto.precioPuntos}
              onChange={handleChange}
              placeholder='Ingresa el precio en puntos'
              type='number'
            />
            <CampoTextoForm
              label='Precio Cliente'
              name='precioCliente'
              value={producto.precioCliente}
              onChange={handleChange}
              placeholder='Ingresa el precio para el cliente'
              type='number'
            />
            <CampoTextoForm
              label='Precio Venta'
              name='precioVenta'
              value={producto.precioVenta}
              onChange={handleChange}
              placeholder='Ingresa el precio de venta'
              type='number'
            />
            <CampoTextoForm
              label='Precio Costo'
              name='costo'
              value={producto.costo}
              onChange={handleChange}
              placeholder='Ingresa el costo del producto'
              type='number'
            />
            <CampoTextoForm
              label='Impuesto (%)'
              name='impuesto'
              value={producto.impuesto}
              onChange={handleChange}
              placeholder='Ej: 16'
              type='number'
            />
            <CampoTextoForm
              label='Descuento (%)'
              name='descuento'
              value={producto.descuento}
              onChange={handleChange}
              placeholder='Ej: 10'
              type='number'
            />
            <CampoImagenProducto
              imagenProducto={imagenes.imagenProducto}
              setImagenes={setImagenes}
              fileInputRef={fileInputRef}
              handleFileSelect={handleFileSelect}
            />
          </Grid>
        </Box>
      </ModalFlotante>
    );
  }
);

export default FormularioProducto;
