// RF49 - Actualizar Categoría - ListaCategorias.jsx

import React, { useState, useEffect } from 'react';
import Tabla from '@Organismos/Tabla';
import Alerta from '@Moleculas/Alerta';
import ContenedorLista from '@Organismos/ContenedorLista';
import ModalEliminarCategoria from '@Organismos/ModalEliminarCategoria';
import CategoriaInfo from '@Organismos/CategoriaInfo';
import ModalFlotante from '@Organismos/ModalFlotante';
import ModalEditarCategoria from '@Organismos/ModalEditarCategoria';
import { useConsultarCategorias } from '@Hooks/Categorias/useConsultarCategorias';
import { leerCategoria } from '@Hooks/Categorias/useLeerCategoria';
import useActualizarCategoria from '@Hooks/Categorias/useActualizarCategoria';
import obtenerProductosCategoria from '@Servicios/obtenerProductosCategoria';
import { Box, useTheme } from '@mui/material';
import { tokens } from '@SRC/theme';
import ModalCrearCategoria from '@Organismos/ModalCrearCategoria';

/**
 * Página para consultar y mostrar la lista de categorías en una tabla.
 *
 * Muestra los resultados en un CustomDataGrid, incluyendo
 * nombre, descripción y número de productos de cada categoría.
 *
 * @see [RF[47] Consulta lista de categorías](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47)
 */

const ListaCategorias = () => {
  const { categorias, cargando, error, recargar } = useConsultarCategorias();
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState(new Set());
  const [alerta, setAlerta] = useState(null);
  const [idsCategoria, setIdsCategoria] = useState([]);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [categoriaDetalle, setCategoriaDetalle] = useState(null);
  const [errorDetalle, setErrorDetalle] = useState(false);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [categoriaEditable, setCategoriaEditable] = useState(null);
  const actualizar = useActualizarCategoria();

  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const resultado = await obtenerProductosCategoria();
        setProductos(resultado);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setAlerta({
          tipo: 'error',
          mensaje: 'Error al cargar productos.',
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
      }
    };
    cargarProductos();
  }, []);

  const columns = [
    { field: 'nombreCategoria', headerName: 'Nombre', flex: 1 },
    { field: 'descripcion', headerName: 'Descripción', flex: 2 },
    {
      field: 'cantidadProductos',
      headerName: 'Número de productos asociados',
      type: 'number',
      flex: 1,
    },
  ];

<<<<<<< HEAD

  // Las filas deben tener un campo `id`, usamos `idCategoria`
  // para que coincida con el campo `id` de la tabla.
=======
>>>>>>> 35bc89bb8ee319eab7444929fa52e24b1708b1b5
  const rows = categorias.map((cat) => ({
    id: cat.idCategoria,
    nombreCategoria: cat.nombreCategoria,
    descripcion: cat.descripcion,
    cantidadProductos: cat.cantidadProductos,
    idCliente: cat.idCliente,
  }));

  const handleAbrirModalCrear = () => setModalCrearAbierto(true);
  const handleCerrarModalCrear = () => setModalCrearAbierto(false);
  const handleCategoriaCreadaExitosamente = () => {
    handleCerrarModalCrear();
    recargar();
  };

  const mostrarDetalleCategoria = async (idCategoria) => {
    setCargandoDetalle(true);
    setCategoriaDetalle(null);
    setErrorDetalle(false);

    try {
      const detalle = await leerCategoria(idCategoria);
      detalle.idCategoria = idCategoria;
      setCategoriaDetalle(detalle);
    } catch {
      setErrorDetalle(true);
      setCategoriaDetalle({ nombreCategoria: '', descripcion: '', productos: [] });
      setAlerta({
        tipo: 'error',
        mensaje: 'Error al obtener los datos de la categoría.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    } finally {
      setCargandoDetalle(false);
      setModalDetalleAbierto(true);
    }
  };

<<<<<<< HEAD

=======
  const manejarCambioTransferencia = ({ disponibles, seleccionados }) => {
    setCategoriaEditable((prev) => ({
      ...prev,
      productosDisponibles: disponibles,
      productosSeleccionados: seleccionados,
    }));
  };

const manejarGuardarCategoria = async () => {
  if (!categoriaEditable?.idCategoria) {
    console.error('❌ ID de categoría no definido');
    setAlerta({
      tipo: 'error',
      mensaje: 'No se pudo determinar el ID de la categoría.',
      icono: true,
      cerrable: true,
      centradoInferior: true,
    });
    return;
  }

  const datos = {
    nombreCategoria: categoriaEditable.nombreCategoria,
    descripcion: categoriaEditable.descripcion,
    productos: categoriaEditable.productosSeleccionados.map((producto) => producto.id),
  };

  const resultado = await actualizar.actualizarCategoria(categoriaEditable.idCategoria, datos);

  if (resultado.success) {
    // Esperar 2 segundos para mostrar la alerta antes de cerrar
    setTimeout(() => {
      setModalEditarAbierto(false);
      setCategoriaEditable(null);
      actualizar.limpiarEstado(); // evitar que persista en la siguiente apertura
      recargar();
    }, 2000);
  }
};
>>>>>>> 35bc89bb8ee319eab7444929fa52e24b1708b1b5

  const botones = [
    {
      label: 'Añadir',
      variant: 'contained',
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
      onClick: handleAbrirModalCrear, // Ahora abre el modal para crear
    },
    {
      label: 'Eliminar',
      onClick: () => {
        if (seleccionados.size === 0 || seleccionados.ids?.size === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos una categoría para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setIdsCategoria(Array.from(seleccionados.ids));
          setOpenModalEliminar(true);
        }
      },
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
  ];

  return (
    <>
      <ContenedorLista
        titulo='Categorías'
        descripcion='Gestiona y organiza las categorías registradas en el sistema.'
        informacionBotones={botones}
      >
        <Box style={{ height: 400, width: '100%' }}>
          {error && <Alerta tipo='error' mensaje={error} icono cerrable centradoInferior />}
          <Tabla
            columns={columns}
            rows={rows}
            loading={cargando}
            disableRowSelectionOnClick
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => setSeleccionados(newSelection)}
            onRowClick={(params) => mostrarDetalleCategoria(params.row.id)}
          />
        </Box>
      </ContenedorLista>

<<<<<<< HEAD
      {/* Modal para crear categoria */}

=======
>>>>>>> 35bc89bb8ee319eab7444929fa52e24b1708b1b5
      <ModalCrearCategoria
        abierto={modalCrearAbierto}
        onCerrar={handleCerrarModalCrear}
        onCreado={handleCategoriaCreadaExitosamente}
      />

<<<<<<< HEAD
      {/* Modal para eliminar categoria */}

=======
>>>>>>> 35bc89bb8ee319eab7444929fa52e24b1708b1b5
      <ModalEliminarCategoria
        open={openModalEliminar}
        onClose={() => setOpenModalEliminar(false)}
        idsCategoria={idsCategoria}
        setAlerta={setAlerta}
        refrescarPagina={recargar}
      />

<<<<<<< HEAD
      {/* Alert that appears on the page level */}
=======
>>>>>>> 35bc89bb8ee319eab7444929fa52e24b1708b1b5
      {modalDetalleAbierto && !cargandoDetalle && (
        <ModalFlotante
          open={modalDetalleAbierto}
          onClose={() => {
            setModalDetalleAbierto(false);
            setCategoriaDetalle(null);
            setErrorDetalle(false);
          }}
          onConfirm={() => setModalDetalleAbierto(false)}
          titulo={
            errorDetalle
              ? 'Cargando...'
              : categoriaDetalle?.nombreCategoria || 'Detalles de la categoría'
          }
          tituloVariant='h4'
          botones={
            errorDetalle
              ? [
                  {
                    label: 'SALIR',
                    variant: 'outlined',
                    color: 'primary',
                    outlineColor: colores.primario[1],
                    onClick: () => setModalDetalleAbierto(false),
                  },
                ]
              : [
                  {
                    label: 'EDITAR',
                    variant: 'contained',
                    color: 'error',
                    backgroundColor: colores.altertex[1],
                    onClick: async () => {
                      setModalDetalleAbierto(false);

                    const productosAsociados = productos.filter((producto) =>
                      categoriaDetalle.productos.includes(producto.nombre));

                    const productosDisponibles = productos.filter(
                      (producto) => !categoriaDetalle.productos.includes(producto.nombre)
                    );


                      setCategoriaEditable({
                        idCategoria: categoriaDetalle.idCategoria,
                        nombreCategoria: categoriaDetalle.nombreCategoria,
                        descripcion: categoriaDetalle.descripcion,
                        productosSeleccionados: productosAsociados,
                        productosDisponibles,
                      });
                      setModalEditarAbierto(true);
                    },
                  },
                  {
                    label: 'SALIR',
                    variant: 'outlined',
                    color: 'primary',
                    outlineColor: colores.primario[1],
                    onClick: () => setModalDetalleAbierto(false),
                  },
                ]
          }
        >
          {!errorDetalle && (
            <CategoriaInfo
              descripcion={categoriaDetalle?.descripcion}
              productos={categoriaDetalle?.productos}
            />
          )}
        </ModalFlotante>
      )}

<<<<<<< HEAD
=======
      <ModalEditarCategoria
        abierto={modalEditarAbierto}
        onCerrar={() => {
          setModalEditarAbierto(false);
          setCategoriaEditable(null);
          actualizar.limpiarEstado();
        }}
        categoria={categoriaEditable}
        onGuardar={manejarGuardarCategoria}
        onCambioTransferencia={manejarCambioTransferencia}
        estadoActualizacion={actualizar}
        setCategoria={setCategoriaEditable}
      />

>>>>>>> 35bc89bb8ee319eab7444929fa52e24b1708b1b5
      {alerta && (
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          icono={alerta.icono}
          cerrable={alerta.cerrable}
          duracion={2500}
          centradoInferior={alerta.centradoInferior}
          onClose={() => setAlerta(null)}
        />
      )}
    </>
  );
};

export default ListaCategorias;