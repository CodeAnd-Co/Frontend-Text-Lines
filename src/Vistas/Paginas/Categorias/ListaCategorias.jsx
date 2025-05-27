import React, { useState } from 'react';
import Tabla from '@Organismos/Tabla';
import Alerta from '@Moleculas/Alerta';
import ContenedorLista from '@Organismos/ContenedorLista';
import ModalEliminarCategoria from '@Organismos/ModalEliminarCategoria';
import ModalCrearCategoria from '@Organismos/ModalCrearCategoria';
import CategoriaInfo from '@Organismos/CategoriaInfo';
import ModalFlotante from '@Organismos/ModalFlotante';
import { useConsultarCategorias } from '@Hooks/Categorias/useConsultarCategorias';
import { leerCategoria } from '@Hooks/Categorias/useLeerCategoria';
import { Box, useTheme } from '@mui/material';
import Texto from '@Atomos/Texto';
import { tokens } from '@SRC/theme';

const ListaCategorias = () => {
  const { categorias, cargando, error, recargar } = useConsultarCategorias();
  const [seleccionados, setSeleccionados] = useState(new Set());
  const [alerta, setAlerta] = useState(null);
  const [idsCategoria, setIdsCategoria] = useState([]);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [categoriaDetalle, setCategoriaDetalle] = useState(null);
  const [errorDetalle, setErrorDetalle] = useState(false);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

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

  const rows = categorias.map((cat) => ({
    id: cat.idCategoria,
    nombreCategoria: cat.nombreCategoria,
    descripcion: cat.descripcion,
    cantidadProductos: cat.cantidadProductos,
    idCliente: cat.idCliente,
  }));

  const handleAbrirModalCrear = () => {
    setModalCrearAbierto(true);
  };

  const handleCerrarModalCrear = () => {
    setModalCrearAbierto(false);
  };

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
      setCategoriaDetalle(detalle);
    } catch (err) {
      setErrorDetalle(true);
      setCategoriaDetalle({
        nombreCategoria: '',
        descripcion: '',
        productos: [],
      });
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

  const botones = [
    {
      label: 'Añadir',
      variant: 'contained',
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
      onClick: handleAbrirModalCrear,
    },
    {
      label: 'Eliminar',
      onClick: () => {
        if (seleccionados.size === 0 || seleccionados.ids.size === 0) {
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
            disableRowSelectionOnClick={true}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => {
              setSeleccionados(newSelection);
            }}
            onRowClick={(params) => {
              mostrarDetalleCategoria(params.row.id);
            }}
          />
        </Box>
      </ContenedorLista>

      <ModalCrearCategoria
        abierto={modalCrearAbierto}
        onCerrar={handleCerrarModalCrear}
        onCreado={handleCategoriaCreadaExitosamente}
      />

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
                    construccion: true,
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
          {errorDetalle ? null : (
            <CategoriaInfo
              descripcion={categoriaDetalle?.descripcion}
              productos={categoriaDetalle?.productos}
            />
          )}
        </ModalFlotante>
      )}

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