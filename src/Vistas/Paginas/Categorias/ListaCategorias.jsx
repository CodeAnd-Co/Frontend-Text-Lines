// RF49 - Actualizar Categoría - ListaCategorias.jsx

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { PERMISOS } from '@Utilidades/Constantes/permisos';
import { useAuth } from '@Hooks/AuthProvider';
import { Box, useTheme } from '@mui/material';
import { tokens } from '@SRC/theme';
import ModalCrearCategoria from '@Organismos/ModalCrearCategoria';

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
  const { usuario } = useAuth();
  

  const columns = useMemo(
    () => [
      { field: 'nombreCategoria', headerName: 'Nombre', flex: 1 },
      { field: 'descripcion', headerName: 'Descripción', flex: 2 },
      {
        field: 'cantidadProductos',
        headerName: 'Número de productos asociados',
        type: 'number',
        flex: 1,
      },
    ],
    []
  );

  const rows = useMemo(
    () =>
      categorias.map((cat) => ({
        id: cat.idCategoria,
        nombreCategoria: cat.nombreCategoria,
        descripcion: cat.descripcion,
        cantidadProductos: cat.cantidadProductos,
        idCliente: cat.idCliente,
      })),
    [categorias]
  );

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const resultado = await obtenerProductosCategoria();
        setProductos(resultado);
      } catch {
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

  const handleAbrirModalCrear = useCallback(() => setModalCrearAbierto(true), []);
  const handleCerrarModalCrear = useCallback(() => setModalCrearAbierto(false), []);

  const handleCategoriaCreadaExitosamente = useCallback(() => {
    handleCerrarModalCrear();
    // Recarga la lista de categorías
    recargar();
    // Show success alert
    setAlerta({
      tipo: 'success',
      mensaje: 'Categoría creada exitosamente.',
      icono: true,
      cerrable: true,
      centradoInferior: true,
    });
  }, [recargar, handleCerrarModalCrear]);

  // Manejador para errores al crear categoría
  const handleErrorCrearCategoria = useCallback((mensajeError) => {
    setAlerta({
      tipo: 'error',
      mensaje: mensajeError,
      icono: true,
      cerrable: true,
      centradoInferior: true,
    });
  }, []);

  const mostrarDetalleCategoria = useCallback(async (idCategoria) => {
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
  }, []);

  const manejarCambioTransferencia = useCallback(({ disponibles, seleccionados }) => {
    setCategoriaEditable((prev) => ({
      ...prev,
      productosDisponibles: disponibles,
      productosSeleccionados: seleccionados,
    }));
  }, []);

  const manejarGuardarCategoria = useCallback(async () => {
    if (!categoriaEditable?.idCategoria) {
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
      setAlerta({
        tipo: 'success',
        mensaje: actualizar.mensaje || 'Categoría actualizada correctamente',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });

      setTimeout(() => {
        setModalEditarAbierto(false);
        setCategoriaEditable(null);
        actualizar.limpiarEstado();
        setAlerta(null);
        recargar();
      }, 2000);
    } else if (actualizar.error) {
      setAlerta({
        tipo: 'error',
        mensaje: actualizar.error,
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    }
  }, [categoriaEditable, actualizar, recargar]);

  const cerrarModalEditar = useCallback(() => {
    setModalEditarAbierto(false);
    setCategoriaEditable(null);
    actualizar.limpiarEstado();
  }, [actualizar]);

  const abrirModalEditar = useCallback(async () => {
    setModalDetalleAbierto(false);

    const productosAsociados = productos.filter((producto) =>
      categoriaDetalle.productos.includes(producto.nombre));

    const productosDisponibles = productos.filter(
      (producto) => !categoriaDetalle.productos.includes(producto.nombre)
    );

    const nuevaCategoriaEditable = {
      idCategoria: categoriaDetalle.idCategoria,
      nombreCategoria: categoriaDetalle.nombreCategoria,
      descripcion: categoriaDetalle.descripcion,
      productosSeleccionados: productosAsociados,
      productosDisponibles,
    };

    setCategoriaEditable(nuevaCategoriaEditable);
    setModalEditarAbierto(true);
  }, [productos, categoriaDetalle]);

  const botones = useMemo(
    () => [
      {
        label: 'Añadir',
        variant: 'contained',
        color: 'error',
        size: 'large',
        backgroundColor: colores.altertex[1],
        onClick: handleAbrirModalCrear,
        disabled: !usuario?.permisos?.includes(PERMISOS.CREAR_CATEGORIA_PRODUCTOS),
      },
      {
        label: 'Eliminar',
        disabled: !usuario?.permisos?.includes(PERMISOS.ELIMINAR_CATEGORIA_PRODUCTOS),
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
      
    ],
    [colores.altertex, handleAbrirModalCrear, seleccionados, usuario?.permisos]
  );

  const botonesModalDetalle = useMemo(() => {
    if (errorDetalle) {
      return [
        {
          label: 'SALIR',
          variant: 'outlined',
          color: 'primary',
          outlineColor: colores.altertex[1],
          onClick: () => setModalDetalleAbierto(false),
        },
      ];
    }

    return [
      {
        label: 'EDITAR',
        variant: 'contained',
        color: 'error',
        backgroundColor: colores.altertex[1],
        onClick: abrirModalEditar,
      },
      {
        label: 'SALIR',
        variant: 'outlined',
        color: 'primary',
        outlineColor: colores.altertex[1],
        onClick: () => setModalDetalleAbierto(false),
      },
    ];
  }, [errorDetalle, colores.altertex, abrirModalEditar]);

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

      {/* Modal para crear categoria */}
      <ModalCrearCategoria
        abierto={modalCrearAbierto}
        onCerrar={handleCerrarModalCrear}
        onCreado={handleCategoriaCreadaExitosamente}
        onError={handleErrorCrearCategoria}
      />

      {/* Modal para eliminar categoria */}
      <ModalEliminarCategoria
        open={openModalEliminar}
        onClose={() => setOpenModalEliminar(false)}
        idsCategoria={idsCategoria}
        setAlerta={setAlerta}
        refrescarPagina={recargar}
      />

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
          botones={botonesModalDetalle}
        >
          {!errorDetalle && (
            <CategoriaInfo
              descripcion={categoriaDetalle?.descripcion}
              productos={categoriaDetalle?.productos}
            />
          )}
        </ModalFlotante>
      )}

      <ModalEditarCategoria
        key={categoriaEditable?.idCategoria || 'sin-categoria'}
        abierto={modalEditarAbierto}
        onCerrar={cerrarModalEditar}
        categoria={categoriaEditable}
        onGuardar={manejarGuardarCategoria}
        onCambioTransferencia={manejarCambioTransferencia}
        estadoActualizacion={actualizar}
        setCategoria={setCategoriaEditable}
      />

      {alerta && (
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          icono={alerta.icono}
          cerrable={alerta.cerrable}
          duracion={3000}
          centradoInferior={alerta.centradoInferior}
          onClose={() => setAlerta(null)}
        />
      )}
    </>
  );
}; // <- Esta llave de cierre estaba faltando

export default ListaCategorias;
