import { memo, useRef, useMemo, useCallback, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Texto from '@Atomos/Texto';
import Boton from '@Atomos/Boton';
import CampoTexto from '@Atomos/CampoTexto';
import CampoSelect from '@Atomos/CampoSelect';
import TarjetaAccion from '@Moleculas/TarjetaAccion';
import TarjetaElementoAccion from '@Moleculas/TarjetaElementoAccion';
import Alerta from '@Moleculas/Alerta';
import ModalFlotante from '@Organismos/ModalFlotante';
import CamposVariante from '@Organismos/Formularios/CamposVariante';
import { useConsultarProveedores } from '@Hooks/Proveedores/useConsultarProveedores';
import { useCrearProducto } from '@Hooks/Productos/useCrearProducto';

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
    <Grid size={size}>
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
  <Grid size={6} display='flex' alignItems='center' justifyContent='end'>
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
  <Grid size={size} overflow='hidden'>
    <Texto variant={tituloVariant} gutterBottom>
      {titulo}
    </Texto>
  </Grid>
));

const CampoImagenProducto = memo(
  ({ imagenProducto, setImagenes, fileInputRef, handleFileSelect }) => (
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
  <Grid size={12}>
    <TarjetaAccion icono='Add' texto={etiqueta} onClick={onClic} hoverScale={false} />
  </Grid>
));

const FormularioProducto = memo(
  ({ open, onMostrarFormularioProveedor, onCerrarFormularioProducto }) => {
    const fileInputRef = useRef();
    const [alerta, setAlerta] = useState(null);
    const [variantes, setVariantes] = useState({
      1: {
        nombreVariante: '',
        descripcion: '',
        opciones: [],
      },
    });
    const [variantesIds, setVariantesIds] = useState([1]);
    const [nextVarianteId, setNextVarianteId] = useState(2);
    const [nextImagenId, setNextImagenId] = useState(1);
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
      idProveedor: -1,
    });

    const [imagenes, setImagenes] = useState({
      imagenProducto: null,
      imagenesVariantes: {},
    });

    const { proveedores } = useConsultarProveedores();
    const { errores, handleGuardarProducto } = useCrearProducto();

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

      setImagenes((prev) => ({
        ...prev,
        imagenesVariantes: {
          ...prev.imagenesVariantes,
          [newId]: [],
        },
      }));

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

    const eliminarVariante = useCallback((varianteId) => {
      setVariantes((prev) => {
        const newVariantes = { ...prev };
        delete newVariantes[varianteId];
        return newVariantes;
      });

      setImagenes((prev) => {
        const newImagenesVariantes = { ...prev.imagenesVariantes };
        delete newImagenesVariantes[varianteId];
        return {
          ...prev,
          imagenesVariantes: newImagenesVariantes,
        };
      });

      setAlerta({
        tipo: 'success',
        mensaje: 'Variante eliminada',
      });

      setVariantesIds((prev) => prev.filter((id) => id !== varianteId));
    }, []);

    const agregarOpcion = useCallback((varianteId) => {
      setVariantes((prev) => {
        if (!prev[varianteId]) {
          return prev;
        }

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

    const actualizarOpcion = useCallback((varianteId, opcionIndex, campo, valor) => {
      setVariantes((prev) => {
        const varianteActual = prev[varianteId];
        if (!varianteActual) return prev;

        const opcionesActuales = varianteActual.opciones || [];

        if (opcionIndex < 0 || opcionIndex >= opcionesActuales.length) {
          return prev;
        }

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

    const eliminarOpcion = useCallback((varianteId, opcionIndex) => {
      setVariantes((prev) => {
        const varianteActual = prev[varianteId];
        if (
          !varianteActual ||
          !varianteActual.opciones ||
          opcionIndex >= varianteActual.opciones.length
        ) {
          return prev;
        }

        const opcionesActualizadas = [
          ...varianteActual.opciones.slice(0, opcionIndex),
          ...varianteActual.opciones.slice(opcionIndex + 1),
        ];

        setAlerta({
          tipo: 'success',
          mensaje: 'Opción eliminada',
        });

        return {
          ...prev,
          [varianteId]: {
            ...varianteActual,
            opciones: opcionesActualizadas,
          },
        };
      });
    }, []);

    const agregarImagenVariante = useCallback(
      (varianteId, files) => {
        setImagenes((prev) => {
          const imagenesVariante = prev.imagenesVariantes[varianteId] || [];
          const nuevasImagenes = files.map((file) => ({
            id: `${file.name}_${varianteId}`,
            idVariante: varianteId,
            file,
          }));

          setNextImagenId(nextImagenId + files.length);

          return {
            ...prev,
            imagenesVariantes: {
              ...prev.imagenesVariantes,
              [varianteId]: [...imagenesVariante, ...nuevasImagenes],
            },
          };
        });

        setAlerta({
          tipo: 'success',
          mensaje: `${
            files.length > 1 ? `${files.length} imágenes agregadas` : 'Imagen agregada'
          } a la variante`,
        });
      },
      [nextImagenId]
    );

    const eliminarImagenVariante = useCallback((varianteId, imagenId) => {
      setImagenes((prev) => {
        const imagenesVariante = prev.imagenesVariantes[varianteId] || [];

        return {
          ...prev,
          imagenesVariantes: {
            ...prev.imagenesVariantes,
            [varianteId]: imagenesVariante.filter((img) => img.id !== imagenId),
          },
        };
      });

      setAlerta({
        tipo: 'success',
        mensaje: 'Imagen eliminada',
      });
    }, []);

    const handleCrearProducto = useCallback(async () => {
      const variantesData = Object.entries(variantes).map(([id, data]) => ({
        identificador: id,
        nombreVariante: data.nombreVariante,
        descripcion: data.descripcion,
        opciones: data.opciones.map((opcion) => ({
          cantidad: Number(opcion.cantidad) || 0,
          valorOpcion: opcion.valorOpcion,
          SKUautomatico: opcion.SKUautomatico || '',
          SKUcomercial: opcion.SKUcomercial || '',
          costoAdicional: Number(opcion.costoAdicional) || 0,
          descuento: Number(opcion.descuento) || 0,
          estado: Number(opcion.estado) || 1,
        })),
      }));

      const productoFormateado = {
        ...producto,
        precioPuntos: Number(producto.precioPuntos) || 0,
        precioCliente: Number(producto.precioCliente) || 0,
        precioVenta: Number(producto.precioVenta) || 0,
        costo: Number(producto.costo) || 0,
        impuesto: Number(producto.impuesto) || 16,
        descuento: Number(producto.descuento) || 0,
        estado: Number(producto.estado) || 1,
        envio: Number(producto.envio) || 1,
        idProveedor: Number(producto.idProveedor),
      };

      setAlerta({
        tipo: 'info',
        mensaje: 'Guardando producto...',
      });

      const resultado = await handleGuardarProducto({
        producto: productoFormateado,
        variantes: variantesData,
        imagenProducto: imagenes.imagenProducto,
        imagenesVariantes: imagenes.imagenesVariantes,
      });

      if (resultado?.mensaje) {
        if (resultado.exito) {
          const resumenProducto = `
              Producto ${producto.nombreComun} creado exitosamente.
            `;

          setAlerta({
            tipo: 'success',
            mensaje: resumenProducto,
          });

          setTimeout(() => {
            setProducto({
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
              idProveedor: -1,
            });

            setVariantes({
              1: {
                nombreVariante: '',
                descripcion: '',
                opciones: [],
              },
            });

            setVariantesIds([1]);
            setNextVarianteId(2);
            setNextImagenId(1);

            setImagenes({
              imagenProducto: null,
              imagenesVariantes: { 1: [] },
            });

            onCerrarFormularioProducto();
          }, 2000);
        } else {
          setAlerta({
            tipo: 'error',
            mensaje: resultado.mensaje,
          });
        }
      }
    }, [handleGuardarProducto, imagenes, producto, variantes, onCerrarFormularioProducto]);

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

    useMemo(() => {
      setImagenes((prev) => {
        const imagenesActualizadas = { ...prev };

        variantesIds.forEach((id) => {
          if (!imagenesActualizadas.imagenesVariantes[id]) {
            imagenesActualizadas.imagenesVariantes[id] = [];
          }
        });

        return imagenesActualizadas;
      });
    }, [variantesIds]);

    return (
      <>
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
                name='idProveedor'
                value={producto.idProveedor}
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

              {variantesIds.map((varianteId) => (
                <CamposVariante
                  key={`variante-${varianteId}`}
                  varianteId={varianteId}
                  variante={
                    variantes[varianteId] || { nombreVariante: '', descripcion: '', opciones: [] }
                  }
                  imagenesVariante={imagenes.imagenesVariantes[varianteId] || []}
                  onUpdateVariante={updateVariante}
                  onEliminarVariante={eliminarVariante}
                  onAgregarOpcion={agregarOpcion}
                  onActualizarOpcion={actualizarOpcion}
                  onEliminarOpcion={eliminarOpcion}
                  onAgregarImagen={agregarImagenVariante}
                  onEliminarImagen={eliminarImagenVariante}
                />
              ))}

              <CampoCrear etiqueta='Crear Variante' onClic={handleCrearVariante} />
            </Grid>
          </Box>
        </ModalFlotante>

        {alerta && (
          <Alerta
            sx={{ marginBottom: 2 }}
            tipo={alerta.tipo}
            mensaje={alerta.mensaje}
            duracion='2000'
            centradoInferior={true}
            onClose={() => setAlerta(null)}
          />
        )}
      </>
    );
  }
);

export default FormularioProducto;
