import { memo } from 'react';
import { useRef } from 'react';
import { Grid, TextField } from '@mui/material';
import Texto from '../../Atomos/Texto';
import CampoTexto from '../../Atomos/CampoTexto';
import CampoSelect from '../../Atomos/CampoSelect';
import TarjetaAccion from '../../moleculas/TarjetaAccion';
import TarjetaElementoAccion from '../../Moleculas/TarjetaElementoAccion';

const FormularioProducto = memo(
  ({ producto, setProducto, estados, envios, imagenes, setImagenes }) => {
    const fileInputRef = useRef();
    const handleChange = (evento) => {
      const { name, value } = evento.target;
      setProducto((prevProducto) => ({
        ...prevProducto,
        [name]: value,
      }));
    };

    const handleFileSelect = (evento) => {
      const file = evento.target.files[0];
      if (!file) return;

      setImagenes((prev) => ({
        ...prev,
        imagenProducto: file,
      }));
    };

    return (
      <Grid container spacing={2}>
        <Grid item size={6}>
          <CampoTexto
            label='Nombre Común'
            name='nombreComun'
            value={producto.nombreComun}
            onChange={handleChange}
            size='medium'
            required
            placeholder='Ingresa el nombre común del producto'
          />
        </Grid>
        <Grid item size={6}>
          <CampoTexto
            label='Nombre Comercial'
            name='nombreComercial'
            value={producto.nombreComercial}
            onChange={handleChange}
            size='medium'
            required
            placeholder='Ingresa el nombre comercial del producto'
          />
        </Grid>
        <Grid item size={6}>
          <TextField
            label='Descripción'
            name='descripcion'
            value={producto.descripcion}
            onChange={handleChange}
            size='medium'
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
            onChange={handleChange}
            size='medium'
            required
            placeholder='Ingresa la marca del producto'
          />
        </Grid>
        <Grid item size={6}>
          <CampoTexto
            label='Modelo'
            name='modelo'
            value={producto.modelo}
            onChange={handleChange}
            size='medium'
            required
            placeholder='Ingresa el modelo del producto'
          />
        </Grid>
        <Grid item size={6}>
          <CampoTexto
            label='Tipo de Producto'
            name='tipoProducto'
            value={producto.tipoProducto}
            onChange={handleChange}
            size='medium'
            required
            placeholder='Ingresa el tipo de producto'
          />
        </Grid>
        <Grid item size={6}>
          <CampoTexto
            label='Precio en Puntos'
            name='precioPuntos'
            value={producto.precioPuntos}
            onChange={handleChange}
            size='medium'
            required
            placeholder='Ingresa el precio en puntos'
          />
        </Grid>
        <Grid item size={6}>
          <CampoTexto
            label='Precio Cliente'
            name='precioCliente'
            value={producto.precioCliente}
            onChange={handleChange}
            size='medium'
            required
            placeholder='Ingresa el precio para el cliente'
          />
        </Grid>
        <Grid item size={6}>
          <CampoTexto
            label='Precio Venta'
            name='precioVenta'
            value={producto.precioVenta}
            onChange={handleChange}
            size='medium'
            required
            placeholder='Ingresa el precio de venta'
          />
        </Grid>
        <Grid item size={6}>
          <CampoTexto
            label='Precio Costo'
            name='costo'
            value={producto.costo}
            onChange={handleChange}
            size='medium'
            required
            placeholder='Ingresa el costo del producto'
          />
        </Grid>
        <Grid item size={6}>
          <CampoTexto
            label='Impuesto (%)'
            name='impuesto'
            value={producto.impuesto}
            onChange={handleChange}
            size='medium'
            required
            placeholder='Ej: 16'
          />
        </Grid>
        <Grid item size={6}>
          <CampoTexto
            label='Descuento (%)'
            name='descuento'
            value={producto.descuento}
            onChange={handleChange}
            size='medium'
            required
            placeholder='Ej: 10'
          />
        </Grid>
        <Grid item size={6}>
          <CampoSelect
            label='Estado'
            name='estado'
            value={producto.estado}
            onChange={handleChange}
            size='medium'
            options={estados}
            required
          />
        </Grid>
        <Grid item size={6}>
          <CampoSelect
            label='Envio'
            name='envio'
            value={producto.envio}
            onChange={handleChange}
            size='medium'
            options={envios}
            required
          />
        </Grid>
        {imagenes.imagenProducto ? (
          <Grid item size={6}>
            <TarjetaElementoAccion
              icono='Image'
              texto={imagenes.imagenProducto.name}
              onEliminar={() => {
                setImagenes((prev) => ({ ...prev, imagenProducto: null }));
              }}
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
      </Grid>
    );
  }
);

export default FormularioProducto;
