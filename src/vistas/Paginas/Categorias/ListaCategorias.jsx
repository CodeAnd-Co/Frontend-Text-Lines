import React, { useState } from 'react';
import Tabla from '../../componentes/organismos/Tabla';
import Alerta from '../../componentes/moleculas/Alerta';
import ContenedorLista from '../../componentes/organismos/ContenedorLista';
import ModalEliminarCategoria from '../../componentes/organismos/ModalEliminarCategoria';
import { useConsultarCategorias } from '../../../hooks/Categorias/useConsultarCategorias';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import ModalCrearCategoria from '../../componentes/organismos/ModalCrearCategoria';

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

  // Estado para controlar la visualización del modal crear
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);

  // Estado para controlar la visualización del modal eliminar
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  // Columnas para el DataGrid
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
  // Las filas deben tener un campo `id`, usamos `idCategoria`
  const rows = categorias.map((cat) => ({
    id: cat.idCategoria,
    nombreCategoria: cat.nombreCategoria,
    descripcion: cat.descripcion,
    cantidadProductos: cat.cantidadProductos,
    idCliente: cat.idCliente,
  }));

  // Manejador para abrir el modal
  const handleAbrirModalCrear = () => {
    setModalCrearAbierto(true);
  };

  // Manejador para cerrar el modal
  const handleCerrarModalCrear = () => {
    setModalCrearAbierto(false);
  };

  // Manejador para cuando se crea una nueva categoría
  const handleCategoriaCreadaExitosamente = () => {
    handleCerrarModalCrear();
    // Recarga la lista de categorías
    recargar();
  };

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
      variant: 'outlined',
      label: 'Editar',
      onClick: () => console.log('Importar'),
      color: 'primary',
      size: 'large',
      outlineColor: colores.primario[3],
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
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => {
              setSeleccionados(newSelection);
            }}
          />
        </Box>
      </ContenedorLista>
      {/* Modal para crear categoria */}
      <ModalCrearCategoria
        abierto={modalCrearAbierto}
        onCerrar={handleCerrarModalCrear}
        onCreado={handleCategoriaCreadaExitosamente}
      />
      {/* Modal para eliminar categoria */}
      <ModalEliminarCategoria
        open={openModalEliminar}
        onClose={() => setOpenModalEliminar(false)}
        idsCategoria={idsCategoria}
        setAlerta={setAlerta}
        refrescarPagina={recargar}
      />
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
