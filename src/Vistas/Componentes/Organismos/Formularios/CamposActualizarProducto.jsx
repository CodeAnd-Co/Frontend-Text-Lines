//RF[29] Actualiza Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF29]
import { memo } from 'react';
import { Grid } from '@mui/material';
import Texto from '@Atomos/Texto';
import CampoTexto from '@Atomos/CampoTexto';
import CampoSelect from '@Atomos/CampoSelect';
import TarjetaAccion from '@Moleculas/TarjetaAccion';
import TarjetaElementoAccion from '@Moleculas/TarjetaElementoAccion';

const CampoTextoFormulario = memo(
  ({
    etiqueta,
    nombre,
    valor,
    onChange,
    helperText,
    error,
    placeholder,
    tipo = 'text',
    multilinea = false,
    filas = 1,
    maxLongitud = 100,
    maxLongitudDescripcion = 300,
    ...rest
  }) => {
    const limiteCaracteres = nombre === 'descripcion' ? maxLongitudDescripcion : maxLongitud;

    return (
      <Grid size={6}>
        <CampoTexto
          label={etiqueta}
          name={nombre}
          value={valor || ''}
          onChange={(evento) => {
            const nuevoValor = evento.target.value.slice(0, limiteCaracteres);
            onChange({ target: { name: nombre, value: nuevoValor } });
          }}
          helperText={
            tipo === 'text' && limiteCaracteres && valor
              ? `${valor.length}/${limiteCaracteres} - Máximo de caracteres. ${helperText || ''}`
              : helperText
          }
          type={tipo}
          size='medium'
          required={true}
          placeholder={placeholder}
          multiline={multilinea}
          rows={filas}
          error={error}
          inputProps={{ maxLength: tipo === 'text' ? limiteCaracteres : undefined }}
          {...rest}
        />
      </Grid>
    );
  }
);

const CampoSelectFormulario = memo(
  ({
    etiqueta,
    nombre,
    opciones,
    valor,
    onChange,
    placeholder,
    helperText,
    error,
    tamano = 6,
    required = false,
  }) => (
    <Grid size={tamano}>
      <CampoSelect
        label={etiqueta}
        name={nombre}
        value={valor}
        options={opciones}
        onChange={onChange}
        size='medium'
        error={error}
        required={required}
        autoWidth
        placeholder={placeholder}
        helperText={helperText}
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
  ({ imagenProducto, setImagenes, refInputArchivo, alAgregarImagenProducto, error }) => (
    <>
      {imagenProducto ? (
        <Grid size={12}>
          <TarjetaElementoAccion
            icono='Image'
            texto={imagenProducto.name}
            onEliminar={() => setImagenes((prev) => ({ ...prev, imagenProducto: null }))}
            tooltipEliminar='Eliminar'
            borderColor={error ? 'error.main' : 'primary.light'}
            backgroundColor={error ? 'error.lighter' : 'primary.lighter'}
            iconColor={error ? 'error' : 'primary'}
            iconSize='large'
            textoVariant='caption'
            tabIndex={0}
            disabled={false}
          />
          {error && (
            <Texto variant='caption' color='error' sx={{ mt: 1, display: 'block' }}>
              {error}
            </Texto>
          )}
        </Grid>
      ) : (
        <>
          {' '}
          <Grid size={12}>
            <Texto variant='h6'>Sube la Imagen Principal del Producto Aquí</Texto>
            <Texto variant='caption' color='text.secondary'>
              Formatos aceptados: JPG, JPEG, PNG - Tamaño máximo: 5MB
            </Texto>
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

const CamposActualizarProducto = memo(
  ({
    producto,
    imagenProducto,
    refInputArchivo,
    erroresProducto,
    listaProveedores,
    alActualizarProducto,
    alAgregarImagenProducto,
    setImagenes,
    prevenirNumerosNegativos,
    prevenirNumerosNoDecimales,
  }) => {
    if (!producto) return null;
    return (
      <>
        <TituloFormulario titulo='Datos del Proveedor' varianteTitulo='h6' tamano={12} />
        <CampoSelectFormulario
          etiqueta='Proveedor'
          nombre='idProveedor'
          valor={producto.idProveedor}
          onChange={alActualizarProducto}
          opciones={listaProveedores}
          error={erroresProducto?.idProveedor}
          helperText={erroresProducto?.idProveedor}
          placeholder='Selecciona un proveedor'
          size={12}
          required
        />
        <TituloFormulario titulo='Datos del Producto' varianteTitulo='h6' />
        <CampoTextoFormulario
          etiqueta='Nombre Común'
          nombre='nombreComun'
          valor={producto.nombreComun}
          error={erroresProducto?.nombreComun}
          helperText={erroresProducto?.nombreComun}
          onChange={alActualizarProducto}
          maxLongitud={100}
          placeholder='Ingresa el nombre común del producto'
          required
        />
        <CampoTextoFormulario
          etiqueta='Nombre Comercial'
          nombre='nombreComercial'
          valor={producto.nombreComercial}
          error={erroresProducto?.nombreComercial}
          helperText={erroresProducto?.nombreComercial}
          onChange={alActualizarProducto}
          maxLongitud={100}
          placeholder='Ingresa el nombre comercial del producto'
          required
        />
        <CampoTextoFormulario
          etiqueta='Descripción'
          nombre='descripcion'
          valor={producto.descripcion}
          error={erroresProducto?.descripcion}
          helperText={erroresProducto?.descripcion}
          onChange={alActualizarProducto}
          placeholder='Ingresa una breve descripción del producto'
          multilinea
          maxLongitudDescripcion={300}
          filas={4}
          required
        />
        <CampoTextoFormulario
          etiqueta='Marca'
          nombre='marca'
          valor={producto.marca}
          error={erroresProducto?.marca}
          helperText={erroresProducto?.marca}
          onChange={alActualizarProducto}
          maxLongitud={100}
          placeholder='Ingresa la marca del producto'
          required
        />
        <CampoTextoFormulario
          etiqueta='Modelo'
          nombre='modelo'
          valor={producto.modelo}
          error={erroresProducto?.modelo}
          helperText={erroresProducto?.modelo}
          onChange={alActualizarProducto}
          maxLongitud={100}
          placeholder='Ingresa el modelo del producto'
          required
        />
        <CampoTextoFormulario
          etiqueta='Tipo de Producto'
          nombre='tipoProducto'
          valor={producto.tipoProducto}
          error={erroresProducto?.tipoProducto}
          helperText={erroresProducto?.tipoProducto}
          onChange={alActualizarProducto}
          maxLongitud={100}
          placeholder='Ingresa el tipo de producto'
          required
        />
        <CampoTextoFormulario
          etiqueta='Precio en Puntos'
          nombre='precioPuntos'
          valor={producto.precioPuntos}
          error={erroresProducto?.precioPuntos}
          helperText={erroresProducto?.precioPuntos}
          onChange={alActualizarProducto}
          placeholder='Ingresa el precio en puntos'
          tipo='number'
          required={false}
          min={1}
          onKeyDown={(evento) => {
            prevenirNumerosNegativos(evento);
            if (evento.key === '.' || evento.key === ',') {
              evento.preventDefault();
            }
          }}
          onInput={(evento) => {
            const valor = evento.target.value;
            if (valor === '' || /^\d+$/.test(valor)) {
              evento.target.value = valor;
            } else {
              evento.target.value = valor.replace(/\D/g, '');
            }
          }}
        />
        <CampoTextoFormulario
          etiqueta='Precio Cliente'
          nombre='precioCliente'
          valor={producto.precioCliente}
          error={erroresProducto?.precioCliente}
          helperText={erroresProducto?.precioCliente}
          onChange={alActualizarProducto}
          placeholder='Ingresa el precio para el cliente'
          tipo='number'
          required
          min={1}
          onKeyDown={prevenirNumerosNoDecimales}
          onInput={(evento) => {
            const valor = evento.target.value;
            if ((valor.match(/\./g) || []).length > 1) {
              evento.target.value = valor.slice(0, -1);
            }
            if (valor && parseFloat(valor) < 1) {
              evento.target.value = 1;
            }
          }}
        />
        <CampoTextoFormulario
          etiqueta='Precio Venta'
          nombre='precioVenta'
          valor={producto.precioVenta}
          error={erroresProducto?.precioVenta}
          helperText={erroresProducto?.precioVenta}
          onChange={alActualizarProducto}
          placeholder='Ingresa el precio de venta'
          tipo='number'
          required
          min={1}
          onKeyDown={prevenirNumerosNoDecimales}
          onInput={(evento) => {
            if (evento.target.value && evento.target.value < 1) {
              evento.target.value = 1;
            }
          }}
        />
        <CampoTextoFormulario
          etiqueta='Precio Costo'
          nombre='costo'
          valor={producto.costo}
          error={erroresProducto?.costo}
          helperText={erroresProducto?.costo}
          onChange={alActualizarProducto}
          placeholder='Ingresa el costo del producto'
          tipo='number'
          required
          min={1}
          onKeyDown={prevenirNumerosNoDecimales}
          onInput={(evento) => {
            if (evento.target.value && evento.target.value < 1) {
              evento.target.value = 1;
            }
          }}
        />{' '}
        <CampoTextoFormulario
          etiqueta='Impuesto (%)'
          nombre='impuesto'
          valor={producto.impuesto}
          error={erroresProducto?.impuesto}
          helperText={erroresProducto?.impuesto || 'Máximo 5 dígitos (ej: 16.00)'}
          onChange={alActualizarProducto}
          placeholder='Ej: 16'
          tipo='number'
          required={false}
          min={0}
          max={99999.99}
          onKeyDown={prevenirNumerosNoDecimales}
          onInput={(evento) => {
            const valor = evento.target.value;
            // Limitar a 5 dígitos enteros y 2 decimales
            if (valor) {
              const partes = valor.split('.');
              if (partes[0] && partes[0].length > 5) {
                // Si la parte entera tiene más de 5 dígitos, truncarla
                partes[0] = partes[0].substring(0, 5);
                evento.target.value = partes.join('.');
              }
              // Si el número es mayor a 99999.99, establecerlo al máximo
              if (parseFloat(valor) > 99999.99) {
                evento.target.value = '99999.99';
              }
            }
          }}
        />{' '}
        <CampoTextoFormulario
          etiqueta='Descuento (%)'
          nombre='descuento'
          valor={producto.descuento}
          error={erroresProducto?.descuento}
          helperText={erroresProducto?.descuento || 'Valores entre 0 y 100'}
          onChange={(evento) => {
            // Validar antes de pasar al manejador general
            const valor = evento.target.value;

            // Si está vacío o es un valor válido entre 0 y 100, actualizar
            if (valor === '' || (parseFloat(valor) >= 0 && parseFloat(valor) <= 100)) {
              // Formatear para asegurar que no exceda los límites
              const valorFormateado = valor === '' ? '' : parseFloat(valor) > 100 ? '100' : valor;

              // Solo llamar al actualizador si el valor es válido
              alActualizarProducto({
                target: {
                  name: 'descuento',
                  value: valorFormateado,
                },
              });
            }
          }}
          placeholder='Ej: 10'
          tipo='number'
          required={false}
          min={0}
          max={100}
          onKeyDown={prevenirNumerosNoDecimales}
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
          helperText={erroresProducto?.envio}
          placeholder='Selecciona opción de envío'
          required
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
          helperText={erroresProducto?.estado}
          placeholder='Selecciona el estado del producto'
          required
        />{' '}
        <CampoImagenProducto
          imagenProducto={imagenProducto}
          setImagenes={setImagenes}
          refInputArchivo={refInputArchivo}
          alAgregarImagenProducto={alAgregarImagenProducto}
          error={erroresProducto?.imagenProducto}
        />
      </>
    );
  }
);

export default CamposActualizarProducto;
