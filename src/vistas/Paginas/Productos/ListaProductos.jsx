//RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
import React from 'react';
import CustomDataGrid from '../../Componentes/Organismos/dataGrid';
import Texto from '../../Componentes/Atomos/Texto';
import { useConsultarProductos } from '../../../hooks/Productos/useConsultarProductos';
<<<<<<< HEAD
import { Box, Typography, useTheme } from '@mui/material';
=======
import { useTheme } from '@mui/material';
>>>>>>> e2af3dd7800d87c260b73292ce168bcefd59b580
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
<<<<<<< HEAD
      renderCell: ({ row: { estado } }) => {
        return (
          <Box
            width='25%'
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
=======
      renderCell: ({ row: { estado } }) => (
        <Box
          width='100px'
          p='8px'
          display='flex'
          justifyContent='center'
          alignItems='center'
          color={colores.primario[4]}
          bgcolor={estado === 1 ? colores.altertex[1] : colores.acciones[1]}
          borderRadius='4px'
        >
          {estado === 1 ? 'Disponible' : 'No disponible'}
        </Box>
      ),
>>>>>>> e2af3dd7800d87c260b73292ce168bcefd59b580
    },
  ];

  const filas = productos.map((prod) => ({
    id: prod.idProducto,
    nombreComun: prod.nombreComun,
    precioVenta: prod.precioVenta,
    estado: prod.estado,
    urlImagen: prod.urlImagen,
  }));

  return (
    <>
      <Box sx={{ mt: '70px', ml: '50px' }}>
        <Texto variant='h4'>Productos</Texto>
      </Box>

      <Box sx={{ mt: '40px', ml: '40px' }}>
        <Box
          sx={{
            '& .estado-row--cell': {
              color: colores.primario[4],
            },
          }}
        >
<<<<<<< HEAD
          <CustomDataGrid
            columns={columnas}
            rows={filas}
            loading={cargando}
            checkboxSelection
            rowHeight={80}
          />
=======
          <CustomDataGrid columns={columnas} rows={filas} loading={cargando} checkboxSelection />
>>>>>>> e2af3dd7800d87c260b73292ce168bcefd59b580
        </Box>
      </Box>
    </>
  );
};

export default ListaProductos;
