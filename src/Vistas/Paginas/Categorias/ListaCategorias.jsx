import React, { useState } from 'react';
import Tabla from '@Organismos/Tabla';
import Alerta from '@Moleculas/Alerta';
import ContenedorLista from '@Organismos/ContenedorLista';
import ModalEliminarCategoria from '@Organismos/ModalEliminarCategoria';
import { useConsultarCategorias } from '@Hooks/Categorias/useConsultarCategorias';
import { Box, useTheme } from '@mui/material';
import { tokens } from '@SRC/theme';
import ModalCrearCategoria from '@Organismos/ModalCrearCategoria';
import { leerCategoria } from '@Hooks/Categorias/useLeerCategoria';
import CategoriaInfo from '@Organismos/CategoriaInfo';
import ModalFlotante from '@Organismos/ModalFlotante';

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
  const [seleccionados, setSeleccionados] = useState(new Set());
  const [alerta, setAlerta] = useState(null);
  const [idsCategoria, setIdsCategoria] = useState([]);
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);


  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [, setCategoriaSeleccionada] = useState(null);
  const [categoriaDetalle, setCategoriaDetalle] = useState(null);

  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);

  const [openModalEliminar, setOpenModalEliminar] = useState(false);

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
  try {
    const detalle = await leerCategoria(idCategoria);
    setCategoriaDetalle(detalle);
    setModalDetalleAbierto(true);
  } catch (err) {
    setAlerta({
      tipo: 'error',
      mensaje: err.message,
      icono: true,
      cerrable: true,
      centradoInferior: true,
    });
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
            setCategoriaSeleccionada(params.row);
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

      {modalDetalleAbierto && categoriaDetalle && (
      <ModalFlotante
        open={modalDetalleAbierto}
        onClose={() => {
          setModalDetalleAbierto(false);
          setCategoriaDetalle(null);
        }}
        onConfirm={() => setModalDetalleAbierto(false)}
        titulo={categoriaDetalle.nombreCategoria || 'Detalles de la categoría'}
        tituloVariant='h4'
        botones={[
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
        ]}
      >
        <CategoriaInfo
          nombre={categoriaDetalle.nombreCategoria}
          descripcion={categoriaDetalle.descripcion}
          productos={categoriaDetalle.productos}
        />
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
