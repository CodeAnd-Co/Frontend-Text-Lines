// RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
// RF[30] - Elimina producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30
import React, { useState } from 'react';
import Tabla from '../../Componentes/Organismos/Tabla';
import Alerta from '../../Componentes/moleculas/Alerta';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import ModalEliminarProducto from '../../componentes/organismos/ModalEliminarProducto';
import { useConsultarProductos } from '../../../hooks/Productos/useConsultarProductos';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';

/**
 * Página para consultar y mostrar la lista de productos.
 */
const ListaProductos = () => {
  const { productos, cargando, error, recargar } = useConsultarProductos();
  const [seleccionados, setSeleccionados] = useState(new Set());
  const [alerta, setAlerta] = useState(null);
  const [idsProducto, setIdsProducto] = useState([]);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  const columnas = [
    { field: 'nombreComun', headerName: 'Nombre', flex: 1 },
    { field: 'precioVenta', headerName: 'Precio Venta', type: 'number', flex: 0.7 },
    {
      field: 'estado',
      headerName: 'Disponibilidad',
      flex: 1,
      valueGetter: ({ row }) => (row?.estado === 1 ? 'Disponible' : 'No disponible'),
    },
  ];

  const filas = productos.map((producto) => ({
    id: producto.idProducto,
    nombreComun: producto.nombreComun,
    precioVenta: producto.precioVenta,
    estado: producto.estado,
  }));

  const botones = [
    {
      label: 'Añadir',
      variant: 'contained',
      color: 'primary',
      size: 'large',
      backgroundColor: colores.altertex[1],
      onClick: () => console.log('Añadir producto'),
    },
    {
      variant: 'outlined',
      label: 'Editar',
      onClick: () => console.log('Editar producto'),
      color: 'primary',
      size: 'large',
      outlineColor: colores.altertex[1],
    },
    {
      label: 'Eliminar',
      onClick: () => {
        if (seleccionados.size === 0 || seleccionados.ids.size === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un producto para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setIdsProducto(Array.from(seleccionados.ids));
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
        titulo="Productos"
        descripcion="Gestiona y organiza los productos registrados en el sistema."
        informacionBotones={botones}
      >
        <Box style={{ height: 400, width: '100%' }}>
          {error && <Alerta tipo="error" mensaje={error} icono cerrable centradoInferior />}
          <Tabla
            columns={columnas}
            rows={filas}
            loading={cargando}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => setSeleccionados(newSelection)}
          />
        </Box>
      </ContenedorLista>

      <ModalEliminarProducto
        open={openModalEliminar}
        onClose={() => setOpenModalEliminar(false)}
        idsProducto={idsProducto}
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

export default ListaProductos;