import { memo, useRef, useMemo, useCallback, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Texto from '@Atomos/Texto';
import Boton from '@Atomos/Boton';
import CampoTexto from '@Atomos/CampoTexto';
import CampoSelect from '@Atomos/CampoSelect';
import TarjetaAccion from '@Moleculas/TarjetaAccion';
import TarjetaElementoAccion from '@Moleculas/TarjetaElementoAccion';
import ModalFlotante from '@Organismos/ModalFlotante';
import { useConsultarProveedores } from '@Hooks/Proveedores/useConsultarProveedores';

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
  ({ label, name, options, value, onChange, placeholder, helperText, size = 12 }) => (
    <Grid item size={size}>
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

const TituloForm = memo(({ titulo, tituloVariant, size = 12 }) => (
  <Grid item size={size} overflow='hidden'>
    <Texto variant={tituloVariant} gutterBottom>
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

const CampoCrear = memo(({ etiqueta, onClic }) => (
  <Grid item size={12}>
    <TarjetaAccion icono='Add' texto={etiqueta} onClick={onClic} hoverScale={false} />
  </Grid>
));

const CamposVariante = memo(
  ({
    varianteId,
    variante,
    onUpdateVariante,
    onEliminarVariante,
    onAgregarOpcion,
    onActualizarOpcion,
    onEliminarOpcion,
  }) => {
    const handleVarianteChange = useCallback(
      (campo, valor) => {
        onUpdateVariante(varianteId, campo, valor);
      },
      [varianteId, onUpdateVariante]
    );

    const handleEliminarVariante = useCallback(() => {
      onEliminarVariante(varianteId);
    }, [varianteId, onEliminarVariante]);

    const handleAgregarOpcion = useCallback(() => {
      onAgregarOpcion(varianteId);
    }, [varianteId, onAgregarOpcion]);

    return (
      <>
        <TituloForm titulo={`Variante ${variante.nombreVariante}`} tituloVariant='h6' size={6} />
        <BotonForm label='Eliminar' onClick={handleEliminarVariante} />

        <CampoTextoForm
          label='Nombre de la Variante'
          name={`nombreVariante-${varianteId}`}
          value={variante.nombreVariante || ''}
          onChange={(evento) => handleVarianteChange('nombreVariante', evento.target.value)}
          placeholder='Ej: Color, Talla, Material...'
        />

        <CampoTextoForm
          label='Descripción de la Variante'
          name={`descripcion-${varianteId}`}
          value={variante.descripcion || ''}
          onChange={(evento) => handleVarianteChange('descripcion', evento.target.value)}
          placeholder='Descripción de la variante'
        />

        {(variante.opciones || []).map((opcion, index) => (
          <OpcionVariante
            key={opcion.id || index}
            index={index}
            opcion={opcion}
            varianteId={varianteId}
            onActualizarOpcion={onActualizarOpcion}
            onEliminarOpcion={onEliminarOpcion}
          />
        ))}
        <CampoCrear etiqueta='Crear Opción' onClic={handleAgregarOpcion} />
      </>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.varianteId === nextProps.varianteId &&
      prevProps.variante.nombreVariante === nextProps.variante.nombreVariante &&
      prevProps.variante.descripcion === nextProps.variante.descripcion &&
      JSON.stringify(prevProps.variante.opciones) === JSON.stringify(nextProps.variante.opciones) &&
      prevProps.onUpdateVariante === nextProps.onUpdateVariante &&
      prevProps.onEliminarVariante === nextProps.onEliminarVariante &&
      prevProps.onAgregarOpcion === nextProps.onAgregarOpcion &&
      prevProps.onActualizarOpcion === nextProps.onActualizarOpcion &&
      prevProps.onEliminarOpcion === nextProps.onEliminarOpcion
    );
  }
);

const OpcionVariante = memo(
  ({ opcion, index, varianteId, onActualizarOpcion, onEliminarOpcion }) => {
    const handleOpcionChange = useCallback(
      (campo, valor) => {
        onActualizarOpcion(varianteId, index, campo, valor);
      },
      [varianteId, index, onActualizarOpcion]
    );

    const handleEliminar = useCallback(() => {
      onEliminarOpcion(varianteId, index);
    }, [varianteId, index, onEliminarOpcion]);

    return (
      <Grid container spacing={2}>
        <TituloForm titulo={`Opcion ${opcion.valorOpcion}`} tituloVariant='h6' size={6} />
        <BotonForm label='Eliminar' onClick={handleEliminar} />
        <CampoTextoForm
          label='Cantidad'
          type='number'
          name={`cantidad-${varianteId}-${index}`}
          value={opcion.cantidad}
          onChange={(evento) => handleOpcionChange('cantidad', evento.target.value)}
        />
        <CampoTextoForm
          label='Valor Opción'
          name={`valorOpcion-${varianteId}-${index}`}
          value={opcion.valorOpcion}
          onChange={(evento) => handleOpcionChange('valorOpcion', evento.target.value)}
        />
        <CampoTextoForm
          label='SKU Automático'
          name={`SKUautomatico-${varianteId}-${index}`}
          value={opcion.SKUautomatico}
          onChange={(evento) => handleOpcionChange('SKUautomatico', evento.target.value)}
        />
        <CampoTextoForm
          label='SKU Comercial'
          name={`SKUcomercial-${varianteId}-${index}`}
          value={opcion.SKUcomercial}
          onChange={(evento) => handleOpcionChange('SKUcomercial', evento.target.value)}
        />
        <CampoTextoForm
          label='Costo Adicional'
          type='number'
          name={`costoAdicional-${varianteId}-${index}`}
          value={opcion.costoAdicional}
          onChange={(evento) => handleOpcionChange('costoAdicional', evento.target.value)}
        />
        <CampoTextoForm
          label='Descuento (%)'
          type='number'
          name={`descuento-${varianteId}-${index}`}
          value={opcion.descuento}
          onChange={(evento) => handleOpcionChange('descuento', evento.target.value)}
        />
        <CampoSelectForm
          label='Estado'
          name={`estado-${varianteId}-${index}`}
          options={[
            { value: 1, label: 'Activo' },
            { value: 0, label: 'Inactivo' },
          ]}
          value={opcion.estado}
          onChange={(evento) => handleOpcionChange('estado', evento.target.value)}
          size={6}
        />
      </Grid>
    );
  },
  (prev, next) => {
    return (
      prev.index === next.index &&
      prev.varianteId === next.varianteId &&
      prev.opcion.cantidad === next.opcion.cantidad &&
      prev.opcion.valorOpcion === next.opcion.valorOpcion &&
      prev.opcion.SKUautomatico === next.opcion.SKUautomatico &&
      prev.opcion.SKUcomercial === next.opcion.SKUcomercial &&
      prev.opcion.costoAdicional === next.opcion.costoAdicional &&
      prev.opcion.descuento === next.opcion.descuento &&
      prev.opcion.estado === next.opcion.estado &&
      prev.onActualizarOpcion === next.onActualizarOpcion &&
      prev.onEliminarOpcion === next.onEliminarOpcion
    );
  }
);

const FormularioProducto = memo(
  ({ open, onMostrarFormularioProveedor, onCerrarFormularioProducto }) => {
    const fileInputRef = useRef();

    // Estado para almacenar las variantes (reemplaza useRef)
    const [variantes, setVariantes] = useState({
      1: {
        nombreVariante: '',
        descripcion: '',
        opciones: [],
      },
    });

    // Estado para mantener los IDs de las variantes
    const [variantesIds, setVariantesIds] = useState([1]);

    // Contador para generar IDs únicos
    const [nextVarianteId, setNextVarianteId] = useState(2);

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
      imagenVariantes: [],
    });

    const { proveedores } = useConsultarProveedores();

    const handleCrearVariante = useCallback(() => {
      const newId = nextVarianteId;
      setVariantes((prev) => ({
        ...prev,
        [newId]: {
          nombreVariante: '',
          descripcion: '',
          opciones: [],
        },
      }));

      setVariantesIds((prev) => [...prev, newId]);

      setNextVarianteId((prev) => prev + 1);
    }, [nextVarianteId]);

    const updateVariante = useCallback((varianteId, campo, valor) => {
      setVariantes((prev) => {
        if (prev[varianteId] && prev[varianteId][campo] === valor) {
          return prev;
        }

        return {
          ...prev,
          [varianteId]: {
            ...prev[varianteId],
            [campo]: valor,
          },
        };
      });
    }, []);

    // Método para eliminar una variante
    const eliminarVariante = useCallback((varianteId) => {
      setVariantes((prev) => {
        const newVariantes = { ...prev };
        delete newVariantes[varianteId];
        return newVariantes;
      });

      setVariantesIds((prev) => prev.filter((id) => id !== varianteId));
    }, []);

    // Método para agregar una opción a una variante - más eficiente
    const agregarOpcion = useCallback((varianteId) => {
      setVariantes((prev) => {
        if (!prev[varianteId]) {
          return prev; // Si la variante no existe, no hacemos nada
        }

        // Crear una nueva opción con valores por defecto
        const nuevaOpcion = {
          id: Date.now(),
          cantidad: 0,
          valorOpcion: '',
          SKUautomatico: '',
          SKUcomercial: '',
          costoAdicional: 0,
          descuento: 0,
          estado: 1,
        };

        return {
          ...prev,
          [varianteId]: {
            ...prev[varianteId],
            opciones: [...(prev[varianteId].opciones || []), nuevaOpcion],
          },
        };
      });
    }, []);

    // Método para actualizar una opción específica - optimizado para actualizar solo lo necesario
    const actualizarOpcion = useCallback((varianteId, opcionIndex, campo, valor) => {
      setVariantes((prev) => {
        const varianteActual = prev[varianteId];
        if (!varianteActual) return prev;

        const opcionesActuales = varianteActual.opciones || [];

        // Si el índice no es válido, no hacer cambios
        if (opcionIndex < 0 || opcionIndex >= opcionesActuales.length) {
          return prev;
        }

        // Crear un nuevo array con la opción actualizada
        const opcionesActualizadas = [...opcionesActuales];
        opcionesActualizadas[opcionIndex] = {
          ...opcionesActuales[opcionIndex],
          [campo]: valor,
        };

        return {
          ...prev,
          [varianteId]: {
            ...varianteActual,
            opciones: opcionesActualizadas,
          },
        };
      });
    }, []);
    // Método para eliminar una opción - optimizado
    const eliminarOpcion = useCallback((varianteId, opcionIndex) => {
      setVariantes((prev) => {
        const varianteActual = prev[varianteId];
        if (
          !varianteActual ||
          !varianteActual.opciones ||
          opcionIndex >= varianteActual.opciones.length
        ) {
          return prev; // No hay nada que eliminar
        }

        // Crear nuevo array de opciones sin la opción a eliminar
        const opcionesActualizadas = [
          ...varianteActual.opciones.slice(0, opcionIndex),
          ...varianteActual.opciones.slice(opcionIndex + 1),
        ];

        return {
          ...prev,
          [varianteId]: {
            ...varianteActual,
            opciones: opcionesActualizadas,
          },
        };
      });
    }, []);

    const handleCrearProducto = useCallback(() => {
      // Convertir el objeto de variantes a un array para enviar
      const variantesData = Object.entries(variantes).map(([id, data]) => ({
        id: parseInt(id),
        ...data,
      }));

      // Preparar datos completos del producto incluyendo variantes
      const productoCompleto = {
        ...producto,
        variantes: variantesData,
        imagenes,
      };

      console.log('Producto completo a enviar:', productoCompleto);
      // Aquí iría la lógica para enviar los datos al servidor
    }, [producto, variantes, imagenes]);

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
        onConfirm={handleCrearProducto}
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
            <TituloForm titulo='Datos del Proveedor' tituloVariant='h6' size={6} />
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
            <TituloForm titulo='Datos de las Variantes' tituloVariant='h6' />

            {/* Renderizamos los componentes de variantes usando sus IDs */}
            {variantesIds.map((varianteId) => (
              <CamposVariante
                key={`variante-${varianteId}`}
                varianteId={varianteId}
                variante={
                  variantes[varianteId] || { nombreVariante: '', descripcion: '', opciones: [] }
                }
                onUpdateVariante={updateVariante}
                onEliminarVariante={eliminarVariante}
                onAgregarOpcion={agregarOpcion}
                onActualizarOpcion={actualizarOpcion}
                onEliminarOpcion={eliminarOpcion}
              />
            ))}

            <CampoCrear etiqueta='Crear Variante' onClic={handleCrearVariante} />
          </Grid>
        </Box>
      </ModalFlotante>
    );
  }
);

export default FormularioProducto;
