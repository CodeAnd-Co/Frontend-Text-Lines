//RF[29] Actualiza Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF29]
import React, { memo } from 'react';
import { Box, Grid } from '@mui/material';
import Texto from '@Atomos/Texto';
import TarjetaAccion from '@Moleculas/TarjetaAccion';
import ModalFlotante from '@Organismos/ModalFlotante';
import CamposVariante from '@Organismos/Formularios/CamposVariante';
import CamposActualizarProducto from '@Organismos/Formularios/CamposActualizarProducto';
import ProductoFormProvider, { useProductoForm } from '@Hooks/Productos/ProductoFormProvider';

const TituloFormulario = memo(({ titulo, varianteTitulo, tamano = 12 }) => (
  <Grid size={tamano} overflow='hidden'>
    <Texto variant={varianteTitulo} gutterBottom>
      {titulo}
    </Texto>
  </Grid>
));

const CampoCrear = memo(({ etiqueta, onClick }) => (
  <Grid size={12}>
    <TarjetaAccion icono='Add' texto={etiqueta} onClick={onClick} hoverScale={false} />
  </Grid>
));

const ContenidoFormulario = memo(() => {
  const {
    refInputArchivo,
    variantes,
    idsVariantes,
    producto,
    imagenes,
    setImagenes,
    erroresProducto,
    erroresVariantes,
    intentosEnviar,
    listaProveedores,
    manejarCrearVariante,
    manejarActualizarVariante,
    manejarEliminarVariante,
    manejarAgregarOpcion,
    manejarActualizarOpcion,
    manejarEliminarOpcion,
    manejarAgregarImagenVariante,
    manejarEliminarImagenVariante,
    manejarActualizarProducto,
    manejarAgregarImagenProducto,
    prevenirNumerosNegativos,
    prevenirNumerosNoDecimales,
  } = useProductoForm();
  return (
    <>
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
        {' '}
        <Grid container spacing={2}>
          <CamposActualizarProducto
            producto={producto}
            imagenProducto={imagenes.imagenProducto}
            refInputArchivo={refInputArchivo}
            erroresProducto={erroresProducto}
            listaProveedores={listaProveedores}
            alActualizarProducto={manejarActualizarProducto}
            alAgregarImagenProducto={manejarAgregarImagenProducto}
            setImagenes={setImagenes}
            prevenirNumerosNegativos={prevenirNumerosNegativos}
            prevenirNumerosNoDecimales={prevenirNumerosNoDecimales}
          />
          <TituloFormulario titulo='Datos de las Variantes' varianteTitulo='h6' />
          {idsVariantes.map((idVariante) => (
            <CamposVariante
              key={`variante-${idVariante}`}
              varianteId={idVariante}
              variante={variantes[idVariante]}
              imagenesVariante={imagenes.imagenesVariantes[idVariante] || []}
              erroresVariantes={erroresVariantes}
              intentosEnviar={intentosEnviar}
              alActualizarVariante={manejarActualizarVariante}
              alEliminarVariante={manejarEliminarVariante}
              alAgregarOpcion={manejarAgregarOpcion}
              alActualizarOpcion={manejarActualizarOpcion}
              alEliminarOpcion={manejarEliminarOpcion}
              alAgregarImagenVariante={manejarAgregarImagenVariante}
              alEliminarImagenVariante={manejarEliminarImagenVariante}
              prevenirNumerosNegativos={prevenirNumerosNegativos}
              prevenirNumerosNoDecimales={prevenirNumerosNoDecimales}
            />
          ))}
          <CampoCrear etiqueta='Crear Variante' onClick={manejarCrearVariante} />
        </Grid>
      </Box>
    </>
  );
});

const FormularioActualizarProducto = memo(
  ({ formularioAbierto, alCerrarFormularioProducto, detalleProducto }) => {
    return (
      <ProductoFormProvider alCerrarFormularioProducto={alCerrarFormularioProducto}>
        <FormularioModal
          formularioAbierto={formularioAbierto}
          alCerrarFormularioProducto={alCerrarFormularioProducto}
          detalleProducto={detalleProducto}
        />
      </ProductoFormProvider>
    );
  }
);

const FormularioModal = memo(
  ({ formularioAbierto, alCerrarFormularioProducto, detalleProducto }) => {
    const {
      manejarGuardarProductoActualizado,
      alerta,
      cargando,
      setAlerta,
      inicializarDatosProducto,
    } = useProductoForm();

    // Inicializar datos del producto cuando el formulario se abre
    React.useEffect(() => {
      if (formularioAbierto && detalleProducto) {
        inicializarDatosProducto(detalleProducto);
      }
    }, [formularioAbierto, detalleProducto, inicializarDatosProducto]);

    // Efecto para manejar el cierre del modal cuando hay éxito en la actualización
    React.useEffect(() => {
      if (alerta && alerta.tipo === 'success' && alerta.mensaje?.includes('éxito')) {
        // Mostrar el mensaje de éxito durante 1.5 segundos antes de cerrar el modal
        const timerCierre = setTimeout(() => {
          alCerrarFormularioProducto();
        }, 1500);

        // Limpiar el temporizador si el componente se desmonta o si cambia el estado de alerta
        return () => clearTimeout(timerCierre);
      }
    }, [alerta, alCerrarFormularioProducto]);

    // Función para manejar el cierre manual del modal
    const handleCloseModal = React.useCallback(() => {
      // Limpiar cualquier alerta pendiente
      setAlerta(null);
      // Cerrar el modal
      alCerrarFormularioProducto();
    }, [setAlerta, alCerrarFormularioProducto]);

    return (
      <>
        <ModalFlotante
          open={formularioAbierto}
          onClose={handleCloseModal}
          onConfirm={manejarGuardarProductoActualizado}
          titulo='Actualizar Producto'
          confirmLabel='Guardar'
          cancelLabel='Cerrar'
          loading={cargando}
          alerta={
            alerta
              ? {
                  ...alerta,
                  onClose: () => setAlerta(null),
                }
              : null
          }
        >
          <ContenidoFormulario />
        </ModalFlotante>
      </>
    );
  }
);

export default FormularioActualizarProducto;
