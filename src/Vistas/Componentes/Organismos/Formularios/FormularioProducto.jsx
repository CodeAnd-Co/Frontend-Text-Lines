//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import { memo } from 'react';
import { Box, Grid } from '@mui/material';
import Texto from '@Atomos/Texto';
import TarjetaAccion from '@Moleculas/TarjetaAccion';
import Alerta from '@Moleculas/Alerta';
import ModalFlotante from '@Organismos/ModalFlotante';
import CamposVariante from '@Organismos/Formularios/CamposVariante';
import CamposProducto from '@Organismos/Formularios/CamposProducto';
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

const ContenidoFormulario = memo(({ alMostrarFormularioProveedor }) => {
  const {
    refInputArchivo,
    alerta,
    setAlerta,
    variantes,
    idsVariantes,
    producto,
    imagenes,
    setImagenes,
    erroresProducto,
    erroresVariantes,
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
        <Grid container spacing={2}>
          <CamposProducto
            producto={producto}
            imagenProducto={imagenes.imagenProducto}
            refInputArchivo={refInputArchivo}
            erroresProducto={erroresProducto}
            listaProveedores={listaProveedores}
            alActualizarProducto={manejarActualizarProducto}
            alAgregarImagenProducto={manejarAgregarImagenProducto}
            setImagenes={setImagenes}
            alMostrarFormularioProveedor={alMostrarFormularioProveedor}
          />

          <TituloFormulario titulo='Datos de las Variantes' varianteTitulo='h6' />

          {idsVariantes.map((idVariante) => (
            <CamposVariante
              key={`variante-${idVariante}`}
              varianteId={idVariante}
              variante={
                variantes[idVariante] || { nombreVariante: '', descripcion: '', opciones: [] }
              }
              imagenesVariante={imagenes.imagenesVariantes[idVariante] || []}
              erroresVariantes={erroresVariantes}
              alActualizarVariante={manejarActualizarVariante}
              alEliminarVariante={manejarEliminarVariante}
              alAgregarOpcion={manejarAgregarOpcion}
              alActualizarOpcion={manejarActualizarOpcion}
              alEliminarOpcion={manejarEliminarOpcion}
              alAgregarImagenVariante={manejarAgregarImagenVariante}
              alEliminarImagenVariante={manejarEliminarImagenVariante}
            />
          ))}

          <CampoCrear etiqueta='Crear Variante' onClick={manejarCrearVariante} />
        </Grid>
      </Box>

      {alerta && (
        <Alerta
          sx={{ bottom: 10 }}
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          duracion='2000'
          centradoInferior={true}
          onClose={() => setAlerta(null)}
        />
      )}
    </>
  );
});

const FormularioProducto = memo(
  ({ formularioAbierto, alMostrarFormularioProveedor, alCerrarFormularioProducto }) => {
    return (
      <ProductoFormProvider alCerrarFormularioProducto={alCerrarFormularioProducto}>
        <FormularioModal
          formularioAbierto={formularioAbierto}
          alCerrarFormularioProducto={alCerrarFormularioProducto}
          alMostrarFormularioProveedor={alMostrarFormularioProveedor}
        />
      </ProductoFormProvider>
    );
  }
);

// Componente del modal que utiliza el contexto
const FormularioModal = memo(
  ({ formularioAbierto, alCerrarFormularioProducto, alMostrarFormularioProveedor }) => {
    const { manejarCrearProducto } = useProductoForm();

    return (
      <ModalFlotante
        open={formularioAbierto}
        onClose={alCerrarFormularioProducto}
        onConfirm={manejarCrearProducto}
        titulo='Crear Producto'
        confirmLabel='Guardar'
        cancelLabel='Cerrar'
      >
        <ContenidoFormulario alMostrarFormularioProveedor={alMostrarFormularioProveedor} />
      </ModalFlotante>
    );
  }
);

export default FormularioProducto;
