//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import { memo } from 'react';
import { Grid, useTheme } from '@mui/material';
import Texto from '@Atomos/Texto';
import Boton from '@Atomos/Boton';
import CampoTexto from '@Atomos/CampoTexto';
import CampoSelect from '@Atomos/CampoSelect';
import TarjetaAccion from '@Moleculas/TarjetaAccion';
import TarjetaElementoAccion from '@Moleculas/TarjetaElementoAccion';
import { tokens } from '@SRC/theme';

const CampoTextoFormulario = memo(
  ({
    etiqueta,
    nombre,
    valor,
    onChange,
    textoAyuda,
    error,
    placeholder,
    tipo = 'text',
    multilinea = false,
    filas = 1,
    min,
    ...rest
  }) => (
    <Grid size={6}>
      <CampoTexto
        label={etiqueta}
        name={nombre}
        value={valor}
        onChange={onChange}
        helperText={textoAyuda}
        type={tipo}
        size='medium'
        required={true}
        placeholder={placeholder}
        multiline={multilinea}
        rows={filas}
        error={error}
        min={min}
        {...rest}
      />
    </Grid>
  )
);

const BotonFormulario = memo(({ seleccionado, anchoCompleto, colorBorde, etiqueta, onClick }) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  return (
    <Grid size={6} display='flex' alignItems='center' justifyContent='end'>
      <Boton
        variant='contained'
        selected={seleccionado}
        fullWidth={anchoCompleto}
        color='primary'
        size='medium'
        backgroundColor={colores.altertex[1]}
        outlineColor={colorBorde}
        label={etiqueta}
        onClick={onClick}
      />
    </Grid>
  );
});

const CampoSelectFormulario = memo(
  ({ etiqueta, nombre, opciones, valor, onChange, placeholder, textoAyuda, error, tamano = 6 }) => (
    <Grid size={tamano}>
      <CampoSelect
        label={etiqueta}
        name={nombre}
        value={valor}
        options={opciones}
        onChange={onChange}
        size='medium'
        error={error}
        required
        autoWidth
        placeholder={placeholder}
        helperText={textoAyuda}
      />
    </Grid>
  )
);

const TituloFormulario = memo(({ titulo, varianteTitulo, tamano = 12 }) => (
  <Grid size={tamano} overflow='hidden'>
    <Texto variant={varianteTitulo} gutterBottom>
      {titulo}
    </Texto>
  </Grid>
));

const CampoImagenProducto = memo(
  ({ imagenProducto, setImagenes, refInputArchivo, alAgregarImagenProducto }) => (
    <>
      {imagenProducto ? (
        <Grid size={12}>
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
          <Grid size={12}>
            <Texto variant='h6'>Sube la Imagen Principal del Producto Aquí</Texto>
          </Grid>
          <Grid size={12}>
            <TarjetaAccion
              icono='AddPhotoAlternate'
              texto='Agregar imagen'
              onClick={() => refInputArchivo.current.click()}
              hoverScale={false}
            />
            <input
              type='file'
              accept='.jpg,.jpeg,.png'
              ref={refInputArchivo}
              onChange={alAgregarImagenProducto}
              style={{ display: 'none' }}
            />
          </Grid>
        </>
      )}
    </>
  )
);

const CamposProducto = memo(
  ({
    producto,
    imagenProducto,
    refInputArchivo,
    erroresProducto,
    listaProveedores,
    alActualizarProducto,
    alAgregarImagenProducto,
    setImagenes,
    alMostrarFormularioProveedor,
  }) => {
    return (
      <>
        <TituloFormulario titulo='Datos del Proveedor' varianteTitulo='h6' tamano={6} />
        <BotonFormulario
          etiqueta='Agregar nuevo proveedor'
          onClick={alMostrarFormularioProveedor}
        />

        <CampoSelectFormulario
          etiqueta='Proveedor'
          nombre='idProveedor'
          valor={producto.idProveedor}
          onChange={alActualizarProducto}
          opciones={listaProveedores}
          error={erroresProducto?.idProveedor}
          textoAyuda={erroresProducto?.idProveedor}
          placeholder='Selecciona un proveedor'
        />

        <TituloFormulario titulo='Datos del Producto' varianteTitulo='h6' />

        <CampoTextoFormulario
          etiqueta='Nombre Común'
          nombre='nombreComun'
          valor={producto.nombreComun}
          error={erroresProducto?.nombreComun}
          textoAyuda={erroresProducto?.nombreComun}
          onChange={alActualizarProducto}
          placeholder='Ingresa el nombre común del producto'
        />

        <CampoTextoFormulario
          etiqueta='Nombre Comercial'
          nombre='nombreComercial'
          valor={producto.nombreComercial}
          error={erroresProducto?.nombreComercial}
          textoAyuda={erroresProducto?.nombreComercial}
          onChange={alActualizarProducto}
          placeholder='Ingresa el nombre comercial del producto'
        />

        <CampoTextoFormulario
          etiqueta='Descripción'
          nombre='descripcion'
          valor={producto.descripcion}
          error={erroresProducto?.descripcion}
          textoAyuda={erroresProducto?.descripcion}
          onChange={alActualizarProducto}
          placeholder='Ingresa una breve descripción del producto'
          multilinea
          filas={4}
        />

        <CampoTextoFormulario
          etiqueta='Marca'
          nombre='marca'
          valor={producto.marca}
          error={erroresProducto?.marca}
          textoAyuda={erroresProducto?.marca}
          onChange={alActualizarProducto}
          placeholder='Ingresa la marca del producto'
        />

        <CampoTextoFormulario
          etiqueta='Modelo'
          nombre='modelo'
          valor={producto.modelo}
          error={erroresProducto?.modelo}
          textoAyuda={erroresProducto?.modelo}
          onChange={alActualizarProducto}
          placeholder='Ingresa el modelo del producto'
        />

        <CampoTextoFormulario
          etiqueta='Tipo de Producto'
          nombre='tipoProducto'
          valor={producto.tipoProducto}
          error={erroresProducto?.tipoProducto}
          textoAyuda={erroresProducto?.tipoProducto}
          onChange={alActualizarProducto}
          placeholder='Ingresa el tipo de producto'
        />

        <CampoTextoFormulario
          etiqueta='Precio en Puntos'
          nombre='precioPuntos'
          valor={producto.precioPuntos}
          error={erroresProducto?.precioPuntos}
          textoAyuda={erroresProducto?.precioPuntos}
          onChange={alActualizarProducto}
          placeholder='Ingresa el precio en puntos'
          tipo='number'
          min={1}
        />

        <CampoTextoFormulario
          etiqueta='Precio Cliente'
          nombre='precioCliente'
          valor={producto.precioCliente}
          error={erroresProducto?.precioCliente}
          textoAyuda={erroresProducto?.precioCliente}
          onChange={alActualizarProducto}
          placeholder='Ingresa el precio para el cliente'
          tipo='number'
          min={1}
        />

        <CampoTextoFormulario
          etiqueta='Precio Venta'
          nombre='precioVenta'
          valor={producto.precioVenta}
          error={erroresProducto?.precioVenta}
          textoAyuda={erroresProducto?.precioVenta}
          onChange={alActualizarProducto}
          placeholder='Ingresa el precio de venta'
          tipo='number'
          min={1}
        />

        <CampoTextoFormulario
          etiqueta='Precio Costo'
          nombre='costo'
          valor={producto.costo}
          error={erroresProducto?.costo}
          textoAyuda={erroresProducto?.costo}
          onChange={alActualizarProducto}
          placeholder='Ingresa el costo del producto'
          tipo='number'
          min={1}
        />

        <CampoTextoFormulario
          etiqueta='Impuesto (%)'
          nombre='impuesto'
          valor={producto.impuesto}
          error={erroresProducto?.impuesto}
          textoAyuda={erroresProducto?.impuesto}
          onChange={alActualizarProducto}
          placeholder='Ej: 16'
          tipo='number'
          min={1}
        />

        <CampoTextoFormulario
          etiqueta='Descuento (%)'
          nombre='descuento'
          valor={producto.descuento}
          error={erroresProducto?.descuento}
          textoAyuda={erroresProducto?.descuento}
          onChange={alActualizarProducto}
          placeholder='Ej: 10'
          tipo='number'
          min={1}
        />

        <CampoSelectFormulario
          etiqueta='Envío'
          nombre='envio'
          valor={producto.envio}
          onChange={alActualizarProducto}
          opciones={[
            { value: 1, label: 'Con envío' },
            { value: 0, label: 'Sin envío' },
          ]}
          error={erroresProducto?.envio}
          textoAyuda={erroresProducto?.envio}
          placeholder='Selecciona opción de envío'
        />

        <CampoSelectFormulario
          etiqueta='Estado'
          nombre='estado'
          valor={producto.estado}
          onChange={alActualizarProducto}
          opciones={[
            { value: 1, label: 'Activo' },
            { value: 0, label: 'Inactivo' },
          ]}
          error={erroresProducto?.estado}
          textoAyuda={erroresProducto?.estado}
          placeholder='Selecciona el estado del producto'
        />

        <CampoImagenProducto
          imagenProducto={imagenProducto}
          setImagenes={setImagenes}
          refInputArchivo={refInputArchivo}
          alAgregarImagenProducto={alAgregarImagenProducto}
        />
      </>
    );
  }
);

export default CamposProducto;
