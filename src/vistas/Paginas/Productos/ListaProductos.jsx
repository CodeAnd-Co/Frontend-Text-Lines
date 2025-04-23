<<<<<<< HEAD
// RF[27] Consulta Lista de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import CustomDataGrid from '../../Componentes/Organismos/DataGrid';
import { useConsultarProductos } from '../../../hooks/Productos/useConsultarProductos';
import { tokens } from '../../../theme';

const ListaProductos = () => {
  const { productos = [], cargando, error } = useConsultarProductos();
=======
//RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
import React from 'react';
import CustomDataGrid from '../../Componentes/Organismos/dataGrid';
import { useConsultarProductos } from '../../../hooks/Productos/useConsultarProductos';
import { useTheme } from '@mui/material';
import { tokens } from '../../../theme';

const Productos = () => {
  // Hook que obtiene los productos desde el repositorio
  const { productos, cargando } = useConsultarProductos();
>>>>>>> db0aaf0ec49dd396c3caf3ae25be1ffb28d85054
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);

  const columnas = [
    {
      field: 'imagen',
      headerName: 'Imagen',
      flex: 0.7,
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
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'estado',
      headerName: 'Disponibilidad en stock',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'estado-row--cell',
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
        <Typography variant='h4'>Productos</Typography>
      </Box>

      <Box sx={{ mt: '40px', ml: '40px' }}>
        <Box
          sx={{
            '& .estado-row--cell': {
              color: colores.primario[4],
            },
          }}
        >
          <CustomDataGrid columns={columnas} rows={filas} loading={cargando} checkboxSelection />
        </Box>
      </Box>
    </>
  );
};

export default ListaProductos;
