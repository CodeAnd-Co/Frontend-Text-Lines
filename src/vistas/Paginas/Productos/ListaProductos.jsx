//RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
import React from 'react';
import CustomDataGrid from '../../Componentes/Organismos/Tabla';
import Texto from '../../Componentes/Atomos/Texto';
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
          <CustomDataGrid
            columns={columnas}
            rows={filas}
            loading={cargando}
            checkboxSelection
            rowHeight={80}
          />
        </Box>
      </Box>
    </>
  );
};

export default ListaProductos;
