import { Grid, TextField } from '@mui/material';
import CampoTexto from '../../Atomos/CampoTexto';
import CampoSelect from '../../Atomos/CampoSelect';
import TarjetaAccion from '../../moleculas/TarjetaAccion';
import TarjetaElementoAccion from '../../Moleculas/TarjetaElementoAccion';

const InformacionImagen = () => (
  <Grid item size={6} key={i}>
    <TarjetaElementoAccion
      icono='Image'
      texto='toyota.png'
      onEliminar={onEliminar}
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
);

const FormularioProducto = ({ producto, setProducto, estados, envios, imagenes, setImagenes }) => {
  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
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
      <Grid item size={12}>
        <TarjetaAccion
          icono='AddPhotoAlternate'
          texto='Agregar imagen'
          onClick={() => {
            console.log('Agregar nueva imagen');
          }}
          hoverScale={false}
        />
      </Grid>
    </Grid>
  );
};

export default FormularioProducto;
