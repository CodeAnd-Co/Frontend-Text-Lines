//RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
import React from 'react';
import Tabla from '../../Componentes/Organismos/Tabla';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import { useConsultarProductos } from '../../../hooks/Productos/useConsultarProductos';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';

const ListaProductos = () => {
  const { productos, cargando } = useConsultarProductos();
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);

  const columnas = [
    {
      field: 'imagen',
      headerName: 'Imagen',
      flex: 0.5,
      renderCell: (params) => (
        <img
          src={params.row.urlImagen}
          alt='Producto'
          style={{ width: 50, height: 50, objectFit: 'cover' }}
        />
      ),
    },
    {
      field: 'nombreComun',
      headerName: 'Nombre',
      flex: 1,

      cellClassName: 'name-column--cell',
    },
    {
      field: 'precioVenta',
      headerName: 'Precio Venta',
      type: 'number',
      flex: 0.7,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'estado',
      headerName: 'Disponibilidad en stock',
      flex: 1,
      cellClassName: 'estado-row--cell',
      renderCell: ({ row: { estado } }) => {
        return (
          <Box
            width='110px'
            height='50%'
            m='10px auto'
            p='15px'
            display='flex'
            justifyContent='center'
            alignItems='center'
            color={estado === 1 ? colores.primario[4] : colores.texto[1]}
            backgroundColor={estado === 1 ? colores.altertex[1] : colores.acciones[1]}
            borderRadius='4px'
          >
            {estado === 1 ? 'Disponible' : 'No disponible'}
          </Box>
        );
      },
    },
  ];

  const filas = productos.map((prod) => ({
    id: prod.idProducto,
    nombreComun: prod.nombreComun,
    precioVenta: prod.precioVenta,
    estado: prod.estado,
    urlImagen: prod.urlImagen,
  }));

  const botones = [
    { label: 'Añadir', onClick: () => console.log('Añadir'), size: 'large' },
    {
      variant: 'outlined',
      label: 'Importar',
      onClick: () => console.log('Importar'),
      size: 'large',
    },
    {
      variant: 'outlined',
      label: 'Exportar',
      onClick: () => console.log('Exportar'),
      size: 'large',
    },
    { variant: 'outlined', label: 'Editar', onClick: () => console.log('Editar'), size: 'large' },
    { label: 'Eliminar', onClick: () => console.log('Eliminar'), size: 'large' },
  ];

  return (
    <ContenedorLista
      titulo='Lista de Productos'
      descripcion='Gestiona y organiza los productos registrados en el sistema.'
      informacionBotones={botones}
    >
      <Box width={'100%'}>
        <Tabla
          columns={columnas}
          rows={filas}
          loading={cargando}
          checkboxSelection
          rowHeight={80}
        />
      </Box>
    </ContenedorLista>
  );
};

export default ListaProductos;
